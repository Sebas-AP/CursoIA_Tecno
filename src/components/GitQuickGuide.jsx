import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal, 
  Check, 
  Copy, 
  Download, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Laptop,
  FolderGit2
} from 'lucide-react';

const GithubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const GitQuickGuide = ({ showToast }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [copiedKey, setCopiedKey] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRepoUrl, setUserRepoUrl] = useState('');

  const copyToClipboard = async (text, key, msg) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      if (showToast) showToast(msg || 'Comando copiado al portapapeles');
      setTimeout(() => setCopiedKey(null), 2500);
    } catch (e) {
      if (showToast) showToast('Error al copiar');
    }
  };

  const resolvedName = userName.trim() || 'Tu Nombre';
  const resolvedEmail = userEmail.trim() || 'tu_correo@example.com';
  const resolvedRepo = userRepoUrl.trim() || 'https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git';

  const fullBashScript = `# 1. Inicializar Git local
git init

# 2. Agregar archivos
git add .

# 3. Guardar versión (Commit)
git commit -m "Primer commit: Creación de recursos y landing page con prompts"

# 4. Vincular con GitHub
git remote add origin ${resolvedRepo}

# 5. Rama principal main
git branch -M main

# 6. Subir a GitHub
git push -u origin main`;

  return (
    <div className="git-guide-card">
      {/* Header del bloque */}
      <div className="git-guide-header">
        <div className="git-guide-title-box">
          <div className="git-logo-badge">
            <GithubIcon size={24} color="#00f0ff" />
            <GitBranch size={20} color="#a855f7" style={{ marginLeft: '-8px' }} />
          </div>
          <div>
            <div className="git-guide-tag">// TALLER FLASH & CONTROL DE VERSIONES</div>
            <h3 className="git-guide-heading">Guía Exprés: Tu Primer Repositorio en GitHub</h3>
            <p className="git-guide-desc">
              Control de versiones paso a paso para respaldar tus prácticas con agentes de código y encender tus puntitos verdes de actividad en GitHub.
            </p>
          </div>
        </div>

        <div className="git-guide-header-actions">
          <a 
            href="/downloads/dia1-guia-git-github.md" 
            download="dia1-guia-git-github.md" 
            className="btn btn-secondary btn-sm"
            onClick={() => showToast && showToast('Descargando guía en Markdown')}
          >
            <Download size={14} />
            <span>Descargar .md</span>
          </a>
          <button 
            className="btn btn-glow-cyan btn-sm"
            onClick={() => copyToClipboard(fullBashScript, 'all-script', '¡Todos los comandos copiados en orden!')}
          >
            {copiedKey === 'all-script' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copiedKey === 'all-script' ? '¡Copiado!' : 'Copiar Todos los Comandos'}</span>
          </button>
        </div>
      </div>

      {/* Stepper de navegación */}
      <div className="git-steps-nav">
        {[
          { num: 1, label: '1. Crear en GitHub' },
          { num: 2, label: '2. Configurar Identidad' },
          { num: 3, label: '3. Conectar y Subir' },
          { num: 4, label: '4. Ver en Perfil' }
        ].map((s) => (
          <button
            key={s.num}
            className={`git-step-btn ${activeStep === s.num ? 'active' : ''}`}
            onClick={() => setActiveStep(s.num)}
          >
            <span className="step-circle">{s.num}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Contenido dinámico según el paso */}
      <div className="git-step-content-area">
        {/* PASO 1 */}
        {activeStep === 1 && (
          <div className="git-step-body animate-fade-in">
            <div className="step-badge-row">
              <span className="step-chip">PASO 1 // EN LA WEB</span>
              <span className="step-time">2 minutos</span>
            </div>
            <h4 className="step-title">Crear el Repositorio Vacío en GitHub</h4>
            
            <ol className="git-instructions-list">
              <li>
                Entra a <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-link">github.com <ExternalLink size={12} /></a> e inicia sesión con tu cuenta.
              </li>
              <li>
                En la esquina superior derecha, haz clic en el botón <strong><code>+</code></strong> y selecciona <strong>New repository</strong> (Nuevo repositorio).
              </li>
              <li>
                Llena los datos básicos:
                <ul className="sub-list">
                  <li>
                    <strong>Repository name:</strong> Escribe un nombre sin espacios (ejemplo: <code>curso-ia-proyecto</code> o <code>landing-recursos-prompts</code>).
                  </li>
                  <li>
                    <strong>Description:</strong> Breve descripción opcional (ej. "Landing page y componentes generados con agentes de IA").
                  </li>
                  <li>
                    <strong>Visibilidad:</strong> Selecciona <strong>Public</strong> para que se vea en tu perfil público y docentes o compañeros puedan visitarlo.
                  </li>
                </ul>
              </li>
            </ol>

            <div className="git-callout-warning">
              <AlertCircle size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fbbf24' }}>¡Regla de Oro Crucial!</strong>
                <p>
                  <strong>NO</strong> marques las casillas de <em>"Add a README file"</em>, <em>"Add .gitignore"</em> ni <em>"Choose a license"</em> por ahora.
                  Es mucho más sencillo conectar un proyecto ya creado en tu computadora si el repositorio en GitHub nace <strong>completamente vacío</strong>.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveStep(2)}>
                <span>Continuar al Paso 2: Configuración</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 2 */}
        {activeStep === 2 && (
          <div className="git-step-body animate-fade-in">
            <div className="step-badge-row">
              <span className="step-chip">PASO 2 // EN LA TERMINAL</span>
              <span className="step-time">Solo una vez</span>
            </div>
            <h4 className="step-title">Configuración Inicial de tu Identidad en la Computadora</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
              Abre tu terminal (o la terminal integrada en VS Code / Cursor presionando <code>Ctrl + ~</code> o <code>Cmd + ~</code>). Configura tu nombre y el correo con el que te diste de alta en GitHub:
            </p>

            {/* Generador interactivo de comandos */}
            <div className="interactive-fields-grid">
              <div className="interactive-field">
                <label>Tu Nombre y Apellido:</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ej. Juan Pérez" 
                  className="interactive-input"
                />
              </div>
              <div className="interactive-field">
                <label>Tu Correo de GitHub:</label>
                <input 
                  type="email" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Ej. juan@gmail.com" 
                  className="interactive-input"
                />
              </div>
            </div>

            <div className="terminal-box">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="terminal-title">bash // terminal</span>
                <button 
                  className="btn-copy-code"
                  onClick={() => copyToClipboard(`git config --global user.name "${resolvedName}"\ngit config --global user.email "${resolvedEmail}"`, 'config-all')}
                >
                  {copiedKey === 'config-all' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedKey === 'config-all' ? 'Copiado' : 'Copiar ambos'}</span>
                </button>
              </div>
              <pre className="terminal-code">
{`git config --global user.name "${resolvedName}"
git config --global user.email "${resolvedEmail}"`}
              </pre>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveStep(1)}>
                <span>Paso Anterior</span>
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveStep(3)}>
                <span>Continuar al Paso 3: Conectar Proyecto</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 */}
        {activeStep === 3 && (
          <div className="git-step-body animate-fade-in">
            <div className="step-badge-row">
              <span className="step-chip">PASO 3 // EN TU PROYECTO</span>
              <span className="step-time">6 Comandos Clave</span>
            </div>
            <h4 className="step-title">Conectar tu Proyecto Local con GitHub</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '14px' }}>
              Abre la carpeta de tu proyecto en la terminal de tu editor y ejecuta los comandos en orden exacto:
            </p>

            {/* Input para personalizar la URL del repo */}
            <div className="interactive-field" style={{ marginBottom: '16px' }}>
              <label>Pega aquí la URL de tu repositorio en GitHub (opcional, para personalizar el comando 4):</label>
              <input 
                type="text" 
                value={userRepoUrl} 
                onChange={(e) => setUserRepoUrl(e.target.value)}
                placeholder="https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git" 
                className="interactive-input"
              />
            </div>

            <div className="commands-chain-list">
              {/* Comando 1 */}
              <div className="command-chain-row">
                <div className="cmd-num">1</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Inicializar Git:</strong> Crea el repositorio oculto en tu máquina.</div>
                  <code className="cmd-code">git init</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard('git init', 'cmd-1')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-1' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Comando 2 */}
              <div className="command-chain-row">
                <div className="cmd-num">2</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Preparar archivos:</strong> Agrega todos los archivos generados al área de escaneo (Staging).</div>
                  <code className="cmd-code">git add .</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard('git add .', 'cmd-2')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-2' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Comando 3 */}
              <div className="command-chain-row">
                <div className="cmd-num">3</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Guardar foto (Commit):</strong> Congela la primera versión oficial de tus cambios.</div>
                  <code className="cmd-code">git commit -m "Primer commit: Creación de recursos y landing page con prompts"</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard('git commit -m "Primer commit: Creación de recursos y landing page con prompts"', 'cmd-3')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-3' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Comando 4 */}
              <div className="command-chain-row">
                <div className="cmd-num">4</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Vincular con GitHub:</strong> Conecta tu carpeta con el repo que creaste en la web.</div>
                  <code className="cmd-code">git remote add origin {resolvedRepo}</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard(`git remote add origin ${resolvedRepo}`, 'cmd-4')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-4' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Comando 5 */}
              <div className="command-chain-row">
                <div className="cmd-num">5</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Definir rama principal:</strong> Asegura que tu rama principal se llame <code>main</code>.</div>
                  <code className="cmd-code">git branch -M main</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard('git branch -M main', 'cmd-5')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-5' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Comando 6 */}
              <div className="command-chain-row">
                <div className="cmd-num">6</div>
                <div className="cmd-info">
                  <div className="cmd-desc"><strong>Subir cambios (Push):</strong> Envía todo tu código a la nube de GitHub.</div>
                  <code className="cmd-code">git push -u origin main</code>
                </div>
                <button 
                  className="btn-cmd-copy" 
                  onClick={() => copyToClipboard('git push -u origin main', 'cmd-6')}
                  title="Copiar comando"
                >
                  {copiedKey === 'cmd-6' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveStep(2)}>
                <span>Paso Anterior</span>
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveStep(4)}>
                <span>Continuar al Paso 4: Ver Resultado</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 4 */}
        {activeStep === 4 && (
          <div className="git-step-body animate-fade-in">
            <div className="step-badge-row">
              <span className="step-chip">PASO 4 // EN TU PERFIL</span>
              <span className="step-time">Celebración 🎉</span>
            </div>
            <h4 className="step-title">¡Ver tu Proyecto en GitHub y Puntitos Verdes!</h4>

            <div className="success-achievement-card">
              <div className="achievement-icon">
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <div>
                <h5 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '6px' }}>
                  ¡Tu primera contribución oficial del curso está en la nube!
                </h5>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                  1. Vuelve a la página de tu repositorio en GitHub y presiona <strong>F5</strong> para actualizar. ¡Verás todos tus archivos y carpetas listados ahí!
                  <br />
                  2. Entra a tu <strong>perfil público de GitHub</strong>: notarás que el recuadro de actividad anual tiene un nuevo <strong>cuadrito verde brillante</strong> registrado el día de hoy.
                </p>
              </div>
            </div>

            {/* Consejo de la clase: GUI de Cursor / VS Code */}
            <div className="git-callout-tip">
              <Lightbulb size={24} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#00f0ff' }}>💡 Consejo para la clase (Interfaz Gráfica en Cursor & VS Code):</strong>
                <p style={{ marginTop: '6px' }}>
                  Recuerda a los alumnos que en <strong>Cursor</strong> y <strong>VS Code</strong> tienen una <strong>pestaña lateral dedicada a Git</strong> (el icono de Control de Código Fuente con tres pelotitas conectadas por líneas en la barra lateral izquierda, o atajo <code>Ctrl + Shift + G</code>).
                </p>
                <p style={{ marginTop: '6px', color: '#cbd5e1' }}>
                  Aunque es fundamental dominar la terminal para entender qué ocurre por detrás, la interfaz gráfica del editor les facilita muchísimo el día a día para revisar cambios visuales (diffs), escribir el mensaje del commit y hacer <strong>Push</strong> o <strong>Sync</strong> con un solo clic sin teclear comandos.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveStep(3)}>
                <span>Volver a los Comandos</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
