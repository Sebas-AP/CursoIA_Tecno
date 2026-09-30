# Reto Práctico Día 1: Creación de Recursos y Landing Page con Prompts
**Curso: Desarrollo de Software Impulsado por IA // Instructores: Sebastián Almeda & Iván Valles**

---

## 🎯 Objetivo del Reto
Aprenderás a interactuar con un agente de código o modelo de lenguaje mediante **prompts estructurados** para generar desde cero los activos esenciales de un proyecto web:
1. **Identidad Visual:** Concepto y generación de un Logo / Isotipo en formato SVG limpio o CSS.
2. **Componentes UI Modulares:** Barra de navegación responsiva, sección Hero con Call-To-Action, y tarjetas de servicios/características.
3. **Landing Page Completa:** Integración de todos los componentes en un archivo `index.html` funcional.
4. **Control de Versiones:** Inicializar tu repositorio con Git y publicarlo en GitHub.

---

## 🧩 Fase 1: Diseñar el Concepto y Paleta de Marca

Antes de pedir código, dale contexto de diseño al agente. Utiliza la estructura **RCTR (Rol, Contexto, Tarea, Restricciones)**:

### Prompt Ejemplo para Definición de Estilo:
```markdown
Actúa como un Diseñador UI/UX Senior y Frontend Architect.

CONTEXTO:
Quiero crear una landing page para un proyecto llamado [NOMBRE DEL PROYECTO] (ejemplo: "EcoPulse", una plataforma que monitorea la huella de carbono de servidores en la nube).

TAREA:
1. Propón un concepto visual moderno (ej. Dark mode con acentos neón esmeralda y cian).
2. Define una paleta de 4 colores principales en formato Hexadecimal (Fondo oscuro, superficie de tarjetas, color de acento principal y color de texto).
3. Selecciona una tipografía moderna de Google Fonts adecuada para el proyecto.

SALIDA:
Proporciona la paleta de colores y variables CSS `:root` listas para usar.
```

---

## 🎨 Fase 2: Generar el Logo / Isotipo en SVG

Los formatos vectoriales SVG son ideales para pedirle a la IA porque son puro código XML que puedes incrustar directamente en tu HTML.

### Prompt Ejemplo para Generación de Logo:
```markdown
Actúa como un Diseñador Gráfico Vectorial y Experto en SVG.

CONTEXTO:
Proyecto: [NOMBRE DEL PROYECTO]
Paleta: [COLORES DEFINIDOS EN LA FASE 1]

TAREA:
Genera un logotipo vectorial en código SVG puro con las siguientes características:
- Un isotipo geométrico o minimalista representativo (ej. una hoja fusionada con un chip de circuito).
- Al lado, el nombre del proyecto con texto estilizado.
- Debe tener `viewBox="0 0 240 60"`, soporte para escalabilidad y estar optimizado.

RESTRICCIONES:
- Entrega ÚNICAMENTE el bloque de código `<svg>...</svg>` limpio sin etiquetas HTML extras ni explicaciones.
```

---

## 🧱 Fase 3: Crear Componentes de Interfaz Modulares

Pide componentes individuales para garantizar que cada uno tenga excelente calidad y estilos limpios:

### 1. Componente Navbar (Barra de Navegación)
```markdown
Actúa como Frontend Developer Senior.

TAREA:
Crea una barra de navegación (Navbar) moderna, fija y con efecto glassmorphism (fondo semitransparente con `backdrop-filter: blur`).
- Debe incluir el logo SVG en la izquierda.
- Enlaces de navegación al centro ("Características", "Métricas", "Precios").
- Botón de acción ("Comenzar Ahora") a la derecha con efecto hover brillante.
- Totalmente responsiva para pantallas móviles.
```

### 2. Componente Hero Section
```markdown
Actúa como Frontend Developer.

TAREA:
Genera una sección Hero impactante con:
- Un badge superior pill ("⚡ Versión 2.0 en Vivo").
- Un titular `<h1>` grande con texto en gradiente llamativo.
- Un párrafo descriptivo persuasivo de 2 líneas.
- Dos botones de acción: uno primario con gradiente y uno secundario con borde translúcido.
```

### 3. Componente Feature Cards (Tarjetas de Características)
```markdown
Actúa como Frontend Developer.

TAREA:
Diseña una grilla de 3 tarjetas de características destacadas:
- Cada tarjeta debe tener un icono representativo (SVG o emoji), un título `<h3>` y una breve descripción.
- Efecto hover que eleve la tarjeta con un borde de luz sutil (`box-shadow` neón).
```

---

## 🚀 Fase 4: Ensamblar la Landing Page en `index.html`

Pídele al agente que ensamble un archivo `index.html` que incluya todo el código y un archivo `styles.css` (o CSS interno). Ábrelo en tu navegador haciendo doble clic sobre `index.html` para comprobar el resultado visual.

---

## 📦 Fase 5: Publicar en GitHub (Tu Primer Repositorio)

Sigue los pasos de la **Guía Exprés de Git y GitHub**:
1. Crea tu repositorio vacío en GitHub (`https://github.com/new`).
2. Abre la terminal en la carpeta de tu proyecto.
3. Ejecuta:
   ```bash
   git init
   git add .
   git commit -m "feat: Landing page y recursos generados con prompts de IA"
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DE-TU-REPO.git
   git branch -M main
   git push -u origin main
   ```
4. ¡Refresca tu perfil de GitHub y celebra tu primer cuadro verde!
