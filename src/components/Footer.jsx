import React from 'react';
import { Cpu, Terminal, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} color="#00f0ff" />
          <strong style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
            Desarrollo de Software Impulsado por IA
          </strong>
        </div>
        <p className="footer-copy">
          Plataforma de Cátedra & Material Didáctico · Instructores: Sebastián Almeda & Iván Valles · Ciclo Académico 2026
        </p>
        <p className="footer-quote">
          // "Domina los agentes, conecta el contexto y orquesta el futuro del desarrollo de software."
        </p>
      </div>
    </footer>
  );
};
