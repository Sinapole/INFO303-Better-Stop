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

        <div class="topbar__control-row">
          <LanguageSwitcher
            :current-language="currentLanguage"
            :languages="languageOptions"
            :label="appText.languageLabel"
            @update:language="setLanguage"
          />

          <div class="theme-switcher" :aria-label="appText.themeLabel">
            <span class="theme-switcher__label">{{ appText.themeLabel }}</span>
            <div class="theme-switcher__buttons">
              <button
                type="button"
                class="theme-button"
                :class="{ 'theme-button--active': currentThemePreference === 'auto' }"
                :aria-pressed="currentThemePreference === 'auto'"
                @click="setThemePreference('auto')"
              >
                {{ appText.themeAuto }}
              </button>
              <button
                type="button"
                class="theme-button"
                :class="{ 'theme-button--active': currentThemePreference === 'light' }"
                :aria-pressed="currentThemePreference === 'light'"
                @click="setThemePreference('light')"
              >
                {{ appText.themeLight }}
              </button>
              <button
                type="button"
                class="theme-button"
                :class="{ 'theme-button--active': currentThemePreference === 'dark' }"
                :aria-pressed="currentThemePreference === 'dark'"
                @click="setThemePreference('dark')"
              >
                {{ appText.themeDark }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <RouterView v-slot="{ Component }">
      <component :is="Component" :current-language="currentLanguage" :theme-mode="resolvedTheme" />
    </RouterView>

    <GuideOverlay v-if="isGuideOpen" :app="appText" @close="closeGuide" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import GuideOverlay from './components/GuideOverlay.vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import {
  getAppText,
  isLanguageAvailable,
  LANGUAGE_OPTIONS,
  type Locale,
  type ThemeMode,
  type ThemePreference,
} from './i18n';

const guideStorageKey = 'better-stop-guide-dismissed';
const guideStorageValue = 'true';
const themeStorageKey = 'better-stop-theme';

/** 当前语言；切换时只更新文案，不重新加载 Three.js 模型。 */
const currentLanguage = ref<Locale>('en');
const currentThemePreference = ref<ThemePreference>('auto');
const systemTheme = ref<ThemeMode>('light');
const isGuideOpen = ref(false);
let colorSchemeQuery: MediaQueryList | null = null;
const route = useRoute();
const router = useRouter();

const languageOptions = LANGUAGE_OPTIONS;

/** 当前语言对应的 app shell 文案。 */
const appText = computed(() => getAppText(currentLanguage.value));
/** Auto mode 下跟随系统；手动模式下使用用户选择。 */
const resolvedTheme = computed<ThemeMode>(() =>
  currentThemePreference.value === 'auto' ? systemTheme.value : currentThemePreference.value,
);

onMounted(() => {
  setupSystemThemeListener();
  currentThemePreference.value = resolveInitialThemePreference();

  if (!hasSeenGuide()) {
    isGuideOpen.value = true;
  }
});

onBeforeUnmount(() => {
  colorSchemeQuery?.removeEventListener('change', syncSystemTheme);
});

watch(
  resolvedTheme,
  (theme) => {
    applyTheme(theme);
  },
  { immediate: true },
);

/** 重新打开首次启动 guide。 */
async function openGuide(): Promise<void> {
  if (route.path !== '/') {
    await router.push('/');
  }

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

/**
 * 切换 theme preference。
 *
 * Auto 不写固定 override；Light / Dark 才写入 localStorage。
 *
 * @param nextPreference 用户选择的主题偏好。
 */
function setThemePreference(nextPreference: ThemePreference): void {
  currentThemePreference.value = nextPreference;

  try {
    if (nextPreference === 'auto') {
      window.localStorage.removeItem(themeStorageKey);
      return;
    }

    window.localStorage.setItem(themeStorageKey, nextPreference);
  } catch {
    return;
  }
}

/**
 * 解析首次进入页面时应该使用的主题偏好。
 *
 * localStorage 只保存手动选择；没有保存值时使用 Auto。
 *
 * @returns 可用的主题偏好。
 */
function resolveInitialThemePreference(): ThemePreference {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (storedTheme === 'auto' || storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    return 'auto';
  }

  return 'auto';
}

/** 建立系统主题监听，让 Auto 可以跟随系统变化。 */
function setupSystemThemeListener(): void {
  colorSchemeQuery = window.matchMedia?.('(prefers-color-scheme: dark)') ?? null;
  syncSystemTheme();
  colorSchemeQuery?.addEventListener('change', syncSystemTheme);
}

/** 读取当前系统主题。 */
function syncSystemTheme(): void {
  systemTheme.value = colorSchemeQuery?.matches ? 'dark' : 'light';
}

/**
 * 把主题写到 document root，CSS 通过 `[data-theme]` 切换变量。
 *
 * @param theme 当前主题。
 */
function applyTheme(theme: ThemeMode): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
</script>
