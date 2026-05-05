import type { Messages } from './types';

/** 当模型 hotspot 名称或说明文案变化时，优先修改这里的英文基准文案。 */
export const en = {
  app: {
    title: 'Better Stop',
    subtitle: 'An interactive wayfinding remix for MTD riders',
    eyebrow: 'INFO 303 Multimodal Remix',
    instruction: 'Hover or click a component to learn more.',
    hotspotPanelTitle: 'Stop-Level Component',
    noHotspotTitle: 'Explore the Fourth & Peabody stop',
    noHotspotDetail:
      'Hover over a labeled component in the 3D model, then click to keep its detailed explanation in this panel.',
    selectedLabel: 'Selected component',
    previewLabel: 'Hover preview',
    scenarioTitle: 'Service Scenario',
    scenarioStatusLabel: 'Current mode',
    decisionTitle: 'Rider Questions',
    decisionQuestions: [
      'Where am I now?',
      'Which corner or direction should I board from?',
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
        'Normal service mode shows the stop functioning as expected: riders can confirm the stop, check next arrivals, and use the kiosk or QR code for more details.',
    },
    limited: {
      label: 'Limited Service',
      description:
        'Limited service mode demonstrates that route existence is not the same as route availability. The display should warn riders when a route only runs at listed times or has few trips remaining.',
    },
    reroute: {
      label: 'Reroute / Alert',
      description:
        'Reroute mode demonstrates why dynamic information matters. When normal boarding patterns change, the system should tell riders where to go next, not just that a change exists.',
    },
  },
  hotspots: {
    default: {
      title: 'Unlabeled Stop Component',
      short: 'This model component is available for future annotation.',
      detail:
        'This hotspot exists in the 3D model but does not yet have a written description. Add or revise its metadata in the i18n files to define how it helps riders make a wayfinding decision.',
    },
    Hotspot_StopSign_WithEPaper: {
      title: 'Stop Sign + E-paper Display',
      short: 'Long-distance stop identification and immediate service status.',
      detail:
        'This component combines a visible stop marker with a compact e-paper information layer. The static sign helps riders confirm they are at the correct stop, while the e-paper display can show next arrivals, limited-service warnings, reroutes, and service alerts. It answers the rider\'s immediate question: "Am I at the right stop, and what is happening now?"',
    },
    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: 'Makes the bus stop recognizable from a distance.',
      detail:
        'The stop indicator works as the first visual cue in the environment. It uses route badges, the MTD identity, and the i-Stop marker so riders can recognize the boarding area before reading detailed information.',
    },
    Hotspot_PrintPanel: {
      title: 'Where Am I? Print Panel',
      short: 'Stable orientation map for the stop and nearby boarding corners.',
      detail:
        "This printed panel prioritizes spatial orientation rather than real-time arrivals. It shows the rider's current corner, nearby landmarks, and other boarding corners around Fourth & Peabody. It also directs riders to the kiosk or QR code for reroutes, alerts, language support, and accessibility information. This keeps the printed layer stable and readable.",
    },
    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: 'Deeper route planning and detailed guidance.',
      detail:
        'The LCD kiosk extends the original Better Kiosk concept. Instead of placing every detail on the printed sign, the kiosk supports deeper interaction: full route maps, trip planning, language options, accessibility settings, and detailed schedule exploration.',
    },
    Hotspot_AudioProvider_StopSign: {
      title: 'Audio Guidance at Stop Sign',
      short: 'Spoken assistance near the stop marker.',
      detail:
        'The audio component supports riders who cannot easily read small text or who need spoken guidance. It connects accessibility to the physical stop environment, not only to the bus or the app.',
    },
    Hotspot_AudioProvider_InShelter: {
      title: 'Audio Guidance in Shelter',
      short: 'Spoken guidance near the waiting area.',
      detail:
        'The in-shelter audio point gives riders another place to access spoken information while waiting. It can be paired with the printed map, kiosk, and QR guide.',
    },
    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: 'Mobile access to live information and language support.',
      detail:
        'The QR guide connects the physical stop to a mobile information layer. It can provide live schedules, reroutes, alerts, accessibility information, and multilingual support without overcrowding the printed panel.',
    },
    Hotspot_TactilePaving: {
      title: 'Accessible Boarding Area',
      short: 'Connects wayfinding information to the physical boarding space.',
      detail:
        'The tactile paving marks where riders should wait and board. It helps show that wayfinding is not only about signs and screens, but also about how information connects to movement through space.',
    },
    Hotspot_MapPanel: {
      title: 'Boarding Corner Map',
      short: 'Shows the stop in relation to nearby corners and landmarks.',
      detail:
        'The map panel helps first-time riders translate the street corner into a boarding decision. It should clarify the current corner, nearby boarding directions, and how to move from orientation to action.',
    },
    Hotspot_EpaperDisplay: {
      title: 'E-paper Display',
      short: 'Compact live status for arrivals, limits, and disruptions.',
      detail:
        'The e-paper display is the lightweight dynamic layer. It can change between normal arrivals, limited-service warnings, and reroute alerts without forcing every rider to open a phone first.',
    },
  },
  rationale: {
    eyebrow: 'Why this artifact',
    title: 'Project Rationale',
    body: 'This project remixes my previous Better Kiosk research into a rider-facing stop prototype. Instead of designing a full transit network or a professional design book, I focus on one stop as a concrete proof-of-concept. The 3D model and interactive website let viewers explore how physical signage, printed maps, e-paper updates, LCD kiosk support, QR access, audio guidance, and tactile paving work together at the moment a rider needs to make a decision.',
    pointsTitle: 'Multimodal Strategy',
    points: [
      'Built for first-time and occasional MTD riders near UIUC.',
      'Focused on Fourth & Peabody as a stop-level proof-of-concept, not an entire transit network.',
      'Uses 3D model interaction, printed map panel, e-paper status, LCD kiosk support, QR guide, audio guidance, and tactile paving.',
      'Uses a rider-facing prototype instead of a professional design book because the audience is passengers, not designers.',
      'The design goal is not to show more information; it is to turn transit information into actionable guidance.',
    ],
  },
} satisfies Messages;
