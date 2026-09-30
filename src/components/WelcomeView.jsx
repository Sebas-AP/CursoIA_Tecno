import React from 'react';
import { COURSE_INFO, COURSE_DAYS } from '../data/courseData';
import { 
  Bot, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Terminal, 
  Zap, 
  Code2, 
  CheckCircle2, 
  Database,
  Laptop,
  Workflow
} from 'lucide-react';

export const WelcomeView = ({ onSelectDay, onGoToTeams }) => {
  return (
    <div className="welcome-view">
      {/* Hero Principal */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge-pill">
            <span className="status-dot"></span>
            <span>{COURSE_INFO.edition}</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text-cyber">{COURSE_INFO.title}</span>
          </h1>

          <p className="hero-subtitle">
            {COURSE_INFO.subtitle}
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onSelectDay(1)}>
              <span>Acceder al Contenido Diario</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={onGoToTeams}>
              <span>Dinámica de Equipos & Retos</span>
              <Workflow size={18} />
            </button>
          </div>

          {/* Tarjeta de Filosofía y Bienvenida de los Docentes */}
          <div className="instructor-quote-card">
            <div className="instructor-avatar-badge">
              <Bot size={32} />
            </div>
            <div>
              <p className="quote-text">
                "{COURSE_INFO.instructor.quote}"
              </p>
              <div className="quote-author">
                — {COURSE_INFO.instructor.name} · {COURSE_INFO.instructor.role}
              </div>
            </div>
          </div>

          {/* Métricas / Stats del Curso */}
          <div className="stats-grid">
            {COURSE_INFO.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap de los 3 Días */}
      <section className="roadmap-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">// Programa Curricular</span>
            <h2 className="section-title">Ruta de Inmersión en 3 Días</h2>
            <p className="section-desc">
              Un recorrido diseñado para pasar de consultar un chat a construir arquitecturas con agentes de workspace, RAG local y protocolos abiertos.
            </p>
          </div>

          <div className="roadmap-cards-grid">
            {COURSE_DAYS.map((day) => (
              <div key={day.id} className="roadmap-card">
                <div>
                  <div className="roadmap-day-num">
                    <span>DÍA {day.dayNumber}</span>
                    <Sparkles size={16} color="#06b6d4" />
                  </div>

                  <h3 className="roadmap-day-title">{day.title}</h3>
                  <p className="roadmap-day-focus">{day.focus}</p>

                  <div className="roadmap-pillar-box">
                    <strong>Enfoque Pragmático:</strong> {day.pedagogyPillar}
                  </div>
                </div>

                <button 
                  className="btn btn-glow-cyan btn-sm" 
                  onClick={() => onSelectDay(day.id)}
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  <span>Ver Lección, Recursos y Reto</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Stack Tecnológico */}
          <div className="tech-stack-wrap" style={{ marginTop: '56px', textAlign: 'center' }}>
            <span className="section-tag">// Herramientas & Tecnologías del Curso</span>
            <div className="tech-badges-wrap">
              {COURSE_INFO.techBadges.map((badge, idx) => (
                <span key={idx} className="tech-badge-item">
                  ⚡ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Requisitos y Recursos Necesarios para el Curso */}
          {COURSE_INFO.requiredResources && (
            <div className="requirements-section" style={{ marginTop: '48px' }}>
              <div className="requirements-card">
                <div className="requirements-header">
                  <Laptop size={20} color="#00f0ff" />
                  <h4>Recursos y Requisitos para el Taller</h4>
                </div>
                <div className="requirements-grid">
                  {COURSE_INFO.requiredResources.map((req, idx) => (
                    <div key={idx} className="requirement-pill">
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
