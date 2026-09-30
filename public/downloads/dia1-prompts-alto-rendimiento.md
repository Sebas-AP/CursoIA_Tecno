# Framework de Prompts de Alto Rendimiento para Desarrollo con IA
**Curso: Desarrollo de Software Aumentado con IA // Día 1**

---

## 🏛️ La Estructura de 4 Capas (RCTR)

Para lograr que un agente de código produzca soluciones precisas y libres de deuda técnica, utiliza la siguiente estructura en lugar de pedir código en lenguaje vago:

```markdown
1. [ROL Y ARQUITECTURA]: Define la mentalidad técnica, seniority y estándares.
2. [CONTEXTO Y WORKSPACE]: Cita los archivos relevantes del proyecto y dependencias clave.
3. [TAREA ESPECÍFICA]: Describe con precisión quirúrgica qué debe crear o refactorizar.
4. [RESTRICCIONES Y SALIDA]: Prohíbe malas prácticas, exige tipado, tests y formato limpio.
```

---

## 🎯 Plantilla 1: Refactorización y Limpieza de Deuda Técnica

```markdown
Actúa como un Principal Software Engineer con enfoque en Clean Code y Principios SOLID.

CONTEXTO:
Estamos refactorizando el módulo `@src/services/billingService.js`. Este archivo maneja cálculos de impuestos y tarifas pero actualmente tiene funciones con más de 80 líneas y alta complejidad ciclomática.

TAREA:
1. Divide la lógica en funciones puras e idempotentes.
2. Extrae las reglas de negocio a constantes inmutables.
3. Agrega anotaciones JSDoc completas con tipos de entrada y salida.
4. Genera una suite de pruebas unitarias en Vitest/Jest que cubra casos de éxito, descuentos negativos y valores nulos.

RESTRICCIONES:
- No cambies los nombres ni las firmas de los métodos exportados públicamente para no romper compatibilidad.
- No agregues librerías externas adicionales.
- Devuelve únicamente el código refactorizado y el archivo de pruebas sin explicaciones introductorias innecesarias.
```

---

## 🐛 Plantilla 2: Diagnóstico de Bugs y Corrección Causa Raíz

```markdown
Actúa como un Especialista en Debugging y Resiliencia de Software.

CONTEXTO:
En producción recibimos intermitentemente el siguiente error en la ruta `/api/checkout`:
`TypeError: Cannot read properties of undefined (reading 'tier') at calculateDiscount (line 45)`.
Revisa los archivos `@src/api/checkout.ts` y `@src/models/user.ts`.

TAREA:
1. Explica la causa raíz exacta del bug (analiza cómo llega el payload cuando el usuario no está autenticado).
2. Propón la solución defensiva más limpia utilizando optional chaining y valores predeterminados seguros.
3. Escribe un test unitario que reproduzca el bug (failing test) y demuestre que con tu parche el test pasa (passing test).

RESTRICCIONES:
- Solución con tolerancia a fallos; nunca debe caerse el servidor por datos malformados.
```

---

## 🏗️ Plantilla 3: Generación de Arquitectura de un Módulo Nuevo

```markdown
Actúa como Arquitecto de Software Cloud-Native.

CONTEXTO:
Estamos implementando un sistema de notificaciones asíncronas para nuestra plataforma. El stack es Node.js con TypeScript.

TAREA:
1. Diseña la interfaz `INotificationProvider` para soportar múltiples proveedores (Email, SMS, Push).
2. Implementa la clase base y la integración con el proveedor de Email usando un patrón Factory / Strategy.
3. Define los tipos de datos para los payloads de eventos.

RESTRICCIONES:
- Código fuertemente tipado en TypeScript sin utilizar `any`.
- Incluye manejo de reintentos exponenciales con límite de 3 intentos ante caídas de red.
```
