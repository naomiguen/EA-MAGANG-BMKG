import React from 'react';
import BusinessInteractionDiagram from './BusinessInteractionDiagram'; // Sesuaikan path

const BusinessProcessPage = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Arsitektur Bisnis</h1>
      
      {/* Container Diagram */}
      <div className="mb-8">
        <BusinessInteractionDiagram />
      </div>

    </div>
  );
};

export default BusinessProcessPage;