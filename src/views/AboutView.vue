<template>
  <main class="about-page document-page">
    <nav class="page-contents" :aria-label="rationaleText.contentsLabel">
      <span>{{ rationaleText.contentsLabel }}</span>
      <button type="button" @click="scrollToSection('about-rationale')">
        {{ rationaleText.title }}
      </button>
      <button type="button" @click="scrollToSection('about-strategy')">
        {{ rationaleText.pointsTitle }}
      </button>
      <button type="button" @click="scrollToSection('about-scope')">
        {{ rationaleText.scopeTitle }}
      </button>
    </nav>

    <p class="page-scroll-cue">{{ rationaleText.scrollCue }}</p>

    <div id="about-rationale" class="document-anchor">
      <RationaleSection :content="rationaleText" />
    </div>

    <section id="about-scope" class="scope-section document-anchor">
      <div class="panel-section-heading">
        <p>{{ rationaleText.scopeTitle }}</p>
      </div>

      <div class="scope-grid">
        <article v-for="point in rationaleText.scopeItems" :key="point" class="scope-item">
          <p>{{ point }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RationaleSection from '../components/RationaleSection.vue';
import { getRationaleText, type Locale, type ThemeMode } from '../i18n';

interface AboutViewProps {
  currentLanguage: Locale;
  themeMode?: ThemeMode;
}

const props = defineProps<AboutViewProps>();

const rationaleText = computed(() => getRationaleText(props.currentLanguage));

/** 在当前文档页内部跳转，避免 hash router 被普通锚点改写。 */
function scrollToSection(sectionId: string): void {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>
