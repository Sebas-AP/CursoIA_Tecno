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
        time: "12:15 - 13:00",
        duration: "45 min",
        topic: "Estructura y Diseño de Prompts para Desarrollo de Software",
        description: "Diseño de prompts de alta precisión: Rol técnico, Contexto de workspace, Tarea quirúrgica y Restricciones estrictas (RCTR). Ejemplos aplicados a generación de interfaces, logos SVG y componentes."
      },
      {
        time: "13:00 - 14:00",
        duration: "1 hr",
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
    title: "RAG y Subagentes de Código",
    focus: "Conceptos fundamentales de RAG (Recuperar, Aumentar, Generar), arquitectura y flujo de datos de un sistema RAG, implementación práctica con base vectorial (ChromaDB), y arquitectura multiagente: subagentes con contexto limpio, permisos mínimos y retorno ejecutivo, configurados en archivos Markdown y orquestados con flujo TDD.",
    pedagogyPillar: "RAG es darle a la IA un 'examen a libro abierto' con tus propios archivos: primero recupera datos reales y luego genera sin adivinar. El trabajo complejo se delega a subagentes especialistas con memoria aislada y criterios de éxito verificables mediante pruebas (TDD).",
    schedule: [
      {
        time: "09:00 - 10:15",
        duration: "1 hr 15 min",
        topic: "Conceptos Fundamentales de RAG: ¿Qué es y por qué lo necesitamos?",
        description: "Retrieval-Augmented Generation: la IA con 'examen a libro abierto'. Los 3 pasos (Recuperar, Aumentar, Generar) y la comparación LLM aislado vs. sistema con RAG: recuperación activa, código verificado y cero reentrenamiento."
      },
      {
        time: "10:15 - 11:00",
        duration: "45 min",
        topic: "Arquitectura de un Sistema RAG e Implementación de un RAG Básico",
        description: "Flujo de datos completo y código en vivo: base vectorial con ChromaDB, consulta semántica que conecta 'login' con 'JWT/auth', y generación con contexto. Casos de uso en ingeniería: documentación viva, entender proyectos nuevos y diagnóstico de bugs."
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
        topic: "Subagentes de Código: Contexto Limpio, Permisos Mínimos y Retorno Ejecutivo",
        description: "¿Qué es un subagente y dónde 'vive'? Sus 3 piezas: identidad (system prompt), herramientas (tools) y memoria aislada. Configuración práctica en .claude/agents/ con archivos Markdown: CLAUDE.md, name, description, tools y cuerpo del prompt."
      },
      {
        time: "12:45 - 14:00",
        duration: "1 hr 15 min",
        topic: "Delegación, Especialización y Subagentes con Flujo TDD",
        description: "Carrera de relevos de 4 pasos y ciclo TDD en vivo de rojo a verde (@tdd-tester, @backend-coder, @revisor). Triangulación con múltiples asserts para evitar las trampas de la IA (Reward Hacking), orquestación en un proyecto real y demo en terminal con > /agents."
      }
    ],
    presentation: {
      url: "https://canva.link/53o6kjom0m0wm67",
      embedUrl: "https://www.canva.com/design/DAHW3ymeH64/4248vChW_LTD1k7P-EusZw/view?embed",
      title: "Slides Día 2: RAG y Subagentes de Código (Canva Oficial)",
      status: "disponible",
      embedPlaceholder: "Presentación oficial interactiva en Canva diseñada por Sebastián Almeda e Iván Valles. Cubre los conceptos fundamentales de RAG (examen a libro abierto), la arquitectura e implementación de un RAG básico con ChromaDB, la anatomía de un subagente (contexto limpio, permisos mínimos, retorno ejecutivo), su configuración en .claude/agents/ con Markdown y el ciclo TDD de rojo a verde con triangulación."
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
      title: "Reto del Día 2: Subagentes en Markdown validados con TDD",
      mission: "Configura dos subagentes en Markdown (Tester + Coder) dentro de tu proyecto para construir un módulo validado con TDD sobre documentación local: el agente líder extrae primero el contexto real de tus archivos (RAG), luego @tdd-tester escribe los tests antes de que exista el código y @backend-coder implementa la lógica mínima hasta pasarlos, usando triangulación con múltiples asserts.",
      acceptanceCriteria: [
        "Crear la carpeta .claude/agents/ con los archivos .md de cada subagente (name, description, tools y cuerpo del prompt con su misión y retorno ejecutivo).",
        "Definir permisos mínimos: @tdd-tester y @backend-coder solo con las herramientas que necesitan (Read, Write, Bash para correr pruebas).",
        "Lograr la Fase Roja: @tdd-tester escribe el test antes de que exista la función (pytest FAILED esperado).",
        "Lograr la Fase Verde: @backend-coder lee el error y programa el código mínimo hasta obtener 100% de tests en verde.",
        "Aplicar triangulación: acorralar al agente con al menos 3 asserts distintos para obligarlo a programar la lógica real y no hacer trampa (Reward Hacking)."
      ],
      proTip: "Si pones una sola prueba, el agente puede 'hacer trampa' (Reward Hacking) pasando el test con una fórmula falsa. Acórralo con múltiples asserts: es la única forma de obligarlo a programar la lógica real."
    }
  },
  {
    id: 3,
    dayNumber: "03",
    title: "MCPs y Proyecto Final",
    focus: "El Model Context Protocol (MCP) como estándar abierto para conectar aplicaciones de IA con fuentes de datos y herramientas externas de forma segura y estandarizada: sus 3 capacidades (Tools, Recursos, Prompts), su arquitectura cliente-servidor (Host, Cliente, Servidor), ejemplos reales (Playwright, GitHub, Supabase), instalación de un MCP y desarrollo del proyecto final por equipos.",
    pedagogyPillar: "El agente deja de estar aislado: mediante MCPs prehechos instalados en tu editor, el agente se conecta de forma estandarizada a navegadores, repositorios y bases de datos, y todo lo aprendido en el curso converge en un proyecto final de tema libre desarrollado en equipo.",
    schedule: [
      {
        time: "09:00 - 09:45",
        duration: "45 min",
        topic: "¿Qué es el Model Context Protocol (MCP)? Definición y 3 Capacidades Principales",
        description: "Estándar abierto creado para conectar aplicaciones de inteligencia artificial con fuentes de datos y herramientas externas de forma segura y estandarizada. Sus 3 capacidades: Tools (funciones que puede necesitar el LLM), Recursos (datos o archivos contextuales) y Prompts (plantillas predefinidas)."
      },
      {
        time: "09:45 - 10:45",
        duration: "1 hr",
        topic: "Arquitectura Cliente-Servidor, Ejemplos de MCP e Instalación Práctica",
        description: "Los 3 componentes: Host (entorno de IA del usuario), Cliente (intermediario que gestiona solicitudes y sesiones) y Servidor (programa independiente conectado a fuentes de datos). Ejemplos en vivo: Playwright MCP (abrir e interactuar con sitios web y probar web apps), GitHub MCP (analizar repositorios y automatizar flujos) y Supabase MCP (gestión de bases de datos con IA, crear y desplegar la BD automáticamente). Instalación paso a paso de un MCP."
      },
      {
        time: "10:45 - 11:15",
        duration: "30 min",
        topic: "Receso / Coffee Break",
        description: "Pausa para café y preparación del tablero para la dinámica de formación de equipos del proyecto final."
      },
      {
        time: "11:15 - 11:45",
        duration: "30 min",
        topic: "Kickoff del Proyecto Final: Descripción y Formación de Equipos",
        description: "En equipos desarrollarán un proyecto en el que hagan uso de todo lo aprendido en el curso (agentes de código, prompts, RAG, subagentes con TDD y MCPs). El tema es libre. Para la entrega deberán subir el enlace de su repositorio de GitHub y de su sitio web desplegado."
      },
      {
        time: "11:45 - 13:15",
        duration: "1 hr 30 min",
        topic: "Desarrollo del Proyecto Final por Equipos",
        description: "Trabajo en equipo en el workspace para construir la solución aumentada con IA aplicando las técnicas del curso. Mentoría técnica y acompañamiento continuo de los docentes."
      },
      {
        time: "13:15 - 14:00",
        duration: "45 min",
        topic: "Entrega y Presentación de Proyectos",
        description: "Cada equipo entrega el enlace de su repositorio de GitHub y de su sitio web desplegado, y presenta su proyecto final ante el grupo. Evaluación y conclusiones del curso."
      }
    ],
    presentation: {
      url: "https://canva.link/yuzhox0kbsql8ny",
      embedUrl: "https://www.canva.com/design/DAHWsZhX8ws/_H1SwJvc49GclvG81E1YUw/view?embed",
      title: "Slides Día 3: MCPs y Proyecto Final (Canva Oficial)",
      status: "disponible",
      embedPlaceholder: "Presentación oficial interactiva en Canva diseñada por Sebastián Almeda e Iván Valles. Cubre la definición del Model Context Protocol (MCP), sus 3 capacidades (Tools, Recursos, Prompts), la arquitectura cliente-servidor (Host, Cliente, Servidor), ejemplos de MCPs (Playwright, GitHub, Supabase), la instalación de un MCP y la descripción del proyecto final por equipos."
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
      title: "Reto Cumbre: Proyecto Final por Equipos",
      mission: "En equipos deberán desarrollar un proyecto en el que hagan uso de lo que aprendieron en este curso (agentes de código, prompts estructurados, RAG, subagentes con TDD y MCPs). El tema es libre. Para la entrega tienen que subir el enlace de su repositorio de GitHub y de su sitio web desplegado.",
      acceptanceCriteria: [
        "Definir en equipo el tema del proyecto (tema libre) y el problema que resuelve.",
        "Aplicar las técnicas aprendidas en el curso: agentes de código, prompts, RAG, subagentes con TDD y/o MCPs.",
        "Construir una solución funcional en el workspace durante la sesión de desarrollo.",
        "Entregar el enlace del repositorio de GitHub con los commits del equipo.",
        "Entregar el enlace del sitio web desplegado y funcionando."
      ],
      proTip: "Enfóquense en un flujo pequeño pero 100% funcional. Un sitio desplegado que responde con precisión a partir de datos locales o herramientas MCP impresiona 10 veces más que un proyecto gigantesco a medio terminar."
    }
  }
];

