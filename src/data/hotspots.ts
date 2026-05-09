/**
 * 单个 hotspot 的展示文案结构。
 *
 * 这个类型只描述“写给乘客看的说明文字”，不包含 Three.js 对象、
 * 材质或交互状态。这样后续要翻译或替换文案时，不需要进入 3D 逻辑。
 */
export interface HotspotText {
  /** 信息面板里的标题。 */
  title: string;
  /** hover 时展示的简短说明。 */
  short: string;
  /** click 后固定展示的详细说明。 */
  detail: string;
  /** 说明当前组件帮助乘客完成的现场决策。 */
  decision: RiderDecisionText;
  /** 可选语音导览文案；用于 audio guidance hotspots。 */
  audio?: AudioGuidanceText;
}

/** Rider Decision Panel 展示的单个决策解释。 */
export interface RiderDecisionText {
  /** 这个组件主要帮助乘客确认或选择的事情。 */
  decisionHelped: string;
  /** 乘客使用该组件后能理解的信息。 */
  whatRiderLearns: string;
  /** 乘客接下来可以采取的现场行动。 */
  nextAction: string;
}

/** Audio Guidance hotspot 可播放的本地化语音内容。 */
export interface AudioGuidanceText {
  /** 播放按钮的可见文字。 */
  buttonLabel: string;
  /** 播放按钮的无障碍标签。 */
  ariaLabel: string;
  /** 正在播放时停止按钮的可见文字。 */
  stopButtonLabel: string;
  /** 正在播放时停止按钮的无障碍标签。 */
  stopAriaLabel: string;
  /** 浏览器 SpeechSynthesis 使用的语言代码。 */
  locale: string;
  /** 优先使用的系统语音名称；不可用时自动回退到同语言 voice。 */
  preferredVoiceNames?: string[];
  /** 朗读内容，也作为 transcript 展示。 */
  transcript: string;
  /** 浏览器不支持 speech synthesis 时的 fallback。 */
  unsupportedMessage: string;
}

/**
 * 当前模型和未来模型预计会使用的 hotspot 名称。
 *
 * ThreeScene 仍然会接受任何以 `Hotspot_` 开头的对象名；这个列表主要用于
 * 维护文案和提醒之后新增模型组件时应该补充 metadata。
 */
export const KNOWN_HOTSPOT_IDS = [
  'Hotspot_StopSign_WithEPaper',
  'Hotspot_AudioProvider_StopSign',
  'Hotspot_StopIndicator',
  'Hotspot_AudioProvider_InShelter',
  'Hotspot_BetterKiosk',
  'Hotspot_PrintPanel',
  'Hotspot_MapPanel',
  'Hotspot_EpaperDisplay',
  'Hotspot_QRGuide',
  'Hotspot_TactilePaving',
] as const;

export type KnownHotspotId = (typeof KNOWN_HOTSPOT_IDS)[number];
export type HotspotId = KnownHotspotId | string;

/** i18n 文件中默认 hotspot 文案使用的 key。 */
export const DEFAULT_HOTSPOT_KEY = 'default';

/**
 * 判断一个模型对象名是否应被注册为可交互 hotspot。
 *
 * @param name GLB scene graph 中的对象名称。
 * @returns 如果对象名符合 `Hotspot_` 前缀约定，返回 true。
 */
export function isHotspotName(name: string): boolean {
  return name.startsWith('Hotspot_');
}
