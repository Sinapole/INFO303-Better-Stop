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
    </section>

    <slot />

    <section class="decision-panel">
      <div class="panel-section-heading">
        <p>{{ app.decisionTitle }}</p>
      </div>

      <ol class="decision-list">
        <li v-for="question in app.decisionQuestions" :key="question">
          {{ question }}
        </li>
      </ol>
    </section>
  </aside>
</template>

<script setup lang="ts">
import type { HotspotText } from '../data/hotspots';
import type { ScenarioId } from '../data/scenarios';
import type { AppText, ScenarioText } from '../i18n/types';

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
  /** 当前 scenario 文案，保留在 props 中方便之后扩展面板摘要。 */
  scenario: ScenarioText;
  /** 当前 scenario ID，保留在 props 中方便之后扩展状态样式。 */
  scenarioId: ScenarioId;
}

defineProps<InfoPanelProps>();

defineEmits<{
  /** 用户点击 Clear selection 时通知 App 清除固定 hotspot。 */
  'clear-selection': [];
}>();
</script>
