// Banco de Categorías y Problemas del Mundo Real para el Proyecto Final
// Diseñados específicamente para resolverse con los temas de IA vistos en el curso:
// 1. RAG con archivos JSON y documentos locales
// 2. Agentes de código y orquestación con Subagentes (TDD)
// 3. Integración con MCPs prehechos (Firebase, SQLite, Filesystem, APIs)

export const PROJECT_CATEGORIES = [
  {
    id: "healthtech",
    name: "HealthTech: Triaje Clínico & Consulta Segura de Historiales",
    badge: "Salud & Diagnóstico Asistido",
    color: "#06b6d4", // Cyan
    icon: "Activity",
    problemSummary: "Los centros de salud sufren cuellos de botella en la clasificación inicial de pacientes y la búsqueda en expedientes médicos complejos.",
    aiSolutionConcept: "Asistente con RAG estricto sobre JSONs de historiales y guías clínicas locales. Debe responder con 'grounding' absoluto (cero alucinaciones) y usar un subagente validador de contraindicaciones.",
    suggestedStack: {
      aiTechnique: "RAG Local con JSONs clínicos + Subagente de Validación",
      mcpSuggested: "Filesystem MCP o SQLite MCP para base de pacientes",
      keyFeature: "Detección de incompatibilidades de medicamentos sin inventar datos"
    },
    sampleDeliverable: "CLI o interfaz web donde el médico consulta síntomas y el agente extrae diagnósticos diferenciales citando exactamente el archivo JSON fuente."
  },
  {
    id: "fintech",
    name: "FinTech: Asesor Financiero & Auditor de Anomalías",
    badge: "Finanzas & Auditoría",
    color: "#10b981", // Emerald
    icon: "ShieldAlert",
    problemSummary: "Las PyMEs tienen dificultades para entender sus flujos de caja y detectar transacciones fraudulentas o duplicadas en hojas de cálculo y bases de datos.",
    aiSolutionConcept: "Agente conectado vía MCP a una base de datos SQLite o Firebase con registros de transacciones. Permite consultas en lenguaje natural y genera alertas de anomalías financieras.",
    suggestedStack: {
      aiTechnique: "MCP Prehecho (SQLite / Firebase) + Consultas en Lenguaje Natural",
      mcpSuggested: "SQLite MCP o Firebase MCP",
      keyFeature: "Generación automática de balances y detección de gastos sospechosos"
    },
    sampleDeliverable: "Dashboard o bot conversacional donde el usuario pregunta '¿En qué rubro gastamos 30% más este mes?' y el agente ejecuta queries reales vía MCP."
  },
  {
    id: "edtech",
    name: "EdTech: Tutor de Programación Adaptativo con Subagentes TDD",
    badge: "Educación & Mentoría IA",
    color: "#8b5cf6", // Purple
    icon: "GraduationCap",
    problemSummary: "Los estudiantes de programación se frustran cuando los asistentes de IA les dan la respuesta directa sin enseñarles a pensar o validar su propio código.",
    aiSolutionConcept: "Flujo orquestado con dos subagentes: el 'Subagente Mentor' genera especificaciones y tests unitarios (TDD), y el 'Subagente Evaluador' califica el código del alumno sin dar la solución regalada.",
    suggestedStack: {
      aiTechnique: "Orquestación de Subagentes + Paradigma TDD con Markdown Specs",
      mcpSuggested: "Filesystem MCP para escribir tests y validar ejecuciones",
      keyFeature: "Retroalimentación paso a paso orientada a pasar pruebas unitarias"
    },
    sampleDeliverable: "Entorno donde el alumno recibe un reto, el subagente crea el archivo de tests, y evalúa en vivo si las soluciones del alumno cumplen los requerimientos."
  },
  {
    id: "devops",
    name: "DevOps: Analizador de Logs & Diagnóstico Autónomo de Errores",
    badge: "Infraestructura & Resiliencia",
    color: "#f59e0b", // Amber
    icon: "Terminal",
    problemSummary: "Analizar gigabytes de logs de servidores tras una caída en producción toma horas y suele requerir ingenieros senior para encontrar la causa raíz.",
    aiSolutionConcept: "Agente de código alimentado con RAG sobre carpetas de logs de errores en JSON y archivos de configuración. Identifica el stacktrace, explica el origen y propone el script de parche.",
    suggestedStack: {
      aiTechnique: "RAG sobre logs locales JSON + Agente de Refactorización",
      mcpSuggested: "Filesystem MCP para leer logs y carpetas de configuración",
      keyFeature: "Resumen ejecutivo del incidente (RCA) y pull request sugerido con el fix"
    },
    sampleDeliverable: "Herramienta CLI que recibe una carpeta de logs de Docker/Nginx y devuelve: 'Fallo detectado en línea 142 por timeout en DB. Solución recomendada: ...'"
  },
  {
    id: "cybersec",
    name: "CyberSec: Auditor de Código & Detección de Vulnerabilidades OWASP",
    badge: "Seguridad & DevSecOps",
    color: "#ef4444", // Red
    icon: "Lock",
    problemSummary: "El código desarrollado a contrarreloj con frecuencia contiene inyecciones SQL, exposición de llaves de API o fallas de autenticación críticas.",
    aiSolutionConcept: "Agente que recorre el workspace comparando el código contra un archivo Markdown/JSON local con las 10 vulnerabilidades OWASP más críticas, emitiendo parches con TDD.",
    suggestedStack: {
      aiTechnique: "Agente de Inspección de Workspace + RAG de Reglas de Seguridad",
      mcpSuggested: "Filesystem MCP / Git MCP",
      keyFeature: "Reporte de severidad (Alta/Media/Baja) con código corregido antes/después"
    },
    sampleDeliverable: "Script o interfaz que escanea un repositorio y genera un reporte `security-audit.md` con recomendaciones y tests de regresión preventiva."
  },
  {
    id: "ecommerce",
    name: "E-Commerce: Asistente de Catálogo & Políticas sin Alucinaciones",
    badge: "Comercio & Experiencia Cliente",
    color: "#ec4899", // Pink
    icon: "ShoppingBag",
    problemSummary: "Los chatbots de atención al cliente inventan ofertas, prometen devoluciones imposibles o confunden características técnicas de los productos.",
    aiSolutionConcept: "Chatbot de compras con RAG puro sobre un archivo JSON de inventario y documentos Markdown de términos y condiciones. Si el producto no está en el JSON, responde con precisión.",
    suggestedStack: {
      aiTechnique: "RAG Estricto con JSONs de Productos + Grounding de Políticas",
      mcpSuggested: "Firebase MCP / SQLite MCP para consultar stock en tiempo real",
      keyFeature: "Bloqueo estricto de alucinaciones en precios, garantías y tallas"
    },
    sampleDeliverable: "Web interactiva donde un cliente pregunta por productos específicos y políticas de envío, y el asistente responde citando ID de producto y cláusula de devolución."
  },
  {
    id: "govtech",
    name: "GovTech: Guía Inteligente de Trámites y Normativa Ciudadana",
    badge: "Ciudadanía & Acceso Público",
    color: "#3b82f6", // Blue
    icon: "Building2",
    problemSummary: "Los portales de trámites gubernamentales tienen cientos de PDFs confusos y leyes redactadas en lenguaje técnico inaccesible para los ciudadanos.",
    aiSolutionConcept: "Agente con RAG sobre documentos locales oficiales (Markdown/JSON) que traduce requisitos legales a instrucciones claras paso a paso y valida si el usuario cumple con la documentación.",
    suggestedStack: {
      aiTechnique: "RAG sobre Documentación Local + Subagente Verificador de Requisitos",
      mcpSuggested: "Filesystem MCP para leer normativas y formatos oficiales",
      keyFeature: "Checklist personalizado para el ciudadano según su caso particular"
    },
    sampleDeliverable: "Asistente web donde el usuario dice 'Quiero abrir un negocio de alimentos' y el sistema le entrega una hoja de ruta con costos oficiales y documentos requeridos."
  },
  {
    id: "smartlogistics",
    name: "Smart Logistics: Despachador de Envíos & Optimización de Pedidos",
    badge: "Logística & Supply Chain",
    color: "#14b8a6", // Teal
    icon: "Truck",
    problemSummary: "Las empresas de paquetería local pierden tiempo coordinando repartos y gestionando reclamos por demoras de entregas en tiempo real.",
    aiSolutionConcept: "Agente conectado a un MCP de base de datos con paquetes pendientes y rutas. Un subagente planificador agrupa envíos por zona y un subagente redactor genera la notificación a los clientes.",
    suggestedStack: {
      aiTechnique: "Orquestación de Subagentes + MCP de Base de Datos",
      mcpSuggested: "SQLite MCP / Firebase MCP",
      keyFeature: "Agrupación inteligente de paquetes y estimación de tiempos de entrega"
    },
    sampleDeliverable: "Consola de despacho que lee los pedidos del día y genera el plan de ruta óptimo con mensajes listos para WhatsApp o correo."
  }
];
