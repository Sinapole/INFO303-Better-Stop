<template>
  <main class="credits-page">
    <section class="credits-section">
      <p class="eyebrow">{{ creditsText.eyebrow }}</p>
      <h2>{{ creditsText.title }}</h2>
      <p>{{ creditsText.body }}</p>

      <div class="credits-grid">
        <article v-for="section in creditsText.sections" :key="section.title" class="credit-item">
          <h3>{{ section.title }}</h3>
          <p>{{ section.body }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getCreditsText, type Locale } from '../i18n';

interface CreditsViewProps {
  currentLanguage: Locale;
}

const props = defineProps<CreditsViewProps>();

const creditsText = computed(() => getCreditsText(props.currentLanguage));
</script>
