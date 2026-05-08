import { DEFAULT_HOTSPOT_KEY, type HotspotId, type HotspotText } from '../data/hotspots';
import { SCENARIO_IDS, type ScenarioId } from '../data/scenarios';
import { en } from './en';
import { es } from './es';
import { zh } from './zh';
import type {
  AppText,
  CreditsText,
  LanguageOption,
  Locale,
  PartialMessages,
  RationaleText,
  ScenarioText,
  ViewerText,
} from './types';

export type { Locale, ThemeMode, ThemePreference } from './types';

/**
 * 所有语言包的注册表。
 *
 * English 是完整基准语言；中文允许缺字段，并通过 getter 函数自动回退。
 * Spanish 文件暂时保留为 future placeholder，但 UI 不允许切换到 es。
 */
const localizedMessages: Record<Locale, PartialMessages> = {
  en,
  zh,
  es,
};

/** 当前真正可用的界面语言。Spanish 暂时只作为 disabled 选项展示。 */
export const AVAILABLE_LOCALES: Locale[] = ['en', 'zh'];

/** 页面顶部语言 chips 使用的显示选项。 */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'en', shortLabel: 'EN', label: 'English' },
  { id: 'zh', shortLabel: '中文', label: '中文' },
  {
    id: 'es',
    shortLabel: 'ES',
    label: 'Español',
    disabled: true,
    disabledHint: {
      en: 'Español próximamente.',
      zh: 'Español próximamente.',
      es: 'Español próximamente.',
    },
  },
];

const englishHotspots = en.hotspots as Record<string, HotspotText>;

/**
 * 判断某个 locale 目前是否允许作为 currentLanguage。
 *
 * @param locale 待切换的语言 ID。
 * @returns 当前 UI 是否允许切换。
 */
export function isLanguageAvailable(locale: Locale): boolean {
  return AVAILABLE_LOCALES.includes(locale);
}

/**
 * 获取当前可用语言包。不可用语言统一回退到 English，避免 ES placeholder
 * 被当作可用界面语言。
 *
 * @param locale 请求的语言 ID。
 * @returns 可用于文案合并的语言包。
 */
function getLocalizedMessages(locale: Locale): PartialMessages {
  return localizedMessages[isLanguageAvailable(locale) ? locale : 'en'];
}

/**
 * 获取 app shell 文案，并对数组字段做 English fallback。
 *
 * @param locale 当前语言。
 * @returns 合并后的界面文案。
 */
export function getAppText(locale: Locale): AppText {
  const localized = getLocalizedMessages(locale).app ?? {};

  return {
    ...en.app,
    ...localized,
    decisionFieldLabels: localized.decisionFieldLabels ?? en.app.decisionFieldLabels,
    decisionOverview: localized.decisionOverview ?? en.app.decisionOverview,
    guideSteps: localized.guideSteps ?? en.app.guideSteps,
  };
}

/**
 * 获取 3D viewer 文案。
 *
 * @param locale 当前语言。
 * @returns 合并后的 viewer 文案。
 */
export function getViewerText(locale: Locale): ViewerText {
  return {
    ...en.viewer,
    ...(getLocalizedMessages(locale).viewer ?? {}),
  };
}

/**
 * 获取单个 scenario 的本地化文案。
 *
 * @param locale 当前语言。
 * @param scenarioId scenario 稳定 ID。
 * @returns scenario 的 label 和 description。
 */
export function getScenarioText(locale: Locale, scenarioId: ScenarioId): ScenarioText {
  return {
    ...en.scenarios[scenarioId],
    ...(getLocalizedMessages(locale).scenarios?.[scenarioId] ?? {}),
  };
}

/**
 * 获取所有 scenario 的本地化文案。
 *
 * 这个 helper 当前不是 App 的必需依赖，但保留它可以方便之后添加 summary
 * 或 scenario legend。
 *
 * @param locale 当前语言。
 * @returns 以 scenario ID 为 key 的文案表。
 */
export function getScenarioTexts(locale: Locale): Record<ScenarioId, ScenarioText> {
  return SCENARIO_IDS.reduce(
    (texts, scenarioId) => {
      texts[scenarioId] = getScenarioText(locale, scenarioId);
      return texts;
    },
    {} as Record<ScenarioId, ScenarioText>,
  );
}

/**
 * 获取 hotspot 文案，并处理缺失 metadata 的情况。
 *
 * @param locale 当前语言。
 * @param hotspotId GLB 中发现的 hotspot 对象名。
 * @returns 对应 hotspot 的 title / short / detail；缺失时回退到 default。
 */
export function getHotspotText(locale: Locale, hotspotId: HotspotId): HotspotText {
  const englishDefault = englishHotspots[DEFAULT_HOTSPOT_KEY];
  const englishHotspot = englishHotspots[hotspotId] ?? englishDefault;
  const localizedHotspot = getLocalizedMessages(locale).hotspots?.[hotspotId] ?? {};
  const audio = englishHotspot.audio
    ? {
        ...englishHotspot.audio,
        ...localizedHotspot.audio,
      }
    : undefined;

  return {
    ...englishDefault,
    ...englishHotspot,
    ...localizedHotspot,
    decision: {
      ...englishDefault.decision,
      ...englishHotspot.decision,
      ...localizedHotspot.decision,
    },
    audio,
  };
}

/**
 * 获取 rationale section 文案。
 *
 * @param locale 当前语言。
 * @returns 合并后的 rationale 文案。
 */
export function getRationaleText(locale: Locale): RationaleText {
  const localized = getLocalizedMessages(locale).rationale ?? {};

  return {
    ...en.rationale,
    ...localized,
    bodyParagraphs: localized.bodyParagraphs ?? en.rationale.bodyParagraphs,
    points: localized.points ?? en.rationale.points,
    scopeItems: localized.scopeItems ?? en.rationale.scopeItems,
  };
}

/**
 * 获取 credits 页面文案。
 *
 * @param locale 当前语言。
 * @returns 合并后的 credits 文案。
 */
export function getCreditsText(locale: Locale): CreditsText {
  const localized = getLocalizedMessages(locale).credits ?? {};

  return {
    ...en.credits,
    ...localized,
    sections: localized.sections ?? en.credits.sections,
  };
}
