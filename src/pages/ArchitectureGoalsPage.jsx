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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Architecture Goals
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bagaimana Visi & Misi diterjemahkan ke dalam 4 Domain Arsitektur
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* 4 DOMAIN GRID */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {domainGoals.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
            >
              {/* Header dengan Gradient Biru */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {item.domain}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                {/* Focus Area */}
                <div className="bg-blue-50 border-blue-200 border-l-4 p-4 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Fokus Area
                  </p>
                  <p className="text-slate-800 font-semibold">
                    {item.focus}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Goals Tags */}
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                    Strategic Goals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.goals.map((goal, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Integrated Approach</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Keempat domain arsitektur ini saling terintegrasi dan mendukung satu sama lain untuk mencapai visi BMKG Balikpapan dalam memberikan layanan meteorologi yang handal dan prima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureGoalsPage;