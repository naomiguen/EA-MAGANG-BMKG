import React, { useState } from 'react';
import { Book, Shield, Scale, FileText, Globe, Users, X, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CorporateGovernancePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBPMOptions, setShowBPMOptions] = useState(false);
  const navigate = useNavigate();

  // --- DATA STATIC (Regulasi, ISO, SOP) ---
  const governanceData = [
    {
      id: "REG-01",
      title: "Legal Foundation",
      subtitle: "Dasar Hukum & Undang-Undang",
      icon: Scale,
      color: "bg-blue-100 text-blue-700",
      description: "Landasan hukum tertinggi yang mengatur tugas, fungsi, dan wewenang BMKG.",
      documents: [
        { 
          name: "UU No. 31 Tahun 2009", 
          type: "Undang-Undang", 
          desc: "Tentang MKG", 
          ref: "RI",
          link: "https://example.com/uu-31-2009.pdf" // Ganti dengan link asli
        },
        { 
          name: "Perpres No. 39 Tahun 2019", 
          type: "Perpres", 
          desc: "Satu Data Indonesia", 
          ref: "RI",
          link: "https://example.com/perpres-39-2019.pdf" // Ganti dengan link asli
        },
        { 
          name: "PP No. 11 Tahun 2016", 
          type: "PP", 
          desc: "Tarif PNBP", 
          ref: "RI",
          link: "https://example.com/pp-11-2016.pdf" // Ganti dengan link asli
        }
      ]
    },
    {
      id: "STD-01",
      title: "International Standards",
      subtitle: "Standar Penerbangan & Mutu",
      icon: Globe,
      color: "bg-green-100 text-green-700",
      description: "Standar internasional ISO 9001:2015 dan ICAO yang wajib dipatuhi.",
      documents: [
        { 
          name: "ISO 9001:2015", 
          type: "Quality", 
          desc: "Sistem Manajemen Mutu", 
          ref: "ISO",
          link: "https://example.com/iso-9001-2015.pdf" // Ganti dengan link asli
        },
        { 
          name: "ICAO Annex 3", 
          type: "Aviation", 
          desc: "Meteorological Service", 
          ref: "ICAO",
          link: "https://example.com/icao-annex3.pdf" // Ganti dengan link asli
        },
        { 
          name: "Kebijakan Mutu", 
          type: "Internal", 
          desc: "KM-WMM-03", 
          ref: "BMKG",
          link: "https://example.com/kebijakan-mutu.pdf" // Ganti dengan link asli
        }
      ]
    },
    {
      id: "SOP-01",
      title: "Operational Procedures",
      subtitle: "SOP & Instruksi Kerja",
      icon: FileText,
      color: "bg-orange-100 text-orange-700",
      description: "Panduan teknis langkah-demi-langkah pelaksanaan tugas operasional.",
      documents: [
        { 
          name: "SOP Operasional Teknisi", 
          type: "SOP", 
          desc: "HK.05.00/TEK.002", 
          ref: "Teknis",
          link: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/governance-files/SOP%20Operasional%20Teknisi%20SAMS%20(1).pdf" 
        },
        { 
          name: "SOP Pengamatan Udara", 
          type: "SOP", 
          desc: "Surface Observation", 
          ref: "Obs",
          link: "https://example.com/sop-briefing.pdf"
        },
        { 
          name: "SOP Briefing Penerbangan", 
          type: "SOP", 
          desc: "Flight Briefing", 
          ref: "Fcst",
          link: "https://example.com/sop-briefing.pdf" 
        }
      ]
    },
    {
      id: "ORG-01",
      title: "Organization Structure",
      subtitle: "Struktur Organisasi",
      icon: Users,
      color: "bg-pink-100 text-pink-700",
      description: "Hierarki jabatan dan alur koordinasi antar unit kerja (Data Real-time).",
      isNavigate: true,
      navigateTo: '/vision/organization'
    },
    {
      id: "BPM-01",
      title: "Business Process Map",
      subtitle: "Peta Proses Bisnis",
      icon: GitBranch,
      color: "bg-purple-100 text-purple-700",
      description: "Visualisasi alur proses bisnis dan interaksi antar unit kerja di BMKG.",
      isBPM: true
    }
  ];

  // Data untuk pilihan Business Process Map
  const bpmOptions = [
    {
      id: 'peta-konsep',
      title: 'Peta Konsep',
      description: 'Overview proses bisnis secara keseluruhan',
      route: '/business-process/peta-konsep',
      icon: '🗺️'
    },
    {
      id: 'level-0',
      title: 'Peta Konsep Level 0',
      description: 'Proses bisnis tingkat tertinggi (Core Processes)',
      route: '/business-process/level-0',
      icon: '📊'
    },
    {
      id: 'level-0-1',
      title: 'Peta Konsep Level 0-1',
      description: 'Detail proses bisnis hingga sub-proses',
      route: '/business-process/level-01',
      icon: '🔍'
    }
  ];

  const handleCardClick = (item) => {
    if (item.isBPM) {
      setShowBPMOptions(true);
    } else if (item.isNavigate) {
      navigate(item.navigateTo);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-12">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">Corporate Governance</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Repository Dokumen Standar, Regulasi, dan Struktur Organisasi BMKG Balikpapan.
        </p>
      </div>

      {/* GRID KARTU */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {governanceData.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-700">
              {item.title}
            </h3>
            <p className="text-xs font-semibold text-blue-500 mb-3 uppercase tracking-wide">{item.subtitle}</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* POP-UP MODAL DOKUMEN */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full flex flex-col max-h-[90vh] animate-scale-up max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="bg-gray-50 px-8 py-5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${selectedItem.color}`}>
                  <selectedItem.icon size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedItem.title}</h2>
                  <p className="text-gray-500 text-xs">{selectedItem.subtitle}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            {/* CONTENT MODAL */}
            <div className="flex-1 overflow-auto bg-slate-50 p-6">
              {/* TAMPILAN TABEL DOKUMEN */}
              <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-500 font-semibold text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 border-b">Document Name</th>
                    <th className="px-6 py-3 border-b">Type</th>
                    <th className="px-6 py-3 border-b">Ref</th>
                    <th className="px-6 py-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {selectedItem.documents?.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-gray-700">
                        {doc.name} <div className="text-xs text-gray-400 font-normal">{doc.desc}</div>
                      </td>
                      <td className="px-6 py-3"><span className="bg-gray-100 px-2 py-1 rounded text-xs border">{doc.type}</span></td>
                      <td className="px-6 py-3 text-gray-400 font-mono text-xs">{doc.ref}</td>
                      <td className="px-6 py-3 text-center">
                        {doc.link && (
                          <a 
                            href={doc.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white border-t p-4 text-right">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold text-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP PILIHAN BUSINESS PROCESS MAP */}
      {showBPMOptions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowBPMOptions(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <GitBranch size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Business Process Map</h2>
                    <p className="text-purple-100 text-sm">Pilih level peta proses yang ingin dilihat</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBPMOptions(false)} 
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="p-6 space-y-3">
              {bpmOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setShowBPMOptions(false);
                    navigate(option.route);
                  }}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-xl cursor-pointer transition-all duration-200 group"
                >
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-purple-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t px-6 py-4 rounded-b-2xl">
              <button 
                onClick={() => setShowBPMOptions(false)} 
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-bold text-gray-700 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CorporateGovernancePage;