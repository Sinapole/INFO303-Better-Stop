import type { PartialMessages } from './types';

export const es = {
  app: {
    title: 'Better Stop',
    subtitle: 'Un remix interactivo de orientación para usuarios de MTD',
    eyebrow: 'Remix multimodal de INFO 303',
    instruction: 'Pasa el cursor o haz clic en un componente para aprender más.',
    hotspotPanelTitle: 'Componente del paradero',
    noHotspotTitle: 'Explora el paradero Fourth & Peabody',
    noHotspotDetail:
      'Pasa el cursor sobre un componente del modelo 3D y haz clic para fijar su explicación detallada en este panel.',
    selectedLabel: 'Componente seleccionado',
    previewLabel: 'Vista previa',
    scenarioTitle: 'Escenario de servicio',
    scenarioStatusLabel: 'Modo actual',
    decisionTitle: 'Preguntas del pasajero',
    decisionQuestions: [
      '¿Dónde estoy ahora?',
      '¿En qué esquina o dirección debo abordar?',
      '¿Dónde reviso desvíos, alertas, servicio limitado o llegadas exactas?',
      '¿Cómo accedo a ayuda de idioma, accesibilidad o audio?',
    ],
    routeChips: ['Fourth & Peabody', 'MTD', 'i-Stop', 'UIUC'],
    languageLabel: 'Idioma',
    clearSelection: 'Borrar selección',
  },
  viewer: {
    loading: 'Cargando modelo 3D del paradero...',
    loadError: 'No se pudo cargar el modelo 3D.',
    dragHint: 'Arrastra para rotar. Usa scroll o pellizco para acercar.',
    resetView: 'Restablecer vista',
    textureTargetWarning:
      'No se encontró una malla de e-paper, display, screen o kiosk para las texturas del escenario.',
    textureMissingWarning:
      'No se encontró la textura del escenario. Se mantiene el material original.',
  },
  scenarios: {
    normal: {
      label: 'Servicio normal',
      description:
        'El modo de servicio normal muestra el paradero funcionando como se espera: los pasajeros pueden confirmar el paradero, revisar próximas llegadas y usar el kiosco o el código QR para más detalles.',
    },
    limited: {
      label: 'Servicio limitado',
      description:
        'El modo de servicio limitado muestra que la existencia de una ruta no significa que esté disponible ahora. La pantalla debe advertir cuando una ruta solo funciona en horarios específicos o tiene pocos viajes restantes.',
    },
    reroute: {
      label: 'Desvío / Alerta',
      description:
        'El modo de desvío muestra por qué importa la información dinámica. Cuando cambian los patrones normales de abordaje, el sistema debe decir a los pasajeros a dónde ir después, no solo que existe un cambio.',
    },
  },
  hotspots: {
    default: {
      title: 'Componente sin etiqueta',
      short: 'Este componente del modelo está listo para una anotación futura.',
      detail:
        'Este hotspot existe en el modelo 3D, pero todavía no tiene una descripción completa. Agrega o revisa sus metadatos en los archivos i18n para explicar cómo ayuda a los pasajeros con una decisión de orientación.',
    },
    Hotspot_StopSign_WithEPaper: {
      title: 'Señal del paradero + e-paper',
      short: 'Identificación del paradero a distancia y estado inmediato del servicio.',
      detail:
        'Este componente combina una señal visible del paradero con una capa compacta de información e-paper. La señal estática ayuda a confirmar que el pasajero está en el paradero correcto, mientras que el e-paper puede mostrar próximas llegadas, avisos de servicio limitado, desvíos y alertas. Responde la pregunta inmediata: "¿Estoy en el paradero correcto y qué está pasando ahora?"',
    },
    Hotspot_StopIndicator: {
      title: 'Indicador del paradero',
      short: 'Hace que el paradero sea reconocible desde lejos.',
      detail:
        'El indicador del paradero funciona como la primera señal visual en el entorno. Usa insignias de ruta, la identidad de MTD y el marcador i-Stop para que los pasajeros reconozcan el área de abordaje antes de leer información detallada.',
    },
    Hotspot_PrintPanel: {
      title: 'Panel impreso: ¿Dónde estoy?',
      short: 'Mapa estable de orientación para el paradero y las esquinas cercanas.',
      detail:
        'Este panel impreso prioriza la orientación espacial en lugar de las llegadas en tiempo real. Muestra la esquina actual del pasajero, puntos de referencia cercanos y otras esquinas de abordaje alrededor de Fourth & Peabody. También dirige a los pasajeros al kiosco o al código QR para desvíos, alertas, ayuda de idioma e información de accesibilidad.',
    },
    Hotspot_BetterKiosk: {
      title: 'LCD Better Kiosk',
      short: 'Planificación de rutas y guía detallada.',
      detail:
        'El kiosco LCD extiende el concepto original de Better Kiosk. En vez de poner todos los detalles en la señal impresa, el kiosco apoya una interacción más profunda: mapas completos, planificación de viaje, opciones de idioma, ajustes de accesibilidad y exploración de horarios.',
    },
    Hotspot_AudioProvider_StopSign: {
      title: 'Guía de audio en la señal',
      short: 'Asistencia hablada cerca del marcador del paradero.',
      detail:
        'El componente de audio apoya a pasajeros que no pueden leer texto pequeño con facilidad o que necesitan guía hablada. Conecta la accesibilidad con el entorno físico del paradero, no solo con el bus o la app.',
    },
    Hotspot_AudioProvider_InShelter: {
      title: 'Guía de audio en el refugio',
      short: 'Guía hablada cerca del área de espera.',
      detail:
        'El punto de audio en el refugio ofrece otro lugar para acceder a información hablada mientras se espera. Puede trabajar junto con el mapa impreso, el kiosco y la guía QR.',
    },
    Hotspot_QRGuide: {
      title: 'Guía QR',
      short: 'Acceso móvil a información en vivo y apoyo de idioma.',
      detail:
        'La guía QR conecta el paradero físico con una capa móvil de información. Puede ofrecer horarios en vivo, desvíos, alertas, información de accesibilidad y apoyo multilingüe sin saturar el panel impreso.',
    },
    Hotspot_TactilePaving: {
      title: 'Área accesible de abordaje',
      short: 'Conecta la información de orientación con el espacio físico de abordaje.',
      detail:
        'El pavimento táctil marca dónde deben esperar y abordar los pasajeros. Muestra que la orientación no trata solo de señales y pantallas, sino también de cómo la información se conecta con el movimiento en el espacio.',
    },
    Hotspot_MapPanel: {
      title: 'Mapa de esquinas de abordaje',
      short: 'Muestra el paradero en relación con esquinas y puntos de referencia cercanos.',
      detail:
        'El panel de mapa ayuda a pasajeros primerizos a convertir la esquina de la calle en una decisión de abordaje. Debe aclarar la esquina actual, las direcciones cercanas de abordaje y cómo pasar de orientación a acción.',
    },
    Hotspot_EpaperDisplay: {
      title: 'Pantalla e-paper',
      short: 'Estado compacto para llegadas, límites y interrupciones.',
      detail:
        'La pantalla e-paper es una capa dinámica ligera. Puede cambiar entre llegadas normales, avisos de servicio limitado y alertas de desvío sin obligar a cada pasajero a abrir primero el teléfono.',
    },
  },
  rationale: {
    eyebrow: 'Por qué este artefacto',
    title: 'Razonamiento del proyecto',
    body: 'Este proyecto remixa mi investigación previa de Better Kiosk en un prototipo de paradero dirigido a pasajeros. En vez de diseñar toda una red de transporte o un libro profesional de diseño, me enfoco en un paradero como prueba de concepto concreta. El modelo 3D y el sitio interactivo permiten explorar cómo la señalización física, los mapas impresos, las actualizaciones e-paper, el kiosco LCD, el acceso QR, la guía de audio y el pavimento táctil trabajan juntos cuando un pasajero necesita tomar una decisión.',
    pointsTitle: 'Estrategia multimodal',
    points: [
      'Diseñado para pasajeros nuevos u ocasionales de MTD cerca de UIUC.',
      'Enfocado en Fourth & Peabody como prueba de concepto a nivel de paradero, no como red completa.',
      'Usa modelo 3D, panel de mapa impreso, pantalla e-paper, kiosco LCD, guía QR, guía de audio y pavimento táctil.',
      'Usa un prototipo para pasajeros en lugar de un libro de diseño porque la audiencia son usuarios, no diseñadores profesionales.',
      'El objetivo no es mostrar más información, sino convertir información de transporte en guía accionable.',
    ],
  },
} satisfies PartialMessages;
