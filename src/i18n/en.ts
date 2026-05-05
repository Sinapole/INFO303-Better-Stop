import type { Messages } from './types';

/** 当模型 hotspot 名称或说明文案变化时，优先修改这里的英文基准文案。 */
export const en = {
  app: {
    title: 'Better Stop',
    subtitle: 'An interactive wayfinding prototype for MTD riders',
    eyebrow: 'INFO 303 Multimodal Prototype',
    instruction: 'Hover or click a component to see how it supports a rider decision.',
    hotspotPanelTitle: 'Rider-Facing Wayfinding Component',
    noHotspotTitle: 'Explore the Fourth & Peabody stop',
    noHotspotDetail:
      'Use the 3D model to explore one stop-level wayfinding environment. Each hotspot explains how that component turns transit information into guidance a rider can act on at the stop.',
    selectedLabel: 'Selected component',
    previewLabel: 'Component preview',
    scenarioTitle: 'Service Scenario',
    scenarioStatusLabel: 'Current mode',
    decisionTitle: 'Rider Decision Questions',
    decisionQuestions: [
      'Where am I now?',
      'Which boarding corner or direction do I need?',
      'Where should I check reroutes, alerts, limited service, or exact arrivals?',
      'How can I access language help, accessibility help, or audio guidance?',
    ],
    routeChips: ['Fourth & Peabody', 'MTD', 'i-Stop', 'UIUC'],
    languageLabel: 'Language',
    clearSelection: 'Clear selection',
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
    },
    Hotspot_StopSign_WithEPaper: {
      title: 'Stop Sign + E-paper Display',
      short: 'Long-distance stop identification and immediate service status.',
      detail:
        'This component combines a visible stop marker with a compact e-paper information layer. The static sign helps riders confirm they are at Fourth & Peabody, while the e-paper display can show next arrivals, limited-service warnings, reroutes, and service alerts. It answers the rider\'s immediate question: "Am I at the right stop, and what is happening now?"',
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: 'Makes the bus stop recognizable from a distance.',
      detail:
        'The stop indicator is the first visual cue in the rider-facing environment. It uses route badges, the MTD identity, and the i-Stop marker so riders can recognize the boarding area before they have to read a full map or schedule.',
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? Print Panel',
      short: 'Stable orientation map for the stop and nearby boarding corners.',
      detail:
        "This printed panel provides stable orientation rather than real-time updates. It shows the rider's current corner, nearby landmarks, and other boarding corners around Fourth & Peabody. It also points riders to the kiosk or QR code for reroutes, alerts, language support, and accessibility information, keeping the printed layer readable instead of overcrowded.",
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: 'Deeper route planning and detailed guidance.',
      detail:
        'The LCD kiosk extends the original Better Kiosk research into this stop-level prototype. Instead of placing every detail on the printed sign, the kiosk supports deeper route planning, full route maps, language options, accessibility settings, and detailed schedule exploration when riders need more support.',
    },
    Hotspot_AudioProvider_StopSign: {
      title: 'Audio Guidance at Stop Sign',
      short: 'Spoken assistance near the stop marker.',
      detail:
        'The audio component supports riders who cannot easily read small text, are scanning the stop quickly, or need spoken guidance. It connects accessibility support to the physical stop environment, not only to a bus, app, or separate website.',
    },
    Hotspot_AudioProvider_InShelter: {
      title: 'Audio Guidance in Shelter',
      short: 'Spoken guidance near the waiting area.',
      detail:
        'The in-shelter audio point gives riders another place to access spoken information while waiting. It can repeat key guidance from the printed map, kiosk, and QR guide without asking every rider to read a screen.',
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: 'Mobile access to live information and language support.',
      detail:
        'The QR guide connects the physical stop to a mobile information layer. It can provide live schedules, reroutes, alerts, accessibility information, and language support without overcrowding the printed panel. In this prototype, the interface currently supports English and Chinese, with Spanish reserved as a future language option.',
    },
    Hotspot_TactilePaving: {
      title: 'Accessible Boarding Area',
      short: 'Connects wayfinding information to the physical boarding space.',
      detail:
        'The tactile paving marks where riders should wait and board. It shows that wayfinding is not only about signs and screens; physical cues also help riders translate information into movement at the stop.',
    },
    Hotspot_MapPanel: {
      title: 'Boarding Corner Map',
      short: 'Shows the stop in relation to nearby corners and landmarks.',
      detail:
        'The map panel helps first-time and occasional riders translate the street corner into a boarding decision. It clarifies the current corner, nearby boarding directions, and how to move from orientation to action at Fourth & Peabody.',
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper Display',
      short: 'Compact live status for arrivals, limits, and disruptions.',
      detail:
        'The e-paper display is the lightweight dynamic update layer. It can change between normal arrivals, limited-service warnings, and reroute alerts without forcing every rider to open a phone first or search through a full system map.',
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
  },
} satisfies Messages;
