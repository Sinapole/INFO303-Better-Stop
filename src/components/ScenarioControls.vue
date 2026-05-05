<template>
  <section class="scenario-controls" :aria-label="title">
    <div class="panel-section-heading">
      <p>{{ title }}</p>
      <span>{{ statusLabel }}: {{ activeScenarioText.label }}</span>
    </div>

    <div class="scenario-controls__buttons">
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        class="scenario-button"
        :class="{ 'scenario-button--active': option.id === activeScenarioId }"
        :data-scenario="option.id"
        :aria-pressed="option.id === activeScenarioId"
        @click="$emit('update:scenario', option.id)"
      >
        {{ option.label }}
      </button>
    </div>

    <p class="scenario-controls__description">
      {{ activeScenarioText.description }}
    </p>
  </section>
</template>

<script setup lang="ts">
import type { ScenarioId } from '../data/scenarios';
import type { ScenarioText } from '../i18n/types';

/** ScenarioControls 只展示和切换服务情境，具体贴图替换由 ThreeScene 处理。 */
interface ScenarioControlsProps {
  /** 区块标题，例如 Service Scenario。 */
  title: string;
  /** 当前模式标签，例如 Current mode。 */
  statusLabel: string;
  /** 三个 scenario 按钮；ID 稳定，label 已经由 App 本地化。 */
  options: Array<{
    id: ScenarioId;
    label: string;
  }>;
  /** 当前激活的 scenario ID。 */
  activeScenarioId: ScenarioId;
  /** 当前 scenario 的完整本地化文案。 */
  activeScenarioText: ScenarioText;
}

defineProps<ScenarioControlsProps>();

defineEmits<{
  /** 用户切换 scenario 时，把稳定 ID 传回 App。 */
  'update:scenario': [scenarioId: ScenarioId];
}>();
</script>
