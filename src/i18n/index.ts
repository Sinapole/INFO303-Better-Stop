import { DEFAULT_HOTSPOT_KEY, type HotspotId, type HotspotText } from '../data/hotspots';
import { SCENARIO_IDS, type ScenarioId } from '../data/scenarios';
import { en } from './en';
import { es } from './es';
import { zh } from './zh';
import type {
  AppText,
  LanguageOption,
  Locale,
  PartialMessages,
  RationaleText,
  ScenarioText,
  ViewerText,
} from './types';

export type { Locale } from './types';

/**
 * 所有语言包的注册表。
 *
 * English 是完整基准语言；中文和西语允许缺字段，并通过 getter 函数自动回退。
 */
const localizedMessages: Record<Locale, PartialMessages> = {
  en,
  zh,
  es,
};

/** 页面顶部语言 chips 使用的显示选项。 */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'en', shortLabel: 'EN', label: 'English' },
  { id: 'zh', shortLabel: '中文', label: '中文' },
  { id: 'es', shortLabel: 'ES', label: 'Español' },
];

const englishHotspots = en.hotspots as Record<string, HotspotText>;

/**
 * 获取 app shell 文案，并对数组字段做 English fallback。
 *
 * @param locale 当前语言。
 * @returns 合并后的界面文案。
 */
export function getAppText(locale: Locale): AppText {
  const localized = localizedMessages[locale].app ?? {};

  return {
    ...en.app,
    ...localized,
    decisionQuestions: localized.decisionQuestions ?? en.app.decisionQuestions,
    routeChips: localized.routeChips ?? en.app.routeChips,
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
    ...(localizedMessages[locale].viewer ?? {}),
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
    ...(localizedMessages[locale].scenarios?.[scenarioId] ?? {}),
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
  const localizedHotspot = localizedMessages[locale].hotspots?.[hotspotId] ?? {};

  return {
    ...englishDefault,
    ...englishHotspot,
    ...localizedHotspot,
  };
}

/**
 * 获取 rationale section 文案。
 *
 * @param locale 当前语言。
 * @returns 合并后的 rationale 文案。
 */
export function getRationaleText(locale: Locale): RationaleText {
  const localized = localizedMessages[locale].rationale ?? {};

  return {
    ...en.rationale,
    ...localized,
    points: localized.points ?? en.rationale.points,
  };
}
