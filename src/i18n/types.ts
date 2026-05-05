import type { HotspotText } from '../data/hotspots';
import type { ScenarioId } from '../data/scenarios';

export type Locale = 'en' | 'zh' | 'es';

/**
 * App shell 和信息面板使用的 UI 文案。
 *
 * 这里放的是按钮、提示、标题、问题列表等“界面标签”，不是 hotspot 的研究内容。
 */
export interface AppText {
  title: string;
  subtitle: string;
  eyebrow: string;
  instruction: string;
  hotspotPanelTitle: string;
  noHotspotTitle: string;
  noHotspotDetail: string;
  selectedLabel: string;
  previewLabel: string;
  scenarioTitle: string;
  scenarioStatusLabel: string;
  decisionTitle: string;
  decisionQuestions: string[];
  routeChips: string[];
  languageLabel: string;
  clearSelection: string;
}

/**
 * Three.js viewer 相关的短文案。
 *
 * 这些文案会传入 ThreeScene，但 ThreeScene 不直接维护多语言状态；
 * 这样切换语言时不会重新加载模型。
 */
export interface ViewerText {
  loading: string;
  loadError: string;
  dragHint: string;
  resetView: string;
  textureTargetWarning: string;
  textureMissingWarning: string;
}

/** 单个 scenario 在 UI 中展示的名称和解释。 */
export interface ScenarioText {
  label: string;
  description: string;
}

/** rationale section 的完整文案结构。 */
export interface RationaleText {
  eyebrow: string;
  title: string;
  body: string;
  bodyParagraphs?: string[];
  pointsTitle: string;
  points: string[];
}

/**
 * 一个语言包需要提供的完整文案结构。
 *
 * English 语言包必须完整；其他语言可以是 PartialMessages，由 i18n/index.ts
 * 自动 fallback 到 English。
 */
export interface Messages {
  app: AppText;
  viewer: ViewerText;
  scenarios: Record<ScenarioId, ScenarioText>;
  hotspots: Record<string, HotspotText>;
  rationale: RationaleText;
}

/** 语言切换按钮的显示配置。 */
export interface LanguageOption {
  id: Locale;
  shortLabel: string;
  label: string;
  disabled?: boolean;
  disabledHint?: Partial<Record<Locale, string>>;
}

/**
 * 非英文语言包允许只覆盖部分字段。
 *
 * 这种轻量 fallback 策略比引入大型 i18n library 更适合这个静态课程项目。
 */
export type PartialMessages = {
  app?: Partial<AppText>;
  viewer?: Partial<ViewerText>;
  scenarios?: Partial<Record<ScenarioId, Partial<ScenarioText>>>;
  hotspots?: Record<string, Partial<HotspotText>>;
  rationale?: Partial<RationaleText>;
};
