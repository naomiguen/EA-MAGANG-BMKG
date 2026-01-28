import React from 'react';

const ConceptualDiagramPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      <div className="text-center mb-12 max-w-4xl px-4">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
          Conceptual Data Diagram
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Gambaran hubungan konseptual antar entitas data utama di Stasiun Meteorologi.
        </p>
      </div>

      {/* CANVAS DIAGRAM - Responsive Container */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl border border-slate-200 p-4 md:p-8">
        
        {/* SVG Container untuk diagram yang fully responsive */}
        <svg 
          viewBox="0 0 1000 700" 
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Define reusable components */}
          <defs>
            {/* Filter for shadows */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* --- GARIS PENGHUBUNG --- */}
          <g stroke="#94a3b8" strokeWidth="2" fill="none">
            {/* Personil ke Data Observasi (Atas ke Tengah) */}
            <line x1="500" y1="100" x2="500" y2="300" />
            
            {/* Personil ke Peralatan (Kiri Bawah) */}
            <line x1="450" y1="100" x2="200" y2="300" />

            {/* Personil ke Data Administrasi (Kanan Bawah) */}
            <line x1="550" y1="100" x2="800" y2="300" />
            
            {/* Peralatan ke Data Observasi */}
            <line x1="250" y1="350" x2="400" y2="350" />
            
            {/* Data Observasi ke Produk Informasi */}
            <line x1="500" y1="400" x2="500" y2="550" />
            
            {/* Produk Informasi ke Stakeholder */}
            <line x1="600" y1="600" x2="750" y2="600" />
          </g>

          {/* --- ENTITAS (BOXES) --- */}
          
          {/* 1. Sumber Daya Manusia (Atas Tengah) */}
          <EntityBox x={500} y={50} title="Sumber Daya Manusia" />

          {/* 2. Peralatan (Kiri Tengah) */}
          <EntityBox x={150} y={350} title="Peralatan" />

          {/* 3. Data Observasi (Tengah - Highlighted) */}
          <EntityBox x={500} y={350} title="Data Observasi" highlight={true} />

          {/* 4. Data Administrasi (Kanan Tengah) */}
          <EntityBox x={850} y={350} title="Data Administrasi" />

          {/* 5. Produk Informasi (Bawah Tengah) */}
          <EntityBox x={500} y={600} title="Produk Informasi" />

          {/* 6. Stakeholder (Bawah Kanan) */}
          <EntityBox x={850} y={600} title="Stakeholder" />

        </svg>

      </div>

      <div className="mt-8 text-center text-xs sm:text-sm text-slate-500 max-w-2xl px-4 leading-relaxed">
        * Diagram ini menggunakan notasi konseptual sederhana untuk menunjukkan relasi bisnis antar entitas data utama.
      </div>

    </div>
  );
};

// Komponen Kotak Entitas sebagai SVG Component
const EntityBox = ({ x, y, title, highlight = false }) => {
  const boxWidth = 180;
  const boxHeight = 80;
  const bgColor = highlight ? '#fefce8' : '#ffffff';
  const borderColor = highlight ? '#facc15' : '#d1d5db';
  
  return (
    <g transform={`translate(${x - boxWidth/2}, ${y - boxHeight/2})`}>
      {/* Shadow */}
      <rect
        x="2"
        y="2"
        width={boxWidth}
        height={boxHeight}
        rx="6"
        fill="#000"
        opacity="0.1"
      />
      
      {/* Main Box */}
      <rect
        x="0"
        y="0"
        width={boxWidth}
        height={boxHeight}
        rx="6"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth="2"
      />
      
      {/* Stereotype text */}
      <text
        x={boxWidth/2}
        y="20"
        textAnchor="middle"
        fontSize="10"
        fill="#6b7280"
        fontStyle="italic"
      >
        &lt;&lt;dDataEntity&gt;&gt;
      </text>
      
      {/* Title text */}
      <text
        x={boxWidth/2}
        y="50"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#1f2937"
      >
        {title}
      </text>
    </g>
  );
};

export default ConceptualDiagramPage;