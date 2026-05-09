<template>
  <div
    class="guide-overlay"
    :class="`guide-overlay--target-${currentStep.target}`"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
  >
    <div v-if="ringStyle" class="guide-target-ring" :style="ringStyle" aria-hidden="true" />

    <section class="guide-card" :class="arrowClass" :style="cardStyle">
      <div class="guide-card__meta">
        <span>{{ stepCounterText }}</span>
        <button type="button" class="text-button guide-card__skip" @click="$emit('close')">
          {{ app.guideSkip }}
        </button>
      </div>

      <div class="guide-card__body">
        <h2 :id="titleId">{{ currentStep.title }}</h2>
        <p>{{ currentStep.body }}</p>

        <ul>
          <li v-for="point in currentStep.points" :key="point">
            {{ point }}
          </li>
        </ul>
      </div>

      <div class="guide-card__progress" aria-hidden="true">
        <span
          v-for="(_, index) in app.guideSteps"
          :key="index"
          :class="{ 'guide-card__dot--active': index === currentStepIndex }"
          class="guide-card__dot"
        />
      </div>

      <div class="guide-card__actions">
        <button
          type="button"
          class="text-button"
          :disabled="currentStepIndex === 0"
          @click="previousStep"
        >
          {{ app.guideBack }}
        </button>

        <button type="button" class="text-button text-button--primary" @click="advanceGuide">
          {{ isLastStep ? app.guideStart : app.guideNext }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from 'vue';
import type { AppText, GuideStepTarget } from '../i18n/types';

interface GuideOverlayProps {
  app: AppText;
}

const props = defineProps<GuideOverlayProps>();

const emit = defineEmits<{
  close: [];
}>();

const titleId = 'better-stop-guide-title';
const currentStepIndex = ref(0);
const highlightedRect = ref<DOMRectReadOnly | null>(null);
const viewportSize = ref({ width: window.innerWidth, height: window.innerHeight });

const guideTargetSelectors: Partial<Record<GuideStepTarget, string>> = {
  scene: '.model-region',
  hotspot: '.hotspot-panel',
  decision: '.decision-panel',
  language: '.topbar__tools',
};

const currentStep = computed(() => props.app.guideSteps[currentStepIndex.value]);
const stepCounterText = computed(
  () =>
    `${props.app.guideStepLabel} ${currentStepIndex.value + 1} / ${props.app.guideSteps.length}`,
);
const isLastStep = computed(() => currentStepIndex.value === props.app.guideSteps.length - 1);
const ringStyle = computed<CSSProperties | null>(() => {
  const rect = highlightedRect.value;

  if (!rect) {
    return null;
  }

  const padding = currentStep.value.target === 'language' ? 8 : 6;

  return {
    top: `${Math.max(18, rect.top - padding)}px`,
    left: `${Math.max(18, rect.left - padding)}px`,
    width: `${Math.min(viewportSize.value.width - 36, rect.width + padding * 2)}px`,
    height: `${Math.min(viewportSize.value.height - 36, rect.height + padding * 2)}px`,
  };
});

const cardStyle = computed<CSSProperties>(() => {
  const target = currentStep.value.target;
  const rect = highlightedRect.value;

  if (!isDesktopGuide() || target === 'forestory' || !rect) {
    return {};
  }

  const gap = 28;
  const edge = 36;
  const cardWidth = Math.min(520, viewportSize.value.width - edge * 2);
  const estimatedCardHeight = 430;
  let left: number;
  let top: number;

  if (target === 'language') {
    left = clamp(rect.right - cardWidth, edge, viewportSize.value.width - cardWidth - edge);
    top = clamp(rect.bottom + gap, edge, viewportSize.value.height - estimatedCardHeight - edge);
  } else if (rect.left > viewportSize.value.width - rect.right) {
    left = clamp(rect.left - cardWidth - gap, edge, viewportSize.value.width - cardWidth - edge);
    top = clamp(rect.top, edge, viewportSize.value.height - estimatedCardHeight - edge);
  } else {
    left = clamp(rect.right + gap, edge, viewportSize.value.width - cardWidth - edge);
    top = clamp(rect.top + 28, edge, viewportSize.value.height - estimatedCardHeight - edge);
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `min(520px, calc(100vw - ${edge * 2}px))`,
  };
});

const arrowClass = computed(() => {
  const target = currentStep.value.target;
  const rect = highlightedRect.value;

  if (!isDesktopGuide() || target === 'forestory' || !rect) {
    return 'guide-card--arrow-none';
  }

  if (target === 'language') {
    return 'guide-card--arrow-top';
  }

  const cardLeft = Number.parseFloat(String(cardStyle.value.left ?? '0'));
  return cardLeft < rect.left ? 'guide-card--arrow-right' : 'guide-card--arrow-left';
});

onMounted(() => {
  revealGuideTarget();
  syncGuideTarget();
  window.addEventListener('resize', syncGuideTarget);
  window.addEventListener('scroll', syncGuideTarget, true);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncGuideTarget);
  window.removeEventListener('scroll', syncGuideTarget, true);
});

watch(currentStepIndex, () => {
  void nextTick(() => {
    revealGuideTarget();
    window.requestAnimationFrame(syncGuideTarget);
  });
});

function previousStep(): void {
  currentStepIndex.value = Math.max(0, currentStepIndex.value - 1);
}

function advanceGuide(): void {
  if (isLastStep.value) {
    emit('close');
    return;
  }

  currentStepIndex.value += 1;
}

/** 根据当前 step 的真实 DOM 元素位置更新桌面端 guide 框选区域。 */
function syncGuideTarget(): void {
  viewportSize.value = { width: window.innerWidth, height: window.innerHeight };

  if (!isDesktopGuide()) {
    highlightedRect.value = null;
    return;
  }

  const selector = guideTargetSelectors[currentStep.value.target];

  if (!selector) {
    highlightedRect.value = null;
    return;
  }

  const targetElement = document.querySelector(selector);
  highlightedRect.value = targetElement?.getBoundingClientRect() ?? null;
}

/** 切换步骤时先把目标区域滚进可见范围，再计算 spotlight。 */
function revealGuideTarget(): void {
  if (!isDesktopGuide()) {
    return;
  }

  const selector = guideTargetSelectors[currentStep.value.target];

  if (!selector) {
    return;
  }

  document.querySelector(selector)?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
  });
}

/** 桌面宽度才显示指向式 spotlight；移动端保留居中的说明卡片。 */
function isDesktopGuide(): boolean {
  return window.matchMedia('(min-width: 1081px)').matches;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
</script>
