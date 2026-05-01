import React, { useState } from 'react';
import './DentalChart.css';

const Tooth = ({ number, condition, onClick, isActive }) => {
  // Simple SVG representation of a tooth
  return (
    <div 
      className={`tooth-container ${isActive ? 'active' : ''} ${condition ? 'has-condition' : ''}`}
      onClick={() => onClick(number)}
    >
      <div className="tooth-number">{number}</div>
      <svg width="40" height="50" viewBox="0 0 40 50">
        <path 
          d="M10,10 Q20,0 30,10 Q40,25 30,40 Q20,50 10,40 Q0,25 10,10" 
          fill={condition ? getColorForCondition(condition) : '#fff'} 
          stroke="var(--border)" 
          strokeWidth="2"
        />
        {/* Simple details to make it look like a tooth */}
        <path d="M15,15 Q20,10 25,15" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      </svg>
      {condition && <div className="condition-indicator" title={condition}></div>}
    </div>
  );
};

const getColorForCondition = (condition) => {
  switch (condition.toLowerCase()) {
    case 'filling': return '#94a3b8'; // Slate
    case 'extraction': return '#ef4444'; // Red
    case 'root canal': return '#f59e0b'; // Amber
    case 'decay': return '#78350f'; // Brown
    default: return '#0d9488'; // Teal
  }
};

const DentalChart = () => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState({}); // { toothNumber: condition }

  const teethUpper = Array.from({ length: 16 }, (_, i) => i + 1);
  const teethLower = Array.from({ length: 16 }, (_, i) => 32 - i);

  const handleToothClick = (num) => {
    setSelectedTooth(num);
  };

  const handleConditionSelect = (condition) => {
    if (selectedTooth) {
      setTeethData({
        ...teethData,
        [selectedTooth]: condition
      });
      setSelectedTooth(null);
    }
  };

  return (
    <div className="dental-chart-container">
      <div className="chart-header">
        <h3>Dental Charting System</h3>
        <p>Select a tooth to add a condition or update treatment.</p>
      </div>

      <div className="teeth-grid">
        <div className="teeth-row upper">
          {teethUpper.map(num => (
            <Tooth 
              key={num} 
              number={num} 
              condition={teethData[num]} 
              isActive={selectedTooth === num}
              onClick={handleToothClick} 
            />
          ))}
        </div>
        <div className="chart-divider">Upper / Lower Arch</div>
        <div className="teeth-row lower">
          {teethLower.map(num => (
            <Tooth 
              key={num} 
              number={num} 
              condition={teethData[num]} 
              isActive={selectedTooth === num}
              onClick={handleToothClick} 
            />
          ))}
        </div>
      </div>

      {selectedTooth && (
        <div className="condition-modal">
          <h4>Tooth #{selectedTooth} - Add Condition</h4>
          <div className="condition-options">
            {['Healthy', 'Filling', 'Extraction', 'Root Canal', 'Decay'].map(c => (
              <button 
                key={c} 
                onClick={() => handleConditionSelect(c === 'Healthy' ? null : c)}
                className="condition-btn"
              >
                {c}
              </button>
            ))}
          </div>
          <button className="close-btn" onClick={() => setSelectedTooth(null)}>Cancel</button>
        </div>
      )}

      <div className="chart-legend">
        <div className="legend-item"><span className="dot filling"></span> Filling</div>
        <div className="legend-item"><span className="dot extraction"></span> Extraction</div>
        <div className="legend-item"><span className="dot root-canal"></span> Root Canal</div>
        <div className="legend-item"><span className="dot decay"></span> Decay</div>
      </div>
    </div>
  );
};

export default DentalChart;
