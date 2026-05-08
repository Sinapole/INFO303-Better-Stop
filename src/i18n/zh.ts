import type { PartialMessages } from './types';

export const zh = {
  app: {
    title: 'Better Stop',
    subtitle: '面向 MTD 乘客的交互式导视系统原型',
    eyebrow: 'INFO 303 期末再创作原型',
    instruction: '悬停或点击一个组件，查看它如何支持乘客做出决定。',
    sectionLabel: '章节',
    prototypeNav: '原型',
    aboutNav: '关于',
    creditsNav: '致谢',
    hotspotPanelTitle: '以乘客为先的导视组件',
    noHotspotTitle: '探索重新设计后的 Fourth & Peabody 站点！',
    noHotspotDetail:
      '使用 3D 模型探索一个站点层级的导视环境。每个交互点都会说明该组件如何把公交信息转化为乘客在站点可以采取的行动指引。',
    selectedLabel: '已选择组件',
    previewLabel: '组件预览',
    decisionTitle: '乘客决策面板',
    decisionFieldLabels: {
      decisionHelped: '支持的决定',
      whatRiderLearns: '你可以了解什么',
      nextAction: '下一步行动',
    },
    decisionOverview: {
      decisionHelped: '从不确定走向清楚行动',
      whatRiderLearns:
        '这个站点被视为一个小型导视系统。静态站牌、印刷地图、电子墨水屏更新、服务亭屏幕、二维码入口、语音提示和触觉线索分别回答乘客在街角可能遇到的不同问题。',
      nextAction: '悬停或选择一个组件，查看它减少了哪一种不确定，以及它让哪一步行动更容易。',
    },
    languageLabel: '语言',
    themeLabel: '主题',
    themeAuto: '自动',
    themeLight: '浅色',
    themeDark: '深色',
    clearSelection: '取消选择',
    guideButton: '导览',
    guideNext: '下一步',
    guideBack: '上一步',
    guideSkip: '跳过',
    guideStart: '开始探索',
    guideStepLabel: '步骤',
    guideSteps: [
      {
        title: '项目背景',
        body: 'Better Stop 是从早期 Better Kiosk 项目和 MTD 导视研究再创作而来的原型。',
        target: 'forestory',
        points: [
          '这里把 Fourth & Peabody 作为一个概念验证站点来聚焦。',
          '我自己也曾经在站点因为不知道该往哪里走而被困住。',
          '在这个再创作中，实体和数字信息层会帮助第一次或不常乘坐 MTD 的乘客在现场做决定。',
        ],
      },
      {
        title: '3D 站点模型',
        body: '这个模型让你探索一个以乘客为先的站点层级导视环境。',
        target: 'scene',
        points: ['悬停或点击一个组件，查看它在站点环境中起什么作用。'],
      },
      {
        title: '交互点面板',
        body: '这里会解释当前组件，以及它在重新设计后的站点中承担的角色。',
        target: 'hotspot',
        points: ['悬停会给出预览，点击会保留当前说明。'],
      },
      {
        title: '乘客决策面板',
        body: '这个面板展示某个组件具体帮助乘客做出哪一种决定。',
        target: 'decision',
        points: [
          '例如确认站点、选择上车街角、查看动态更新、获得语言或无障碍支持，以及安全移动到上车区域。',
        ],
      },
      {
        title: '语言与关于页面',
        body: '当前界面为乘客支持英文和中文。ES 是我遇到的第一个限制：我目前无法理解并完整支持西班牙语，所以保留为“Español próximamente.”（西班牙语即将推出）。',
        target: 'language',
        points: ['打开关于页面可以阅读项目理由、范围和定位。'],
      },
    ],
  },
  viewer: {
    loading: '正在加载 3D 站点模型...',
    loadError: '3D 模型无法加载。',
    dragHint: '拖动旋转。滚动或双指缩放可以查看站牌细节。',
    resetView: '重置相机',
    textureTargetWarning: '没有找到可用于情境贴图的电子墨水屏、显示区域、屏幕或服务亭网格。',
    textureMissingWarning: '没有找到情境贴图。将继续使用原始材质。',
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
        '班次有限模式展示稳定定位信息和动态更新之间的区别。印刷站牌可以保持清晰易读，而电子墨水屏会提醒乘客某条路线是否班次有限，或是否只在列出的时间运行。',
    },
    reroute: {
      label: '绕行 / 警报',
      description:
        '绕行模式说明，站点层级导视需要的不只是一个警告标签。当正常上车模式发生变化时，动态信息层应该告诉第一次或不常乘车的乘客下一步去哪里。',
    },
  },
  hotspots: {
    default: {
      title: '未标注的站点组件',
      short: '站点中的这个部分可以在未来继续添加说明。',
      detail:
        '这个组件是 3D 原型的一部分，但目前还没有连接到具体的导视功能。未来版本可以说明这个部分如何帮助你识别站点、查看服务信息，或穿过上车区域。',
      decision: {
        decisionHelped: '识别未来的导视角色',
        whatRiderLearns: '这个组件还没有在当前原型中连接到一个具体的决定。',
        nextAction: '探索已经标注的组件，查看每一层信息如何支持站点中的不同行动。',
      },
    },

    Hotspot_StopSign_WithEPaper: {
      title: '站牌 + 电子墨水屏',
      short: '从远处确认站点，并查看即时服务状态。',
      detail:
        '这个重新设计的站牌保留了熟悉的 MTD 站点识别、路线徽章、i-Stop 标记和基本站点信息，同时加入一个小型动态电子墨水屏信息层。静态部分帮助你识别这里是 MTD 站点并确认所在街角。电子墨水屏区域可以在固定时刻表不够用时显示下一班车、班次有限提醒、绕行或警报画面。',
      decision: {
        decisionHelped: '确认站点和当前服务状态',
        whatRiderLearns:
          '你可以确认自己位于 Fourth & Peabody 西北角，查看哪些路线服务这个站点，并确认是否有即将到达的车辆、提醒或警报。',
        nextAction:
          '如果站点和路线看起来正确，就留在这里，并查看电子墨水屏、服务亭或二维码层来获取准确到站信息、警报或辅助支持。',
      },
    },

    Hotspot_StopIndicator: {
      title: '站点识别灯',
      short: '从远处找到公交站，尤其是在夜间。',
      detail:
        '太阳能站点识别灯是你从远处看到的第一层视觉线索。它使用公交图标、MTD 识别标识、路线徽章和 i-Stop 标记，让上车区域在你阅读完整时刻表、地图或服务亭屏幕之前就可以被识别。夜间时，识别灯也可以作为小型照明元素。它不只照亮站牌本身，也帮助照亮附近街面，让站点在等待时更可见、更易读，也更有安全感。',
      decision: {
        decisionHelped: '识别站点，并在等待时感到更安全',
        whatRiderLearns:
          '你可以快速判断这个地点属于 MTD 站点环境，查看这里服务哪些路线，并使用发光标记在低光环境中定位站点。',
        nextAction:
          '走向发光的站点标记，然后查看电子墨水屏、印刷地图或服务亭，以确认你的路线和方向。',
      },
    },

    Hotspot_PrintPanel: {
      title: '“我在哪里？”印刷面板',
      short: '使用印刷地图在 Fourth & Peabody 周边定位自己。',
      detail:
        '这个印刷面板关注稳定定位，而不是实时到站时间。它显示你所在的位置，附近的地标，例如 Ikenberry Commons、ARC、Siebel School for Design 和 College of Law，以及 Fourth & Peabody 周边的上车街角。地图下方的三张提醒卡会指向服务亭或二维码，用于查看绕行、警报、语言支持和无障碍信息。',
      decision: {
        decisionHelped: '理解你的位置和附近上车街角',
        whatRiderLearns:
          '你可以看见自己站在哪个街角、附近的上车街角在哪里，以及这个站点与可识别的校园地标之间的关系。',
        nextAction:
          '使用地图决定是留在当前街角，还是移动到另一个标出的街角。如果你的行程依赖实时更新，请查看服务亭或扫描二维码。',
      },
    },

    Hotspot_MapPanel: {
      title: '上车街角地图',
      short: '定位自己、附近地标和其他上车街角。',
      detail:
        '地图面板把街角转化为可以阅读的导视空间。它不是要求你理解整个公交系统，而是聚焦眼前区域：你当前所在的街角、Fourth & Peabody 的其他上车街角、附近地标和路线徽章。这样一来，即使动态屏幕负责到站和警报，印刷层仍然有用。',
      decision: {
        decisionHelped: '决定是留在原地、过街，还是移动到另一个街角',
        whatRiderLearns: '你可以把自己放回这个路口中，并比较当前街角和附近其他上车街角之间的关系。',
        nextAction: '如果你的路线或方向不在当前街角服务，就根据地图在上车前移动到正确标记的街角。',
      },
    },

    Hotspot_BetterKiosk: {
      title: 'Better Kiosk 液晶屏',
      short: '使用服务亭进行更深入的路线规划和详细指引。',
      detail:
        '液晶服务亭延续了原始 Better Kiosk 的想法。它负责承载对印刷站牌来说过于详细的信息：路线地图、行程规划、时刻表比较、语言选项、无障碍设置和更完整的服务细节。这样可以让印刷面板保持可读，同时仍然为你提供一个探索更多信息的位置。',
      decision: {
        decisionHelped: '在上车前规划或复查路线',
        whatRiderLearns:
          '你可以比较路线、查看更完整的地图、检查时刻表细节，并进入辅助支持选项，而不会让印刷站牌过度拥挤。',
        nextAction:
          '如果你不确定该乘坐哪条路线、哪个方向上车，或服务变化是否影响行程，就使用服务亭。',
      },
    },

    Hotspot_EpaperDisplay: {
      title: '电子墨水屏',
      short: '不用先打开手机，也能查看紧凑的实时状态。',
      detail:
        '电子墨水屏是站点中的轻量动态信息层。它可以在正常到站、班次有限提醒，以及绕行或警报画面之间切换。在这个原型中，这些更新使用预先准备的贴图帧展示，而不是 MTD 实时数据；但它的目的是展示站点如何清楚传达不断变化的服务状态。',
      decision: {
        decisionHelped: '查看现在正在发生什么',
        whatRiderLearns:
          '你可以看见下一班车是否很快到达、某条路线是否班次有限，或某条警报是否改变了正常上车情况。',
        nextAction:
          '根据电子墨水屏信息决定是继续等待、查看服务亭或二维码指引，还是移动到其他上车位置。',
      },
    },

    Hotspot_QRGuide: {
      title: '二维码指引',
      short: '打开手机端帮助，查看实时更新、语言支持和辅助信息。',
      detail:
        '二维码指引把实体站点连接到手机端信息层。它不强迫每一种语言、警报和无障碍细节都挤进印刷站牌，而是在你需要时提供一个打开更多信息的位置。在这个原型中，界面支持英文和中文，西班牙语保留为未来选项。',
      decision: {
        decisionHelped: '在不挤满站牌的情况下获得更多信息',
        whatRiderLearns: '你可以使用手机查看实时更新、绕行、警报、无障碍信息和当前支持的语言选项。',
        nextAction: '当印刷地图不够用，或你需要语言或无障碍支持时，扫描二维码。',
      },
    },

    Hotspot_AudioProvider_StopSign: {
      title: '站牌处语音指引',
      short: '在站点标记附近听取关键站点信息。',
      detail:
        '这个语音点是站牌附近的无障碍原型层。它适用于小字难以阅读、你正在快速移动，或语音确认比阅读地图更容易的情况。在网站中，语音由浏览器 SpeechSynthesis API 模拟。',
      decision: {
        decisionHelped: '通过语音指引确认站点',
        whatRiderLearns: '你可以听到站点名称、街角、服务路线和下一班到站信息，而不只依赖印刷文字。',
        nextAction: '使用语音提示确认你在正确的站点，然后查看电子墨水屏、服务亭或上车区域。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth & Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth & Peabody 西北角站点。本站服务 22 North Illini 路线和 24 South Link 路线。下一班车是 22 North Illini 路线，约 3 分钟后到达。24 South Link 路线约 8 分钟后到达。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },

    Hotspot_AudioProvider_InShelter: {
      title: '候车亭内语音指引',
      short: '在候车亭内等待时听取指引。',
      detail:
        '候车亭内的语音点会在你可能已经停留等待的位置重复重要指引。它与印刷地图、服务亭和二维码指引配合，让信息不只通过视觉呈现。在网站中，语音层由浏览器 SpeechSynthesis 模拟，并且可以和界面其余文字一样在文本文件中编辑。',
      decision: {
        decisionHelped: '等待时复查指引',
        whatRiderLearns: '你可以在等待区域听到站点、路线或警报信息，而不只依赖屏幕或印刷站牌。',
        nextAction: '使用语音提示决定是继续等待、移动到上车区域，还是查看动态更新来源。',
      },
      audio: {
        buttonLabel: '播放语音指引',
        ariaLabel: '播放 Fourth & Peabody 站点的语音指引',
        locale: 'zh-CN',
        preferredVoiceNames: ['Tingting', 'Meijia', 'Sin-ji', 'Google 普通话'],
        transcript:
          '这里是 Fourth & Peabody 西北角站点。本站服务 22 North Illini 路线和 24 South Link 路线。下一班车是 22 North Illini 路线，约 3 分钟后到达。24 South Link 路线约 8 分钟后到达。',
        unsupportedMessage: '当前浏览器不支持内置语音播放。语音指引文本已显示在下方。',
      },
    },

    Hotspot_TactilePaving: {
      title: '无障碍上车区域',
      short: '把视觉信息连接到真正发生上车的物理位置。',
      detail:
        '触觉铺装在实体站点环境中标出等待和上车区域。它说明导视不只是标牌、地图和屏幕。你还需要实体线索，帮助把信息转化为穿过站点时的移动。',
      decision: {
        decisionHelped: '安全移动到上车区域',
        whatRiderLearns:
          '你可以把站牌、地图、电子墨水屏或服务亭中的信息，连接到真正发生上车的物理位置。',
        nextAction: '移动到标记出的上车区域，并在公交互动最清楚、最可达的位置等待。',
      },
    },
  },
  rationale: {
    eyebrow: '为什么做这个原型？',
    title: '项目理由',
    body: 'Better Stop 是一个 INFO 303 多模态原型，它把我早期的 CS 222 Better Kiosk 项目和我在 INFO 303 中基于 Miro 对 MTD 导视的探索重新组合在一起。',
    bodyParagraphs: [
      'Better Stop 来自两个早期工作阶段：CS 222 的 Better Kiosk 项目，以及我在 INFO 303 中基于 Miro 对 MTD 导视的探索。Better Kiosk 原本关注数字服务亭如何改善公交信息获取。在 INFO 303 中，我把这个想法扩展为：导视不只发生在一块屏幕上，而是发生在整个站点环境中。',
      '这个原型把这些早期想法转化为重新设计后的 Fourth & Peabody 站点。Better Stop 不是完整公交网络设计，也不是专业设计手册，而是用一个站点作为概念验证。这个原型提出的问题是：公交站如何帮助你在现场做决定，包括你在哪里、需要哪个上车街角、在哪里查看绕行和警报，以及如何获得语言或无障碍支持。',
      '因为我无法为这个作业真实建造或部署一个 MTD 站点，最终作品采用托管在网站上的交互式 3D 模型。这个形式让你可以从空间中查看站点，悬停或点击它的组件，并看到印刷地图、电子墨水屏更新、服务亭屏幕、二维码入口、语音指引和触觉线索如何共同形成一个面向乘客的信息系统。',
    ],
    contentsLabel: '本页内容',
    scrollCue: '继续下滑查看项目范围和多模态策略',
    pointsTitle: '多模态策略',
    points: [
      '语言：短而行动导向的文字帮助你理解下一步该做什么，例如查看绕行、确认方向或扫描获得帮助。',
      '视觉：组件设计与当前 MTD 设计保持一致，同时通过粗体排版、路线徽章、高对比地图、颜色编码警报和公交导视式布局提升清晰度，让站点信息可以被快速扫读。',
      '听觉：语音指引点展示语音信息如何支持无法轻松阅读站牌、偏好语音确认或需要无障碍支持的乘客。',
      '空间：3D 模型把导视视为在实体站点环境中的移动过程，从识别站点到找到正确街角和上车区域。',
      '数字层：电子墨水屏、Better Kiosk 液晶屏和二维码指引承载变化较快或更详细的信息，避免让印刷地图面板过度拥挤。',
      '设计目标不是在每个地方展示更多信息，而是把公交信息转化为给第一次或不常乘坐 MTD 的乘客使用的可行动指引。',
      '界面目前支持英文和中文，为以英文作为第二语言的乘客提供参考。',
    ],
    scopeTitle: '项目范围',
    scopeItems: [
      '原型，而不是产品：Better Stop 是一个设计原型，不是已完成的 MTD 服务产品或公交运营模拟器。',
      '以一个站点作为概念验证：项目聚焦 Fourth & Peabody，让设计保持具体、空间化，并且面向乘客。',
      '基于早期工作：这个原型把 CS 222 Better Kiosk 工作与 INFO 303 中基于 Miro 对导视、标识和乘客需求的探索重新组合在一起。',
      '聚焦受众：主要受众是 UIUC 附近第一次或不常乘坐 MTD 的乘客，包括可能需要语言或无障碍支持的乘客。更清晰的指引也可以推广到其他需要帮助的乘客身上。',
      '模拟动态信息：到站、警报和班次有限显示使用示例画面，而不是 MTD 实时数据，以保持原型轻量。',
      '网站作为作品：因为无法为这个作业真实建造该站点，项目使用交互式 3D 网站让原型可以被探索。',
    ],
  },
  credits: {
    eyebrow: '参考与素材',
    title: '致谢',
    body: '这个部分记录支持 Better Stop 原型的研究参考、视觉素材和工具。主体验保持聚焦于面向乘客的作品，而这个页面记录项目建立在什么基础之上。',
    contentsLabel: '本页内容',
    scrollCue: '继续下滑查看参考资料、素材、地图来源和实现说明',
    sections: [
      {
        title: '研究与设计参考',
        body: '这个原型受到我早期 CS222 Better Kiosk 项目，以及 INFO 303 中基于 Miro 对 MTD 导视的探索影响。我也参考了真实公共交通信息系统和设计资料，包括 COTA 的公交站设计指南、Legible London、MTD 路线和站点信息，以及 Stamen / Maperture 地图风格。这些参考帮助我思考站点识别、路线信息、无障碍上车、一致的导视和本地定位地图。',
        links: [
          {
            label: 'COTA Transit Stop Design Guide',
            url: 'https://www.cota.com/static/ab242d40b9dcb3c19f0ccab09f681c5a/COTA-Transit-Stop-Design-Guide.pdf',
          },
          {
            label: 'Legible London',
            url: 'https://tfl.gov.uk/info-for/boroughs-and-communities/legible-london',
          },
          {
            label: 'MTD Maps & Schedules',
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
        body: '3D 站点模型使用 Blockbench 制作。印刷地图面板、放大的站点标识、电子墨水屏画面、服务亭屏幕贴图和其他视觉面板由我使用 Adobe Illustrator 和 Adobe Photoshop 设计。3D 模型中的一些材质贴图使用 Minecraft 风格贴图资源，作为原型环境中的临时表面材质。',
      },
      {
        title: '地图来源',
        body: '印刷导视地图以 Stamen / Maperture 作为视觉地图参考，然后为这个原型重新设计和标注。这个地图层是起点，而不是最终公交地图；我加入了站点标签、路线徽章、地标、二维码指引和面向乘客的说明，让它适配 Fourth & Peabody 站点语境。',
        links: [
          {
            label: 'Stamen Maperture',
            url: 'https://stamen.github.io/maperture/',
          },
        ],
      },
      {
        title: '实现说明',
        body: '这个交互式网站使用 Vue、TypeScript 和 Three.js 构建。网站使用静态 3D 模型和原型贴图帧，而不是 MTD 实时数据。语音指引在浏览器中模拟，显示屏更新则使用预先准备好的贴图状态表现。',
      },
    ],
  },
} satisfies PartialMessages;
