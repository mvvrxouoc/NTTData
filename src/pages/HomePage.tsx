import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Bienvenido a Mario App</h1>
      <p>Esta es la página de inicio.</p>
      <button
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          borderRadius: '8px',
          background: '#ffd700',
          color: '#222',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onClick={() => navigate('/private')}
      >
        Crear Evento
      </button>
    </div>
  );
};

export { HomePage }; 