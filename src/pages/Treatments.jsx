import React from 'react';
import DentalChart from '../components/DentalChart';

const Treatments = () => {
  return (
    <div className="treatments-page">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1>Treatment Planning</h1>
        <p>Monitor patient dental health and plan treatments.</p>
      </div>
      
      <div className="treatment-content">
        <DentalChart />
      </div>
    </div>
  );
};

export default Treatments;
