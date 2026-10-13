import React, { useState, useEffect } from 'react';
import { COURSE_DAYS } from '../data/courseData';
import { PresentationModal } from './PresentationModal';
import { GitQuickGuide } from './GitQuickGuide';
import { 
  Presentation, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  FileCode, 
  FileText, 
  Database, 
  Target, 
  Lightbulb, 
  CheckCircle2,
  Calendar,
  Palette,
  GitBranch,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const DailyContentView = ({ activeDay, setActiveDay, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [checkedCriteria, setCheckedCriteria] = useState({});
  const [showGitGuideDay3, setShowGitGuideDay3] = useState(false);

  const dayData = COURSE_DAYS.find(d => d.id === activeDay) || COURSE_DAYS[0];

  // Cargar estado de checklist de retos desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`challenge_progress_day_${activeDay}`);
    if (saved) {
      try {
        setCheckedCriteria(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setCheckedCriteria({});
    }
  }, [activeDay]);

  const toggleCriteria = (index) => {
    const nextState = {
      ...checkedCriteria,
      [index]: !checkedCriteria[index]
    };
    setCheckedCriteria(nextState);
    localStorage.setItem(`challenge_progress_day_${activeDay}`, JSON.stringify(nextState));
  };

  const handleCopyResource = async (res) => {
    try {
      const response = await fetch(res.downloadUrl);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopiedId(res.id);
      showToast(`¡Contenido de "${res.fileName}" copiado al portapapeles!`);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      showToast('Error al copiar el archivo');
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'json':
        return <Database size={20} />;
      case 'code':
        return <FileCode size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  const totalCriteria = dayData.challenge.acceptanceCriteria.length;
  const completedCriteria = Object.values(checkedCriteria).filter(Boolean).length;
  const isChallengeDone = totalCriteria > 0 && completedCriteria === totalCriteria;

  const isDay1 = activeDay === 1;
  const isDay3 = activeDay === 3;
  const isCanvaLive = !!dayData.presentation.embedUrl;

  return (
    <div className="daily-content-section">
      <div className="container">
        {/* Selector de Días */}
        <div className="days-nav-tabs">
          {COURSE_DAYS.map((d) => (
            <button
              key={d.id}
              className={`day-tab-btn ${activeDay === d.id ? 'active' : ''}`}
              onClick={() => setActiveDay(d.id)}
            >
              <Calendar size={18} />
              <span>Día {d.dayNumber}: {d.title.split(',')[0]}</span>
              <span className="day-tab-badge">Día {d.dayNumber}</span>
            </button>
          ))}
        </div>

        {/* Tarjeta de Encabezado de la Lección del Día */}
        <div className="day-header-card">
          <div className="day-meta-row">
            <span className="day-tag">LECCIÓN DÍA {dayData.dayNumber} // INTENSIVO</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              <Clock size={15} color="#06b6d4" />
              <span>09:00 - 14:00 hrs (5 Horas)</span>
            </div>
          </div>

          <h2 className="day-title-main">{dayData.title}</h2>
          <p className="day-focus-desc">{dayData.focus}</p>

          <div className="day-pedagogy-callout">
            <Lightbulb size={24} color="#a855f7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#ffffff' }}>Enfoque Pedagógico Clave:</strong>
              <p>{dayData.pedagogyPillar}</p>
            </div>
          </div>

          {/* Botón con Enlace a la Presentación */}
          <div className="presentation-banner">
            <div className="presentation-info">
              <div className="presentation-icon-box">
                {isCanvaLive ? <Palette size={24} color="#00f0ff" /> : <Presentation size={24} />}
              </div>
              <div className="presentation-text">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h4>{dayData.presentation.title}</h4>
                  {isCanvaLive && (
                    <span style={{ 
                      fontSize: '11px', 
                      background: 'rgba(0, 240, 255, 0.15)', 
                      border: '1px solid rgba(0, 240, 255, 0.35)', 
                      color: '#00f0ff', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      fontWeight: 'bold'
                    }}>
                      🎨 Canva Oficial // En Vivo
                    </span>
                  )}
                </div>
                <p>
                  {isCanvaLive 
                    ? "Presentación interactiva en Canva por Sebastián Almeda e Iván Valles. Haz clic en 'Ver Diapositivas' para interactuar con ellas o en 'Abrir en Canva'." 
                    : "Diapositivas interactivas con diagramas conceptuales, arquitectura y guías paso a paso."}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                <Presentation size={16} />
                <span>Ver Diapositivas</span>
              </button>
              <a 
                href={dayData.presentation.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <span>{isCanvaLive ? 'Abrir en Canva' : 'Enlace Directo'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Agenda / Desglose de Contenido del Día */}
        <div className="schedule-breakdown">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <span className="section-tag">// Cronograma & Temario</span>
            <h3 style={{ fontSize: '22px', color: '#ffffff' }}>Temas y Bloques de la Jornada</h3>
          </div>

          <div className="schedule-list">
            {dayData.schedule.map((item, idx) => (
              <div key={idx} className="schedule-item">
                <div className="schedule-time-box">
                  <strong>{item.time}</strong>
                  <span className="schedule-duration">{item.duration}</span>
                </div>
                <div className="schedule-topic-box">
                  <h4>{item.topic}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apartado de Descarga de Recursos */}
        <div style={{ margin: '48px 0' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <span className="section-tag">// Material de Trabajo</span>
            <h3 style={{ fontSize: '22px', color: '#ffffff' }}>Descarga de Recursos y Plantillas</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>
              Archivos listos para usar durante el taller de este día. Puedes descargarlos o copiar su contenido directo a tu editor.
            </p>
          </div>

          <div className="resources-grid">
            {dayData.resources.map((res) => (
              <div key={res.id} className="resource-card">
                <div>
                  <div className="resource-top">
                    <div className="resource-icon-wrap">
                      {getResourceIcon(res.type)}
                    </div>
                    <div className="resource-info">
                      <h4>{res.title}</h4>
                      <div className="resource-meta">
                        <code>{res.fileName}</code> · {res.size}
                      </div>
                    </div>
                  </div>
                  <p className="resource-desc">{res.description}</p>
                </div>

                <div className="resource-actions">
                  <a 
                    href={res.downloadUrl} 
                    download={res.fileName} 
                    className="btn btn-glow-cyan btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => showToast(`Iniciando descarga de ${res.fileName}`)}
                  >
                    <Download size={14} />
                    <span>Descargar</span>
                  </a>

                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopyResource(res)}
                    title="Copiar contenido al portapapeles"
                  >
                    {copiedId === res.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copiedId === res.id ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* En Día 1: Módulo Interactivo de la Guía Exprés Git & GitHub */}
        {isDay1 && (
          <div style={{ margin: '48px 0' }}>
            <GitQuickGuide showToast={showToast} />
          </div>
        )}

        {/* En Día 3: Banner opcional para abrir y repasar la Guía Exprés Git & GitHub antes del Hackathon */}
        {isDay3 && (
          <div style={{ margin: '36px 0' }}>
            <div className="git-day3-reminder-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div className="git-reminder-icon">
                  <GitBranch size={22} color="#00f0ff" />
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '4px' }}>
                    Control de Versiones del Proyecto Final (Git & GitHub)
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                    Recuerda que cada equipo debe versionar su solución y subirla a GitHub para la entrega y demostración final.
                  </p>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowGitGuideDay3(!showGitGuideDay3)}
                >
                  <GitBranch size={14} />
                  <span>{showGitGuideDay3 ? 'Ocultar Guía' : 'Repasar Guía Exprés Git'}</span>
                  {showGitGuideDay3 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {showGitGuideDay3 && (
                <div style={{ marginTop: '24px' }}>
                  <GitQuickGuide showToast={showToast} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Apartado del Reto del Día */}
        <div className="challenge-card">
          <div className="challenge-badge-row">
            <div className="challenge-pill">
              <Target size={14} />
              <span>RETO PRÁCTICO DEL DÍA {dayData.dayNumber}</span>
            </div>
            {isChallengeDone && (
              <div style={{ color: '#34d399', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} />
                <span>¡Reto Completado!</span>
              </div>
            )}
          </div>

          <h3 className="challenge-title">{dayData.challenge.title}</h3>

          <div className="challenge-mission">
            <strong style={{ display: 'block', color: '#00f0ff', marginBottom: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              // MISIÓN PRINCIPAL:
            </strong>
            {dayData.challenge.mission}
          </div>

          <div className="criteria-title">
            <CheckCircle2 size={18} color="#10b981" />
            <span>Criterios de Aceptación (Checklist Interactivo):</span>
            <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
              {completedCriteria}/{totalCriteria} completados
            </span>
          </div>

          <ul className="criteria-list">
            {dayData.challenge.acceptanceCriteria.map((crit, idx) => {
              const isChecked = !!checkedCriteria[idx];
              return (
                <li 
                  key={idx} 
                  className={`criteria-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleCriteria(idx)}
                >
                  <div className="criteria-checkbox">
                    {isChecked && <Check size={14} />}
                  </div>
                  <span>{crit}</span>
                </li>
              );
            })}
          </ul>

          <div className="challenge-protip">
            <Lightbulb size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Pro-Tip del Docente:</strong> {dayData.challenge.proTip}
            </div>
          </div>
        </div>

        {/* Modal de Presentación */}
        <PresentationModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          dayData={dayData} 
        />
      </div>
    </div>
  );
};

