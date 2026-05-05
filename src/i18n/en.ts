import type { Messages } from './types';

/** 当模型 hotspot 名称或说明文案变化时，优先修改这里的英文基准文案。 */
export const en = {
  app: {
    title: 'Better Stop',
    subtitle: 'An interactive wayfinding prototype for MTD riders',
    eyebrow: 'INFO 303 Multimodal Prototype',
    instruction: 'Hover or click a component to see how it supports a rider decision.',
    sectionLabel: 'Section',
    prototypeNav: 'Prototype',
    aboutNav: 'About',
    hotspotPanelTitle: 'Rider-Facing Wayfinding Component',
    noHotspotTitle: 'Explore the Fourth & Peabody stop',
    noHotspotDetail:
      'Use the 3D model to explore one stop-level wayfinding environment. Each hotspot explains how that component turns transit information into guidance a rider can act on at the stop.',
    selectedLabel: 'Selected component',
    previewLabel: 'Component preview',
    decisionTitle: 'Rider Decision Panel',
    decisionFieldLabels: {
      decisionHelped: 'Decision helped',
      whatRiderLearns: 'What the rider learns',
      nextAction: 'Next action',
    },
    decisionOverview: {
      decisionHelped: 'Build a stop-level wayfinding path',
      whatRiderLearns:
        'Together, the physical sign, printed map, e-paper layer, kiosk, QR guide, audio points, and tactile paving show where the rider is, what information is stable, what can change in real time, and where support is available.',
      nextAction:
        'Hover or select a hotspot to see how one component supports a specific in-person decision at Fourth & Peabody.',
    },
    languageLabel: 'Language',
    clearSelection: 'Clear selection',
    guideButton: 'Guide',
    guideNext: 'Next',
    guideBack: 'Back',
    guideSkip: 'Skip',
    guideStart: 'Start exploring',
    guideStepLabel: 'Step',
    guideSteps: [
      {
        title: 'Project forestory',
        body: 'Better Stop is an INFO 303 multimodal prototype grounded in earlier Better Kiosk / MTD wayfinding research.',
        target: 'forestory',
        points: [
          'It focuses on Fourth & Peabody as one proof of concept stop.',
          'It is not a full MTD system redesign or a professional design book.',
          'It studies how physical and digital information layers help first-time and occasional MTD riders make decisions on site.',
        ],
      },
      {
        title: '3D Stop Model',
        body: 'The model lets you explore a rider-facing stop-level wayfinding environment.',
        target: 'scene',
        points: ['Hover or click a component to see what it does in the stop environment.'],
      },
      {
        title: 'Hotspot Panel',
        body: 'This panel explains the current component and the role it plays in the redesigned stop.',
        target: 'hotspot',
        points: ['Hover gives a preview; clicking keeps the explanation selected.'],
      },
      {
        title: 'Rider Decision Panel',
        body: 'This panel shows the specific decision a component helps a rider make.',
        target: 'decision',
        points: [
          'Examples include confirming the stop, choosing a boarding corner, checking dynamic updates, getting language or accessibility support, and moving safely to the boarding area.',
        ],
      },
      {
        title: 'Language and About',
        body: 'The interface currently supports English and Chinese. ES remains a future option: Español próximamente.',
        target: 'language',
        points: ['Open About to read the project rationale, scope, and framing.'],
      },
    ],
  },
  viewer: {
    loading: 'Loading 3D stop model...',
    loadError: 'The 3D model could not be loaded.',
    dragHint: 'Drag to rotate. Scroll or pinch to zoom.',
    resetView: 'Reset view',
    textureTargetWarning:
      'No matching e-paper, display, screen, or kiosk mesh was found for scenario textures.',
    textureMissingWarning: 'Scenario texture was not found. Continuing with the original material.',
  },
  scenarios: {
    normal: {
      label: 'Normal Service',
      description:
        'Normal service mode shows the proof of concept during a routine trip. Riders can confirm the Fourth & Peabody stop, check next arrivals, and choose the kiosk or QR layer when they need more actionable guidance.',
    },
    limited: {
      label: 'Limited Service',
      description:
        'Limited service mode demonstrates the difference between stable orientation and dynamic updates. The printed sign can stay readable while the e-paper display warns riders when a route has limited trips or only runs at listed times.',
    },
    reroute: {
      label: 'Reroute / Alert',
      description:
        'Reroute mode shows why stop-level wayfinding needs more than a warning label. When normal boarding patterns change, the dynamic layer should tell first-time and occasional riders where to go next.',
    },
  },
  hotspots: {
    default: {
      title: 'Unlabeled Stop Component',
      short: 'This model component is available for future annotation.',
      detail:
        'This hotspot exists in the 3D model but does not yet have a written description. Add or revise its metadata in the i18n files to explain how this part of the stop helps riders make an in-person wayfinding decision.',
      decision: {
        decisionHelped: 'Identify a future wayfinding role',
        whatRiderLearns:
          'This component has not yet been connected to a specific rider-facing decision in the written prototype.',
        nextAction:
          'Use the known annotated hotspots to compare how each layer turns stop information into action.',
      },
    },
    Hotspot_StopSign_WithEPaper: {
      title: 'Stop Sign + E-paper Display',
      short: 'Long-distance stop identification and immediate service status.',
      detail:
        'This component combines a visible stop marker with a compact e-paper information layer. The static sign helps riders confirm they are at Fourth & Peabody, while the e-paper display can show next arrivals, limited-service warnings, reroutes, and service alerts. It answers the rider\'s immediate question: "Am I at the right stop, and what is happening now?"',
      decision: {
        decisionHelped: 'Confirm the stop',
        whatRiderLearns:
          'The rider can verify that they are at Fourth & Peabody and quickly notice whether current service information has changed.',
        nextAction:
          'Stay at this stop, then check the e-paper, kiosk, or QR layer if they need arrival details or disruption guidance.',
      },
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: 'Makes the bus stop recognizable from a distance.',
      detail:
        'The stop indicator is the first visual cue in the rider-facing environment. It uses route badges, the MTD identity, and the i-Stop marker so riders can recognize the boarding area before they have to read a full map or schedule.',
      decision: {
        decisionHelped: 'Recognize the boarding area',
        whatRiderLearns:
          'The rider learns that this corner is part of the MTD stop environment before they need to interpret detailed route information.',
        nextAction:
          'Move closer to the sign, map, or kiosk to confirm the exact route and boarding direction.',
      },
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? Print Panel',
      short: 'Stable orientation map for the stop and nearby boarding corners.',
      detail:
        "This printed panel provides stable orientation rather than real-time updates. It shows the rider's current corner, nearby landmarks, and other boarding corners around Fourth & Peabody. It also points riders to the kiosk or QR code for reroutes, alerts, language support, and accessibility information, keeping the printed layer readable instead of overcrowded.",
      decision: {
        decisionHelped: 'Choose a boarding corner',
        whatRiderLearns:
          'The rider can place themselves in relation to Fourth & Peabody, nearby landmarks, and other possible boarding corners.',
        nextAction:
          'Walk toward the correct corner or use the kiosk or QR guide if the trip depends on a route update.',
      },
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: 'Deeper route planning and detailed guidance.',
      detail:
        'The LCD kiosk extends the original Better Kiosk research into this stop-level prototype. Instead of placing every detail on the printed sign, the kiosk supports deeper route planning, full route maps, language options, accessibility settings, and detailed schedule exploration when riders need more support.',
      decision: {
        decisionHelped: 'Plan the next route choice',
        whatRiderLearns:
          'The rider can compare routes, schedules, maps, language options, and accessibility settings without overloading the static sign.',
        nextAction:
          'Use the kiosk for a fuller trip check before moving to the boarding area or scanning the QR guide for mobile support.',
      },
    },
    Hotspot_AudioProvider_StopSign: {
      title: 'Audio Guidance at Stop Sign',
      short: 'Spoken assistance near the stop marker.',
      detail:
        'The audio component supports riders who cannot easily read small text, are scanning the stop quickly, or need spoken guidance. It connects accessibility support to the physical stop environment, not only to a bus, app, or separate website.',
      decision: {
        decisionHelped: 'Get accessibility support at the stop marker',
        whatRiderLearns:
          'The rider can hear key stop and service information without depending only on small printed text or a personal device.',
        nextAction:
          'Use the spoken prompt to confirm the stop, then move toward the waiting or boarding area with the same information as visual readers.',
      },
      audio: {
        buttonLabel: 'Play audio guidance',
        ariaLabel: 'Play spoken guidance for Fourth and Peabody stop',
        locale: 'en-US',
        preferredVoiceNames: ['Samantha', 'Ava', 'Alex', 'Google US English', 'Microsoft Aria'],
        transcript:
          'This stop is Fourth and Peabody at the northwest corner. It serves Route 22 North Illini and Route 24 South Link. The next bus is Route 22 North Illini, arriving in about 3 minutes. Route 24 South Link arrives in about 5 minutes.',
        unsupportedMessage:
          'This browser does not support built-in speech playback. The audio guidance transcript is shown below.',
      },
    },
    Hotspot_AudioProvider_InShelter: {
      title: 'Audio Guidance in Shelter',
      short: 'Spoken guidance near the waiting area.',
      detail:
        'The in-shelter audio point gives riders another place to access spoken information while waiting. It can repeat key guidance from the printed map, kiosk, and QR guide without asking every rider to read a screen.',
      decision: {
        decisionHelped: 'Check guidance while waiting',
        whatRiderLearns:
          'The rider can receive repeated spoken guidance from the shelter area, where they may already be pausing before boarding.',
        nextAction:
          'Use the audio cue to decide whether to stay in the shelter, move to the boarding area, or check a dynamic update source.',
      },
      audio: {
        buttonLabel: 'Play audio guidance',
        ariaLabel: 'Play spoken guidance for Fourth and Peabody stop',
        locale: 'en-US',
        preferredVoiceNames: ['Samantha', 'Ava', 'Alex', 'Google US English', 'Microsoft Aria'],
        transcript:
          'This stop is Fourth and Peabody at the northwest corner. It serves Route 22 North Illini and Route 24 South Link. The next bus is Route 22 North Illini, arriving in about 3 minutes. Route 24 South Link arrives in about 5 minutes.',
        unsupportedMessage:
          'This browser does not support built-in speech playback. The audio guidance transcript is shown below.',
      },
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: 'Mobile access to live information and language support.',
      detail:
        'The QR guide connects the physical stop to a mobile information layer. It can provide live schedules, reroutes, alerts, accessibility information, and language support without overcrowding the printed panel. In this prototype, the interface currently supports English and Chinese, with Spanish reserved as a future language option.',
      decision: {
        decisionHelped: 'Check dynamic updates and language support',
        whatRiderLearns:
          'The rider learns where to find live arrivals, alerts, reroutes, accessibility information, and supported language options from their phone.',
        nextAction:
          'Scan the QR code when the printed layer is not enough or when they need information in English or Chinese.',
      },
    },
    Hotspot_TactilePaving: {
      title: 'Accessible Boarding Area',
      short: 'Connects wayfinding information to the physical boarding space.',
      detail:
        'The tactile paving marks where riders should wait and board. It shows that wayfinding is not only about signs and screens; physical cues also help riders translate information into movement at the stop.',
      decision: {
        decisionHelped: 'Move safely to boarding area',
        whatRiderLearns:
          'The rider can connect the information they just read or heard to the physical place where boarding happens.',
        nextAction:
          'Move to the marked boarding area and wait where the bus interaction is most legible and accessible.',
      },
    },
    Hotspot_MapPanel: {
      title: 'Boarding Corner Map',
      short: 'Shows the stop in relation to nearby corners and landmarks.',
      detail:
        'The map panel helps first-time and occasional riders translate the street corner into a boarding decision. It clarifies the current corner, nearby boarding directions, and how to move from orientation to action at Fourth & Peabody.',
      decision: {
        decisionHelped: 'Orient within Fourth & Peabody',
        whatRiderLearns:
          'The rider can see how this stop relates to nearby corners, landmarks, and directional choices.',
        nextAction:
          'Use the map to choose whether to stay, cross, or move toward another boarding corner before the bus arrives.',
      },
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper Display',
      short: 'Compact live status for arrivals, limits, and disruptions.',
      detail:
        'The e-paper display is the lightweight dynamic update layer. It can change between normal arrivals, limited-service warnings, and reroute alerts without forcing every rider to open a phone first or search through a full system map.',
      decision: {
        decisionHelped: 'Check dynamic updates',
        whatRiderLearns:
          'The rider learns the current arrival or disruption status at the stop without needing to interpret a full route map first.',
        nextAction:
          'Decide whether to keep waiting, consult the kiosk or QR guide, or move to another boarding location if an alert changes the trip.',
      },
    },
  },
  rationale: {
    eyebrow: 'Why this prototype',
    title: 'Project Rationale',
    body: 'This project was created for INFO 303 as a multimodal prototype based on previous Better Kiosk / MTD wayfinding research.',
    bodyParagraphs: [
      'This project was created for INFO 303 as a multimodal prototype based on previous Better Kiosk / MTD wayfinding research. Instead of designing a full transit network or a professional design book, Better Stop focuses on one redesigned stop at Fourth & Peabody. The prototype asks how a bus stop can help riders make decisions in the moment: where they are, which boarding corner they need, where to check reroutes and alerts, and how to access language or accessibility support.',
      'This prototype divides information across different layers. The printed map panel provides stable orientation. The e-paper display communicates immediate updates such as arrivals, reroutes, alerts, and limited-service warnings. The Better Kiosk LCD supports deeper route planning. QR and audio access provide additional support without overcrowding the printed sign.',
      'This project focuses on one audience: first-time and occasional MTD riders near UIUC. This scope keeps the artifact rider-facing rather than splitting attention between riders, designers, and institutional stakeholders.',
    ],
    pointsTitle: 'Multimodal Strategy',
    points: [
      'Better Stop is an interactive wayfinding prototype for MTD riders.',
      'It uses one redesigned stop as a proof of concept for a rider-facing wayfinding environment.',
      'Physical signage, printed maps, e-paper updates, kiosk support, QR access, audio guidance, and tactile cues work together at the moment a rider needs to make a decision.',
      'The design goal is not to show more information; it is to turn transit information into actionable guidance.',
      'The interface currently supports English and Chinese, with Spanish reserved as a future language option.',
    ],
    scopeTitle: 'Project Scope',
    scopeItems: [
      'INFO 303 multimodal prototype, not a full production transit product.',
      'Based on Better Kiosk / MTD wayfinding research and translated into a stop-level proof of concept.',
      'Focused on Fourth & Peabody and the decisions first-time or occasional MTD riders face there.',
      'Not a complete MTD system redesign, not a full design book, and not a service operations simulator.',
    ],
  },
} satisfies Messages;
