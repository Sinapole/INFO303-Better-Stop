/**
 * 可播放假帧动画的屏幕类型。
 *
 * 这里和 ThreeScene 里识别到的 display target role 保持一致，避免用纯字符串到处判断。
 */
export type ScreenAnimationRole = 'epaper' | 'kiosk';

/**
 * 单个屏幕假帧动画的配置。
 *
 * 所有 frame 路径都相对于 `public/textures/`。如果之后想调频率，只改
 * `intervalMs`；如果想换素材，只改 `frames`，不需要进入 Three.js 逻辑。
 */
export interface ScreenAnimationConfig {
  /** 配置 ID，主要用于 console warning 和之后调试。 */
  id: string;
  /** 目标屏幕类型，例如 e-paper 或 kiosk。 */
  role: ScreenAnimationRole;
  /** 用模型对象名匹配目标 mesh；全部关键词都命中才会应用。 */
  labelIncludes: string[];
  /** 每帧贴图相对 `public/textures/` 的路径。 */
  frames: string[];
  /** 可选刷新帧；用于 e-paper 更新前的短暂闪烁效果。 */
  refreshFrame?: string;
  /** 刷新帧停留时间，单位毫秒。 */
  refreshDurationMs?: number;
  /** 切换到下一帧的间隔，单位毫秒。 */
  intervalMs: number;
}

/** Stop sign 上的 e-paper 假帧：慢一些，模拟现场电子纸信息轮换。 */
const stopSignEpaperFrames = [
  'screens/epaper/stop-sign-with-epaper/frame-001.png',
  'screens/epaper/stop-sign-with-epaper/frame-003.png',
];

/** E-paper 刷新帧：每次切换内容前短暂闪一下，不作为普通内容帧轮播。 */
const stopSignEpaperRefreshFrame = 'screens/epaper/stop-sign-with-epaper/frame-002.png';

/** Better Kiosk 假帧：屏幕内容更复杂，所以用更快的轮换展示交互感。 */
const betterKioskFrames = [
  'screens/kiosk/better-kiosk/frame-001.png',
  'screens/kiosk/better-kiosk/frame-002.png',
];

/** 当前 prototype 的屏幕假帧动画配置。 */
export const SCREEN_ANIMATIONS: ScreenAnimationConfig[] = [
  {
    id: 'stop-sign-with-epaper',
    role: 'epaper',
    labelIncludes: ['hotspot_stopsign_withepaper'],
    frames: stopSignEpaperFrames,
    refreshFrame: stopSignEpaperRefreshFrame,
    refreshDurationMs: 650,
    intervalMs: 20_000,
  },
  {
    id: 'better-kiosk',
    role: 'kiosk',
    labelIncludes: ['hotspot_betterkiosk'],
    frames: betterKioskFrames,
    intervalMs: 10_000,
  },
];
