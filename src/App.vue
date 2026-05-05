<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar__identity">
        <p class="eyebrow">{{ appText.eyebrow }}</p>
        <h1>{{ appText.title }}</h1>
        <p>{{ appText.subtitle }}</p>
      </div>

      <div class="topbar__tools">
        <div class="section-switcher" :aria-label="appText.sectionLabel">
          <span class="section-switcher__label">{{ appText.sectionLabel }}</span>
          <nav class="primary-nav" aria-label="Primary navigation">
            <RouterLink to="/">{{ appText.prototypeNav }}</RouterLink>
            <RouterLink to="/about">{{ appText.aboutNav }}</RouterLink>
            <RouterLink to="/credits">{{ appText.creditsNav }}</RouterLink>
            <button type="button" class="guide-button" @click="openGuide">
              {{ appText.guideButton }}
            </button>
          </nav>
        </div>

        <LanguageSwitcher
          :current-language="currentLanguage"
          :languages="languageOptions"
          :label="appText.languageLabel"
          @update:language="setLanguage"
        />
      </div>
    </header>

    <RouterView v-slot="{ Component }">
      <component :is="Component" :current-language="currentLanguage" />
    </RouterView>

    <GuideOverlay v-if="isGuideOpen" :app="appText" @close="closeGuide" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import GuideOverlay from './components/GuideOverlay.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { getAppText, isLanguageAvailable, LANGUAGE_OPTIONS, type Locale } from './i18n';

const guideStorageKey = 'better-stop-guide-dismissed';
const guideStorageValue = 'true';

/** 当前语言；切换时只更新文案，不重新加载 Three.js 模型。 */
const currentLanguage = ref<Locale>('en');
const isGuideOpen = ref(false);

const languageOptions = LANGUAGE_OPTIONS;

/** 当前语言对应的 app shell 文案。 */
const appText = computed(() => getAppText(currentLanguage.value));

onMounted(() => {
  if (!hasSeenGuide()) {
    isGuideOpen.value = true;
  }
});

/** 重新打开首次启动 guide。 */
function openGuide(): void {
  isGuideOpen.value = true;
}

/** 关闭 guide，并记录用户已经看过。 */
function closeGuide(): void {
  rememberGuideSeen();
  isGuideOpen.value = false;
}

/** localStorage 持久记忆，sessionStorage 作为隐私模式或临时会话兜底。 */
function hasSeenGuide(): boolean {
  try {
    return (
      window.localStorage.getItem(guideStorageKey) === guideStorageValue ||
      window.sessionStorage.getItem(guideStorageKey) === guideStorageValue
    );
  } catch {
    return false;
  }
}

/** 记录 guide 已看过；任何一个 storage 写入失败都不影响界面继续使用。 */
function rememberGuideSeen(): void {
  try {
    window.localStorage.setItem(guideStorageKey, guideStorageValue);
    window.sessionStorage.setItem(guideStorageKey, guideStorageValue);
  } catch {
    try {
      window.sessionStorage.setItem(guideStorageKey, guideStorageValue);
    } catch {
      return;
    }
  }
}

/**
 * 切换界面语言。Spanish 目前只作为 coming soon 选项保留，不能进入 currentLanguage。
 *
 * @param nextLanguage 用户请求切换的语言。
 */
function setLanguage(nextLanguage: Locale): void {
  if (!isLanguageAvailable(nextLanguage)) {
    return;
  }

  currentLanguage.value = nextLanguage;
}
</script>
