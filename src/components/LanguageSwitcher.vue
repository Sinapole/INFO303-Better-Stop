<template>
  <div class="language-switcher" :aria-label="label">
    <span class="language-switcher__label">{{ label }}</span>
    <div class="language-switcher__chips">
      <span
        v-for="language in languages"
        :key="language.id"
        class="language-chip-wrapper"
        :class="{ 'language-chip-wrapper--disabled': language.disabled }"
        :tabindex="language.disabled ? 0 : undefined"
        :role="language.disabled ? 'button' : undefined"
        :aria-disabled="language.disabled"
        :aria-label="
          language.disabled ? `${language.label}: ${getDisabledHint(language)}` : undefined
        "
      >
        <button
          type="button"
          class="language-chip"
          :class="{
            'language-chip--active': language.id === currentLanguage,
            'language-chip--disabled': language.disabled,
          }"
          :aria-label="language.label"
          :aria-pressed="language.id === currentLanguage"
          :aria-disabled="language.disabled"
          :aria-describedby="language.disabled ? `language-hint-${language.id}` : undefined"
          :disabled="language.disabled"
          :title="language.disabled ? getDisabledHint(language) : language.label"
          @click="handleLanguageClick(language)"
        >
          {{ language.shortLabel }}
        </button>

        <span
          v-if="language.disabled"
          :id="`language-hint-${language.id}`"
          class="language-chip-tooltip"
          role="tooltip"
        >
          {{ getDisabledHint(language) }}
        </span>
      </span>
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

const props = defineProps<LanguageSwitcherProps>();

const emit = defineEmits<{
  /** 用户点击语言 chip 时通知 App 更新 currentLanguage。 */
  'update:language': [language: Locale];
}>();

function handleLanguageClick(language: LanguageOption): void {
  if (language.disabled) {
    return;
  }

  emit('update:language', language.id);
}

function getDisabledHint(language: LanguageOption): string {
  return (
    language.disabledHint?.[props.currentLanguage] ?? language.disabledHint?.en ?? language.label
  );
}
</script>
