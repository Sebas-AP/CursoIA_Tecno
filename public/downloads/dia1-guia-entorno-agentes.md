# Guía Rápida de Setup: Cursor, Copilot y Agentes de Código
**Curso: Desarrollo de Software Aumentado con IA // Día 1**

---

## ⚡ 1. Filosofía: Del Chat a la Lectura de Workspace

- **Chat Tradicional:** Tú eres el copista que pega fragmentos de código descontextualizados. La IA no sabe qué librerías tienes, qué convenciones usas ni cómo interactúan tus módulos.
- **Agente de Código:** La IA indexa el árbol de archivos (`semantic index / embeddings locales / workspace search`), navega definiciones, lee configuraciones (`package.json`, `tsconfig.json`) y propone diffs directos en los archivos.

---

## 🛠️ 2. Configuración Esencial en Cursor (`.cursorrules`)

Crea un archivo llamado `.cursorrules` en la raíz de tu proyecto para establecer reglas fijas de comportamiento para el agente:

```markdown
# Directrices de Desarrollo del Proyecto
- Prioriza siempre funciones puras, inmutabilidad y tipado explícito.
- Cada función creada debe contar con comentarios JSDoc claros.
- Si vas a refactorizar, mantén la compatibilidad de las APIs existentes.
- Utiliza la convención camelCase para variables y PascalCase para componentes y clases.
- Prohibido el uso de `any` en TypeScript.
- Siempre que crees o modifiques lógica de negocio, genera o actualiza las pruebas unitarias correspondientes.
```

---

## 🚀 3. Atajos de Teclado Imprescindibles

| Acción | Cursor | VS Code + Copilot |
|---|---|---|
| **Edición / Generación Inline** | `Ctrl + K` (o `Cmd + K`) | `Ctrl + I` |
| **Abrir Agente / Chat de Workspace** | `Ctrl + L` | `Ctrl + Alt + I` |
| **Indexar o consultar archivo (@)** | Escribir `@NombreArchivo` | `@workspace /explain` |
| **Aplicar Diff directamente** | `Accept` (`Ctrl + Enter`) | `Keep changes` |
