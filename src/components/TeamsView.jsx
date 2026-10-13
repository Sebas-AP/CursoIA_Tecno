import React, { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Globe,
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle2,
  Code2,
  Dices,
  Shuffle,
  Share2,
  Lock,
  LogOut,
  KeyRound,
  Send,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import {
  fetchTeams,
  verifyInstructorPin,
  createTeams,
  deleteTeam,
  getTeamByCode,
  submitProject,
  instructorUpdateTeam
} from '../lib/teamsApi';

const GithubIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Utilidad para mezclar un array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const normalizeMembers = (members) => {
  if (Array.isArray(members)) return members;
  try {
    const parsed = JSON.parse(members);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const TeamsView = ({ showToast }) => {
  // 'gallery' | 'submit' | 'roulette'
  const [subView, setSubView] = useState('gallery');

  // Datos
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Rol instructor (persistido en sessionStorage)
  const [isInstructor, setIsInstructor] = useState(
    () => sessionStorage.getItem('teams_is_instructor') === 'true'
  );
  const [instructorPin, setInstructorPin] = useState(
    () => sessionStorage.getItem('teams_instructor_pin') || ''
  );
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);

  // Búsqueda en galería
  const [searchQuery, setSearchQuery] = useState('');

  // Estado del formulario de proyecto (estudiantes o instructor editando)
  const [teamCodeInput, setTeamCodeInput] = useState('');
  const [validatedTeam, setValidatedTeam] = useState(null);
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null); // solo instructor
  const [formProjectName, setFormProjectName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formRepoUrl, setFormRepoUrl] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formStatus, setFormStatus] = useState('en_desarrollo');
  const [isSaving, setIsSaving] = useState(false);

  // Ruleta (instructor)
  const [studentsInput, setStudentsInput] = useState('');
  const [teamSize, setTeamSize] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rouletteTeams, setRouletteTeams] = useState([]);
  const [createdTeams, setCreatedTeams] = useState([]);
  const [isCreatingTeams, setIsCreatingTeams] = useState(false);

  // Cargar equipos
  const loadTeams = async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setLoadError('missing-config');
      return;
    }
    try {
      setIsLoading(true);
      const data = await fetchTeams();
      setTeams(data);
      setLoadError(null);
    } catch (e) {
      console.error(e);
      setLoadError('fetch-error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  // ---------- Autenticación instructor ----------
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    try {
      setIsVerifyingPin(true);
      const ok = await verifyInstructorPin(pinInput.trim());
      if (ok) {
        setIsInstructor(true);
        setInstructorPin(pinInput.trim());
        sessionStorage.setItem('teams_is_instructor', 'true');
        sessionStorage.setItem('teams_instructor_pin', pinInput.trim());
        setShowPinModal(false);
        setPinInput('');
        showToast('¡Bienvenido, instructor!');
      } else {
        showToast('PIN incorrecto');
      }
    } catch (e) {
      console.error(e);
      showToast(e.message || 'Error al verificar el PIN');
    } finally {
      setIsVerifyingPin(false);
    }
  };

  const handleInstructorLogout = () => {
    setIsInstructor(false);
    setInstructorPin('');
    sessionStorage.removeItem('teams_is_instructor');
    sessionStorage.removeItem('teams_instructor_pin');
    if (subView === 'roulette') setSubView('gallery');
    showToast('Sesión de instructor cerrada');
  };

  // ---------- Formulario de proyecto ----------
  const resetForm = () => {
    setTeamCodeInput('');
    setValidatedTeam(null);
    setEditingTeamId(null);
    setFormProjectName('');
    setFormDescription('');
    setFormRepoUrl('');
    setFormDemoUrl('');
    setFormStatus('en_desarrollo');
  };

  const handleOpenSubmit = () => {
    resetForm();
    setSubView('submit');
  };

  // Validar código de equipo (estudiantes)
  const handleValidateCode = async (e) => {
    e.preventDefault();
    if (!teamCodeInput.trim()) {
      showToast('Ingresa el código de tu equipo');
      return;
    }
    try {
      setIsCheckingCode(true);
      const team = await getTeamByCode(teamCodeInput.trim());
      if (!team) {
        showToast('Código no válido. Revisa con tu instructor.');
        return;
      }
      setValidatedTeam(team);
      // Precargar datos existentes del proyecto
      const full = teams.find(t => t.id === team.id);
      if (full) {
        setFormProjectName(full.project_name || '');
        setFormDescription(full.description || '');
        setFormRepoUrl(full.repo_url || '');
        setFormDemoUrl(full.demo_url || '');
        setFormStatus(full.status === 'sin_entregar' ? 'en_desarrollo' : full.status);
      }
      showToast(`Código válido: ${team.name}`);
    } catch (e) {
      console.error(e);
      showToast(e.message || 'Error al validar el código');
    } finally {
      setIsCheckingCode(false);
    }
  };

  // Editar (instructor)
  const handleOpenEditForm = (team) => {
    setEditingTeamId(team.id);
    setValidatedTeam({ id: team.id, name: team.name, members: normalizeMembers(team.members) });
    setFormProjectName(team.project_name || '');
    setFormDescription(team.description || '');
    setFormRepoUrl(team.repo_url || '');
    setFormDemoUrl(team.demo_url || '');
    setFormStatus(team.status === 'sin_entregar' ? 'en_desarrollo' : team.status);
    setSubView('submit');
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();

    if (!formProjectName.trim()) {
      showToast('Escribe el nombre del proyecto');
      return;
    }
    if (!formDescription.trim()) {
      showToast('Escribe la descripción del proyecto');
      return;
    }
    if (!formRepoUrl.trim()) {
      showToast('Ingresa el enlace del repositorio');
      return;
    }

    try {
      setIsSaving(true);
      if (editingTeamId) {
        // Edición del instructor
        await instructorUpdateTeam(instructorPin, editingTeamId, {
          project_name: formProjectName.trim(),
          description: formDescription.trim(),
          repo_url: formRepoUrl.trim(),
          demo_url: formDemoUrl.trim(),
          status: formStatus
        });
        showToast('¡Proyecto actualizado correctamente!');
      } else {
        // Registro del equipo con código
        const updated = await submitProject(teamCodeInput.trim(), {
          projectName: formProjectName.trim(),
          description: formDescription.trim(),
          repoUrl: formRepoUrl.trim(),
          demoUrl: formDemoUrl.trim(),
          status: formStatus
        });
        if (!updated) {
          showToast('No se encontró el equipo. Verifica el código.');
          return;
        }
        showToast('¡Proyecto registrado correctamente!');
      }
      await loadTeams();
      resetForm();
      setSubView('gallery');
    } catch (e) {
      console.error(e);
      showToast(e.message || 'Error al guardar el proyecto');
    } finally {
      setIsSaving(false);
    }
  };

  // Eliminar equipo (instructor)
  const handleDeleteTeam = async (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}" y su proyecto?`)) return;
    try {
      await deleteTeam(instructorPin, id);
      setTeams(prev => prev.filter(t => t.id !== id));
      showToast('Equipo eliminado');
    } catch (e) {
      console.error(e);
      showToast(e.message || 'Error al eliminar');
    }
  };

  // Copiar enlaces del proyecto
  const handleCopyProjectLinks = async (team) => {
    let msg = `🚀 ${team.project_name || 'Proyecto'} (${team.name})\n👥 Integrantes: ${normalizeMembers(team.members).join(', ')}\n`;
    if (team.demo_url) msg += `🌐 Demo: ${team.demo_url}\n`;
    if (team.repo_url) msg += `🐙 Repositorio: ${team.repo_url}\n`;
    try {
      await navigator.clipboard.writeText(msg);
      showToast('¡Enlaces copiados al portapapeles!');
    } catch {
      showToast('Error al copiar');
    }
  };

  // ---------- Ruleta (instructor) ----------
  const handleGenerateRouletteTeams = () => {
    const studentList = studentsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (studentList.length < 2) {
      showToast('Ingresa al menos 2 estudiantes para formar equipos');
      return;
    }

    setIsGenerating(true);
    setCreatedTeams([]);
    setTimeout(() => {
      const shuffled = shuffleArray(studentList);
      const numMembers = parseInt(teamSize, 10);
      const generated = [];
      let teamIndex = 1;

      for (let i = 0; i < shuffled.length; i += numMembers) {
        generated.push({
          id: `roulette-${teamIndex}`,
          name: `Equipo ${String(teamIndex).padStart(2, '0')}`,
          members: shuffled.slice(i, i + numMembers)
        });
        teamIndex++;
      }

      setRouletteTeams(generated);
      setIsGenerating(false);
      showToast(`¡${generated.length} equipos formados!`);
    }, 600);
  };

  // Guardar equipos generados en la base de datos
  const handleCreateTeamsInDb = async () => {
    if (rouletteTeams.length === 0) return;
    try {
      setIsCreatingTeams(true);
      const created = await createTeams(
        instructorPin,
        rouletteTeams.map(t => ({ name: t.name, members: t.members }))
      );
      setCreatedTeams(created);
      setRouletteTeams([]);
      setStudentsInput('');
      await loadTeams();
      showToast(`¡${created.length} equipos guardados! Comparte los códigos con cada equipo.`);
    } catch (e) {
      console.error(e);
      showToast(e.message || 'Error al guardar los equipos');
    } finally {
      setIsCreatingTeams(false);
    }
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast(`Código ${code} copiado`);
    } catch {
      showToast('Error al copiar');
    }
  };

  // ---------- Filtrado ----------
  const filteredTeams = teams.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      (t.project_name && t.project_name.toLowerCase().includes(q)) ||
      (t.description && t.description.toLowerCase().includes(q)) ||
      normalizeMembers(t.members).some(m => m.toLowerCase().includes(q))
    );
  });

  const statusLabel = (status) => {
    if (status === 'publicado') return 'Publicado';
    if (status === 'en_desarrollo') return 'En Desarrollo';
    return 'Sin Entregar';
  };

  return (
    <div className="teams-section">
      <div className="container">
        {/* Cabecera Principal */}
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="section-tag">// Showcase Oficial · Hackathon & Pitch</span>
          <h2 className="section-title">Equipos y Proyectos Finales</h2>
          <p className="section-desc">
            Consulta los proyectos entregados por cada equipo, revisa sus repositorios en GitHub y prueba las demos en vivo.
          </p>
        </div>

        {/* Aviso si Supabase no está configurado */}
        {!isSupabaseConfigured && (
          <div className="config-warning-box">
            <AlertTriangle size={22} color="#f59e0b" />
            <div>
              <strong>Falta configurar Supabase.</strong>
              <p>
                Crea un proyecto en supabase.com, ejecuta el script <code>supabase/schema.sql</code> en el SQL Editor
                y crea un archivo <code>.env</code> con <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> (ver <code>.env.example</code>).
              </p>
            </div>
          </div>
        )}

        {/* Barra de Pestañas */}
        <div className="teams-nav-bar">
          <div className="teams-nav-tabs">
            <button
              className={`team-nav-tab ${subView === 'gallery' ? 'active' : ''}`}
              onClick={() => setSubView('gallery')}
            >
              <Globe size={18} />
              <span>Galería de Proyectos</span>
              <span className="tab-counter-badge">{teams.length}</span>
            </button>

            <button
              className={`team-nav-tab ${subView === 'submit' ? 'active' : ''}`}
              onClick={handleOpenSubmit}
            >
              <Plus size={18} />
              <span>Registrar / Actualizar Proyecto</span>
            </button>

            {isInstructor && (
              <button
                className={`team-nav-tab ${subView === 'roulette' ? 'active' : ''}`}
                onClick={() => setSubView('roulette')}
              >
                <Dices size={18} />
                <span>Sorteo de Equipos (Instructor)</span>
              </button>
            )}
          </div>

          {isInstructor ? (
            <button className="btn btn-secondary btn-sm" onClick={handleInstructorLogout}>
              <LogOut size={16} />
              <span>Salir (Instructor)</span>
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setShowPinModal(true)}>
              <Lock size={16} />
              <span>Acceso Instructor</span>
            </button>
          )}
        </div>

        {/* MODAL: PIN de instructor */}
        {showPinModal && (
          <div className="modal-backdrop" onClick={() => setShowPinModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <Lock size={22} color="#00f0ff" />
                <h3>Acceso de Instructor</h3>
              </div>
              <p className="modal-desc">Ingresa el PIN de instructor para gestionar equipos y proyectos.</p>
              <form onSubmit={handleVerifyPin}>
                <input
                  type="password"
                  className="form-input-cyber"
                  placeholder="PIN de instructor"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  autoFocus
                />
                <div className="form-actions-row" style={{ marginTop: '18px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPinModal(false)}>
                    <span>Cancelar</span>
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isVerifyingPin}>
                    {isVerifyingPin ? <Loader2 className="animate-spin" size={16} /> : <KeyRound size={16} />}
                    <span>Entrar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VISTA 1: GALERÍA DE PROYECTOS */}
        {subView === 'gallery' && (
          <div className="gallery-container animate-fade-in">
            <div className="gallery-filter-bar">
              <div className="search-input-wrap">
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Buscar por proyecto, equipo o integrante..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="empty-projects-state">
                <Loader2 className="animate-spin" size={40} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
                <h4>Cargando equipos...</h4>
              </div>
            ) : loadError ? (
              <div className="empty-projects-state">
                <AlertTriangle size={48} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
                <h4>{loadError === 'missing-config' ? 'Supabase no configurado' : 'No se pudieron cargar los equipos'}</h4>
                <p>{loadError === 'missing-config' ? 'Sigue las instrucciones de arriba para conectar la base de datos.' : 'Revisa tu conexión e inténtalo de nuevo.'}</p>
              </div>
            ) : filteredTeams.length > 0 ? (
              <div className="projects-showcase-grid">
                {filteredTeams.map((team) => {
                  const members = normalizeMembers(team.members);
                  return (
                    <div key={team.id} className="project-showcase-card">
                      <div className="project-card-top">
                        <div className="project-team-name" style={{ fontWeight: 700 }}>
                          <Users size={15} color="#00f0ff" />
                          <span>{team.name}</span>
                        </div>
                        <div className="project-status-chip">
                          {team.status === 'publicado' ? (
                            <span className="status-badge-published">
                              <span className="status-live-dot"></span>
                              Publicado
                            </span>
                          ) : (
                            <span className="status-badge-dev">{statusLabel(team.status)}</span>
                          )}
                        </div>
                      </div>

                      <h3 className="project-card-title">
                        {team.project_name || 'Proyecto por registrar'}
                      </h3>

                      <div className="project-members-wrap">
                        <span className="members-label">Integrantes:</span>
                        <div className="members-chips-list">
                          {members.map((member, idx) => (
                            <span key={idx} className="member-name-tag">{member}</span>
                          ))}
                        </div>
                      </div>

                      {team.description ? (
                        <p className="project-card-desc">{team.description}</p>
                      ) : (
                        <p className="project-card-desc" style={{ opacity: 0.6, fontStyle: 'italic' }}>
                          El equipo aún no ha registrado la descripción de su proyecto.
                        </p>
                      )}

                      <div className="project-links-row">
                        {team.demo_url ? (
                          <a
                            href={team.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-project-link btn-demo"
                          >
                            <Globe size={16} />
                            <span>Demo en Vivo</span>
                          </a>
                        ) : (
                          <span className="btn-project-link disabled" title="El proyecto aún no está desplegado">
                            <Globe size={16} />
                            <span>Demo Pendiente</span>
                          </span>
                        )}

                        {team.repo_url ? (
                          <a
                            href={team.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-project-link btn-github"
                          >
                            <GithubIcon size={16} color="#ffffff" />
                            <span>GitHub</span>
                          </a>
                        ) : (
                          <span className="btn-project-link disabled" title="Repositorio aún no registrado">
                            <GithubIcon size={16} color="#64748b" />
                            <span>Repo Pendiente</span>
                          </span>
                        )}
                      </div>

                      <div className="project-card-footer">
                        <div className="card-actions-left">
                          {(team.repo_url || team.demo_url) && (
                            <button
                              className="action-icon-btn"
                              onClick={() => handleCopyProjectLinks(team)}
                              title="Copiar enlaces del proyecto"
                            >
                              <Share2 size={14} />
                              <span>Compartir</span>
                            </button>
                          )}
                        </div>

                        {isInstructor && (
                          <div className="card-actions-right">
                            <button
                              className="action-icon-btn"
                              onClick={() => handleCopyCode(team.code)}
                              title={`Código del equipo: ${team.code}`}
                            >
                              <KeyRound size={14} />
                              <span>{team.code}</span>
                            </button>
                            <button
                              className="action-icon-btn edit"
                              onClick={() => handleOpenEditForm(team)}
                              title="Editar proyecto"
                            >
                              <Edit3 size={14} />
                              <span>Editar</span>
                            </button>
                            <button
                              className="action-icon-btn delete"
                              onClick={() => handleDeleteTeam(team.id, team.name)}
                              title="Eliminar equipo"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-projects-state">
                <Globe size={48} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
                <h4>
                  {searchQuery
                    ? 'No se encontraron equipos con esa búsqueda'
                    : 'Aún no hay equipos registrados'}
                </h4>
                <p>
                  {searchQuery
                    ? 'Prueba con otra palabra clave.'
                    : isInstructor
                      ? 'Usa el Sorteo de Equipos para formar los grupos.'
                      : 'El instructor creará los equipos pronto.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* VISTA 2: FORMULARIO DE REGISTRO DE PROYECTO */}
        {subView === 'submit' && (
          <div className="submit-project-card animate-fade-in">
            <div className="submit-form-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="form-icon-badge">
                  <Code2 size={24} color="#00f0ff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', color: '#ffffff' }}>
                    {editingTeamId ? 'Editar Proyecto (Instructor)' : 'Registrar Proyecto del Equipo'}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                    {editingTeamId
                      ? 'Actualiza la información del proyecto del equipo.'
                      : 'Ingresa el código que tu instructor te dio y registra los datos de tu proyecto.'}
                  </p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={() => { resetForm(); setSubView('gallery'); }}>
                <span>Volver a la Galería</span>
              </button>
            </div>

            {/* Paso 1: Validar código de equipo (solo estudiantes) */}
            {!editingTeamId && !validatedTeam && (
              <form onSubmit={handleValidateCode} className="submit-project-form">
                <div className="form-group">
                  <label className="form-label">
                    <KeyRound size={16} color="#00f0ff" />
                    <span>Código del Equipo:</span>
                    <strong style={{ color: '#f43f5e' }}>*</strong>
                  </label>
                  <input
                    type="text"
                    className="form-input-cyber team-code-input"
                    placeholder="Ej. A1B2C3"
                    value={teamCodeInput}
                    onChange={(e) => setTeamCodeInput(e.target.value.toUpperCase())}
                    maxLength={6}
                    required
                  />
                  <span className="form-hint">Tu instructor te compartió este código de 6 caracteres.</span>
                </div>
                <div className="form-actions-row">
                  <button type="button" className="btn btn-secondary" onClick={() => setSubView('gallery')}>
                    <span>Cancelar</span>
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isCheckingCode}>
                    {isCheckingCode ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                    <span>Validar Código</span>
                  </button>
                </div>
              </form>
            )}

            {/* Paso 2: Formulario del proyecto */}
            {validatedTeam && (
              <>
                <div className="validated-team-banner">
                  <Users size={18} color="#10b981" />
                  <div>
                    <strong>{validatedTeam.name}</strong>
                    <span>{normalizeMembers(validatedTeam.members).join(' · ')}</span>
                  </div>
                </div>

                <form onSubmit={handleSaveProject} className="submit-project-form">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Nombre del Proyecto:</span>
                      <strong style={{ color: '#f43f5e' }}>*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-input-cyber"
                      placeholder="Ej. EcoRuta: Optimizador inteligente de rutas"
                      value={formProjectName}
                      onChange={(e) => setFormProjectName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Descripción del Proyecto:</span>
                      <strong style={{ color: '#f43f5e' }}>*</strong>
                    </label>
                    <textarea
                      className="form-input-cyber textarea"
                      rows={4}
                      placeholder="Describe qué problema resuelve tu proyecto y cómo la IA aporta valor..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <GithubIcon size={16} color="#00f0ff" />
                      <span>Enlace del Repositorio:</span>
                      <strong style={{ color: '#f43f5e' }}>*</strong>
                    </label>
                    <input
                      type="url"
                      className="form-input-cyber"
                      placeholder="https://github.com/tu-equipo/tu-proyecto"
                      value={formRepoUrl}
                      onChange={(e) => setFormRepoUrl(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Globe size={16} color="#10b981" />
                      <span>Enlace del Proyecto Desplegado (opcional):</span>
                    </label>
                    <input
                      type="url"
                      className="form-input-cyber"
                      placeholder="https://tu-proyecto.vercel.app (déjalo vacío si aún no lo despliegas)"
                      value={formDemoUrl}
                      onChange={(e) => setFormDemoUrl(e.target.value)}
                    />
                    <span className="form-hint">Opcional: si no alcanzan a desplegarlo, pueden dejar este campo vacío.</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Estado de la Entrega:</span>
                    </label>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#ffffff' }}>
                        <input
                          type="radio"
                          name="status"
                          value="publicado"
                          checked={formStatus === 'publicado'}
                          onChange={() => setFormStatus('publicado')}
                        />
                        <span>🟢 Publicado (listo para mostrar)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#cbd5e1' }}>
                        <input
                          type="radio"
                          name="status"
                          value="en_desarrollo"
                          checked={formStatus === 'en_desarrollo'}
                          onChange={() => setFormStatus('en_desarrollo')}
                        />
                        <span>🟡 En Desarrollo</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); setSubView('gallery'); }}>
                      <span>Cancelar</span>
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                      <span>{editingTeamId ? 'Guardar Cambios' : 'Registrar Proyecto'}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* VISTA 3: SORTEO DE EQUIPOS (SOLO INSTRUCTOR) */}
        {subView === 'roulette' && isInstructor && (
          <div className="roulette-tool-container animate-fade-in">
            <div className="roulette-intro-box">
              <Dices size={28} color="#00f0ff" />
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '4px' }}>
                  Herramienta del Instructor: Sorteo de Equipos
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Ingresa la lista de estudiantes, forma los equipos aleatoriamente y guárdalos. Se generará un código único por equipo para que registren su proyecto. Las categorías y problemas son libres: cada equipo elige su tema.
                </p>
              </div>
            </div>

            <div className="teams-control-panel" style={{ marginTop: '20px' }}>
              <div className="control-panel-grid">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                      Lista de Estudiantes ({studentsInput.split('\n').filter(s => s.trim().length > 0).length} registrados)
                    </label>
                    <button className="btn btn-secondary btn-sm" onClick={() => setStudentsInput('')}>
                      <span>Limpiar</span>
                    </button>
                  </div>

                  <textarea
                    className="textarea-cyber"
                    placeholder="Escribe o pega los nombres de los estudiantes (uno por línea)..."
                    value={studentsInput}
                    onChange={(e) => setStudentsInput(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', display: 'block', marginBottom: '10px' }}>
                      Parámetros de Formación
                    </label>
                    <div className="config-row">
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                          Integrantes por Equipo:
                        </span>
                        <select
                          className="input-cyber-select"
                          style={{ width: '100%' }}
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                        >
                          <option value={2}>2 Alumnos por equipo</option>
                          <option value={3}>3 Alumnos por equipo (Recomendado)</option>
                          <option value={4}>4 Alumnos por equipo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn-roulette"
                    onClick={handleGenerateRouletteTeams}
                    disabled={isGenerating || studentsInput.trim().length === 0}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Sorteando Equipos...</span>
                      </>
                    ) : (
                      <>
                        <Shuffle size={20} />
                        <span>Sortear Equipos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Vista previa del sorteo */}
            {rouletteTeams.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <div className="teams-results-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users size={22} color="#06b6d4" />
                    <h3 style={{ fontSize: '22px', color: '#ffffff' }}>
                      {rouletteTeams.length} Equipos Formados
                    </h3>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleCreateTeamsInDb}
                    disabled={isCreatingTeams}
                  >
                    {isCreatingTeams ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                    <span>Guardar Equipos y Generar Códigos</span>
                  </button>
                </div>

                <div className="teams-cards-grid">
                  {rouletteTeams.map((team) => (
                    <div key={team.id} className="team-card">
                      <div className="team-header">
                        <span className="team-number-tag">{team.name}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                          {team.members.length} Integrantes
                        </span>
                      </div>

                      <div className="members-chips">
                        {team.members.map((member, mIdx) => (
                          <span key={mIdx} className="member-chip">
                            <Users size={12} color="#06b6d4" />
                            <span>{member}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Códigos generados tras guardar */}
            {createdTeams.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <div className="teams-results-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={22} color="#10b981" />
                    <h3 style={{ fontSize: '22px', color: '#ffffff' }}>
                      Equipos Guardados — Comparte estos Códigos
                    </h3>
                  </div>
                </div>

                <div className="teams-cards-grid">
                  {createdTeams.map((team) => (
                    <div key={team.id} className="team-card">
                      <div className="team-header">
                        <span className="team-number-tag">{team.name}</span>
                        <button
                          className="team-code-badge"
                          onClick={() => handleCopyCode(team.code)}
                          title="Copiar código"
                        >
                          <KeyRound size={13} />
                          <span>{team.code}</span>
                          <Copy size={12} />
                        </button>
                      </div>

                      <div className="members-chips">
                        {normalizeMembers(team.members).map((member, mIdx) => (
                          <span key={mIdx} className="member-chip">
                            <Users size={12} color="#06b6d4" />
                            <span>{member}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
