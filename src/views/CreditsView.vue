<template>
  <main class="credits-page document-page">
    <nav class="page-contents" :aria-label="creditsText.contentsLabel">
      <span>{{ creditsText.contentsLabel }}</span>
      <button
        v-for="(section, index) in creditsText.sections"
        :key="section.title"
        type="button"
        @click="scrollToSection(creditSectionId(index))"
      >
        {{ section.title }}
      </button>
    </nav>

    <p class="page-scroll-cue">{{ creditsText.scrollCue }}</p>

    <section class="credits-section">
      <p class="eyebrow">{{ creditsText.eyebrow }}</p>
      <h2>{{ creditsText.title }}</h2>
      <p>{{ creditsText.body }}</p>

      <div class="credits-grid">
        <article
          v-for="(section, index) in creditsText.sections"
          :id="creditSectionId(index)"
          :key="section.title"
          class="credit-item document-anchor"
        >
          <h3>{{ section.title }}</h3>
          <p>{{ section.body }}</p>

          <ul v-if="section.links?.length" class="credit-links" :aria-label="section.title">
            <li v-for="link in section.links" :key="link.url">
              <a :href="link.url" target="_blank" rel="noreferrer">
                <span>{{ link.label }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getCreditsText, type Locale, type ThemeMode } from '../i18n';

interface CreditsViewProps {
  currentLanguage: Locale;
  themeMode?: ThemeMode;
}

const props = defineProps<CreditsViewProps>();

const creditsText = computed(() => getCreditsText(props.currentLanguage));

/** Credits section 的稳定 DOM ID，用于页面内滚动。 */
function creditSectionId(index: number): string {
  return `credit-section-${index}`;
}

/** 在当前 Credits 页面内部跳转，不改 hash router。 */
function scrollToSection(sectionId: string): void {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>
