<template>
  <div class="language-switcher" :aria-label="label">
    <span class="language-switcher__label">{{ label }}</span>
    <div class="language-switcher__chips">
      <button
        v-for="language in languages"
        :key="language.id"
        type="button"
        class="language-chip"
        :class="{ 'language-chip--active': language.id === currentLanguage }"
        :aria-label="language.label"
        :aria-pressed="language.id === currentLanguage"
        @click="$emit('update:language', language.id)"
      >
        {{ language.shortLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LanguageOption, Locale } from '../i18n/types';

/** LanguageSwitcher 只负责 UI，不维护语言状态。 */
interface LanguageSwitcherProps {
  /** 当前激活语言，用于设置 active chip 和 aria-pressed。 */
  currentLanguage: Locale;
  /** 可选语言列表，来自 i18n/index.ts。 */
  languages: LanguageOption[];
  /** 语言切换区域的本地化 label。 */
  label: string;
}

defineProps<LanguageSwitcherProps>();

defineEmits<{
  /** 用户点击语言 chip 时通知 App 更新 currentLanguage。 */
  'update:language': [language: Locale];
}>();
</script>
