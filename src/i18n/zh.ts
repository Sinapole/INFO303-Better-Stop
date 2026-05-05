import type { PartialMessages } from './types';

export const zh = {
  app: {
    title: 'Better Stop',
    subtitle: '面向 MTD 乘客的交互式导视原型',
    eyebrow: 'INFO 303 多模态 Prototype',
    instruction: '悬停或点击组件，了解它如何支持乘客现场做决定。',
    hotspotPanelTitle: '面向乘客的导视组件',
    noHotspotTitle: '探索 Fourth & Peabody 站点',
    noHotspotDetail:
      '通过 3D 模型探索一个 stop-level wayfinding environment。每个 hotspot 都说明这个组件如何把 transit information 转化成乘客可以行动的 guidance。',
    selectedLabel: '已选择组件',
    previewLabel: '组件预览',
    scenarioTitle: '服务情境',
    scenarioStatusLabel: '当前模式',
    decisionTitle: '乘客现场需要回答的问题',
    decisionQuestions: [
      '我现在在哪里？',
      '我需要在哪个 boarding corner 或哪个方向上车？',
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
        '正常服务模式展示这个 proof of concept 在日常出行中的状态：乘客可以确认自己在 Fourth & Peabody，查看下一班车，并在需要更多 actionable guidance 时使用 kiosk 或 QR layer。',
    },
    limited: {
      label: '班次有限',
      description:
        'Limited service 模式展示 stable orientation 和 dynamic updates 的分工。印刷站牌保持稳定易读，e-paper 则提醒乘客某条路线是否只在特定时间运行，或是否只剩少量班次。',
    },
    reroute: {
      label: '绕行 / 警报',
      description:
        '绕行模式说明 stop-level wayfinding 不能只给出警报标签。当正常上车模式发生变化时，动态信息层应该告诉第一次或不常乘车的乘客下一步去哪里。',
    },
  },
  hotspots: {
    default: {
      title: '未标注的站点组件',
      short: '这个模型组件可以在之后继续添加说明。',
      detail:
        '这个 hotspot 已经存在于 3D 模型中，但还没有完整文案。可以在 i18n 文件中补充或修改它的 metadata，说明它如何帮助乘客在现场做导视决策。',
    },
    Hotspot_StopSign_WithEPaper: {
      title: '站牌 + E-paper 显示',
      short: '远距离确认站点，并提供即时服务状态。',
      detail:
        '这个组件把清晰可见的站点标识和小型 e-paper 信息层结合起来。静态站牌帮助乘客确认自己在 Fourth & Peabody，e-paper 则可以显示下一班车、limited-service 提醒、绕行和服务警报。它回答的是乘客最即时的问题：“我是不是在正确的站点？现在发生了什么？”',
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: '让公交站从远处就能被识别。',
      detail:
        'Stop indicator 是这个 rider-facing environment 中的第一层视觉线索。它通过 route badges、MTD identity 和 i-Stop 标记，让乘客在阅读完整地图或时刻表之前先找到候车和上车区域。',
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? 印刷面板',
      short: '为当前站点和附近上车 corner 提供稳定的空间定位。',
      detail:
        '这个印刷面板提供 stable orientation，而不是实时更新。它显示乘客当前所在的 corner、附近地标，以及 Fourth & Peabody 周围其他上车 corner。它也会引导乘客去 kiosk 或 QR code 查看绕行、警报、语言支持和无障碍信息，让印刷层保持稳定、清晰、不过度拥挤。',
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: '提供更深入的路线规划和详细指引。',
      detail:
        'LCD kiosk 把原来的 Better Kiosk research 延展到这个 stop-level prototype 中。它不是把所有信息都塞进印刷站牌，而是在乘客需要更多支持时提供完整路线图、trip planning、语言选项、无障碍设置和更详细的时刻表探索。',
    },
    Hotspot_AudioProvider_StopSign: {
      title: '站牌处语音指引',
      short: '在站点标识附近提供 spoken assistance。',
      detail:
        '语音组件支持无法轻松阅读小字、正在快速扫视站点、或需要 spoken guidance 的乘客。它把无障碍支持连接到实体站点环境，而不只是连接到公交车、app 或单独的网站。',
    },
    Hotspot_AudioProvider_InShelter: {
      title: '候车亭内语音指引',
      short: '在等待区域附近提供 spoken guidance。',
      detail:
        '候车亭内的语音点为等待中的乘客提供另一个获取 spoken information 的位置。它可以重复印刷地图、kiosk 和 QR guide 中的关键指引，而不是要求每个乘客都阅读屏幕。',
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: '通过手机进入实时信息和语言支持。',
      detail:
        'QR guide 把实体站点连接到移动端信息层。它可以提供实时班次、绕行、警报、无障碍信息和语言支持，同时不让印刷面板变得过于拥挤。在这个 prototype 中，界面目前支持 English 和 Chinese，Spanish 作为未来语言选项保留。',
    },
    Hotspot_TactilePaving: {
      title: '无障碍上车区域',
      short: '把导视信息连接到真实的上车空间。',
      detail:
        '触觉铺装标出乘客应该等待和上车的位置。它说明导视不只是标牌和屏幕；实体触觉线索也能帮助乘客把信息转化成现场移动。',
    },
    Hotspot_MapPanel: {
      title: '上车 Corner 地图',
      short: '展示当前站点与附近 corner 和地标的关系。',
      detail:
        '地图面板帮助第一次或不常坐车的乘客把街角位置转化成上车决策。它说明当前 corner、附近的上车方向，以及乘客怎样在 Fourth & Peabody 从“我在哪里”进入“我该往哪里走”。',
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper 显示屏',
      short: '为到站、limited service 和 disruption 提供紧凑的动态状态。',
      detail:
        'E-paper 显示屏是轻量的 dynamic update layer。它可以在正常到站、limited-service 提醒和绕行警报之间切换，而不要求每个乘客先打开手机或搜索完整系统地图。',
    },
  },
  rationale: {
    eyebrow: '为什么做这个 prototype',
    title: '项目说明',
    body: '这个项目是为 INFO 303 创作的 multimodal prototype，基于之前的 Better Kiosk / MTD wayfinding research。',
    bodyParagraphs: [
      '这个项目是为 INFO 303 创作的 multimodal prototype，基于之前的 Better Kiosk / MTD wayfinding research。它不是完整公交网络 redesign，也不是专业 design book，而是聚焦 Fourth & Peabody 这一个被重新设计的 stop。这个 prototype 关注公交站如何帮助乘客在现场做决定：他们在哪里、需要哪个 boarding corner、在哪里查看绕行和警报，以及如何获得语言或无障碍支持。',
      '这个 prototype 把信息分配到不同层级。印刷地图面板提供 stable orientation。E-paper display 传达即时更新，例如到站、绕行、警报和 limited-service warnings。Better Kiosk LCD 支持更深入的路线规划。QR 和 audio access 提供额外支持，同时避免把所有内容都挤进印刷站牌。',
      '这个项目聚焦一个 audience：UIUC 附近 first-time and occasional MTD riders。这个范围让 artifact 保持 rider-facing，而不是同时分散给乘客、设计师和机构 stakeholders。',
    ],
    pointsTitle: '多模态策略',
    points: [
      'Better Stop 是面向 MTD 乘客的 interactive wayfinding prototype。',
      '它用一个 redesigned stop 作为 proof of concept，展示 rider-facing wayfinding environment。',
      'Physical signage、printed maps、e-paper updates、kiosk support、QR access、audio guidance 和 tactile cues 在乘客需要做决定的时刻协同工作。',
      '设计目的不是展示更多信息，而是把 transit information 转换成 actionable guidance。',
      '界面目前支持 English 和 Chinese，Spanish 作为未来语言选项保留。',
    ],
  },
} satisfies PartialMessages;
