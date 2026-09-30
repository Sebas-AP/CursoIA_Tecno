# Guía Exprés: Tu Primer Repositorio en GitHub y Control de Versiones
**Curso: Desarrollo de Software Impulsado por IA // Instructores: Sebastián Almeda & Iván Valles**

> **¿Por qué Git y GitHub en el desarrollo con IA?**  
> Al utilizar herramientas como Cursor, OpenCode o agentes de código autónomos, las modificaciones en los archivos ocurren a una velocidad vertiginosa. Tener un control de versiones impecable te permite experimentar con agentes sin miedo a perder código funcional, volver a versiones anteriores en un segundo y colaborar en equipo en el proyecto final.

---

## 📋 Paso 1: Crear el Repositorio en GitHub

1. Entra a [github.com](https://github.com) e inicia sesión con tu cuenta personal.
2. En la esquina superior derecha, haz clic en el botón **`+`** y selecciona **New repository** (Nuevo repositorio).
3. Configura los datos básicos:
   - **Repository name:** Escribe un nombre en minúsculas y sin espacios (ejemplo: `curso-ia-landing-recursos` o `mi-primer-proyecto-ia`).
   - **Description:** Una breve descripción opcional de tu proyecto.
   - **Visibilidad:** Selecciona **Public** (para que se muestre en tu perfil y tus compañeros o docentes puedan revisarlo).
   - ⚠️ **MUY IMPORTANTE:** **NO** marques las casillas de *"Add a README file"*, *"Add .gitignore"* ni *"Choose a license"* por ahora. Dejar el repositorio completamente vacío facilita conectar el código que ya creaste en tu computadora.
4. Haz clic en el botón verde **Create repository**.

---

## ⚙️ Paso 2: Configuración Inicial (Solo la primera vez en tu computadora)

Abre tu terminal (consola del sistema o la terminal integrada de VS Code / Cursor con `Ctrl + ~` o `Cmd + ~`) y configura tu identidad para que GitHub asocie tus contribuciones con tu cuenta:

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu_correo_de_github@example.com"
```

> **Nota:** Sustituye `"Tu Nombre Completo"` y `"tu_correo_de_github@example.com"` por tu nombre real y el mismo correo electrónico con el que te registraste en GitHub.

---

## 🚀 Paso 3: Conectar tu Proyecto Local con GitHub

Abre la carpeta de tu proyecto en la terminal o directamente dentro de tu editor (Cursor o VS Code) y ejecuta los siguientes comandos en orden:

### 1. Inicializar Git en tu carpeta local
Crea el repositorio interno de Git en tu proyecto:
```bash
git init
```

### 2. Preparar todos tus archivos (Añadirlos al "escáner" o Staging Area)
Agrega todos los archivos creados (logos, componentes, HTML/CSS) para ser rastreados:
```bash
git add .
```

### 3. Guardar una foto/versión de tus cambios (Commit)
Crea tu primera versión oficial con un mensaje descriptivo:
```bash
git commit -m "Primer commit: Creación de recursos y landing page con prompts"
```

### 4. Conectar tu carpeta local con el repositorio en la web
*(Copia tu enlace exacto desde la página de tu repositorio en GitHub, donde dice "Quick setup" o HTTPS):*
```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
```

### 5. Definir la rama principal
Asegura que tu rama principal se llame `main` (estándar moderno de GitHub):
```bash
git branch -M main
```

### 6. Subir tus cambios a la nube (Push)
Envía tu código local a los servidores de GitHub:
```bash
git push -u origin main
```

*(Si es la primera vez que subes código desde tu máquina, tu navegador o terminal te pedirá iniciar sesión o autorizar a GitHub. Sigue los pasos en pantalla).*

---

## 🎉 Paso 4: ¡Verlo en tu Perfil!

1. Vuelve a la página de tu repositorio en GitHub y actualiza la pestaña (**F5**). ¡Verás todos tus archivos, logos y código organizados en la nube!
2. Visita tu **perfil público de GitHub** (`https://github.com/TU-USUARIO`): notarás que el recuadro de actividad (los famosos **"puntitos verdes"**) se ha encendido, marcando tu primera contribución oficial del curso.

---

## 💡 Consejo Pro para la Clase:

> Si utilizas **Cursor** o **VS Code**, recuerda que cuentan con una **pestaña lateral dedicada a Git** (el icono de Control de Código Fuente: tres pelotitas conectadas por líneas en la barra izquierda, o `Ctrl + Shift + G`).  
> Aunque entender la terminal es vital para dominar la lógica de versionado, la interfaz gráfica de tu editor te facilitará enormemente el día a día para revisar cambios (diffs), escribir mensajes de commit y hacer *Push* con un solo clic sin teclear comandos.
