<template>
  <section class="rationale-section">
    <div class="rationale-section__intro">
      <p class="eyebrow">{{ content.eyebrow }}</p>
      <h2>{{ content.title }}</h2>
      <p v-for="paragraph in bodyParagraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>

    <div class="rationale-section__points">
      <div class="panel-section-heading">
        <p>{{ content.pointsTitle }}</p>
      </div>
      <ul>
        <li v-for="point in content.points" :key="point">
          {{ point }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RationaleText } from '../i18n/types';

/** RationaleSection 展示项目说明；所有正文都来自 i18n 数据。 */
interface RationaleSectionProps {
  /** 当前语言下的 rationale 标题、正文和 bullet points。 */
  content: RationaleText;
}

const props = defineProps<RationaleSectionProps>();

const bodyParagraphs = computed(() => props.content.bodyParagraphs ?? [props.content.body]);
</script>
