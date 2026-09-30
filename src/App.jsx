import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeView } from './components/WelcomeView';
import { DailyContentView } from './components/DailyContentView';
import { TeamsView } from './components/TeamsView';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome' | 'daily' | 'teams'
  const [activeDay, setActiveDay] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleSelectDay = (dayId) => {
    setActiveDay(dayId);
    setCurrentView('daily');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTeams = () => {
    setCurrentView('teams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Barra de navegación superior */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />

      {/* Vistas Principales */}
      <main className="main-content">
        {currentView === 'welcome' && (
          <WelcomeView 
            onSelectDay={handleSelectDay}
            onGoToTeams={handleGoToTeams}
          />
        )}

        {currentView === 'daily' && (
          <DailyContentView 
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            showToast={showToast}
          />
        )}

        {currentView === 'teams' && (
          <TeamsView 
            showToast={showToast}
          />
        )}
      </main>

      {/* Pie de página */}
      <Footer />

      {/* Notificación Toast Flotante */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
