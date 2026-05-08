import type { AudioGuidanceText, HotspotText, RiderDecisionText } from '../data/hotspots';
import type { ScenarioId } from '../data/scenarios';

export type Locale = 'en' | 'zh' | 'es';
export type ThemeMode = 'light' | 'dark';
export type ThemePreference = 'auto' | ThemeMode;

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
  sectionLabel: string;
  prototypeNav: string;
  aboutNav: string;
  creditsNav: string;
  hotspotPanelTitle: string;
  noHotspotTitle: string;
  noHotspotDetail: string;
  selectedLabel: string;
  previewLabel: string;
  decisionTitle: string;
  decisionFieldLabels: RiderDecisionText;
  decisionOverview: RiderDecisionText;
  languageLabel: string;
  themeLabel: string;
  themeAuto: string;
  themeLight: string;
  themeDark: string;
  clearSelection: string;
  guideButton: string;
  guideNext: string;
  guideBack: string;
  guideSkip: string;
  guideStart: string;
  guideStepLabel: string;
  guideSteps: GuideStepText[];
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
  contentsLabel: string;
  scrollCue: string;
  pointsTitle: string;
  points: string[];
  scopeTitle: string;
  scopeItems: string[];
}

/** Credits 页面的一条外部链接。 */
export interface CreditLinkText {
  label: string;
  url: string;
}

/** Credits 页面的一组引用、素材或实现说明。 */
export interface CreditSectionText {
  title: string;
  body: string;
  links?: CreditLinkText[];
}

/** Credits 页面使用的引用和素材文案。 */
export interface CreditsText {
  eyebrow: string;
  title: string;
  body: string;
  contentsLabel: string;
  scrollCue: string;
  sections: CreditSectionText[];
}

/** 首次启动 guide overlay 的单步文案。 */
export interface GuideStepText {
  title: string;
  body: string;
  points: string[];
  target: GuideStepTarget;
}

export type GuideStepTarget = 'forestory' | 'scene' | 'hotspot' | 'decision' | 'language';

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
  credits: CreditsText;
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
  hotspots?: Record<
    string,
    Partial<Omit<HotspotText, 'decision'>> & {
      decision?: Partial<RiderDecisionText>;
      audio?: Partial<AudioGuidanceText>;
    }
  >;
  rationale?: Partial<RationaleText>;
  credits?: Partial<CreditsText>;
};
