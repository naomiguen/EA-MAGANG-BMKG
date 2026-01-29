import React from 'react';
import { Info } from 'lucide-react';

const ConceptualDiagramPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 font-sans">
      
      {/* 1. Header Section - CENTERED */}
      <div className="text-center mb-16 max-w-5xl w-full border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Conceptual Data Diagram
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Gambaran hubungan konseptual antar entitas data utama di Stasiun Meteorologi.
        </p>
      </div>

      {/* 2. CANVAS DIAGRAM - Responsive Container */}
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 p-6 md:p-12 relative overflow-hidden">
        
        {/* Background Grid Decor (Tipis) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
             style={{ backgroundImage: 'radial-gradient(#0064b5 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* SVG Diagram */}
        <svg 
          viewBox="0 0 1000 700" 
          className="relative z-10 w-full h-auto drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connector Lines dengan style modern */}
          <g stroke="#cbd5e1" strokeWidth="3" fill="none" strokeDasharray="8 4">
            <line x1="500" y1="130" x2="500" y2="310" />
            <line x1="420" y1="100" x2="250" y2="310" />
            <line x1="580" y1="100" x2="750" y2="310" />
            <line x1="280" y1="350" x2="400" y2="350" strokeDasharray="0" stroke="#0064b5" strokeWidth="2"/>
            <line x1="500" y1="390" x2="500" y2="560" strokeDasharray="0" stroke="#0064b5" strokeWidth="2"/>
            <line x1="600" y1="600" x2="750" y2="600" strokeDasharray="0" stroke="#fbbf24" strokeWidth="3"/>
          </g>

          {/* Entitas (Boxes) */}
          <EntityBox x={500} y={80} title="Sumber Daya Manusia" type="Actor" />
          <EntityBox x={180} y={350} title="Peralatan" />
          <EntityBox x={500} y={350} title="Data Observasi" highlight={true} />
          <EntityBox x={820} y={350} title="Data Administrasi" />
          <EntityBox x={500} y={600} title="Produk Informasi" highlight={true} isGold={true} />
          <EntityBox x={820} y={600} title="Stakeholder" type="External" />
        </svg>
      </div>

      {/* 3. Footer / Helper Hint */}
      <div className="mt-12 text-center text-primary-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-2xl animate-pulse">
        * Diagram ini menggunakan notasi konseptual arsitektur data enterprise BMKG Balikpapan
      </div>

    </div>
  );
};

// Komponen Kotak Entitas SVG yang Diperbarui
const EntityBox = ({ x, y, title, highlight = false, type = "DataEntity", isGold = false }) => {
  const boxWidth = 200;
  const boxHeight = 90;
  
  // Logic Warna berdasarkan status
  const bgColor = isGold ? '#fefce8' : (highlight ? '#f0f7ff' : '#ffffff');
  const borderColor = isGold ? '#fbbf24' : (highlight ? '#0064b5' : '#e2e8f0');
  const textColor = isGold ? '#854d0e' : (highlight ? '#00467f' : '#1e293b');
  
  return (
    <g transform={`translate(${x - boxWidth/2}, ${y - boxHeight/2})`} className="transition-all duration-300">
      {/* Outer Glow untuk Highlight */}
      {highlight && (
        <rect
          x="-4" y="-4"
          width={boxWidth + 8} height={boxHeight + 8}
          rx="16" fill={borderColor} opacity="0.1"
        />
      )}
      
      {/* Main Box */}
      <rect
        x="0" y="0"
        width={boxWidth} height={boxHeight}
        rx="12"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={highlight ? "3" : "2"}
        className="shadow-sm"
      />
      
      {/* Label Tipe (Stereotype) */}
      <text
        x={boxWidth/2}
        y="25"
        textAnchor="middle"
        fontSize="9"
        fill={isGold ? '#b45309' : '#94a3b8'}
        fontWeight="800"
        className="uppercase tracking-[0.15em]"
      >
        «{type}»
      </text>
      
      {/* Title text */}
      <text
        x={boxWidth/2}
        y="55"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill={textColor}
        className="uppercase tracking-tight"
      >
        {title}
      </text>

      {/* Decorative Line di bawah box */}
      <line x1={boxWidth*0.3} y1={boxHeight-15} x2={boxWidth*0.7} y2={boxHeight-15} stroke={borderColor} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </g>
  );
};

export default ConceptualDiagramPage;