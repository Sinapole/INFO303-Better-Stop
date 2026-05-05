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
