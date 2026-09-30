import React, { useState, useEffect } from 'react';
import { PROJECT_CATEGORIES } from '../data/categoriesData';
import { 
  Users, 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Check, 
  Layers, 
  Activity, 
  ShieldAlert, 
  GraduationCap, 
  Terminal, 
  Lock, 
  ShoppingBag, 
  Building2, 
  Truck,
  ExternalLink,
  Globe,
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle2,
  Code2,
  Send,
  Dices,
  Shuffle,
  Eye,
  Share2,
  Filter
} from 'lucide-react';

const GithubIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    projectName: "MedGuard: Triaje Clínico & Grounding RAG",
    teamName: "Equipo 01 - CyberCore",
    members: ["Carlos Mendoza", "Sofía Valenzuela", "Diego Navarro"],
    category: "HealthTech",
    categoryColor: "#06b6d4",
    description: "Asistente médico con RAG estricto sobre expedientes clínicos en JSON locales. Diagnósticos diferenciales con citas directas al historial y cero alucinaciones.",
    githubUrl: "https://github.com/curso-ia-tecno/medguard-rag",
    demoUrl: "https://medguard-rag-demo.vercel.app",
    aiStack: "RAG Local con JSONs + Subagente Validador",
    status: "publicado",
    createdAt: "2026-09-29"
  },
  {
    id: "proj-2",
    projectName: "AuditPulse: Auditor Financiero con SQLite MCP",
    teamName: "Equipo 02 - Nexus AI",
    members: ["Mariana Herrera", "Mateo Castillo", "Valentina Rojas"],
    category: "FinTech",
    categoryColor: "#10b981",
    description: "Agente de análisis financiero conectado en tiempo real a SQLite vía Model Context Protocol (MCP). Consultas en lenguaje natural y detección de anomalías contables.",
    githubUrl: "https://github.com/curso-ia-tecno/auditpulse-mcp",
    demoUrl: "https://auditpulse-preview.netlify.app",
    aiStack: "Model Context Protocol (SQLite MCP) + Consultas NLP",
    status: "publicado",
    createdAt: "2026-09-29"
  },
  {
    id: "proj-3",
    projectName: "CodeMentor: Tutor de Código con Subagentes TDD",
    teamName: "Equipo 03 - AgentForge",
    members: ["Sebastián Paredes", "Camila Domínguez", "Lucía Guzmán"],
    category: "EdTech",
    categoryColor: "#8b5cf6",
    description: "Orquestación multi-agente guiada por pruebas: el Subagente Mentor genera especificaciones y tests unitarios en Markdown, mientras el Builder guía al estudiante.",
    githubUrl: "https://github.com/curso-ia-tecno/codementor-tdd",
    demoUrl: "https://codementor-tdd.vercel.app",
    aiStack: "Subagentes Orquestados + Paradigma TDD con Markdown",
    status: "publicado",
    createdAt: "2026-09-29"
  },
  {
    id: "proj-4",
    projectName: "LogSentinel: Diagnóstico de Errores & DevOps Autónomo",
    teamName: "Equipo 04 - NeuralPulse",
    members: ["Andrés Figueroa", "Elena Beltrán", "Gabriel Cárdenas"],
    category: "DevOps",
    categoryColor: "#f59e0b",
    description: "Analizador de logs con RAG sobre registros JSON y parches automáticos generados mediante agentes de código con directrices de workspace.",
    githubUrl: "https://github.com/curso-ia-tecno/logsentinel-devops",
    demoUrl: "https://logsentinel-app.vercel.app",
    aiStack: "RAG Local sobre Logs + Generación Asistida de Parches",
    status: "publicado",
    createdAt: "2026-09-29"
  }
];

const DEMO_STUDENTS = [
  "Alejandro Morales",
  "Sofía Valenzuela",
  "Carlos Mendoza",
  "Mariana Herrera",
  "Diego Navarro",
  "Valentina Rojas",
  "Mateo Castillo",
  "Camila Domínguez",
  "Sebastián Paredes",
  "Lucía Guzmán",
  "Andrés Figueroa",
  "Elena Beltrán",
  "Gabriel Cárdenas",
  "Valeria Fuentes",
  "Joaquín Silva",
  "Natalia Ortiz"
];

const TEAM_CYBER_NAMES = [
  "Nexus AI", "CyberCore", "Vector Minds", "AgentForge",
  "Quantum Synapse", "HyperContext", "Neural Pulse", "ZeroHallucination"
];

export const TeamsView = ({ showToast }) => {
  // Pestaña activa: 'gallery' (Galería de proyectos) | 'submit' (Crear/Editar) | 'roulette' (Sorteo)
  const [subView, setSubView] = useState('gallery');

  // Lista de proyectos publicados
  const [projects, setProjects] = useState([]);

  // Búsqueda y filtrado en galería
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Estado del formulario de creación/edición
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formProjectName, setFormProjectName] = useState('');
  const [formTeamName, setFormTeamName] = useState('');
  const [formMembers, setFormMembers] = useState('');
  const [formCategory, setFormCategory] = useState(PROJECT_CATEGORIES[0]?.name.split(':')[0] || 'HealthTech');
  const [formAiStack, setFormAiStack] = useState('RAG Local con JSONs + Subagentes');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('publicado');

  // Estado para la ruleta auxiliar de equipos (docente)
  const [studentsInput, setStudentsInput] = useState('');
  const [teamSize, setTeamSize] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rouletteTeams, setRouletteTeams] = useState([]);

  // Cargar proyectos de localStorage al inicio
  useEffect(() => {
    const saved = localStorage.getItem('course_published_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Si no hay datos previos, cargar los iniciales
    setProjects(INITIAL_PROJECTS);
    localStorage.setItem('course_published_projects', JSON.stringify(INITIAL_PROJECTS));
  }, []);

  // Guardar en localStorage cada vez que cambien los proyectos
  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('course_published_projects', JSON.stringify(newProjects));
  };

  // Abrir formulario para crear nuevo proyecto
  const handleOpenCreateForm = () => {
    setEditingProjectId(null);
    setFormProjectName('');
    setFormTeamName(`Equipo 0${projects.length + 1} - CyberCore`);
    setFormMembers('');
    setFormCategory('HealthTech');
    setFormAiStack('RAG Local con JSONs + Subagentes');
    setFormGithubUrl('');
    setFormDemoUrl('');
    setFormDescription('');
    setFormStatus('publicado');
    setSubView('submit');
  };

  // Abrir formulario para editar proyecto existente
  const handleOpenEditForm = (proj) => {
    setEditingProjectId(proj.id);
    setFormProjectName(proj.projectName);
    setFormTeamName(proj.teamName);
    setFormMembers(proj.members.join(', '));
    setFormCategory(proj.category);
    setFormAiStack(proj.aiStack || '');
    setFormGithubUrl(proj.githubUrl || '');
    setFormDemoUrl(proj.demoUrl || '');
    setFormDescription(proj.description || '');
    setFormStatus(proj.status || 'publicado');
    setSubView('submit');
  };

  // Guardar envío del formulario
  const handleSaveProject = (e) => {
    e.preventDefault();

    if (!formProjectName.trim()) {
      showToast('Por favor escribe el nombre de tu proyecto');
      return;
    }

    if (!formMembers.trim()) {
      showToast('Por favor ingresa los integrantes de tu equipo');
      return;
    }

    const membersList = formMembers
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const catObj = PROJECT_CATEGORIES.find(c => c.name.toLowerCase().includes(formCategory.toLowerCase())) || PROJECT_CATEGORIES[0];

    if (editingProjectId) {
      // Actualizar proyecto existente
      const updated = projects.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            projectName: formProjectName.trim(),
            teamName: formTeamName.trim() || 'Mi Equipo',
            members: membersList,
            category: formCategory,
            categoryColor: catObj ? catObj.color : '#06b6d4',
            aiStack: formAiStack.trim(),
            githubUrl: formGithubUrl.trim(),
            demoUrl: formDemoUrl.trim(),
            description: formDescription.trim(),
            status: formStatus
          };
        }
        return p;
      });
      saveProjects(updated);
      showToast('¡Proyecto actualizado correctamente!');
    } else {
      // Crear nuevo proyecto
      const newProj = {
        id: `proj-${Date.now()}`,
        projectName: formProjectName.trim(),
        teamName: formTeamName.trim() || `Equipo 0${projects.length + 1}`,
        members: membersList,
        category: formCategory,
        categoryColor: catObj ? catObj.color : '#06b6d4',
        aiStack: formAiStack.trim() || 'RAG / Subagentes / MCP',
        githubUrl: formGithubUrl.trim(),
        demoUrl: formDemoUrl.trim(),
        description: formDescription.trim(),
        status: formStatus,
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveProjects([newProj, ...projects]);
      showToast('¡Proyecto registrado y publicado en la galería!');
    }

    setSubView('gallery');
  };

  // Eliminar proyecto
  const handleDeleteProject = (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}" de la galería?`)) {
      const filtered = projects.filter(p => p.id !== id);
      saveProjects(filtered);
      showToast('Proyecto eliminado');
    }
  };

  // Restablecer proyectos de muestra
  const handleResetDemoProjects = () => {
    saveProjects(INITIAL_PROJECTS);
    showToast('Proyectos de ejemplo restablecidos');
  };

  // Copiar enlaces del proyecto
  const handleCopyProjectLinks = async (proj) => {
    let msg = `🚀 Proyecto: ${proj.projectName} (${proj.teamName})\n👥 Integrantes: ${proj.members.join(', ')}\n`;
    if (proj.demoUrl) msg += `🌐 Demo Web: ${proj.demoUrl}\n`;
    if (proj.githubUrl) msg += `🐙 Repositorio GitHub: ${proj.githubUrl}\n`;
    try {
      await navigator.clipboard.writeText(msg);
      showToast('¡Enlaces del proyecto copiados al portapapeles!');
    } catch (e) {
      showToast('Error al copiar');
    }
  };

  // Lógica de la Ruleta (Herramienta Docente)
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

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
    setTimeout(() => {
      const shuffledStudents = shuffleArray(studentList);
      const shuffledCategories = shuffleArray(PROJECT_CATEGORIES);

      const generatedTeams = [];
      const numMembers = parseInt(teamSize, 10);
      let teamIndex = 0;

      for (let i = 0; i < shuffledStudents.length; i += numMembers) {
        const members = shuffledStudents.slice(i, i + numMembers);
        const assignedCategory = shuffledCategories[teamIndex % shuffledCategories.length];
        const teamName = TEAM_CYBER_NAMES[teamIndex % TEAM_CYBER_NAMES.length];

        generatedTeams.push({
          id: `roulette-${teamIndex + 1}`,
          number: teamIndex + 1,
          name: `Equipo 0${teamIndex + 1} - ${teamName}`,
          members: members,
          category: assignedCategory
        });
        teamIndex++;
      }

      setRouletteTeams(generatedTeams);
      setIsGenerating(false);
      showToast(`¡${generatedTeams.length} equipos formados con la ruleta!`);
    }, 600);
  };

  // Traspasar equipos de la ruleta a la galería de proyectos
  const handleImportRouletteToGallery = () => {
    if (rouletteTeams.length === 0) return;

    const newProjectsFromRoulette = rouletteTeams.map(t => ({
      id: `proj-import-${t.id}-${Date.now()}`,
      projectName: `${t.category.name.split(':')[0]} AI Solution`,
      teamName: t.name,
      members: t.members,
      category: t.category.name.split(':')[0],
      categoryColor: t.category.color,
      description: t.category.problemSummary,
      githubUrl: "",
      demoUrl: "",
      aiStack: t.category.suggestedStack.aiTechnique,
      status: "en_desarrollo",
      createdAt: new Date().toISOString().split('T')[0]
    }));

    saveProjects([...newProjectsFromRoulette, ...projects]);
    showToast(`¡${newProjectsFromRoulette.length} equipos importados a la galería! Ahora pueden añadir sus links.`);
    setSubView('gallery');
  };

  // Filtrado de proyectos
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.members.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      categoryFilter === 'all' || 
      p.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="teams-section">
      <div className="container">
        {/* Cabecera Principal */}
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="section-tag">// Showcase Oficial · Hackathon & Pitch</span>
          <h2 className="section-title">Equipos y Proyectos Finales</h2>
          <p className="section-desc">
            Espacio oficial para alumnos, jurados y docentes. Consulta los proyectos entregados, prueba las demos en vivo, revisa los repositorios en GitHub y registra el proyecto de tu equipo.
          </p>
        </div>

        {/* Barra de Pestañas de Navegación de Equipos */}
        <div className="teams-nav-bar">
          <div className="teams-nav-tabs">
            <button 
              className={`team-nav-tab ${subView === 'gallery' ? 'active' : ''}`}
              onClick={() => setSubView('gallery')}
            >
              <Globe size={18} />
              <span>Galería de Proyectos</span>
              <span className="tab-counter-badge">{projects.length}</span>
            </button>

            <button 
              className={`team-nav-tab ${subView === 'submit' ? 'active' : ''}`}
              onClick={handleOpenCreateForm}
            >
              <Plus size={18} />
              <span>{editingProjectId ? 'Editando Proyecto' : 'Registrar / Entregar Proyecto'}</span>
            </button>

            <button 
              className={`team-nav-tab ${subView === 'roulette' ? 'active' : ''}`}
              onClick={() => setSubView('roulette')}
            >
              <Dices size={18} />
              <span>Ruleta & Sorteo (Docente)</span>
            </button>
          </div>

          {subView === 'gallery' && (
            <button className="btn btn-primary btn-sm" onClick={handleOpenCreateForm}>
              <Plus size={16} />
              <span>Subir Mi Proyecto</span>
            </button>
          )}
        </div>

        {/* VISTA 1: GALERÍA DE PROYECTOS (SHOWCASE) */}
        {subView === 'gallery' && (
          <div className="gallery-container animate-fade-in">
            {/* Barra de Filtros y Búsqueda */}
            <div className="gallery-filter-bar">
              <div className="search-input-wrap">
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text"
                  placeholder="Buscar por proyecto, alumno, equipo o tecnología..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                )}
              </div>

              <div className="filter-dropdown-wrap">
                <Filter size={16} color="#00f0ff" />
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select-field"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="DevOps">DevOps</option>
                  <option value="CyberSec">CyberSec</option>
                  <option value="E-Commerce">E-Commerce</option>
                </select>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={handleResetDemoProjects} title="Restablecer proyectos iniciales">
                <RotateCcw size={14} />
                <span>Restablecer Demos</span>
              </button>
            </div>

            {/* Grid de Tarjetas de Proyectos */}
            {filteredProjects.length > 0 ? (
              <div className="projects-showcase-grid">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="project-showcase-card">
                    {/* Header de la tarjeta */}
                    <div className="project-card-top">
                      <div className="project-category-badge" style={{ borderColor: proj.categoryColor || '#06b6d4' }}>
                        <span className="cat-dot" style={{ backgroundColor: proj.categoryColor || '#06b6d4' }}></span>
                        <span>{proj.category}</span>
                      </div>

                      <div className="project-status-chip">
                        {proj.status === 'publicado' ? (
                          <span className="status-badge-published">
                            <span className="status-live-dot"></span>
                            Listo para Demo
                          </span>
                        ) : (
                          <span className="status-badge-dev">
                            En Desarrollo
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Título y Equipo */}
                    <h3 className="project-card-title">{proj.projectName}</h3>
                    <div className="project-team-name">
                      <Users size={14} color="#00f0ff" />
                      <span>{proj.teamName}</span>
                    </div>

                    {/* Integrantes */}
                    <div className="project-members-wrap">
                      <span className="members-label">Integrantes:</span>
                      <div className="members-chips-list">
                        {proj.members.map((member, idx) => (
                          <span key={idx} className="member-name-tag">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="project-card-desc">
                      {proj.description || "Solución aumentada con inteligencia artificial construida en el curso."}
                    </p>

                    {/* Stack de IA */}
                    {proj.aiStack && (
                      <div className="project-ai-stack">
                        <Sparkles size={14} color="#a855f7" />
                        <span>{proj.aiStack}</span>
                      </div>
                    )}

                    {/* Botones de Entrega y Enlaces Directos */}
                    <div className="project-links-row">
                      {proj.demoUrl ? (
                        <a 
                          href={proj.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-project-link btn-demo"
                          title="Abrir página web creada en vivo"
                        >
                          <Globe size={16} />
                          <span>Página Web (Demo)</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="btn-project-link disabled" title="Página web aún no configurada">
                          <Globe size={16} />
                          <span>Página Web Pendiente</span>
                        </span>
                      )}

                      {proj.githubUrl ? (
                        <a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-project-link btn-github"
                          title="Ver repositorio de código en GitHub"
                        >
                          <GithubIcon size={16} color="#ffffff" />
                          <span>GitHub</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="btn-project-link disabled" title="Repositorio de GitHub aún no configurado">
                          <GithubIcon size={16} color="#64748b" />
                          <span>Repo Pendiente</span>
                        </span>
                      )}
                    </div>

                    {/* Pie de tarjeta con acciones rápidas */}
                    <div className="project-card-footer">
                      <div className="card-actions-left">
                        <button 
                          className="action-icon-btn" 
                          onClick={() => handleCopyProjectLinks(proj)}
                          title="Copiar enlaces del proyecto"
                        >
                          <Share2 size={14} />
                          <span>Compartir</span>
                        </button>
                      </div>

                      <div className="card-actions-right">
                        <button 
                          className="action-icon-btn edit" 
                          onClick={() => handleOpenEditForm(proj)}
                          title="Editar información y enlaces del proyecto"
                        >
                          <Edit3 size={14} />
                          <span>Editar</span>
                        </button>
                        <button 
                          className="action-icon-btn delete" 
                          onClick={() => handleDeleteProject(proj.id, proj.projectName)}
                          title="Eliminar proyecto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-projects-state">
                <Globe size={48} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
                <h4>No se encontraron proyectos con los filtros actuales</h4>
                <p>Prueba con otra palabra clave o registra el proyecto de tu equipo.</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
                  <button className="btn btn-primary" onClick={handleOpenCreateForm}>
                    <Plus size={16} />
                    <span>Registrar Proyecto</span>
                  </button>
                  <button className="btn btn-secondary" onClick={handleResetDemoProjects}>
                    <RotateCcw size={16} />
                    <span>Restablecer Demos</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VISTA 2: FORMULARIO DE REGISTRO / ENTREGA DE PROYECTO */}
        {subView === 'submit' && (
          <div className="submit-project-card animate-fade-in">
            <div className="submit-form-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="form-icon-badge">
                  <Code2 size={24} color="#00f0ff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', color: '#ffffff' }}>
                    {editingProjectId ? 'Editar Entrega del Proyecto' : 'Registrar Nuevo Proyecto de Equipo'}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                    Ingresa los datos de tu equipo y los enlaces a tu repositorio de GitHub y página web ya creada.
                  </p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={() => setSubView('gallery')}>
                <span>Volver a la Galería</span>
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="submit-project-form">
              <div className="form-grid-2col">
                {/* Nombre del Proyecto */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Nombre del Proyecto:</span>
                    <strong style={{ color: '#f43f5e' }}>*</strong>
                  </label>
                  <input 
                    type="text" 
                    className="form-input-cyber" 
                    placeholder="Ej. MedGuard: Triaje Clínico con RAG Local"
                    value={formProjectName}
                    onChange={(e) => setFormProjectName(e.target.value)}
                    required
                  />
                  <span className="form-hint">Título representativo de la solución de software que construyeron.</span>
                </div>

                {/* Nombre del Equipo */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Nombre del Equipo:</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input-cyber" 
                    placeholder="Ej. Equipo 01 - CyberCore"
                    value={formTeamName}
                    onChange={(e) => setFormTeamName(e.target.value)}
                  />
                  <span className="form-hint">Nombre de tu grupo de trabajo para la presentación.</span>
                </div>
              </div>

              {/* Integrantes */}
              <div className="form-group">
                <label className="form-label">
                  <span>Integrantes del Equipo (separados por coma):</span>
                  <strong style={{ color: '#f43f5e' }}>*</strong>
                </label>
                <input 
                  type="text" 
                  className="form-input-cyber" 
                  placeholder="Ej. Carlos Mendoza, Sofía Valenzuela, Diego Navarro"
                  value={formMembers}
                  onChange={(e) => setFormMembers(e.target.value)}
                  required
                />
                <span className="form-hint">Escribe los nombres de los integrantes que colaboraron en el proyecto.</span>
              </div>

              <div className="form-grid-2col">
                {/* Categoría */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Categoría / Industria del Reto:</span>
                  </label>
                  <select 
                    className="form-input-cyber" 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="HealthTech">HealthTech (Salud & Diagnóstico)</option>
                    <option value="FinTech">FinTech (Finanzas & Auditoría)</option>
                    <option value="EdTech">EdTech (Educación & Mentoría)</option>
                    <option value="DevOps">DevOps (Logs & Resiliencia)</option>
                    <option value="CyberSec">CyberSec (Seguridad & Cumplimiento)</option>
                    <option value="E-Commerce">E-Commerce & Recomendaciones</option>
                    <option value="SmartCities">SmartCities & Movilidad</option>
                    <option value="Logistics">Logística & Cadena de Suministro</option>
                  </select>
                </div>

                {/* Stack de IA */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Técnica / Stack de IA Clave:</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input-cyber" 
                    placeholder="Ej. RAG Local (JSON) + MCP SQLite + Subagentes"
                    value={formAiStack}
                    onChange={(e) => setFormAiStack(e.target.value)}
                  />
                  <span className="form-hint">¿Qué técnica aprendida en el curso utilizaron?</span>
                </div>
              </div>

              {/* Enlace al Repositorio de GitHub */}
              <div className="form-group">
                <label className="form-label">
                  <GithubIcon size={16} color="#00f0ff" />
                  <span>Enlace al Repositorio de GitHub:</span>
                </label>
                <input 
                  type="url" 
                  className="form-input-cyber" 
                  placeholder="https://github.com/tu-usuario/tu-proyecto"
                  value={formGithubUrl}
                  onChange={(e) => setFormGithubUrl(e.target.value)}
                />
                <span className="form-hint">URL pública de GitHub para que jurados y compañeros puedan revisar el código fuente.</span>
              </div>

              {/* Enlace a la Página Web / Demo en Vivo */}
              <div className="form-group">
                <label className="form-label">
                  <Globe size={16} color="#10b981" />
                  <span>Enlace de la Página Web ya Creada (Demo en Vivo):</span>
                </label>
                <input 
                  type="url" 
                  className="form-input-cyber" 
                  placeholder="https://tu-proyecto.vercel.app o GitHub Pages"
                  value={formDemoUrl}
                  onChange={(e) => setFormDemoUrl(e.target.value)}
                />
                <span className="form-hint">Página web desplegada al final del curso (en Vercel, Netlify, Render o GitHub Pages).</span>
              </div>

              {/* Breve Descripción / Pitch */}
              <div className="form-group">
                <label className="form-label">
                  <span>Descripción del Proyecto & Problema Resuelto:</span>
                </label>
                <textarea 
                  className="form-input-cyber textarea"
                  rows={3}
                  placeholder="Describe en 2 o 3 oraciones qué problema resuelve tu proyecto y cómo la IA aporta valor real..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              {/* Estado de Entrega */}
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
                    <span>🟢 Listo para Demostración (Publicado)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#cbd5e1' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      value="en_desarrollo" 
                      checked={formStatus === 'en_desarrollo'}
                      onChange={() => setFormStatus('en_desarrollo')}
                    />
                    <span>🟡 En Desarrollo (Borrador)</span>
                  </label>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="form-actions-row">
                <button type="button" className="btn btn-secondary" onClick={() => setSubView('gallery')}>
                  <span>Cancelar</span>
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} />
                  <span>{editingProjectId ? 'Guardar Cambios' : 'Publicar Proyecto en la Galería'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VISTA 3: RULETA Y SORTEO DE EQUIPOS (HERRAMIENTA DOCENTE) */}
        {subView === 'roulette' && (
          <div className="roulette-tool-container animate-fade-in">
            <div className="roulette-intro-box">
              <Dices size={28} color="#00f0ff" />
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '4px' }}>
                  Herramienta Docente: Ruleta de Equipos y Retos
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Utiliza este panel si deseas formar grupos aleatorios con los alumnos presentes y asignarles retos del mundo real. Una vez generados, puedes exportarlos a la galería de proyectos con un solo clic.
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
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => {
                        setStudentsInput(DEMO_STUDENTS.join('\n'));
                        showToast('16 alumnos demo cargados');
                      }}>
                        <span>Cargar Alumnos Demo</span>
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setStudentsInput('')}>
                        <span>Limpiar</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    className="textarea-cyber"
                    placeholder="Pega o escribe los nombres de los estudiantes (uno por línea)..."
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
                        <Dices className="animate-spin" size={20} />
                        <span>Sorteando Equipos y Retos...</span>
                      </>
                    ) : (
                      <>
                        <Shuffle size={20} />
                        <span>Sortear Equipos & Asignar Desafíos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados de la Ruleta */}
            {rouletteTeams.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <div className="teams-results-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users size={22} color="#06b6d4" />
                    <h3 style={{ fontSize: '22px', color: '#ffffff' }}>
                      {rouletteTeams.length} Equipos Formados con la Ruleta
                    </h3>
                  </div>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleImportRouletteToGallery}
                  >
                    <Send size={14} />
                    <span>Pasar Equipos a la Galería de Proyectos</span>
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

                      <div className="category-assigned-box">
                        <div className="category-name-badge">
                          <span>{team.category.name}</span>
                        </div>
                        <p className="category-problem-text">
                          <strong>Problema:</strong> {team.category.problemSummary}
                        </p>
                        <div className="category-technique-pill">
                          ⚡ {team.category.suggestedStack.aiTechnique}
                        </div>
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
