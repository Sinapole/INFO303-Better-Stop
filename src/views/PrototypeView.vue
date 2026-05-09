<template>
  <main class="workspace-grid">
    <section class="model-region">
      <ThreeScene
        :labels="viewerText"
        :scenario-id="activeScenario"
        :selected-hotspot-id="selectedHotspotId"
        :theme-mode="props.themeMode"
        @hotspot-hover="hoveredHotspotId = $event"
        @hotspot-select="selectHotspot"
      />
    </section>

    <InfoPanel
      :app="appText"
      :hotspot="visibleHotspotText"
      :hotspot-id="visibleHotspotId"
      :hotspot-mode="hotspotMode"
      :is-audio-playing="isVisibleAudioPlaying"
      @clear-selection="clearSelection"
      @play-audio="playAudioGuidance"
      @stop-audio="stopAudioGuidance"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import InfoPanel from '../components/InfoPanel.vue';
import ThreeScene from '../components/ThreeScene.vue';
import type { AudioGuidanceText, HotspotId } from '../data/hotspots';
import type { ScenarioId } from '../data/scenarios';
import { getAppText, getHotspotText, getViewerText, type Locale, type ThemeMode } from '../i18n';

/** 信息面板当前展示状态：空状态、hover 预览、click 固定选择。 */
type HotspotMode = 'empty' | 'preview' | 'selected';

interface PrototypeViewProps {
  currentLanguage: Locale;
  themeMode: ThemeMode;
}

const props = defineProps<PrototypeViewProps>();

/** 保留 normal scenario，避免扰动 ThreeScene 现有贴图逻辑。 */
const activeScenario = ref<ScenarioId>('normal');
/** 鼠标当前悬停的 hotspot ID；优先级高于已选中 hotspot。 */
const hoveredHotspotId = ref<HotspotId | null>(null);
/** 点击后固定在信息面板里的 hotspot ID。 */
const selectedHotspotId = ref<HotspotId | null>(null);
/** 当前正在朗读的 transcript；用于让按钮在播放时切换成 Stop。 */
const activeAudioTranscript = ref<string | null>(null);
let availableSpeechVoices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;

/** 当前语言对应的 app shell 文案。 */
const appText = computed(() => getAppText(props.currentLanguage));
/** 当前语言对应的 viewer 提示文案。 */
const viewerText = computed(() => getViewerText(props.currentLanguage));

/** 信息面板实际应展示的 hotspot：hover 优先，其次为 click 选择。 */
const visibleHotspotId = computed(() => hoveredHotspotId.value ?? selectedHotspotId.value);
/** 根据当前语言和 visibleHotspotId 解析文案，缺失时由 i18n 层 fallback。 */
const visibleHotspotText = computed(() =>
  visibleHotspotId.value ? getHotspotText(props.currentLanguage, visibleHotspotId.value) : null,
);
/** 当前可见 hotspot 的语音是否正在播放。 */
const isVisibleAudioPlaying = computed(
  () =>
    Boolean(visibleHotspotText.value?.audio) &&
    visibleHotspotText.value?.audio?.transcript === activeAudioTranscript.value,
);

/** 给 InfoPanel 的状态标记，用来决定显示 short 还是 detail。 */
const hotspotMode = computed<HotspotMode>(() => {
  if (hoveredHotspotId.value) {
    return 'preview';
  }

  if (selectedHotspotId.value) {
    return 'selected';
  }

  return 'empty';
});

onMounted(() => {
  warmUpSpeechVoices();
});

onBeforeUnmount(() => {
  stopAudioGuidance();
  window.speechSynthesis?.removeEventListener('voiceschanged', refreshAvailableSpeechVoices);
});

/**
 * 固定用户点击的 hotspot。
 *
 * @param hotspotId ThreeScene 通过 raycast 识别出的 hotspot 对象名。
 */
function selectHotspot(hotspotId: HotspotId): void {
  selectedHotspotId.value = hotspotId;

  const audio = getHotspotText(props.currentLanguage, hotspotId).audio;

  if (audio) {
    playAudioGuidance(audio);
  }
}

/** 清除固定选择，回到 hover 或默认说明。 */
function clearSelection(): void {
  selectedHotspotId.value = null;
}

/** 使用浏览器内置 speech synthesis 播放可本地化的 audio guidance 文案。 */
function playAudioGuidance(audio: AudioGuidanceText): void {
  if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
    window.alert(audio.unsupportedMessage);
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(audio.transcript);
  utterance.lang = audio.locale;
  const preferredVoice = findPreferredVoice(audio);

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.rate = 0.86;
  utterance.pitch = 0.92;
  utterance.volume = 0.95;
  utterance.onend = () => {
    clearAudioState(utterance);
  };
  utterance.onerror = () => {
    clearAudioState(utterance);
  };

  activeUtterance = utterance;
  activeAudioTranscript.value = audio.transcript;
  window.speechSynthesis.speak(utterance);
}

/** 立即停止当前浏览器朗读，比 pause/resume 更稳定。 */
function stopAudioGuidance(): void {
  if (!window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  activeUtterance = null;
  activeAudioTranscript.value = null;
}

/** 只清理当前 utterance，避免旧语音事件覆盖新播放状态。 */
function clearAudioState(utterance: SpeechSynthesisUtterance): void {
  if (activeUtterance !== utterance) {
    return;
  }

  activeUtterance = null;
  activeAudioTranscript.value = null;
}

/** 预先请求系统 voice 列表，减少第一次播放落到浏览器默认音色的概率。 */
function warmUpSpeechVoices(): void {
  if (!window.speechSynthesis) {
    return;
  }

  refreshAvailableSpeechVoices();
  window.speechSynthesis.addEventListener('voiceschanged', refreshAvailableSpeechVoices);
}

/** 刷新浏览器当前暴露的 SpeechSynthesis voice 列表。 */
function refreshAvailableSpeechVoices(): void {
  availableSpeechVoices = window.speechSynthesis.getVoices();
}

/** 从系统 voice 列表里选择更自然的 voice；不可用时回退给浏览器默认 voice。 */
function findPreferredVoice(audio: AudioGuidanceText): SpeechSynthesisVoice | null {
  const voices =
    availableSpeechVoices.length > 0 ? availableSpeechVoices : window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    return null;
  }

  const preferredVoice = audio.preferredVoiceNames
    ?.map((voiceName) =>
      voices.find((voice) => voice.name.toLowerCase().includes(voiceName.toLowerCase())),
    )
    .find((voice): voice is SpeechSynthesisVoice => Boolean(voice));

  if (preferredVoice) {
    return preferredVoice;
  }

  return (
    voices.find((voice) => voice.lang === audio.locale) ??
    voices.find((voice) => voice.lang.startsWith(audio.locale.split('-')[0])) ??
    null
  );
}
</script>
