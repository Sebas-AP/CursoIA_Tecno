# Especificación Técnica: Orquestación de Subagentes con Paradigma TDD
**Curso: Desarrollo de Software Aumentado con IA // Día 2**

---

## 🎯 Arquitectura del Flujo: Subagente Tester vs. Subagente Builder

En lugar de pedirle a un solo agente que escriba todo (lo que suele llevar a código que se 'auto-valida' falsamente), dividimos la responsabilidad en dos roles orquestados:

```
[Especificación Markdown] ────► [Subagente Tester] ────► Crea `modulo.test.js` (Failing Tests)
                                                                 │
                                                                 ▼
                               [Subagente Builder] ◄───── Ejecuta pruebas
                                       │
                                       ▼
                       Escribe `modulo.js` hasta que 100% Tests pasen
```

---

## 📝 Paso 1: Redactar la Especificación Técnica (`specs/discountEngine.md`)

```markdown
# Módulo de Cálculo de Descuentos Dinámicos

## Requerimientos Funcionales:
1. Función `applyCoupon(cartTotal, couponCode, userTier)`:
   - Debe retornar un objeto `{ finalTotal, discountApplied, couponValid, reason }`.
   - Si `couponCode` es "VIP20" y `userTier` es "VIP", aplica 20% de descuento sin importar el total.
   - Si `couponCode` es "FLASH10", aplica 10% únicamente si `cartTotal` >= 100 USD. Si es menor, no aplica y `reason` debe decir "Compra mínima no alcanzada".
   - Si `cartTotal` <= 0 o no es un número, debe lanzar un error `InvalidCartAmountException`.
   - Si el cupón no existe o expiró, retorna `couponValid: false`.
```

---

## 🤖 Paso 2: Instrucción al Subagente Tester

```markdown
Actúa como QA Automation Engineer Senior experto en TDD y Jest/Vitest.

Lee atentamente la especificación `@specs/discountEngine.md`.
TAREA:
Genera ÚNICAMENTE el archivo de pruebas `tests/discountEngine.test.js`.
- Cubre todos los casos felices (happy path).
- Cubre todos los casos límite y excepciones (monto negativo, tipos de datos inválidos, cupones inexistentes).
- No escribas la implementación de la función todavía. Solo las pruebas que deben fallar al inicio (Red Stage de TDD).
```

---

## 🛠️ Paso 3: Instrucción al Subagente Builder

```markdown
Actúa como Software Engineer.
Tu objetivo es lograr que todas las pruebas en `@tests/discountEngine.test.js` pasen al 100%.

TAREA:
Crea el archivo `src/discountEngine.js` e implementa la función con código limpio, modular y defensivo.
Ejecuta las pruebas o analiza las aserciones hasta que todas pasen sin modificar los tests existentes.
```
