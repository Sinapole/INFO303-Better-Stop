import type { Messages } from './types';

/** 当模型 hotspot 名称或说明文案变化时，优先修改这里的英文基准文案。 */
export const en = {
  app: {
    title: 'Better Stop',
    subtitle: 'An interactive wayfinding system prototype for MTD riders',
    eyebrow: 'INFO 303 Final Remix Prototype',
    instruction: 'Hover or click a component to see how it supports a rider decision.',
    sectionLabel: 'Section',
    prototypeNav: 'Prototype',
    aboutNav: 'About',
    creditsNav: 'Credits',
    hotspotPanelTitle: 'Rider-First Wayfinding Component',
    noHotspotTitle: 'Explore this renovated Fourth & Peabody stop!',
    noHotspotDetail:
      'Use the 3D model to explore a stop-level wayfinding environment. Each hotspot explains how that component turns transit information into guidance a rider can act on at the stop.',
    selectedLabel: 'Selected component',
    previewLabel: 'Component preview',
    decisionTitle: 'Rider Decision Panel',
    decisionFieldLabels: {
      decisionHelped: 'Decision helped',
      whatRiderLearns: 'What you can learn',
      nextAction: 'Next action',
    },
    decisionOverview: {
      decisionHelped: 'Move from uncertainty to a clear action',
      whatRiderLearns:
        'The stop is treated as a small wayfinding system. Static signs, printed maps, e-paper updates, kiosk screens, QR access, audio prompts, and tactile cues each answer a different question a rider may have at the corner.',
      nextAction:
        'Hover or select a component to see what kind of uncertainty it reduces and what action it makes easier!',
    },
    languageLabel: 'Language',
    themeLabel: 'Theme',
    themeAuto: 'Auto',
    themeLight: 'Light',
    themeDark: 'Dark',
    clearSelection: 'Clear selection',
    guideButton: 'Guide',
    guideNext: 'Next',
    guideBack: 'Back',
    guideSkip: 'Skip',
    guideStart: 'Start exploring',
    guideStepLabel: 'Step',
    guideSteps: [
      {
        title: 'Project Forestory',
        body: 'Better Stop is a remix from the earlier Better Kiosk + MTD wayfinding research.',
        target: 'forestory',
        points: [
          'Here it will focuses on Fourth & Peabody as one proof of concept stop.',
          'I was also trapped at a stop without understanding where to go!',
          'In this remix, physical and digital information layers would help first-time and occasional MTD riders make decisions on site.',
        ],
      },
      {
        title: '3D Stop Model',
        body: 'The model lets you explore a rider-first stop-level wayfinding environment.',
        target: 'scene',
        points: ['👉Hover or click a component to see what it does in the stop environment!'],
      },
      {
        title: 'Hotspot Panel',
        body: 'Here would explain the current component and the role it plays in the redesigned stop.',
        target: 'hotspot',
        points: ['Hover gives a preview, and clicking will keep the explanation selected.'],
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
        body: 'The interface currently supports English and Chinese to our riders. ES is the first limit I encountered that I can not understand spanish, so I left: Español próximamente. (Spanish Coming Soon)',
        target: 'language',
        points: ['Open About to read the project rationale, scope, and framing.'],
      },
    ],
  },
  viewer: {
    loading: 'Loading 3D stop model...',
    loadError: 'The 3D model could not be loaded 😭',
    dragHint: 'Drag to rotate. Scroll or pinch to zoom in for sign details.',
    resetView: 'Reset camera',
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
      short: 'This part of the stop is available for future annotation.',
      detail:
        'This component is part of the 3D prototype, but it has not yet been connected to a specific wayfinding function. Future versions could explain how this part helps you identify the stop, check service information, or move through the boarding area.',
      decision: {
        decisionHelped: 'Identify a future wayfinding role',
        whatRiderLearns:
          'This component is not yet connected to a specific decision in the current prototype.',
        nextAction:
          'Explore the labeled components to see how each information layer supports a different action at the stop.',
      },
    },

    Hotspot_StopSign_WithEPaper: {
      title: 'Stop Sign + E-paper Display',
      short: 'Confirm the stop from a distance and check immediate service status.',
      detail:
        'This redesigned stop sign keeps the familiar MTD stop identity, route badges, i-Stop marker, and basic stop information, but adds a small dynamic e-paper layer. The static part helps you recognize that this is an MTD stop and confirm the corner. The e-paper area can show next arrivals, limited-service reminders, reroutes, or alert frames when a fixed timetable is not enough.',
      decision: {
        decisionHelped: 'Confirm the stop and current service status',
        whatRiderLearns:
          'You can confirm that you are at Fourth & Peabody NW Corner, see which routes serve this stop, and check whether there is an immediate arrival, warning, or alert.',
        nextAction:
          'If the stop and route look correct, stay here and check the e-paper, kiosk, or QR layer for exact arrival details, alerts, or assistance.',
      },
    },

    Hotspot_StopIndicator: {
      title: 'Stop Indicator',
      short: 'Find the bus stop from a distance, especially at night.',
      detail:
        'The solar-powered stop indicator is the first visual cue you see from a distance. It uses the bus icon, MTD identity, route badges, and i-Stop marker to make the boarding area recognizable before you read the full schedule, map, or kiosk screen. At night, the indicator can also work as a small lighting element. It does not only illuminate the stop sign itself, but also helps brighten the nearby street area, making the stop feel more visible, legible, and safe while you wait.',
      decision: {
        decisionHelped: 'Recognize the stop and feel safer while waiting',
        whatRiderLearns:
          'You can quickly tell that this location is part of the MTD stop environment, see which routes are served here, and use the lighted marker to locate the stop in low-light conditions.',
        nextAction:
          'Move toward the illuminated stop marker, then check the e-paper display, printed map, or kiosk to confirm your route and direction.',
      },
    },

    Hotspot_PrintPanel: {
      title: 'Where Am I? Print Panel',
      short: 'Use the printed map to orient yourself around Fourth & Peabody.',
      detail:
        'This printed panel focuses on stable orientation rather than live arrival times. It shows where you are, nearby landmarks such as Ikenberry Commons, ARC, Siebel School for Design, and College of Law, and the nearby boarding corners around Fourth & Peabody. The three reminder cards below the map point you to the kiosk or QR code for reroutes, alerts, language support, and accessibility information.',
      decision: {
        decisionHelped: 'Understand your location and nearby boarding corners',
        whatRiderLearns:
          'You can see which corner you are standing at, where nearby boarding corners are, and how the stop relates to recognizable campus landmarks.',
        nextAction:
          'Use the map to decide whether to stay at this corner or move to another marked corner. If your trip depends on live updates, check the kiosk or scan the QR code.',
      },
    },

    Hotspot_MapPanel: {
      title: 'Boarding Corner Map',
      short: 'Locate yourself, nearby landmarks, and other boarding corners.',
      detail:
        'The map panel turns the street corner into a readable wayfinding space. Instead of asking you to interpret the entire bus system, it focuses on the immediate area: your current corner, other Fourth & Peabody boarding corners, nearby landmarks, and route badges. This makes the printed layer useful even when the digital screens are handling arrivals and alerts.',
      decision: {
        decisionHelped: 'Choose whether to stay, cross, or move to another corner',
        whatRiderLearns:
          'You can place yourself in the intersection and compare your current corner with other nearby boarding corners.',
        nextAction:
          'If your route or direction is not served at this corner, use the map to move toward the correct marked corner before boarding.',
      },
    },

    Hotspot_BetterKiosk: {
      title: 'Better Kiosk LCD',
      short: 'Use the kiosk for deeper route planning and detailed guidance.',
      detail:
        'The LCD kiosk carries forward the original Better Kiosk idea. It is the layer for information that is too detailed for the printed sign: route maps, trip planning, schedule comparison, language options, accessibility settings, and more complete service details. This keeps the printed panel readable while still giving you a place to explore more information.',
      decision: {
        decisionHelped: 'Plan or double-check your route before boarding',
        whatRiderLearns:
          'You can compare routes, look at a fuller map, check schedule details, and access support options without overcrowding the printed sign.',
        nextAction:
          'Use the kiosk if you are unsure which route to take, which direction to board, or whether a service change affects your trip.',
      },
    },

    Hotspot_EpaperDisplay: {
      title: 'E-paper Display',
      short: 'Check compact live status without opening your phone first.',
      detail:
        'The e-paper display is the lightweight dynamic layer of the stop. It can change between normal arrivals, limited-service warnings, and reroute or alert frames. In this prototype, those updates are shown with prepared texture frames rather than live MTD data, but the purpose is to show how a stop could communicate changing service conditions clearly.',
      decision: {
        decisionHelped: 'Check what is happening right now',
        whatRiderLearns:
          'You can see whether the next bus is arriving soon, whether a route has limited service, or whether an alert changes the normal boarding situation.',
        nextAction:
          'Use the e-paper message to decide whether to keep waiting, check the kiosk or QR guide, or move to a different boarding location.',
      },
    },

    Hotspot_QRGuide: {
      title: 'QR Guide',
      short: 'Open mobile help for live updates, language support, and assistance.',
      detail:
        'The QR guide connects the physical stop to a mobile layer. Instead of forcing every language, alert, and accessibility detail onto the printed sign, the QR code gives you a place to open more information when you need it. In this prototype, the interface supports English and Chinese, with Spanish reserved as a future option.',
      decision: {
        decisionHelped: 'Get more information without crowding the sign',
        whatRiderLearns:
          'You can use your phone to access live updates, reroutes, alerts, accessibility information, and supported language options.',
        nextAction:
          'Scan the QR code when the printed map is not enough or when you need language or accessibility support.',
      },
    },

    Hotspot_AudioProvider_StopSign: {
      title: 'Audio Guidance at Stop Sign',
      short: 'Hear key stop information near the stop marker.',
      detail:
        'This audio point is a prototype accessibility layer near the stop sign. It helps when small text is hard to read, when you are moving quickly, or when spoken confirmation is easier than reading the map. In the website, the voice is simulated with the browser SpeechSynthesis API.',
      decision: {
        decisionHelped: 'Confirm the stop through spoken guidance',
        whatRiderLearns:
          'You can hear the stop name, corner, served routes, and next-arrival information without relying only on printed text.',
        nextAction:
          'Use the spoken prompt to confirm that you are at the right stop, then check the e-paper, kiosk, or boarding area.',
      },
      audio: {
        buttonLabel: 'Play audio guidance',
        ariaLabel: 'Play spoken guidance for Fourth and Peabody stop',
        locale: 'en-US',
        preferredVoiceNames: ['Samantha', 'Ava', 'Alex', 'Google US English', 'Microsoft Aria'],
        transcript:
          'This stop is Fourth and Peabody at the northwest corner. It serves Route 22 North Illini and Route 24 South Link. The next bus is Route 22 North Illini, arriving in about 3 minutes. Route 24 South Link arrives in about 8 minutes.',
        unsupportedMessage:
          'This browser does not support built-in speech playback. The audio guidance transcript is shown below.',
      },
    },

    Hotspot_AudioProvider_InShelter: {
      title: 'Audio Guidance in Shelter',
      short: 'Hear guidance while waiting inside the shelter.',
      detail:
        'The in-shelter audio point repeats important guidance where you may already be waiting. It pairs with the printed map, kiosk, and QR guide so that information is not only visual. In the website, the spoken layer is simulated with browser SpeechSynthesis and can be edited through the same text files as the rest of the interface.',
      decision: {
        decisionHelped: 'Check guidance while waiting',
        whatRiderLearns:
          'You can hear stop, route, or alert information from the waiting area instead of relying only on screens or printed signs.',
        nextAction:
          'Use the audio cue to decide whether to keep waiting, move to the boarding area, or check a dynamic update source.',
      },
      audio: {
        buttonLabel: 'Play audio guidance',
        ariaLabel: 'Play spoken guidance for Fourth and Peabody stop',
        locale: 'en-US',
        preferredVoiceNames: ['Samantha', 'Ava', 'Alex', 'Google US English', 'Microsoft Aria'],
        transcript:
          'This stop is Fourth and Peabody at the northwest corner. It serves Route 22 North Illini and Route 24 South Link. The next bus is Route 22 North Illini, arriving in about 3 minutes. Route 24 South Link arrives in about 8 minutes.',
        unsupportedMessage:
          'This browser does not support built-in speech playback. The audio guidance transcript is shown below.',
      },
    },

    Hotspot_TactilePaving: {
      title: 'Accessible Boarding Area',
      short: 'Connect visual information to the physical place where boarding happens.',
      detail:
        'The tactile paving marks the waiting and boarding area in the physical stop environment. It shows that wayfinding is not only about signs, maps, and screens. You also need physical cues that help translate information into movement through the stop.',
      decision: {
        decisionHelped: 'Move safely toward the boarding area',
        whatRiderLearns:
          'You can connect the information from the sign, map, e-paper, or kiosk to the physical place where boarding happens.',
        nextAction:
          'Move toward the marked boarding area and wait where the bus interaction is most visible and accessible.',
      },
    },
  },
  rationale: {
    eyebrow: 'Why this prototype?',
    title: 'Project Rationale',

    body: 'Better Stop is an INFO 303 multimodal prototype that remixes my earlier CS 222 Better Kiosk project with my INFO 303 Miro-based exploration of MTD wayfinding.',

    bodyParagraphs: [
      'Better Stop grows out of two earlier stages of work: the Better Kiosk project from CS 222 and my INFO 303 Miro-based exploration of MTD wayfinding. Better Kiosk originally focused on how a digital kiosk could improve transit information access. In INFO 303, I expanded that idea by thinking about wayfinding as something that happens across a whole stop environment, not only on one screen.',

      'This prototype turns those earlier ideas into a redesigned Fourth & Peabody stop. Instead of designing a full transit network or a professional design book, Better Stop uses one stop as a proof of concept. The prototype asks how a bus stop can help you make decisions in the moment: where you are, which boarding corner you need, where to check reroutes and alerts, and how to access language or accessibility support.',

      'Because I cannot build or deploy a real MTD stop for this assignment (which is kind of sad), the final artifact takes the form of an interactive 3D model hosted on a website. This format lets you inspect the stop spatially, hover or click on its components, and see how printed maps, e-paper updates, kiosk screens, QR access, audio guidance, and tactile cues work together as a rider-facing information system.',
    ],

    contentsLabel: 'On this page',
    scrollCue: 'Scroll for project scope and multimodal strategy',

    pointsTitle: 'Multimodal Strategy',

    points: [
      'Linguistic: short, action-oriented wording helps you understand what to do next, such as checking reroutes, confirming direction, or scanning for help.',
      'Visual: Element design consist with current MTD design, with clarity improvements in bold typography, route badges, high-contrast maps, color-coded alerts, and transit-style layout make stop information readable at a glance.',
      'Aural: audio guidance points show how spoken information could support riders who cannot easily read the sign, prefer verbal confirmation, or need accessibility support.',
      'Spatial: the 3D model treats wayfinding as movement through a physical stop environment, from identifying the stop to finding the right corner and boarding area.',
      'Digital layers: the e-paper display, Better Kiosk LCD, and QR guide handle changing or detailed information without overcrowding the printed map panel.',
      'The design goal is not to show more information everywhere; it is to turn transit information into actionable guidance for first-time and occasional MTD riders.',
      'The interface currently supports English and Chinese, to give riders that English is their second language a reference.',
    ],

    scopeTitle: 'Project Scope',

    scopeItems: [
      'Prototype, not product: Better Stop is a design prototype, not a finished MTD service product or operations simulator.',
      'One stop as proof of concept: the project focuses on Fourth & Peabody so the design can stay concrete, spatial, and rider-facing.',
      'Based on earlier work: the prototype remixes CS 222 Better Kiosk work with INFO 303 Miro-based exploration of wayfinding, signage, and rider needs.',
      "Focused audience: the primary audience is first-time and occasional MTD riders near UIUC, including riders who may need language or accessibility support. There's also a generalizability to all riders enjoy a clearer guidance when needed",
      'Simulated dynamic information: arrival, alert, and limited-service displays use sample frames rather than live MTD data to be a light weight prototype.',
      'Website as artifact: because the real stop cannot be physically built for this assignment, the project uses an interactive 3D website to make the prototype explorable.',
    ],
  },
  credits: {
    eyebrow: 'References and materials',
    title: 'Credits',
    body: 'This section documents the research references, visual materials, and tools that support the Better Stop prototype. The main experience stays focused on the rider-facing artifact, while this page records what the project builds on.',
    contentsLabel: 'On this page',
    scrollCue: 'Scroll for references, assets, map sources, and implementation notes',
    sections: [
      {
        title: 'Research and Design References',
        body: 'The prototype is informed by my earlier CS222 Better Kiosk project and INFO 303 Miro-based exploration of MTD wayfinding. I also looked at real transit information systems and design references, including COTA’s Transit Stop Design Guide, Legible London, MTD route and stop information, and Stamen / Maperture map styles. These references helped me think about stop identification, route information, accessible boarding, consistent wayfinding, and local orientation maps.',
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
        title: 'Prototype Assets',
        body: 'The 3D stop model was built in Blockbench. The printed map panel, enlarged stop signage, e-paper frames, kiosk screen textures, and other visual panels were designed by me using Adobe Illustrator and Adobe Photoshop. Some material textures in the 3D model use Minecraft-style texture resources as placeholder surface materials for the prototype environment.',
      },
      {
        title: 'Map Source',
        body: 'The printed wayfinding map was created using Stamen / Maperture as a visual map reference, then redesigned and annotated for the prototype. The map layer is used as a starting point rather than a final transit map; I added stop labels, route badges, landmarks, QR guidance, and rider-facing instructions to fit the Fourth & Peabody stop context.',
        links: [
          {
            label: 'Stamen Maperture',
            url: 'https://stamen.github.io/maperture/',
          },
        ],
      },
      {
        title: 'Implementation Notes',
        body: 'The interactive website was built with Vue, TypeScript, and Three.js. The website uses a static 3D model and prototype texture frames rather than live MTD data. Audio guidance is simulated in the browser, and display updates are represented with prepared texture states.',
      },
    ],
  },
} satisfies Messages;
