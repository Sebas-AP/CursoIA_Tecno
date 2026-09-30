import React, { useState } from 'react';
import { X, ExternalLink, Presentation, MonitorPlay, Palette, Sparkles, Maximize2 } from 'lucide-react';

export const PresentationModal = ({ isOpen, onClose, dayData }) => {
  if (!isOpen || !dayData) return null;

  const isCanva = dayData.presentation.title.toLowerCase().includes('canva');
  const hasEmbedUrl = !!dayData.presentation.embedUrl;
  const targetUrl = dayData.presentation.url;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Presentation size={24} color="#06b6d4" />
            <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
              Diapositivas // Día {dayData.dayNumber}: {dayData.title}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a 
              href={targetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title="Abrir presentación oficial en Canva"
            >
              <span>Abrir en Canva</span>
              <ExternalLink size={13} />
            </a>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Si tiene embedUrl de Canva, renderizar el visor interactivo */}
          {hasEmbedUrl ? (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  <Palette size={14} />
                  <span>DISEÑO OFICIAL EN CANVA // INTERACTIVO</span>
                </div>
                <a 
                  href={targetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Maximize2 size={13} />
                  <span>Pantalla Completa</span>
                </a>
              </div>

              {/* Visor iframe responsive de Canva */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.25%', // 16:9 ratio
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.15)',
                background: '#07090e'
              }}>
                <iframe
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    padding: 0,
                    margin: 0
                  }}
                  src={dayData.presentation.embedUrl}
                  allowFullScreen="allowfullscreen"
                  allow="fullscreen"
                  title={dayData.presentation.title}
                />
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <MonitorPlay size={44} color="#00f0ff" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
                {dayData.presentation.title}
              </h4>
              <p style={{ color: '#94a3b8', maxWidth: '620px', margin: '0 auto 18px', fontSize: '14px', lineHeight: '1.6' }}>
                {dayData.presentation.embedPlaceholder}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <a 
                  href={targetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Abrir Presentación Oficial</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h5 style={{ color: '#06b6d4', marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              // Puntos Clave Cubiertos en Esta Presentación:
            </h5>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8' }}>
              {dayData.schedule.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.topic}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

