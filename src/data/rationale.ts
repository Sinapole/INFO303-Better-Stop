/**
 * rationale section 中 bullet points 的概念 ID。
 *
 * 当前页面直接从 i18n 文案读取 points 数组；这个列表用于记录内容结构，
 * 方便之后把 rationale 拆成更细的可翻译字段。
 */
export const RATIONALE_POINT_IDS = [
  'prototypeSource',
  'audience',
  'stopFocus',
  'multimodalStrategies',
  'riderArtifact',
  'actionableGuidance',
] as const;

export type RationalePointId = (typeof RATIONALE_POINT_IDS)[number];
