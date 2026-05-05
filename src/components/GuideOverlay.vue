<template>
  <div
    class="guide-overlay"
    :class="`guide-overlay--target-${currentStep.target}`"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
  >
    <div class="guide-target-ring" aria-hidden="true" />

    <section class="guide-card">
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
import { computed, ref } from 'vue';
import type { AppText } from '../i18n/types';

interface GuideOverlayProps {
  app: AppText;
}

const props = defineProps<GuideOverlayProps>();

const emit = defineEmits<{
  close: [];
}>();

const titleId = 'better-stop-guide-title';
const currentStepIndex = ref(0);

const currentStep = computed(() => props.app.guideSteps[currentStepIndex.value]);
const stepCounterText = computed(
  () =>
    `${props.app.guideStepLabel} ${currentStepIndex.value + 1} / ${props.app.guideSteps.length}`,
);
const isLastStep = computed(() => currentStepIndex.value === props.app.guideSteps.length - 1);

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
</script>
