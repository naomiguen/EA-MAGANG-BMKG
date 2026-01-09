import React from 'react';

const DataPrinciplesPage = () => {
  const dataPrinciples = [
    {
      id: "DP-01", 
      title: "Data Accuracy & Precision",
      statement: "Seluruh data pengamatan dan informasi meteorologi harus akurat, tepat, dan presisi sesuai kondisi riil atmosfer.",
      rationale: "Sesuai komitmen Kebijakan Mutu untuk memberikan layanan yang 'Handal dan Prima'. Kesalahan data sekecil apapun dapat membahayakan penerbangan.",
      implication: "Wajib dilakukan kalibrasi alat rutin dan validasi data (Quality Control) sebelum data disebar."
    },
    {
      id: "DP-02", 
      title: "Data Accessibility & Usability",
      statement: "Informasi meteorologi harus disajikan dalam format yang 'luas dan mudah dipahami' oleh pengguna (Pilot/AirNav).",
      rationale: "Data yang akurat tidak akan berguna jika formatnya membingungkan pengguna layanan.",
      implication: "Menggunakan standar format visualisasi data yang user-friendly dan sesuai standar ICAO."
    },
    {
      id: "DP-03", 
      title: "Holistic Data Lifecycle",
      statement: "Pengelolaan data harus terjamin kualitasnya mulai dari Pengamatan (Hulu), Pengumpulan, Analisis, hingga Penyebaran (Hilir).",
      rationale: "Kualitas output informasi sangat bergantung pada kualitas input data di setiap tahapan proses.",
      implication: "Integrasi sistem database dari AWOS/Radar (pengamatan) ke sistem CMSS (pengumpulan) hingga ke user."
    },
    {
      id: "DP-04", 
      title: "Standardization & Compliance",
      statement: "Pengelolaan data harus mematuhi standar Sistem Manajemen Mutu ISO 9001:2015 dan peraturan yang berlaku.",
      rationale: "Untuk menjamin konsistensi layanan dan 'perbaikan yang berkesinambungan' sesuai amanat dokumen KM-WMM-03.",
      implication: "Setiap prosedur pengelolaan data harus memiliki SOP yang terdokumentasi dan diaudit secara berkala."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Data Architecture Principles
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            BMKG Stasiun Meteorologi Balikpapan
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* GRID KARTU PRINSIP */}
      <div className="max-w-6xl mx-auto space-y-8">
        {dataPrinciples.map((item, index) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row">
              
              {/* Kolom Kiri: Judul & Statement */}
              <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <span className="inline-block text-xs font-bold bg-white text-blue-700 px-3 py-1.5 rounded-lg mb-4 shadow-sm">
                    {item.id}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">{item.title}</h3>
                  <div className="w-12 h-1 bg-cyan-400 rounded-full mb-4"></div>
                  <p className="text-blue-50 leading-relaxed italic text-sm">
                    "{item.statement}"
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Rationale & Implication */}
              <div className="lg:w-3/5 p-8 bg-white">
                <div className="space-y-6">
                  <div className="group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                        Rationale
                      </label>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-13">
                      {item.rationale}
                    </p>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                  
                  <div className="group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                        Implication
                      </label>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border-l-4 border-yellow-400 shadow-sm">
                      <p className="text-slate-700 leading-relaxed">
                        {item.implication}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataPrinciplesPage;