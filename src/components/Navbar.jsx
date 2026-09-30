import React from 'react';
import { Cpu, BookOpen, Users, Sparkles, Terminal } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, activeDay, setActiveDay }) => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand" onClick={() => setCurrentView('welcome')}>
          <div className="brand-icon-wrapper">
            <Cpu size={22} color="#00f0ff" />
          </div>
          <div>
            <div className="brand-title">Software IA // Lab</div>
            <div className="brand-badge">Impulsado por IA</div>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-btn ${currentView === 'welcome' ? 'active' : ''}`}
                onClick={() => setCurrentView('welcome')}
              >
                <Sparkles size={16} />
                <span>Inicio & Bienvenida</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-btn ${currentView === 'daily' ? 'active' : ''}`}
                onClick={() => setCurrentView('daily')}
              >
                <BookOpen size={16} />
                <span>Contenido Diario (Día {activeDay})</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-btn active-pulse ${currentView === 'teams' ? 'active' : ''}`}
                onClick={() => setCurrentView('teams')}
              >
                <Users size={16} />
                <span>Equipos & Proyectos</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
