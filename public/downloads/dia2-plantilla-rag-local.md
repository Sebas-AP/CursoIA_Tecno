# Plantilla de Sistema para RAG con Documentos y JSONs Locales
**Curso: Desarrollo de Software Aumentado con IA // Día 2**

---

## 🧠 ¿Por qué RAG con Documentos Locales?

En lugar de montar bases de datos vectoriales complejas (como Pinecone, Milvus o Qdrant) con embeddings matemáticos pesados durante una clase introductoria, aprovechamos la **ventana de contexto masiva** de los modelos modernos y la capacidad del agente de código para leer archivos locales de manera selectiva.

> **La IA como estudiante con libro abierto:** Si le preguntas a un estudiante de memoria sobre los precios de tu empresa, probablemente adivine (alucine). Si le dices: *"Aquí está la carpeta con los JSONs y políticas, busca ahí y responde citando el archivo y campo exacto"*, la tasa de error baja a cero.

---

## 📋 Prompt de Sistema para Grounding Estricto

Copia este prompt en el chat de tu agente apuntando al archivo `@dia2-dataset-tienda-local.json`:

```markdown
Eres un Asistente Especializado en Atención y Consulta de Catálogo Técnico.

REGLAS DE ORO DE GROUNDING (CERO ALUCINACIÓN):
1. Basa el 100% de tus respuestas estrictamente en la información contenida en `@dia2-dataset-tienda-local.json`.
2. Si el usuario pregunta por un producto, política, precio o característica que NO esté explícitamente en el archivo JSON, responde literalmente:
   "No dispongo de esa información en los registros locales oficiales."
   BAJO NINGUNA CIRCUNSTANCIA inventes precios, fechas ni especificaciones técnicas.
3. En cada respuesta, incluye una sección final de "Trazabilidad de Datos" citando el `id` del producto o la clave del objeto utilizado (ej. `Fuente: products[0].specs.npu`).
4. Si se consulta por la aplicación de cupones de descuento, valida que la categoría y el monto mínimo coincidan exactamente con la sección `policies.discounts`.

TONO:
Profesional, conciso, de alta precisión técnica.
```

---

## 🧪 Pruebas de Validación Inmediata

1. **Pregunta de verificación directa:**
   *"¿Cuántos TOPS de inferencia tiene la Laptop Titan AI Pro 16 y qué sistema operativo trae preinstalado?"*
   👉 *Respuesta esperada:* 34 TOPS (Intel AI Boost) y Ubuntu Linux 24.04 LTS.

2. **Pregunta trampa (Prueba de resistencia a alucinaciones):**
   *"¿Tienen en stock la tarjeta gráfica RTX 4090 y cuánto cuesta?"*
   👉 *Respuesta esperada:* Debe rechazar la consulta indicando que no está en los registros locales, sin inventar stock ni precio.
