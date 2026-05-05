<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar__identity">
        <p class="eyebrow">{{ appText.eyebrow }}</p>
        <h1>{{ appText.title }}</h1>
        <p>{{ appText.subtitle }}</p>
      </div>

      <div class="topbar__tools">
        <div class="route-chip-group" aria-label="Stop context">
          <span v-for="chip in appText.routeChips" :key="chip" class="route-chip">
            {{ chip }}
          </span>
        </div>

        <LanguageSwitcher
          :current-language="currentLanguage"
          :languages="languageOptions"
          :label="appText.languageLabel"
          @update:language="currentLanguage = $event"
        />
      </div>
    </header>

    <main class="workspace-grid">
      <section class="model-region">
        <ThreeScene
          :labels="viewerText"
          :scenario-id="activeScenario"
          :selected-hotspot-id="selectedHotspotId"
          @hotspot-hover="hoveredHotspotId = $event"
          @hotspot-select="selectHotspot"
        />
      </section>

      <InfoPanel
        :app="appText"
        :hotspot="visibleHotspotText"
        :hotspot-id="visibleHotspotId"
        :hotspot-mode="hotspotMode"
        :scenario="activeScenarioText"
        :scenario-id="activeScenario"
        @clear-selection="clearSelection"
      >
        <ScenarioControls
          :title="appText.scenarioTitle"
          :status-label="appText.scenarioStatusLabel"
          :options="scenarioOptions"
          :active-scenario-id="activeScenario"
          :active-scenario-text="activeScenarioText"
          @update:scenario="activeScenario = $event"
        />
      </InfoPanel>
    </main>

    <RationaleSection :content="rationaleText" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import InfoPanel from './components/InfoPanel.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import RationaleSection from './components/RationaleSection.vue';
import ScenarioControls from './components/ScenarioControls.vue';
import ThreeScene from './components/ThreeScene.vue';
import type { HotspotId } from './data/hotspots';
import { SCENARIO_IDS, type ScenarioId } from './data/scenarios';
import {
  getAppText,
  getHotspotText,
  getRationaleText,
  getScenarioText,
  getViewerText,
  LANGUAGE_OPTIONS,
  type Locale,
} from './i18n';

/** 信息面板当前展示状态：空状态、hover 预览、click 固定选择。 */
type HotspotMode = 'empty' | 'preview' | 'selected';

/** 当前语言；切换时只更新文案，不重新加载 Three.js 模型。 */
const currentLanguage = ref<Locale>('en');
/** 当前服务情境；切换时触发 ThreeScene 尝试替换 display 贴图。 */
const activeScenario = ref<ScenarioId>('normal');
/** 鼠标当前悬停的 hotspot ID；优先级高于已选中 hotspot。 */
const hoveredHotspotId = ref<HotspotId | null>(null);
/** 点击后固定在信息面板里的 hotspot ID。 */
const selectedHotspotId = ref<HotspotId | null>(null);

const languageOptions = LANGUAGE_OPTIONS;

/** 当前语言对应的 app shell 文案。 */
const appText = computed(() => getAppText(currentLanguage.value));
/** 当前语言对应的 viewer 提示文案。 */
const viewerText = computed(() => getViewerText(currentLanguage.value));
/** 当前语言对应的 rationale section 文案。 */
const rationaleText = computed(() => getRationaleText(currentLanguage.value));
/** 当前 scenario 在当前语言下的 label 和说明。 */
const activeScenarioText = computed(() =>
  getScenarioText(currentLanguage.value, activeScenario.value),
);

/** scenario 按钮选项；ID 稳定，label 随语言变化。 */
const scenarioOptions = computed(() =>
  SCENARIO_IDS.map((id) => ({
    id,
    label: getScenarioText(currentLanguage.value, id).label,
  })),
);

/** 信息面板实际应展示的 hotspot：hover 优先，其次为 click 选择。 */
const visibleHotspotId = computed(() => hoveredHotspotId.value ?? selectedHotspotId.value);
/** 根据当前语言和 visibleHotspotId 解析文案，缺失时由 i18n 层 fallback。 */
const visibleHotspotText = computed(() =>
  visibleHotspotId.value ? getHotspotText(currentLanguage.value, visibleHotspotId.value) : null,
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

/**
 * 固定用户点击的 hotspot。
 *
 * @param hotspotId ThreeScene 通过 raycast 识别出的 hotspot 对象名。
 */
function selectHotspot(hotspotId: HotspotId): void {
  selectedHotspotId.value = hotspotId;
}

/** 清除固定选择，回到 hover 或默认说明。 */
function clearSelection(): void {
  selectedHotspotId.value = null;
}
</script>
