import type { PartialMessages } from './types';

export const zh = {
  app: {
    title: 'Better Stop',
    subtitle: '面向 MTD 乘客的交互式导视 remix',
    eyebrow: 'INFO 303 多模态 Remix',
    instruction: '悬停或点击组件，了解它如何帮助乘客做决定。',
    hotspotPanelTitle: '站点层级组件',
    noHotspotTitle: '探索 Fourth & Peabody 站点',
    noHotspotDetail: '在 3D 模型中悬停一个组件，然后点击它，就可以把详细说明固定在这里。',
    selectedLabel: '已选择组件',
    previewLabel: '悬停预览',
    scenarioTitle: '服务情境',
    scenarioStatusLabel: '当前模式',
    decisionTitle: '乘客需要回答的问题',
    decisionQuestions: [
      '我现在在哪里？',
      '我应该在哪个 corner 或哪个方向上车？',
      '如果有绕行、警报、limited service 或准确到站时间，我应该去哪里看？',
      '如果我需要语言帮助、无障碍帮助或语音提示，应该怎么获取？',
    ],
    routeChips: ['Fourth & Peabody', 'MTD', 'i-Stop', 'UIUC'],
    languageLabel: '语言',
    clearSelection: '取消固定',
  },
  viewer: {
    loading: '正在加载 3D 站点模型...',
    loadError: '3D 模型无法加载。',
    dragHint: '拖动旋转，滚轮或双指缩放。',
    resetView: '重置视角',
    textureTargetWarning: '没有找到可替换贴图的 e-paper、display、screen 或 kiosk mesh。',
    textureMissingWarning: '没有找到该情境的贴图文件，已继续使用原始材质。',
  },
  scenarios: {
    normal: {
      label: '正常服务',
      description:
        '正常服务模式展示站点按预期运行：乘客可以确认自己在正确的站点，查看下一班车，并通过 kiosk 或 QR code 获取更多信息。',
    },
    limited: {
      label: '班次有限',
      description:
        'Limited service 模式说明：一条路线存在，并不等于它此刻可用。显示层应该提醒乘客这条路线是否只在特定时间运行，或是否只剩少量班次。',
    },
    reroute: {
      label: '绕行 / 警报',
      description:
        '绕行模式说明动态信息为什么重要。当正常上车模式发生变化时，系统应该告诉乘客下一步去哪里，而不只是告诉他们“有变化”。',
    },
  },
  hotspots: {
    default: {
      title: '未标注的站点组件',
      short: '这个模型组件可以在之后继续添加说明。',
      detail:
        '这个 hotspot 已经存在于 3D 模型中，但还没有完整文案。你可以在 i18n 文件中补充或修改它的 metadata，说明它如何帮助乘客做导视决策。',
    },
    Hotspot_StopSign_WithEPaper: {
      title: '站牌 + E-paper 显示',
      short: '远距离确认站点，并提供即时服务状态。',
      detail:
        '这个组件把清晰可见的站点标识和小型 e-paper 信息层结合起来。静态站牌帮助乘客确认自己在正确的站点，e-paper 则可以显示下一班车、limited-service 提醒、绕行和服务警报。它回答的是乘客最即时的问题：“我是不是在正确的站点？现在发生了什么？”',
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: '让公交站从远处就能被识别。',
      detail:
        'Stop indicator 是环境中的第一层视觉线索。它通过 route badges、MTD identity 和 i-Stop 标记，让乘客在阅读详细信息之前先找到候车和上车区域。',
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? 印刷面板',
      short: '为当前站点和附近上车 corner 提供稳定的空间定位。',
      detail:
        '这个印刷面板优先处理空间定位，而不是实时到站。它显示乘客当前所在的 corner、附近地标，以及 Fourth & Peabody 周围其他上车 corner。它也会引导乘客去 kiosk 或 QR code 查看绕行、警报、语言支持和无障碍信息。这样印刷层保持稳定、清晰、易读。',
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: '提供更深入的路线规划和详细指引。',
      detail:
        'LCD kiosk 延续了原来的 Better Kiosk 概念。它不是把所有信息都塞进印刷站牌，而是支持更深层的互动：完整路线图、trip planning、语言选项、无障碍设置和更详细的时刻表探索。',
    },
    Hotspot_AudioProvider_StopSign: {
      title: '站牌处语音指引',
      short: '在站点标识附近提供 spoken assistance。',
      detail:
        '语音组件支持无法轻松阅读小字、或需要 spoken guidance 的乘客。它把无障碍帮助连接到实体站点环境，而不只是连接到公交车或手机 app。',
    },
    Hotspot_AudioProvider_InShelter: {
      title: '候车亭内语音指引',
      short: '在等待区域附近提供 spoken guidance。',
      detail:
        '候车亭内的语音点为等待中的乘客提供另一个获取 spoken information 的位置。它可以和印刷地图、kiosk 以及 QR guide 配合使用。',
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: '通过手机进入实时信息和语言支持。',
      detail:
        'QR guide 把实体站点连接到移动端信息层。它可以提供实时班次、绕行、警报、无障碍信息和多语言支持，同时不让印刷面板变得过于拥挤。',
    },
    Hotspot_TactilePaving: {
      title: '无障碍上车区域',
      short: '把导视信息连接到真实的上车空间。',
      detail:
        '触觉铺装标出乘客应该等待和上车的位置。它说明导视不只是标牌和屏幕，也包括信息如何连接到人在空间中的移动。',
    },
    Hotspot_MapPanel: {
      title: '上车 Corner 地图',
      short: '展示当前站点与附近 corner 和地标的关系。',
      detail:
        '地图面板帮助第一次乘车的乘客把街角位置转化成上车决策。它应该说明当前 corner、附近的上车方向，以及乘客怎样从“我在哪里”进入“我该往哪里走”。',
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper 显示屏',
      short: '为到站、limited service 和 disruption 提供紧凑的动态状态。',
      detail:
        'E-paper 显示屏是轻量的动态信息层。它可以在正常到站、limited-service 提醒和绕行警报之间切换，而不要求每个乘客先打开手机。',
    },
  },
  rationale: {
    eyebrow: '为什么做这个 artifact',
    title: '项目说明',
    body: '这个项目把我之前的 Better Kiosk 研究 remix 成一个面向乘客的站点原型。它不是完整 transit network，也不是给专业设计师看的 design book，而是聚焦一个具体站点，作为 proof-of-concept。3D 模型和交互网站让观众看到：实体标识、印刷地图、e-paper 更新、LCD kiosk、QR access、语音指引和触觉铺装如何在乘客需要做决定的时刻协同工作。',
    pointsTitle: '多模态策略',
    points: [
      '目标受众是 UIUC 附近第一次或不常坐 MTD 的乘客。',
      '项目聚焦 Fourth & Peabody 这个站点，而不是整个公交网络。',
      '多模态策略包括 3D model、printed map panel、e-paper display、LCD kiosk、QR guide、audio guidance 和 tactile paving。',
      '我没有做 design book，因为这个 artifact 的 audience 是乘客，不是 professional designers。',
      '设计目的不是展示更多信息，而是把 transit information 转换成 actionable guidance。',
    ],
  },
} satisfies PartialMessages;
