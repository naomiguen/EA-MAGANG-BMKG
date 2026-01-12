import React from 'react';

const ConceptualDiagramPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      <div className="text-center mb-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Conceptual Data Diagram
        </h1>
        <p className="text-slate-600 text-lg">
          Gambaran hubungan konseptual antar entitas data utama di Stasiun Meteorologi.
        </p>
      </div>

      {/* CANVAS DIAGRAM */}
      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex justify-center items-center">
        
        {/* --- ENTITAS (BOXES) --- */}
        
        {/* 1. PERSONIL (Atas Tengah) */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
          <EntityBox title="Sumber Daya Manusia" />
        </div>

        {/* 2. DATA ADMINISTRASI (PINDAH KE SINI: Kanan Tengah - Sejajar Data Observasi) */}
        <div className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20">
          <EntityBox title="Data Administrasi" />
        </div>

        {/* 3. PERALATAN (Kiri Tengah) */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-20">
          <EntityBox title="Peralatan" />
        </div>

        {/* 4. DATA OBSERVASI (Tengah Pusat) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <EntityBox title="Data Observasi" highlight />
        </div>

        {/* 5. PRODUK INFORMASI (Bawah Tengah) */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <EntityBox title="Produk Informasi" />
        </div>

        {/* 6. STAKEHOLDER (Bawah Kanan) */}
        <div className="absolute bottom-10 right-20 z-20">
          <EntityBox title="Stakeholder" />
        </div>


        {/* --- GARIS PENGHUBUNG (SVG LINES) --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          
          {/* Garis: Personil ke Data Observasi (Atas ke Tengah) */}
          <line x1="50%" y1="90" x2="50%" y2="270" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Garis: Personil ke Peralatan (Menyamping ke Kiri Bawah) */}
          <line x1="450" y1="90" x2="150" y2="270" stroke="#94a3b8" strokeWidth="2" />

          {/* Garis: Personil ke Data Administrasi (Menyamping ke Kanan Bawah - DIPERBAIKI) */}
          {/* Garis ini sekarang simetris dengan garis Peralatan (ke arah kanan bawah) */}
          <line x1="550" y1="90" x2="850" y2="270" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Garis: Peralatan ke Data Observasi (Kiri ke Tengah) */}
          <line x1="180" y1="300" x2="420" y2="300" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Garis: Data Observasi ke Produk Informasi (Tengah ke Bawah - VERTIKAL) */}
          <line x1="50%" y1="330" x2="50%" y2="500" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Garis: Produk Informasi ke Stakeholder (Bawah Tengah ke Kanan - HORIZONTAL) */}
          {/* Posisinya dijaga di tengah kotak (y=530) agar rapi */}
          <line x1="600" y1="530" x2="820" y2="530" stroke="#94a3b8" strokeWidth="2" />

        </svg>

      </div>

      <div className="mt-8 text-center text-sm text-slate-500 max-w-2xl">
        * Diagram ini menggunakan notasi konseptual sederhana untuk menunjukkan relasi bisnis antar entitas data utama.
      </div>

    </div>
  );
};

// Komponen Kotak Entitas
const EntityBox = ({ title, highlight = false }) => (
  <div className={`
    w-44 px-4 py-3 rounded-md shadow-md border 
    flex flex-col items-center text-center
    ${highlight ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-300'}
  `}>
    <span className="text-[10px] text-gray-500 italic mb-1">
      &lt;&lt;dDataEntity&gt;&gt;
    </span>
    <h3 className="font-bold text-gray-800 text-sm">
      {title}
    </h3>
  </div>
);

export default ConceptualDiagramPage;