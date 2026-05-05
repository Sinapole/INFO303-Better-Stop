import type { PartialMessages } from './types';

export const zh = {
  app: {
    title: 'Better Stop',
    subtitle: '面向 MTD 乘客的交互式导视系统原型',
    eyebrow: 'INFO 303 期末多模态原型',
    instruction: '悬停或点击一个组件，了解它如何支持乘客在站点做决定。',
    sectionLabel: '章节',
    prototypeNav: '原型',
    aboutNav: '关于',
    creditsNav: '致谢',
    hotspotPanelTitle: '以乘客为中心的导视组件',
    noHotspotTitle: '探索重新设计后的 Fourth & Peabody 站点',
    noHotspotDetail:
      '使用 3D 模型探索一个站点层级的导视环境。每个交互点都说明该组件如何把公交信息转化为乘客在站点可以采取行动的指引。',
    selectedLabel: '已选择组件',
    previewLabel: '组件预览',
    decisionTitle: '乘客决策面板',
    decisionFieldLabels: {
      decisionHelped: '支持的决定',
      whatRiderLearns: '乘客能了解什么',
      nextAction: '下一步行动',
    },
    decisionOverview: {
      decisionHelped: '把不确定感转化为清晰行动',
      whatRiderLearns:
        '这个站点被视为一个小型导视系统。静态站牌、印刷地图、电子墨水屏更新、服务亭屏幕、二维码入口、语音提示和触觉线索分别回答乘客在街角可能遇到的不同问题。',
      nextAction: '悬停或选择一个组件，查看它减少了哪一种不确定感，以及它让什么行动变得更容易。',
    },
    languageLabel: '语言',
    clearSelection: '取消选择',
    guideButton: '导览',
    guideNext: '下一步',
    guideBack: '上一步',
    guideSkip: '跳过',
    guideStart: '开始探索',
    guideStepLabel: '步骤',
    guideSteps: [
      {
        title: '项目前情',
        body: 'Better Stop 是从早期 Better Kiosk 项目与 MTD 导视研究延伸出的再创作。',
        target: 'forestory',
        points: [
          '这里把 Fourth & Peabody 聚焦为一个概念验证站点。',
          '我自己也曾经在站点因为不清楚该往哪里走而被困住。',
          '在这个再创作中，实体和数字信息层共同帮助第一次或不常乘坐 MTD 的乘客在现场做决定。',
        ],
      },
      {
        title: '3D 站点模型',
        body: '这个模型让你探索一个以乘客为中心的站点层级导视环境。',
        target: 'scene',
        points: ['👉 悬停或点击一个组件，查看它在站点环境中的作用。'],
      },
      {
        title: '交互点面板',
        body: '这里会解释当前组件，以及它在重新设计后的站点中承担的角色。',
        target: 'hotspot',
        points: ['悬停会显示预览；点击会固定当前说明。'],
      },
      {
        title: '乘客决策面板',
        body: '这个面板展示某个组件具体帮助乘客做出哪类决定。',
        target: 'decision',
        points: [
          '例如确认站点、选择上车街角、查看动态更新、获得语言或无障碍支持，以及安全移动到上车区域。',
        ],
      },
      {
        title: '语言与关于页面',
        body: '当前界面支持英文和中文。ES 是我遇到的一个限制：我目前无法完整支持西班牙语，因此保留为 “Español próximamente.”（西班牙语即将支持）。',
        target: 'language',
        points: ['打开关于页面可以阅读项目说明、范围和定位。'],
      },
    ],
  },
  viewer: {
    loading: '正在加载 3D 站点模型...',
    loadError: '3D 模型无法加载 😭',
    dragHint: '拖动旋转。滚动或双指缩放可以查看站牌细节。',
    resetView: '重置相机',
    textureTargetWarning: '没有找到匹配的电子墨水屏、显示区域、屏幕或服务亭网格用于情境贴图。',
    textureMissingWarning: '没有找到该情境贴图。将继续使用原始材质。',
  },
  scenarios: {
    normal: {
      label: '正常服务',
      description:
        '正常服务模式展示这个概念验证在日常出行中的状态。乘客可以确认 Fourth & Peabody 站点、查看下一班车，并在需要更多可行动指引时选择服务亭或二维码层。',
    },
    limited: {
      label: '班次有限',
      description:
        '班次有限模式展示稳定定位信息和动态更新之间的区别。印刷站牌可以保持清晰易读，而 电子墨水屏 则提醒乘客某条线路是否班次有限，或是否只在指定时间运行。',
    },
    reroute: {
      label: '绕行 / 警报',
      description:
        '绕行模式说明 站点层级导视 不能只给出一个警报标签。当正常上车模式发生变化时，动态信息层应该告诉第一次或不常乘车的乘客下一步去哪里。',
    },
  },
  hotspots: {
    default: {
      title: '未标注的站点组件',
      short: '这个模型组件可以在未来继续添加说明。',
      detail:
        '这个交互点已经存在于 3D 模型中，但还没有书面说明。可以在多语言文件中添加或修改它的说明数据，说明这个站点部分如何帮助乘客做出现场导视决策。',
      decision: {
        decisionHelped: '识别未来的导视角色',
        whatRiderLearns: '这个组件还没有在当前文字原型中连接到一个具体的乘客决策。',
        nextAction: '对照已经标注的 交互点，比较每一层如何把站点信息转化为行动。',
      },
    },
    Hotspot_StopSign_WithEPaper: {
      title: '站牌 + 电子墨水屏显示',
      short: '远距离识别站点，并查看即时服务状态。',
      detail:
        '这个重新设计的站牌为现有站牌带来更清晰的格式，也在固定时刻表不够用的时刻加入一个小型动态信息层。静态站牌帮助乘客从远处确认这里有一个站点；电子墨水屏区域可以显示即将到站、班次有限服务 和 警报画面，让站点回答乘客最常先问的问题：“我在正确的地方吗？现在我需要知道什么？”',
      decision: {
        decisionHelped: '确认站点和路线',
        whatRiderLearns:
          '你可以确认这里是 Fourth & Peabody 的西北角、有哪些路线服务这个站点，以及它们什么时候会来。',
        nextAction:
          '留在这个站点；如果需要到站细节、无障碍帮助或服务变化指引，再查看电子墨水屏、服务亭或二维码层。',
      },
    },
    Hotspot_StopIndicator: {
      title: '站点识别灯',
      short: '让公交站从远处就能被识别。',
      detail:
        '站点识别灯是这个面向乘客的环境中的第一层视觉线索。它使用路线徽章、MTD 识别标识和 i-Stop 标记，让乘客在阅读完整地图或时刻表之前先识别出候车和上车区域。夜间时，它也可以作为小型照明元素，不只照亮站牌本身，也帮助照亮附近街面和等待区域，让站点在低光环境中更醒目、更易读，也更有安全感。',
      decision: {
        decisionHelped: '识别上车区域',
        whatRiderLearns: '乘客在解读详细路线信息之前，就能知道这个街角属于 MTD 站点环境。',
        nextAction: '靠近站牌、地图或 服务亭，进一步确认具体路线和上车方向。',
      },
    },
    Hotspot_PrintPanel: {
      title: '“我在哪里？”印刷面板',
      short: '为站点和附近上车街角提供稳定的空间定位。',
      detail:
        '这个印刷面板提供稳定的空间定位，而不是实时更新。它显示乘客当前所在的街角、附近地标，以及 Fourth & Peabody 周围的其他上车街角。它也会把乘客引导到服务亭或二维码，以查看绕行、警报、语言支持和无障碍信息，让印刷层保持可读，而不是过度拥挤。',
      decision: {
        decisionHelped: '选择上车街角',
        whatRiderLearns:
          '乘客可以理解自己与 Fourth & Peabody、附近地标和其他可能上车街角之间的关系。',
        nextAction: '走向正确的街角；如果行程依赖路线更新，则使用服务亭或二维码指引。',
      },
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk 液晶屏',
      short: '提供更深入的路线规划和详细指引。',
      detail:
        '液晶服务亭把早期 Better Kiosk 的想法带入这个单站点原型。它负责承载那些如果放进印刷站牌会过于拥挤的复杂指引：路线比较、语言设置、无障碍选项，以及给需要在上车前做更完整检查的乘客使用的详细时刻表探索。',
      decision: {
        decisionHelped: '规划下一步路线选择',
        whatRiderLearns:
          '乘客可以比较路线、时刻表、地图、语言选项和无障碍设置，而不会让静态站牌承载过多信息。',
        nextAction:
          '在移动到上车区域之前，使用服务亭做更完整的行程复查，或扫描二维码指引获得手机端支持。',
      },
    },
    Hotspot_AudioProvider_StopSign: {
      title: '站牌处语音指引',
      short: '在站点标识附近提供语音辅助。',
      detail:
        '语音点是一个无障碍原型层，面向无法轻松阅读小字、正在快速移动、或需要语音确认的乘客。在这个网站中，语音由浏览器 SpeechSynthesis API 模拟，因此这个想法可以在还没有搭建实体扬声器系统前先被测试。',
      decision: {
        decisionHelped: '在站点标识处获得无障碍支持',
        whatRiderLearns: '乘客可以听到关键站点和服务信息，而不只依赖小字印刷内容或个人设备。',
        nextAction: '使用语音提示确认站点，然后带着和视觉读者相同的信息移动到等待或上车区域。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth & Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth & Peabody，西北角站点。本站服务 22 North Illini 路线和 24 South Link 路线。下一班到达的是 22 North Illini 路线，约 3 分钟后到站。24 South Link 路线约 5 分钟后到站。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },
    Hotspot_AudioProvider_InShelter: {
      title: '候车亭内语音指引',
      short: '在等待区域附近提供 语音指引。',
      detail:
        '候车亭内的语音点会在乘客可能已经停留的位置重复重要指引。在这个原型中，语音层由浏览器 SpeechSynthesis 生成，因此音频体验可以和书面界面一样在同一个多语言文件中编辑。',
      decision: {
        decisionHelped: '等待时复查指引',
        whatRiderLearns:
          '乘客可以在候车区域反复获得 语音指引，因为他们可能已经在那里停下来等待上车。',
        nextAction: '使用语音提示决定是继续留在候车亭、移动到上车区域，还是查看动态更新来源。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth & Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth & Peabody，西北角站点。本站服务 22 North Illini 路线和 24 South Link 路线。下一班到达的是 22 North Illini 路线，约 3 分钟后到站。24 South Link 路线约 8 分钟后到站。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },
    Hotspot_QRGuide: {
      title: '二维码指引',
      short: '通过手机进入实时信息和语言支持。',
      detail:
        '二维码指引把实体站点连接到移动端信息层。它可以提供实时班次、绕行、警报、无障碍信息和语言支持，同时不让印刷面板变得过于拥挤。在这个 原型 中，界面目前支持 英文和中文，西班牙语 作为未来语言选项保留。',
      decision: {
        decisionHelped: '查看动态更新和语言支持',
        whatRiderLearns:
          '乘客知道可以从手机端获取实时到站、警报、绕行、无障碍信息和当前支持的语言选项。',
        nextAction: '当印刷层不够，或需要 英文 / 中文 信息时，扫描 二维码 继续查看。',
      },
    },
    Hotspot_TactilePaving: {
      title: '无障碍上车区域',
      short: '把导视信息连接到真实的上车空间。',
      detail:
        '触觉铺装标出乘客应该等待和上车的位置。它说明导视不只是标牌和屏幕；实体触觉线索也能帮助乘客把信息转化成站点中的移动。',
      decision: {
        decisionHelped: '安全移动到上车区域',
        whatRiderLearns: '乘客可以把刚刚读到或听到的信息连接到真正发生上车互动的物理位置。',
        nextAction: '移动到标记出的 上车区域，并在公交互动最清楚、最可达的位置等待。',
      },
    },
    Hotspot_MapPanel: {
      title: '上车街角地图',
      short: '展示站点与附近 街角和地标的关系。',
      detail:
        '地图面板帮助第一次或不常坐车的乘客把街角位置转化为上车决策。它说明当前街角、附近的上车方向，以及乘客怎样在 Fourth & Peabody 从“定位”进入“行动”。',
      decision: {
        decisionHelped: '在 Fourth & Peabody 定位',
        whatRiderLearns: '乘客可以看清这个站点与附近街角、地标和方向选择之间的关系。',
        nextAction: '根据地图决定留在原地、过街，或在车辆到来前移动到另一个 上车街角。',
      },
    },
    Hotspot_EpaperDisplay: {
      title: '电子墨水屏显示屏',
      short: '为到站、班次限制和服务变化提供紧凑的实时状态。',
      detail:
        '电子墨水屏显示屏是轻量的 动态更新层。它可以在正常到站、班次有限提醒和绕行警报之间切换，而不要求每个乘客先打开手机或搜索完整系统地图。',
      decision: {
        decisionHelped: '查看动态更新',
        whatRiderLearns: '乘客不用先理解完整路线图，也能知道当前的到站或 服务变化状态。',
        nextAction: '决定继续等待、查看服务亭或二维码指引，或在警报改变行程时移动到其他上车位置。',
      },
    },
  },
  rationale: {
    eyebrow: '为什么做这个 原型',
    title: '项目说明',
    body: 'Better Stop 是一个 INFO 303 多模态原型，它把我早期的 CS222 Better Kiosk 项目和 INFO 303 中基于 Miro 的 MTD 导视探索再创作到一起。',
    bodyParagraphs: [
      'Better Stop 来自两个早期工作阶段：CS222 的 Better Kiosk 项目，以及我在 INFO 303 中基于 Miro 的 MTD 导视探索。Better Kiosk 原本关注数字服务亭如何改善公交信息获取；在 INFO 303 中，我把这个想法扩展为：导视不只发生在一块屏幕上，而是发生在整个站点环境中。',
      '这个原型把这些早期想法转化为重新设计后的 Fourth & Peabody 站点。它不是完整公交网络重新设计，也不是专业设计规范书，而是用一个站点作为概念验证。这个原型关注公交站如何帮助乘客在现场做决定：自己在哪里、需要哪个上车街角、在哪里查看绕行和警报，以及如何获得语言或无障碍支持。',
      '因为我无法为这个作业真实建造或部署一个 MTD 站点，最终作品采用了托管在网站上的交互式 3D 模型。这个形式让观众可以在空间中查看站点，悬停或点击各个组件，并理解印刷地图、电子墨水屏更新、服务亭屏幕、二维码入口、语音指引和触觉线索如何共同形成一个面向乘客的信息系统。',
    ],
    pointsTitle: '多模态策略',
    points: [
      '语言：短而行动导向的文字帮助乘客理解下一步该做什么，例如查看绕行、确认方向或扫描获得帮助。',
      '视觉：粗体层级、路线徽章、高对比地图、警报颜色和交通导视式排版，让站点信息可以被快速扫读。',
      '听觉：语音指引点展示 语音信息 如何支持无法轻松阅读站牌、偏好语音确认或需要无障碍支持的乘客。',
      '空间：3D 模型把导视视为在实体站点环境中的移动过程，从识别站点到找到正确街角和上车区域。',
      '数字层：电子墨水屏、Better Kiosk 液晶屏和二维码指引承载变化较快或更详细的信息，避免让印刷地图面板过度拥挤。',
      '设计目标不是在每个地方展示更多信息，而是把公交信息转化为给第一次或不常乘坐 MTD 的乘客使用的可行动指引。',
      '界面目前支持 英文和中文，西班牙语 作为未来语言选项保留。',
    ],
    scopeTitle: '项目范围',
    scopeItems: [
      '原型，而不是产品：Better Stop 是一个设计原型，不是已完成的 MTD 服务产品或公交运营模拟器。',
      '用一个站点作为概念验证：项目聚焦 Fourth & Peabody，让设计保持具体、空间化，并且面向乘客。',
      '基于前期工作：这个原型把 CS222 Better Kiosk 工作和 INFO 303 基于 Miro 的导视、标识系统与乘客需求探索再创作到一起。',
      '聚焦受众：主要受众是 UIUC 附近第一次或不常乘坐 MTD 的乘客，也包括可能需要语言或无障碍支持的乘客。',
      '模拟动态信息：到站、警报和班次有限显示使用示例画面，而不是 MTD 实时数据。',
      '以网站作为作品：因为这个作业无法真实建造该站点，项目使用交互式 3D 网站让原型可以被探索。',
      '不是设计规范书：项目保持聚焦于乘客，而不是同时分散给乘客、设计师和机构 利益相关者。',
    ],
  },
  credits: {
    eyebrow: '参考与素材',
    title: '致谢',
    body: '这个部分记录支持 Better Stop 原型的研究参考、视觉素材和制作工具。主体验仍然聚焦面向乘客的作品，而这里用来说明项目建立在什么资料和制作过程之上。',
    sections: [
      {
        title: '研究与设计参考',
        body: '这个原型受到我之前 CS222 Better Kiosk 项目，以及 INFO 303 中围绕 MTD 导视的 Miro 探索影响。我也参考了真实公共交通信息系统和设计资料，包括 COTA 公交站设计指南、Legible London、MTD 路线和站点信息，以及 Stamen / Maperture 地图风格。这些资料帮助我思考站点识别、路线信息、无障碍上车、一致的导视系统和本地定位地图。',
        links: [
          {
            label: 'COTA 公交站设计指南',
            url: 'https://www.cota.com/static/ab242d40b9dcb3c19f0ccab09f681c5a/COTA-Transit-Stop-Design-Guide.pdf',
          },
          {
            label: 'Legible London',
            url: 'https://tfl.gov.uk/info-for/boroughs-and-communities/legible-london',
          },
          {
            label: 'MTD 地图与时刻表',
            url: 'https://mtd.org/maps-and-schedules/',
          },
          {
            label: 'Stamen Maperture',
            url: 'https://stamen.github.io/maperture/',
          },
        ],
      },
      {
        title: '原型素材',
        body: '3D 站点模型使用 Blockbench 制作。印刷地图面板、放大的站点标识、电子墨水屏画面、服务亭屏幕贴图，以及其他视觉面板由我使用 Adobe Illustrator 和 Adobe Photoshop 设计。3D 模型中的一些材质贴图使用 Minecraft 风格贴图资源作为原型环境的临时表面材质。',
      },
      {
        title: '地图来源',
        body: '印刷导视地图以 Stamen / Maperture 作为视觉地图参考，再根据原型重新设计和标注。这个地图层是起点，而不是最终公交地图；我加入了站点标签、路线徽章、地标、二维码指引和面向乘客的说明，让它更贴合 Fourth & Peabody 的站点语境。',
        links: [
          {
            label: 'Stamen Maperture',
            url: 'https://stamen.github.io/maperture/',
          },
        ],
      },
      {
        title: '实现说明',
        body: '这个交互式网站使用 Vue、TypeScript 和 Three.js 制作。网站使用静态 3D 模型和原型贴图画面，而不是 MTD 实时数据。语音指引通过浏览器中的语音合成模拟，显示更新则用预先准备好的贴图状态表现。',
      },
    ],
  },
} satisfies PartialMessages;
