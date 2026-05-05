<template>
  <main class="about-page">
    <RationaleSection :content="rationaleText" />

    <section class="scope-section">
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
import { getRationaleText, type Locale } from '../i18n';

interface AboutViewProps {
  currentLanguage: Locale;
}

const props = defineProps<AboutViewProps>();

const rationaleText = computed(() => getRationaleText(props.currentLanguage));
</script>
