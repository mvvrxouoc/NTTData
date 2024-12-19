import React from 'react';

interface ProgressBarProps {
  step: number;
}

const steps = ["Seleccionar Pokémon", "Seleccionar Fecha y Hora", "Seleccionar Categoría", "Seleccionar Ubicación"];

export const EventProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const progress = step > 4 ? 100 : (step - 1) * 33.33;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-steps">
        {steps.map((label, index) => (
          <div key={index} className={`progress-step ${step > index ? 'completed' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};