import React, { useState } from 'react';
import petaKonsepSvg from '../assets/communicationDiagram.drawio.svg?raw';

const DiagramArsitektur = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const appDetails = {
    bmkgsoft: {
      title: "BMKGSoft & WXREV",
      type: "Core Business",
      desc: "Layanan Pengolahan Data Observasi. Sistem Nowcasting mengambil data hujan/suhu harian dari sini via API.",
      color: "#1e88e5",
      details: {
        fungsi: "Sistem pengolahan data observasi cuaca dari stasiun meteorologi di seluruh Indonesia",
        dataYangDisediakan: ["Data suhu udara harian", "Data curah hujan", "Data kelembaban", "Data tekanan udara"],
        metodeAkses: "REST API dengan autentikasi token",
        frekuensiUpdate: "Real-time setiap 10 menit"
      }
    },
    cmss: {
      title: "CMSS & AFTN",
      type: "Core Business",
      desc: "Backbone komunikasi data global (GTS). Sumber data satelit Himawari & Radar real-time.",
      color: "#1e88e5",
      details: {
        fungsi: "Communication Management System & Aeronautical Fixed Telecommunication Network",
        dataYangDisediakan: ["Data satelit Himawari-8/9", "Data radar cuaca real-time", "Data GTS"],
        metodeAkses: "Protocol GTS, FTP, dan WebSocket",
        frekuensiUpdate: "Real-time (continuous streaming)"
      }
    },
    wigos: {
      title: "WIGOS",
      type: "Core Technical",
      desc: "Database metadata alat. Sistem perlu tahu koordinat lat/long radar agar plotting peta akurat.",
      color: "#1976d2",
      details: {
        fungsi: "WMO Integrated Global Observing System - Database metadata peralatan observasi",
        dataYangDisediakan: ["Koordinat geografis (Lat/Long) radar", "Spesifikasi teknis alat"],
        metodeAkses: "REST API dan database query",
        frekuensiUpdate: "Update saat ada perubahan metadata"
      }
    },
    simas: {
      title: "SIMAS & SPRESO",
      type: "Management",
      desc: "Sistem Kepegawaian. Digunakan untuk validasi login (Single Sign-On) pegawai BMKG.",
      color: "#1565c0",
      details: {
        fungsi: "Sistem Informasi Manajemen Aparatur Sipil Negara - SSO Provider",
        dataYangDisediakan: ["Data profil pegawai", "Role dan hak akses", "Token autentikasi SSO"],
        metodeAkses: "OAuth 2.0 / SAML SSO",
        frekuensiUpdate: "Sinkronisasi harian"
      }
    },
    nowcasting: {
      title: "SISTEM NOWCASTING",
      type: "Future State",
      desc: "Aplikasi Web-based baru. Mengolah data mentah dari berbagai sumber menjadi visualisasi peringatan dini.",
      color: "#6a1b9a",
      details: {
        fungsi: "Platform terpusat untuk prediksi cuaca jangka pendek (0-6 jam ke depan)",
        fiturUtama: ["Dashboard real-time", "Visualisasi peta interaktif", "Sistem alerting otomatis"],
        teknologi: "Web-based (React/Vue), Node.js backend, PostgreSQL/TimescaleDB",
        target: "Forecaster, Analis Cuaca, Management BMKG"
      }
    },
    portal: {
      title: "Portal Web BMKG",
      type: "Output / Diseminasi",
      desc: "Website publik. Sistem otomatis mengirim (Push) warning ke sini agar dibaca masyarakat.",
      color: "#1e88e5",
      details: {
        fungsi: "Portal informasi cuaca untuk masyarakat umum",
        outputYangDiterima: ["Warning cuaca ekstrem", "Prakiraan cuaca", "Peta radar dan satelit"],
        metodeIntegrasi: "REST API push notification",
        audiensTarget: "Masyarakat umum, media massa"
      }
    },
    synergie: {
      title: "Synergie Lama",
      type: "Legacy Workstation",
      desc: "Software desktop eksisting. Data tetap dikirim ke sini untuk backward compatibility.",
      color: "#1e88e5",
      details: {
        fungsi: "Legacy workstation software untuk analisis cuaca (berbasis desktop)",
        alasanIntegrasi: ["Backward compatibility", "Transisi bertahap"],
        metodeIntegrasi: "File export (NetCDF, GRIB2) dan FTP transfer",
        statusPenggunaan: "Akan di-phase out secara bertahap"
      }
    }
  };

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    // Memanjat ke atas mencari atribut data-cell-id atau id
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      if (id && appDetails[id]) {
        foundId = id;
        console.log("Klik terdeteksi pada:", foundId);
        break; 
      }
      
      if (current.id === 'svg-wrapper') break;
      
      current = current.parentNode;
      attempts++;
    }

    if (foundId) {
      setSelectedApp(appDetails[foundId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
          Application Communication Diagram
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Klik pada kotak sistem untuk melihat detail.</p>
      </div>

      {/* CONTAINER SVG */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 overflow-auto">
        <div 
          id="svg-wrapper"
          className="w-full max-w-6xl mx-auto flex justify-center cursor-pointer"
          onClick={handleDiagramClick}
          dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
        />
      </div>

      {/* MODAL POPUP */}
      {selectedApp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
          onClick={() => setSelectedApp(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="p-4 sm:p-6 text-white flex justify-between items-start"
              style={{ backgroundColor: selectedApp.color }}
            >
              <div className="flex-1">
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold uppercase tracking-wider mb-2">
                  {selectedApp.type}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {selectedApp.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 ml-2 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed border-b pb-4">
                {selectedApp.desc}
              </p>

              <div className="space-y-4">
                {/* Fungsi Utama */}
                {selectedApp.details.fungsi && (
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase mb-2">Fungsi Utama</h3>
                    <p className="text-slate-700 text-sm">{selectedApp.details.fungsi}</p>
                  </div>
                )}

                {/* Data yang Disediakan / Output */}
                {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima) && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">
                      {selectedApp.details.dataYangDisediakan ? "Data & Informasi" : "Output Sistem"}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima).map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="mr-2 text-blue-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Fitur Unggulan (Nowcasting) */}
                {selectedApp.details.fiturUtama && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">Fitur Unggulan</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.details.fiturUtama.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alasan Integrasi (Synergie) */}
                {selectedApp.details.alasanIntegrasi && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">Alasan Integrasi</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedApp.details.alasanIntegrasi.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="mr-2 text-blue-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Info Teknis (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedApp.details.metodeAkses && (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-400">
                      <div className="font-semibold text-blue-900 text-xs uppercase mb-1">Metode Akses</div>
                      <div className="text-blue-700 text-sm">{selectedApp.details.metodeAkses}</div>
                    </div>
                  )}
                  {selectedApp.details.frekuensiUpdate && (
                    <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-400">
                      <div className="font-semibold text-green-900 text-xs uppercase mb-1">Frekuensi Update</div>
                      <div className="text-green-700 text-sm">{selectedApp.details.frekuensiUpdate}</div>
                    </div>
                  )}
                  {selectedApp.details.target && (
                    <div className="bg-indigo-50 p-3 rounded-lg border-l-2 border-indigo-400">
                      <div className="font-semibold text-indigo-900 text-xs uppercase mb-1">Target Pengguna</div>
                      <div className="text-indigo-700 text-sm">{selectedApp.details.target}</div>
                    </div>
                  )}
                  {selectedApp.details.metodeIntegrasi && (
                    <div className="bg-orange-50 p-3 rounded-lg border-l-2 border-orange-400">
                      <div className="font-semibold text-orange-900 text-xs uppercase mb-1">Metode Integrasi</div>
                      <div className="text-orange-700 text-sm">{selectedApp.details.metodeIntegrasi}</div>
                    </div>
                  )}
                  {selectedApp.details.statusPenggunaan && (
                    <div className="bg-amber-50 p-3 rounded-lg border-l-2 border-amber-400">
                      <div className="font-semibold text-amber-900 text-xs uppercase mb-1">Status</div>
                      <div className="text-amber-700 text-sm">{selectedApp.details.statusPenggunaan}</div>
                    </div>
                  )}
                  {selectedApp.details.audiensTarget && (
                    <div className="bg-teal-50 p-3 rounded-lg border-l-2 border-teal-400">
                      <div className="font-semibold text-teal-900 text-xs uppercase mb-1">Audiens</div>
                      <div className="text-teal-700 text-sm">{selectedApp.details.audiensTarget}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default DiagramArsitektur;