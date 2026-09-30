# Boilerplate Starter: Proyecto Final Aumentado con IA
**Curso: Desarrollo de Software Aumentado con IA // Día 3**

---

## 📁 Estructura del Boilerplate Recomendado

Para no perder tiempo en configuraciones iniciales durante el hackathon de 2.5 horas, utilicen esta estructura base en su repositorio de equipo:

```
proyecto-final-equipo/
├── .cursorrules                # Reglas del agente para su proyecto
├── mcp.json                    # Servidores MCP configurados (SQLite/Filesystem)
├── data/                       # Archivos JSON locales / base SQLite (RAG)
│   ├── dataset_principal.json
│   └── reglas_negocio.md
├── src/                        # Código de la aplicación
│   ├── agentRunner.js          # Orquestador del flujo con LLM / Agente
│   └── utils.js
├── tests/                      # Suite de pruebas generadas por Subagente
│   └── app.test.js
├── README.md                   # Descripción del problema y solución
└── demo_script.md              # Guión del pitch de 3 minutos
```

---

## ⚡ Plantilla Rápida de Script Orquestador (`src/agentRunner.js`)

```javascript
/**
 * Script de inicio para cargar datos locales y ejecutar el asistente con grounding.
 */
import fs from 'fs';
import path from 'path';

// 1. Cargar contexto local (RAG con JSONs)
const datasetPath = path.resolve('./data/dataset_principal.json');
const localData = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

console.log("⚡ Contexto local cargado exitosamente:", Object.keys(localData));

// 2. Definición del System Prompt con Grounding
export const SYSTEM_PROMPT = `
Eres la IA de soporte especializada para nuestro proyecto.
Reglas de Grounding:
- Basa tus respuestas en los datos locales provistos: ${JSON.stringify(localData).slice(0, 5000)}...
- Cita los IDs de registro correspondientes.
- Si no existe el dato en el contexto, declara explícitamente la ausencia de información.
`;

console.log("✅ Sistema listo para consultas del equipo.");
```
