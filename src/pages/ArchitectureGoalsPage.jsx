import React from 'react';

const ArchitectureGoalsPage = () => {
  // Mapping Visi Misi ke 4 Domain Arsitektur
  const domainGoals = [
    {
      domain: "Business Architecture",
      icon: "🏢",
      focus: "Struktur Layanan Meteorologi",
      desc: "Membangun struktur organisasi dan proses bisnis yang ramping, efisien, dan berorientasi pada pelayanan pelanggan (Service Oriented).",
      goals: ["Optimasi SOP Pengamatan", "Peningkatan Layanan Publik"]
    },
    {
      domain: "Data Architecture",
      icon: "📊",
      focus: "Pengelolaan Data Pengamatan",
      desc: "Menjamin data pengamatan tersimpan dengan aman, terstandarisasi, dan mudah diakses (Single Source of Truth) untuk analisis.",
      goals: ["Quality Control Otomatis", "Integrasi Big Data Cuaca"]
    },
    {
      domain: "Application Architecture",
      icon: "💻",
      focus: "Sistem Informasi Meteorologi",
      desc: "Menyediakan aplikasi yang user-friendly bagi forecaster dan stakeholder untuk memproses dan mendiseminasikan informasi.",
      goals: ["Modernisasi Aplikasi Forecast", "Mobile App untuk Stakeholder"]
    },
    {
      domain: "Technology Architecture",
      icon: "📡",
      focus: "Infrastruktur Pendukung",
      desc: "Menyediakan infrastruktur keras (Radar, Server, Jaringan) yang tangguh untuk mendukung operasional 24/7.",
      goals: ["High Availability Server", "Peremajaan Alat Observasi"]
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Architecture Goals</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bagaimana Visi & Misi diterjemahkan ke dalam 4 Domain Arsitektur
        </p>
      </div>

      {/* VISUALISASI ALUR */}
      <div className="max-w-5xl mx-auto">
        
        {/* Visi Misi Box (Pusat) */}
        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg text-center mb-10 relative">
          <h2 className="text-xl font-bold mb-2">VISI & MISI ORGANISASI</h2>
          <p className="text-blue-200">"Business Goals"</p>
          
          {/* Panah ke bawah (CSS Arrow) */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 
            border-l-[15px] border-l-transparent
            border-r-[15px] border-r-transparent
            border-t-[15px] border-t-blue-900">
          </div>
        </div>

        {/* 4 Domain Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {domainGoals.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 transition-colors flex gap-4">
              {/* Icon Box */}
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {item.icon}
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-1">{item.domain}</h3>
                <p className="text-sm font-bold text-orange-500 uppercase mb-2 tracking-wide">
                  Fokus: {item.focus}
                </p>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {item.desc}
                </p>
                
                {/* List Kecil Goals */}
                <div className="flex flex-wrap gap-2">
                  {item.goals.map((goal, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                       {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ArchitectureGoalsPage;