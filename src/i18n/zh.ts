import type { PartialMessages } from './types';

export const zh = {
  app: {
    title: 'Better Stop',
    subtitle: '面向 MTD 乘客的交互式导视原型',
    eyebrow: 'INFO 303 多模态 Prototype',
    instruction: '悬停或点击组件，了解它如何支持乘客现场做决定。',
    sectionLabel: 'Section',
    prototypeNav: 'Prototype',
    aboutNav: 'About',
    hotspotPanelTitle: '面向乘客的导视组件',
    noHotspotTitle: '探索 Fourth & Peabody 站点',
    noHotspotDetail:
      '通过 3D 模型探索一个 stop-level wayfinding environment。每个 hotspot 都说明这个组件如何把 transit information 转化成乘客可以行动的 guidance。',
    selectedLabel: '已选择组件',
    previewLabel: '组件预览',
    decisionTitle: 'Rider Decision Panel',
    decisionFieldLabels: {
      decisionHelped: '帮助的决定',
      whatRiderLearns: '乘客能理解什么',
      nextAction: '下一步行动',
    },
    decisionOverview: {
      decisionHelped: '形成 stop-level wayfinding 路径',
      whatRiderLearns:
        '实体站牌、印刷地图、e-paper、kiosk、QR guide、语音点和触觉铺装共同说明乘客在哪里、哪些信息是稳定的、哪些信息会实时变化，以及哪里可以获得支持。',
      nextAction:
        '悬停或点击一个 hotspot，查看某个组件如何支持 Fourth & Peabody 现场的具体乘车决定。',
    },
    languageLabel: '语言',
    clearSelection: '取消固定',
    guideButton: 'Guide',
    guideNext: 'Next',
    guideBack: 'Back',
    guideSkip: 'Skip',
    guideStart: 'Start exploring',
    guideStepLabel: 'Step',
    guideSteps: [
      {
        title: 'Project forestory',
        body: 'Better Stop 是 INFO 303 multimodal prototype，基于之前的 Better Kiosk / MTD wayfinding research。',
        target: 'forestory',
        points: [
          '它聚焦 Fourth & Peabody 这一个 stop，作为 proof of concept。',
          '它不是完整 MTD system redesign，也不是 professional design book。',
          '它研究 physical + digital information layers 如何帮助 first-time and occasional MTD riders 在现场做决定。',
        ],
      },
      {
        title: '3D Stop Model',
        body: '这里可以探索一个 rider-facing stop-level wayfinding environment。',
        target: 'scene',
        points: ['Hover 或 click 组件可以查看它在站点环境中的作用。'],
      },
      {
        title: 'Hotspot Panel',
        body: '这里解释当前组件是什么，以及它在 stop environment 中承担什么作用。',
        target: 'hotspot',
        points: ['Hover 显示预览；click 会固定当前说明。'],
      },
      {
        title: 'Rider Decision Panel',
        body: '这里显示当前组件具体帮助 rider 做哪类决定。',
        target: 'decision',
        points: [
          '例如确认站点、选择上车 corner、查看动态更新、获得语言或无障碍支持，以及安全移动到上车区域。',
        ],
      },
      {
        title: 'Language and About',
        body: '当前界面支持 English 和 Chinese。ES 保留为 future option，并显示 “Español próximamente.”',
        target: 'language',
        points: ['About 页面可以查看项目 rationale、scope 和 framing。'],
      },
    ],
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
      decision: {
        decisionHelped: '识别未来的导视角色',
        whatRiderLearns: '这个组件还没有被连接到一个具体的 rider-facing decision。',
        nextAction: '对照已经标注的 hotspot，理解每一层如何把站点信息转化为行动。',
      },
    },
    Hotspot_StopSign_WithEPaper: {
      title: '站牌 + E-paper 显示',
      short: '远距离确认站点，并提供即时服务状态。',
      detail:
        '这个组件把清晰可见的站点标识和小型 e-paper 信息层结合起来。静态站牌帮助乘客确认自己在 Fourth & Peabody，e-paper 则可以显示下一班车、limited-service 提醒、绕行和服务警报。它回答的是乘客最即时的问题：“我是不是在正确的站点？现在发生了什么？”',
      decision: {
        decisionHelped: '确认站点',
        whatRiderLearns:
          '乘客可以确认自己在 Fourth & Peabody，并快速注意到当前服务信息是否发生变化。',
        nextAction:
          '留在这个站点，并在需要到站时间或 disruption guidance 时查看 e-paper、kiosk 或 QR layer。',
      },
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: '让公交站从远处就能被识别。',
      detail:
        'Stop indicator 是这个 rider-facing environment 中的第一层视觉线索。它通过 route badges、MTD identity 和 i-Stop 标记，让乘客在阅读完整地图或时刻表之前先找到候车和上车区域。',
      decision: {
        decisionHelped: '识别上车区域',
        whatRiderLearns:
          '乘客在阅读详细路线信息之前，就能知道这个 corner 属于 MTD stop environment。',
        nextAction: '靠近站牌、地图或 kiosk，进一步确认具体路线和上车方向。',
      },
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? 印刷面板',
      short: '为当前站点和附近上车 corner 提供稳定的空间定位。',
      detail:
        '这个印刷面板提供 stable orientation，而不是实时更新。它显示乘客当前所在的 corner、附近地标，以及 Fourth & Peabody 周围其他上车 corner。它也会引导乘客去 kiosk 或 QR code 查看绕行、警报、语言支持和无障碍信息，让印刷层保持稳定、清晰、不过度拥挤。',
      decision: {
        decisionHelped: '选择上车 corner',
        whatRiderLearns:
          '乘客可以把自己放到 Fourth & Peabody、附近地标和其他可能的 boarding corners 之间理解。',
        nextAction: '走向正确的 corner；如果行程受实时更新影响，再使用 kiosk 或 QR guide。',
      },
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: '提供更深入的路线规划和详细指引。',
      detail:
        'LCD kiosk 把原来的 Better Kiosk research 延展到这个 stop-level prototype 中。它不是把所有信息都塞进印刷站牌，而是在乘客需要更多支持时提供完整路线图、trip planning、语言选项、无障碍设置和更详细的时刻表探索。',
      decision: {
        decisionHelped: '规划下一步路线选择',
        whatRiderLearns:
          '乘客可以比较路线、时刻表、地图、语言选项和无障碍设置，而不需要把所有内容都挤在静态站牌上。',
        nextAction:
          '在移动到上车区域前，用 kiosk 做更完整的 trip check，或扫描 QR guide 获得手机端支持。',
      },
    },
    Hotspot_AudioProvider_StopSign: {
      title: '站牌处语音指引',
      short: '在站点标识附近提供 spoken assistance。',
      detail:
        '语音组件支持无法轻松阅读小字、正在快速扫视站点、或需要 spoken guidance 的乘客。它把无障碍支持连接到实体站点环境，而不只是连接到公交车、app 或单独的网站。',
      decision: {
        decisionHelped: '在站牌处获得无障碍支持',
        whatRiderLearns: '乘客不用只依赖小字印刷内容或个人设备，也能听到关键站点和服务信息。',
        nextAction: '通过语音确认站点，再带着同样的信息移动到等待或上车区域。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth and Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth and Peabody，西北角站点。本站服务 Route 22 North Illini 和 Route 24 South Link。下一班到达的是 Route 22 North Illini，约 3 分钟后到站。Route 24 South Link 约 5 分钟后到站。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },
    Hotspot_AudioProvider_InShelter: {
      title: '候车亭内语音指引',
      short: '在等待区域附近提供 spoken guidance。',
      detail:
        '候车亭内的语音点为等待中的乘客提供另一个获取 spoken information 的位置。它可以重复印刷地图、kiosk 和 QR guide 中的关键指引，而不是要求每个乘客都阅读屏幕。',
      decision: {
        decisionHelped: '等待时复查指引',
        whatRiderLearns: '乘客可以在已经停留的候车区域获得重复的 spoken guidance。',
        nextAction: '根据语音提示决定继续在候车亭等待、移动到上车区域，或查看动态信息来源。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth and Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth and Peabody，西北角站点。本站服务 Route 22 North Illini 和 Route 24 South Link。下一班到达的是 Route 22 North Illini，约 3 分钟后到站。Route 24 South Link 约 5 分钟后到站。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: '通过手机进入实时信息和语言支持。',
      detail:
        'QR guide 把实体站点连接到移动端信息层。它可以提供实时班次、绕行、警报、无障碍信息和语言支持，同时不让印刷面板变得过于拥挤。在这个 prototype 中，界面目前支持 English 和 Chinese，Spanish 作为未来语言选项保留。',
      decision: {
        decisionHelped: '查看动态更新和语言支持',
        whatRiderLearns:
          '乘客知道可以从手机端获取实时到站、警报、绕行、无障碍信息和当前支持的语言选项。',
        nextAction: '当印刷层不够，或需要 English / Chinese 信息时，扫描 QR code 继续查看。',
      },
    },
    Hotspot_TactilePaving: {
      title: '无障碍上车区域',
      short: '把导视信息连接到真实的上车空间。',
      detail:
        '触觉铺装标出乘客应该等待和上车的位置。它说明导视不只是标牌和屏幕；实体触觉线索也能帮助乘客把信息转化成现场移动。',
      decision: {
        decisionHelped: '安全移动到上车区域',
        whatRiderLearns: '乘客可以把刚刚读到或听到的信息连接到真正发生上车互动的位置。',
        nextAction: '移动到标记出的 boarding area，并在更清晰、可达的位置等待车辆。',
      },
    },
    Hotspot_MapPanel: {
      title: '上车 Corner 地图',
      short: '展示当前站点与附近 corner 和地标的关系。',
      detail:
        '地图面板帮助第一次或不常坐车的乘客把街角位置转化成上车决策。它说明当前 corner、附近的上车方向，以及乘客怎样在 Fourth & Peabody 从“我在哪里”进入“我该往哪里走”。',
      decision: {
        decisionHelped: '在 Fourth & Peabody 定位',
        whatRiderLearns: '乘客可以看清当前 stop 与附近 corner、地标和方向选择之间的关系。',
        nextAction: '根据地图决定留在原地、过街，或在车辆到来前移动到另一个 boarding corner。',
      },
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper 显示屏',
      short: '为到站、limited service 和 disruption 提供紧凑的动态状态。',
      detail:
        'E-paper 显示屏是轻量的 dynamic update layer。它可以在正常到站、limited-service 提醒和绕行警报之间切换，而不要求每个乘客先打开手机或搜索完整系统地图。',
      decision: {
        decisionHelped: '查看动态更新',
        whatRiderLearns: '乘客不用先理解完整路线图，也能知道当前到站或 disruption status。',
        nextAction:
          '决定继续等待、查看 kiosk 或 QR guide，或在警报改变行程时移动到其他 boarding location。',
      },
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
    scopeTitle: 'Project Scope',
    scopeItems: [
      '这是 INFO 303 multimodal prototype，不是完整上线的 transit product。',
      '它基于 Better Kiosk / MTD wayfinding research，并把研究转化成 stop-level proof of concept。',
      '它聚焦 Fourth & Peabody，以及 first-time 或 occasional MTD riders 在那里会遇到的现场决定。',
      '它不是完整 MTD system redesign，不是完整 design book，也不是公交运行状态模拟器。',
    ],
  },
} satisfies PartialMessages;
