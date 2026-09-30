// Estructura Curricular Oficial del Curso: "Desarrollo de Software Impulsado por IA"
// Instructores: Sebastián Almeda & Iván Valles
// Diseñado para una experiencia intensiva de 3 días prácticos de alta ingeniería.

export const COURSE_INFO = {
  title: "Desarrollo de Software Impulsado por IA",
  subtitle: "De Desarrollador Tradicional a Arquitecto y Orquestador de Agentes Inteligentes",
  edition: "Edición 2026 // Nivel Profesional & Universitario",
  instructor: {
    name: "Sebastián Almeda & Iván Valles",
    role: "Instructores del Curso",
    quote: "La IA no va a reemplazar a los ingenieros de software, pero los ingenieros que dominan agentes, RAG y protocolos abiertos reemplazarán a los que sólo usan chats tradicionales."
  },
  summary: "Aprende a transformar radicalmente tu flujo de ingeniería de software dominando agentes de código con lectura de workspace, arquitecturas RAG locales con cero alucinaciones, orquestación de subagentes guiada por TDD y la revolución de herramientas mediante el Model Context Protocol (MCP).",
  stats: [
    { label: "Duración", value: "3 Días Intensivos" },
    { label: "Enfoque", value: "100% Práctico en Workspace" },
    { label: "Metodología", value: "TDD + RAG Local + MCPs" },
    { label: "Proyecto", value: "Hackathon con Pitch Exprés" }
  ],
  techBadges: [
    "Claude Code", "OpenCode", "Codex", "Gemini / Antigravity", 
    "Git & GitHub", "Visual Studio Code", "RAG Local (JSON/Docs)", 
    "Subagentes TDD", "Model Context Protocol (MCP)"
  ],
  requiredResources: [
    "Cuenta Claude Pro compartida",
    "OpenCode",
    "Codex",
    "Equipo de cómputo individual",
    "Conexión a internet estable",
    "Visual Studio Code",
    "Git instalado y cuenta en GitHub"
  ]
};

export const COURSE_DAYS = [
  {
    id: 1,
    dayNumber: "01",
    title: "Agentes de Código y Prompt Engineering",
    focus: "Introducción a los agentes de código, comparación frente al chat tradicional, herramientas líderes (Claude Code, Codex, Gemini/Antigravity, OpenCode), entorno con Git, GitHub y VS Code, y diseño de prompts efectivos.",
    pedagogyPillar: "Dejar de copiar y pegar fragmentos en ventanas de chat: conectar la IA al entorno de desarrollo y utilizar prompts estructurados para crear activos de software (logos, componentes y landing pages).",
    schedule: [
      {
        time: "09:00 - 09:45",
        duration: "45 min",
        topic: "Introducción a los Agentes de Código & Chat de IA vs. Agente de Código",
        description: "¿Qué es un agente de código? Diferencias estructurales frente a un chat de IA tradicional: autonomía, lectura de árbol de archivos, ejecución de comandos y contexto profundo de workspace."
      },
      {
        time: "09:45 - 10:45",
        duration: "1 hr",
        topic: "Principales Herramientas: Claude Code, Codex, Gemini/Antigravity, OpenCode",
        description: "Panorama comparativo de las herramientas líderes en la industria, instalación y configuración práctica del entorno de desarrollo para desarrollo con agentes."
      },
      {
        time: "10:45 - 11:15",
        duration: "30 min",
        topic: "Receso / Coffee Break",
        description: "Espacio de networking, café y resolución de dudas iniciales sobre herramientas instaladas."
      },
      {
        time: "11:15 - 12:15",
        duration: "1 hr",
        topic: "Git, GitHub, VS Code y Configuración del Agente de Código",
        description: "El control de versiones como salvaguarda ante cambios rápidos de la IA. Configuración de credenciales de Git, creación de repositorios en GitHub, integración en VS Code y activación del agente."
      },
      {
        time: "12:15 - 13:15",
        duration: "1 hr",
        topic: "Estructura y Diseño de Prompts para Desarrollo de Software",
        description: "Diseño de prompts de alta precisión: Rol técnico, Contexto de workspace, Tarea quirúrgica y Restricciones estrictas (RCTR). Ejemplos aplicados a generación de interfaces, logos SVG y componentes."
      },
      {
        time: "13:15 - 15:00",
        duration: "1 hr 45 min",
        topic: "Ejercicios Prácticos: Construcción de un Proyecto con un Agente de Código",
        description: "Taller guiado: creación de los recursos esenciales de un proyecto web mediante prompts (identidad/logo SVG, componentes reutilizables y landing page) y subida a tu primer repositorio en GitHub."
      }
    ],
    presentation: {
      url: "https://canva.link/s8nrewdatr349jf",
      embedUrl: "https://www.canva.com/design/DAHWDNVGVlI/qpr1QiooBU6vWfiK8QHhlw/view?embed",
      title: "Slides Día 1: Desarrollo de Software Aumentado por IA (Canva Oficial)",
      status: "disponible",
      embedPlaceholder: "Presentación oficial interactiva en Canva diseñada por Sebastián Almeda e Iván Valles. Cubre la diferencia entre Chat de IA vs. Agente de IA, Claude Code y OpenCode, fundamentos de Git y GitHub, anatomía de prompts estructurados y ejemplos de prompts malos vs. buenos."
    },
    resources: [
      {
        id: "r1-1",
        title: "Guía Exprés: Tu Primer Repositorio en GitHub y Control de Versiones",
        type: "guide",
        fileName: "dia1-guia-git-github.md",
        size: "9 KB",
        description: "Paso a paso para crear tu repositorio vacío en GitHub, configurar Git en tu máquina, conectar tu carpeta local, hacer tu primer commit y push para encender tus puntitos verdes.",
        downloadUrl: "/downloads/dia1-guia-git-github.md"
      },
      {
        id: "r1-2",
        title: "Guía y Plantilla: Creación de Recursos y Landing Page con Prompts",
        type: "guide",
        fileName: "dia1-reto-creacion-recursos.md",
        size: "11 KB",
        description: "Plantillas de prompts listas para generar conceptos visuales, logos vectoriales en SVG puro, componentes modulares (Navbar, Hero, Cards) y ensamblado de landing page.",
        downloadUrl: "/downloads/dia1-reto-creacion-recursos.md"
      },
      {
        id: "r1-3",
        title: "Framework de Prompts de Alto Rendimiento para Devs",
        type: "markdown",
        fileName: "dia1-prompts-alto-rendimiento.md",
        size: "12 KB",
        description: "Estructura de 4 capas (Rol, Contexto, Tarea, Restricciones) con ejemplos prácticos para generación de código limpio, refactorización y arquitectura.",
        downloadUrl: "/downloads/dia1-prompts-alto-rendimiento.md"
      },
      {
        id: "r1-4",
        title: "Guía de Setup: Herramientas, VS Code y Agentes de Código",
        type: "guide",
        fileName: "dia1-guia-entorno-agentes.md",
        size: "8 KB",
        description: "Instalación y configuración recomendada de herramientas (VS Code, OpenCode, Claude Code, Codex, Antigravity) y atajos de teclado clave.",
        downloadUrl: "/downloads/dia1-guia-entorno-agentes.md"
      }
    ],
    challenge: {
      id: "reto-dia-1",
      title: "Reto del Día 1: Creación de Recursos para un Proyecto con Prompts",
      mission: "Utilizar tu agente de código y prompts estructurados para generar desde cero los activos clave de un nuevo proyecto web: su concepto de marca, un logo en formato SVG o CSS, al menos dos componentes UI reutilizables (Navbar, Cards, Hero) y ensamblar una landing page interactiva completa. Finalmente, guardar tu avance y publicarlo en tu primer repositorio en GitHub.",
      acceptanceCriteria: [
        "Definir el concepto/tema de tu proyecto y redactar el prompt inicial con estructura (Rol, Contexto, Instrucción y Restricciones).",
        "Generar con el agente un logotipo o isotipo vectorial (código SVG limpio o componente gráfico).",
        "Diseñar y obtener el código de al menos 2 componentes UI reutilizables (ej. Barra de navegación y tarjetas de características o servicios).",
        "Ensamblar la Landing Page funcional completa integrando el logo y componentes en un archivo index.html o web app.",
        "Aplicar la Guía Exprés de Git & GitHub: inicializar Git local, hacer el commit y subirlo (git push) a tu nuevo repositorio público para encender tu actividad verde en GitHub."
      ],
      proTip: "Divide y vencerás: No le pidas al agente 'hazme una página entera' de golpe. Primero pídele la paleta y el logo SVG, luego la estructura general de la landing, y por último los componentes individuales. ¡Obtendrás una calidad 10 veces mayor!"
    }
  },
  {
    id: 2,
    dayNumber: "02",
    title: "RAG y Subagentes",
    focus: "Conceptos fundamentales y arquitectura RAG, implementación de RAG básico con archivos locales, y orquestación de subagentes especializados con TDD y especificaciones Markdown.",
    pedagogyPillar: "Enfoque pragmático de RAG con archivos JSON y documentos locales: la IA como un estudiante con 'libro abierto' para grounding total sin perder tiempo en configuraciones matemáticas pesadas de bases vectoriales.",
    schedule: [
      {
        time: "09:00 - 10:15",
        duration: "1 hr 15 min",
        topic: "Conceptos Fundamentales de RAG y Arquitectura de un Sistema RAG",
        description: "¿Qué es Retrieval-Augmented Generation? Arquitectura cliente-recuperador-generador. La IA con 'libro abierto' para erradicar alucinaciones en código y especificaciones técnicas."
      },
      {
        time: "10:15 - 11:00",
        duration: "45 min",
        topic: "Implementación de un RAG Básico y Aplicaciones Prácticas",
        description: "Construcción práctica de un flujo RAG local conectado a carpetas de documentos y datasets JSON. Grounding estricto y respuestas basadas exclusivamente en fuentes."
      },
      {
        time: "11:00 - 11:30",
        duration: "30 min",
        topic: "Receso / Coffee Break",
        description: "Descanso y espacio para compartir ideas de proyectos finales inspirados en flujos RAG y subagentes."
      },
      {
        time: "11:30 - 12:45",
        duration: "1 hr 15 min",
        topic: "Conceptos y Funcionamiento de los Subagentes: Delegación y Especialización",
        description: "División de responsabilidades complejas en ingeniería de software. Agentes coordinadores y agentes especialistas para pruebas, documentación y lógica."
      },
      {
        time: "12:45 - 15:00",
        duration: "2 hrs 15 min",
        topic: "Subagentes con TDD, Archivos Markdown & Implementación en un Proyecto",
        description: "Taller práctico: especificaciones técnicas vivas en archivos Markdown y flujo guiado por pruebas (TDD), donde un subagente redacta los tests y otro escribe el código de producción."
      }
    ],
    presentation: {
      url: "https://docs.google.com/presentation/d/e/2PACX-1vSamplePresDay2/pub?start=false",
      title: "Slides Día 2: RAG Local y Orquestación con Subagentes",
      status: "disponible",
      embedPlaceholder: "Presentación Día 2: Grounding con RAG sobre datos JSON locales, erradicación de alucinaciones y desarrollo guiado por pruebas (TDD) orquestado por subagentes especializados."
    },
    resources: [
      {
        id: "r2-1",
        title: "Dataset Local de Prueba (Catálogo & Políticas)",
        type: "json",
        fileName: "dia2-dataset-tienda-local.json",
        size: "18 KB",
        description: "Estructura JSON rica con productos, especificaciones técnicas y políticas de garantía para experimentar RAG local inmediato sin base de datos externa.",
        downloadUrl: "/downloads/dia2-dataset-tienda-local.json"
      },
      {
        id: "r2-2",
        title: "Plantilla de Sistema para RAG con Documentos Locales",
        type: "markdown",
        fileName: "dia2-plantilla-rag-local.md",
        size: "10 KB",
        description: "Instrucciones de grounding y prompts de sistema para forzar al agente a responder únicamente con datos presentes en la carpeta local citando fuentes.",
        downloadUrl: "/downloads/dia2-plantilla-rag-local.md"
      },
      {
        id: "r2-3",
        title: "Especificación Técnica para Subagentes (TDD)",
        type: "markdown",
        fileName: "dia2-spec-subagente-tdd.md",
        size: "14 KB",
        description: "Archivo Markdown con la arquitectura del flujo: Subagente Tester (genera pruebas a partir de spec) y Subagente Builder (escribe código hasta que las pruebas pasen).",
        downloadUrl: "/downloads/dia2-spec-subagente-tdd.md"
      }
    ],
    challenge: {
      id: "reto-dia-2",
      title: "Reto del Día 2: Asistente RAG con Grounding Estricto + Flujo TDD",
      mission: "Configurar en tu workspace la carpeta de datos locales (`dia2-dataset-tienda-local.json`) y crear un flujo donde: 1) El agente responda consultas complejas citando exactamente el ID y campos del JSON sin inventar datos; 2) Orquestar un flujo TDD donde crees primero el archivo de especificación en Markdown y un subagente genere los tests antes de escribir la lógica.",
      acceptanceCriteria: [
        "Configurar el prompt de contexto para que el agente admita 'No dispongo de esa información' si un dato no está en el JSON.",
        "Consultar exitosamente al menos 3 preguntas de compatibilidad técnica que requieran cruzar dos objetos del JSON.",
        "Crear el archivo `feature-spec.md` con los requerimientos de una nueva función de descuento.",
        "Hacer que el subagente escriba los tests unitarios antes de que exista el código.",
        "Hacer que el segundo agente implemente la lógica hasta lograr 100% de tests en verde."
      ],
      proTip: "Recuerda la analogía del estudiante con libro abierto: la IA no debe memorizar tu inventario en sus parámetros, debe leer directamente tus archivos locales en cada consulta."
    }
  },
  {
    id: 3,
    dayNumber: "03",
    title: "MCP y Proyecto Final",
    focus: "Introducción, arquitectura y configuración del Model Context Protocol (MCP), integración de MCP con agentes de código, RAG y subagentes, y desarrollo del proyecto final colaborativo por equipos.",
    pedagogyPillar: "Uso de MCPs prehechos (Firebase, SQLite, Filesystem) configurados en mcp.json para dotar al agente de superpoderes inmediatos en lenguaje natural sin enredarse en la creación de servidores desde cero.",
    schedule: [
      {
        time: "09:00 - 10:00",
        duration: "1 hr",
        topic: "Introducción al Model Context Protocol (MCP): Arquitectura, Tools, Resources y Prompts",
        description: "¿Qué es el estándar MCP y por qué revoluciona la IA? Explicación detallada de la arquitectura cliente-servidor, Tools (herramientas ejecutables), Resources (fuentes de datos) y Prompts preconfigurados."
      },
      {
        time: "10:00 - 11:00",
        duration: "1 hr",
        topic: "Instalación, Configuración de un MCP & Integración con Agentes de Código",
        description: "Configuración práctica en archivos mcp.json. Conexión de servidores MCP prehechos (SQLite, Filesystem, Fetch) a tu agente de desarrollo para interactuar con bases de datos en lenguaje natural."
      },
      {
        time: "11:00 - 11:30",
        duration: "30 min",
        topic: "Receso / Coffee Break",
        description: "Pausa para café y preparación del tablero para la dinámica de formación de equipos del proyecto final."
      },
      {
        time: "11:30 - 12:15",
        duration: "45 min",
        topic: "Integración de RAG, Subagentes y MCP & Kickoff del Proyecto Final",
        description: "Cómo convergen las tres tecnologías en una arquitectura robusta. Sorteo y formación de equipos con la ruleta interactiva de la web, asignación de retos reales y entrega de boilerplates."
      },
      {
        time: "12:15 - 14:30",
        duration: "2 hrs 15 min",
        topic: "Desarrollo del Proyecto Final por Equipos (Hackathon)",
        description: "Trabajo en equipo en el workspace utilizando plantillas base para construir la solución aumentada con IA. Mentoría técnica y acompañamiento continuo de los docentes."
      },
      {
        time: "14:30 - 15:00",
        duration: "30 min",
        topic: "Presentación y Demostración de Proyectos (Pitch Exprés 3 min)",
        description: "Demostraciones en vivo de 3 minutos por equipo ante el grupo: problema, solución aumentada con IA en funcionamiento real, evaluación y conclusiones finales del curso."
      }
    ],
    presentation: {
      url: "https://docs.google.com/presentation/d/e/2PACX-1vSamplePresDay3/pub?start=false",
      title: "Slides Día 3: Arquitectura MCP y Kickoff del Hackathon",
      status: "disponible",
      embedPlaceholder: "Presentación Día 3: Anatomía del Model Context Protocol (MCP), configuración de servidores en mcp.json, integración con bases de datos y pautas de evaluación del Proyecto Final."
    },
    resources: [
      {
        id: "r3-1",
        title: "Guía Exprés: Control de Versiones con Git y GitHub (Repaso)",
        type: "guide",
        fileName: "dia1-guia-git-github.md",
        size: "9 KB",
        description: "Guía rápida paso a paso para crear el repositorio de equipo, hacer commits y push para la entrega final del proyecto.",
        downloadUrl: "/downloads/dia1-guia-git-github.md"
      },
      {
        id: "r3-2",
        title: "Configuración Lista para mcp.json (SQLite, Filesystem)",
        type: "json",
        fileName: "dia3-mcp-config-sample.json",
        size: "6 KB",
        description: "Archivo de configuración listo para añadir a Cursor o VS Code para activar servidores MCP prehechos de SQLite, Filesystem y Fetch.",
        downloadUrl: "/downloads/dia3-mcp-config-sample.json"
      },
      {
        id: "r3-3",
        title: "Boilerplate Starter para Proyecto Final",
        type: "code",
        fileName: "dia3-boilerplate-proyecto-final.md",
        size: "15 KB",
        description: "Estructura modular limpia con script de inicio, carpeta de datos y plantilla de instrucciones del agente para arrancar el proyecto sin perder tiempo.",
        downloadUrl: "/downloads/dia3-boilerplate-proyecto-final.md"
      },
      {
        id: "r3-4",
        title: "Rúbrica de Evaluación & Guía de Pitch (3 Minutos)",
        type: "markdown",
        fileName: "dia3-rubrica-pitch-evaluacion.md",
        size: "9 KB",
        description: "Criterios de evaluación del proyecto final: impacto del problema, uso correcto de técnicas de IA del curso, solidez técnica y claridad del pitch.",
        downloadUrl: "/downloads/dia3-rubrica-pitch-evaluacion.md"
      }
    ],
    challenge: {
      id: "reto-dia-3",
      title: "Reto Cumbre: Proyecto Final & Demostración de Pitch Exprés",
      mission: "En tu equipo asignado, construir una solución funcional que resuelva el problema del mundo real sorteado en la plataforma. La solución debe incorporar al menos una técnica clave del curso (RAG local con JSONs/Docs, orquestación de subagentes TDD, o integración con un servidor MCP) y estar lista para un demo en vivo de 3 minutos.",
      acceptanceCriteria: [
        "Definir con claridad el problema y cómo la IA aporta valor real (no sólo como un chatbot genérico).",
        "Implementar la solución usando el boilerplate provisto o el entorno configurado.",
        "Demostrar grounding estricto o conexión mediante MCP / herramientas.",
        "Preparar presentación de 3 minutos: 1 min problema y arquitectura, 1.5 min demo en vivo, 0.5 min conclusiones.",
        "Entregar enlace al repositorio público en GitHub con los commits del equipo."
      ],
      proTip: "Enfóquense en un flujo pequeño pero 100% funcional. Una demo en vivo que responde con precisión a partir de datos locales o herramientas impresiona 10 veces más que un proyecto gigantesco a medio terminar."
    }
  }
];

