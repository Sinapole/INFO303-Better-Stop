/**
 * 服务情境的稳定 ID。
 *
 * 这些 ID 不直接展示给用户；展示文本由 i18n 文件提供。保持 ID 稳定可以让
 * 语言切换时不丢失当前 scenario。
 */
export const SCENARIO_IDS = ['normal', 'limited', 'reroute'] as const;

export type ScenarioId = (typeof SCENARIO_IDS)[number];

/**
 * 每个 scenario 对应的动态贴图文件名。
 *
 * 文件实际应放在 `public/textures/`。ThreeScene 会尝试加载这些文件；
 * 如果文件暂时不存在，只在 console warning，不会让页面崩溃。
 */
export interface ScenarioTextureSet {
  /** e-paper 或小型 display 使用的贴图帧。 */
  epaper: string;
  /** kiosk / LCD screen 使用的贴图帧。 */
  kiosk: string;
}

/** 当 `public/textures/` 加入新帧时，在这里改贴图文件名。 */
export const SCENARIO_TEXTURES: Record<ScenarioId, ScenarioTextureSet> = {
  normal: {
    epaper: 'screens/epaper/stop-sign-with-epaper/frame-001.png',
    kiosk: 'screens/kiosk/better-kiosk/frame-001.png',
  },
  limited: {
    epaper: 'screens/epaper/stop-sign-with-epaper/frame-002.png',
    kiosk: 'screens/kiosk/better-kiosk/frame-001.png',
  },
  reroute: {
    epaper: 'screens/epaper/stop-sign-with-epaper/frame-003.png',
    kiosk: 'screens/kiosk/better-kiosk/frame-002.png',
  },
};
