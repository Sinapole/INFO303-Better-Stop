<template>
  <aside class="info-panel">
    <section class="hotspot-panel">
      <div class="panel-section-heading">
        <p>
          {{
            hotspotMode === 'selected'
              ? app.selectedLabel
              : hotspotMode === 'preview'
                ? app.previewLabel
                : app.hotspotPanelTitle
          }}
        </p>
        <span v-if="hotspotId">{{ hotspotId }}</span>
      </div>

      <div class="hotspot-copy">
        <h2>{{ hotspot?.title ?? app.noHotspotTitle }}</h2>
        <p>
          {{
            hotspotMode === 'selected' ? hotspot?.detail : (hotspot?.short ?? app.noHotspotDetail)
          }}
        </p>
      </div>

      <button
        v-if="hotspotMode === 'selected'"
        type="button"
        class="text-button"
        @click="$emit('clear-selection')"
      >
        {{ app.clearSelection }}
      </button>

      <div v-if="hotspot?.audio" class="audio-guidance">
        <button
          type="button"
          class="text-button text-button--primary audio-guidance__button"
          :aria-label="hotspot.audio.ariaLabel"
          @click="$emit('play-audio', hotspot.audio)"
        >
          {{ hotspot.audio.buttonLabel }}
        </button>

        <p class="audio-guidance__transcript">
          {{ hotspot.audio.transcript }}
        </p>
      </div>
    </section>

    <section class="decision-panel">
      <div class="panel-section-heading">
        <p>{{ app.decisionTitle }}</p>
      </div>

      <dl class="decision-list">
        <div class="decision-item">
          <dt>{{ app.decisionFieldLabels.decisionHelped }}</dt>
          <dd>{{ activeDecision.decisionHelped }}</dd>
        </div>

        <div class="decision-item">
          <dt>{{ app.decisionFieldLabels.whatRiderLearns }}</dt>
          <dd>{{ activeDecision.whatRiderLearns }}</dd>
        </div>

        <div class="decision-item">
          <dt>{{ app.decisionFieldLabels.nextAction }}</dt>
          <dd>{{ activeDecision.nextAction }}</dd>
        </div>
      </dl>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AudioGuidanceText, HotspotText } from '../data/hotspots';
import type { AppText } from '../i18n/types';

/** InfoPanel 负责文本展示，不直接处理 Three.js 对象或语言切换逻辑。 */
interface InfoPanelProps {
  /** 当前语言下的全局 UI 文案。 */
  app: AppText;
  /** 当前 hover/click hotspot 的文案；没有交互时为 null。 */
  hotspot: HotspotText | null;
  /** 当前展示的 hotspot ID，用于在面板中显示模型对象名。 */
  hotspotId: string | null;
  /** 当前展示模式，决定显示 hover short 还是 selected detail。 */
  hotspotMode: 'empty' | 'preview' | 'selected';
}

const props = defineProps<InfoPanelProps>();

const activeDecision = computed(() => props.hotspot?.decision ?? props.app.decisionOverview);

defineEmits<{
  /** 用户点击 Clear selection 时通知 App 清除固定 hotspot。 */
  'clear-selection': [];
  /** 用户请求播放当前 audio guidance transcript。 */
  'play-audio': [audio: AudioGuidanceText];
}>();
</script>
