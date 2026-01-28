import React, { useState, useEffect } from 'react';
import { Scale, Globe, FileText, Users, GitBranch, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CorporateGovernancePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBPMOptions, setShowBPMOptions] = useState(false);
  const [showISOOptions, setShowISOOptions] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // Data hardcode untuk tampilan awal - TIDAK PERLU SUPABASE
  const governanceData = [
    {
      id: 1,
      title: 'Regulasi & Kebijakan',
      subtitle: 'Legal Framework',
      icon: Scale,
      color: 'bg-blue-100 text-blue-600',
      description: 'Peraturan perundang-undangan dan kebijakan strategis yang mengatur operasional BMKG',
      type: 'documents'
    },
    {
      id: 2,
      title: 'Kebijakan Mutu',
      subtitle: 'Quality Management',
      icon: Globe,
      color: 'bg-green-100 text-green-600',
      description: 'Dokumen kebijakan mutu, pedoman mutu, sasaran mutu, dan rencana mutu organisasi',
      type: 'navigate',
      navigateTo: '/quality-policy'
    },
    {
      id: 3,
      title: 'SOP',
      subtitle: 'Standard Operating Procedure',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      description: 'Standar Operasional Prosedur untuk berbagai aktivitas dan layanan',
      type: 'navigate',
      navigateTo: '/sop-list'
    },
    {
      id: 4,
      title: 'Business Process Map',
      subtitle: 'Process Architecture',
      icon: GitBranch,
      color: 'bg-purple-100 text-purple-600',
      description: 'Peta proses bisnis level 0, 1, dan 2 organisasi BMKG',
      type: 'bpm'
    },
    {
      id: 5,
      title: 'Struktur Organisasi',
      subtitle: 'Organization Structure',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      description: 'Struktur dan tata kelola organisasi BMKG Balikpapan',
      type: 'navigate',
      navigateTo: '/vision/organization'
    }
  ];

  const bpmOptions = [
    {
      id: 1,
      title: 'Peta Konsep',
      description: 'Peta proses bisnis tingkat enterprise',
      route: '/business-process/peta-konsep',
      icon: '🗺️'
    },
    {
      id: 2,
      title: 'Peta Konsep Level 0',
      description: 'Kelompok proses bisnis utama',
      route: '/business-process/level-0',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Peta Konsep level0-1',
      description: 'Proses bisnis detail dan sub-proses',
      route: '/business-process/level-01',
      icon: '🔍'
    }
  ];

  const isoOptions = [
    {
      id: 1,
      title: 'Kebijakan Mutu',
      description: 'Dokumen kebijakan mutu dan quality management system',
      route: '/quality-policy',
      icon: '⭐'
    }
  ];

  const handleCardClick = async (item) => {
    console.log('Card clicked:', item);
    
    // Cek BPM
    if (item.type === 'bpm') {
      console.log('Opening BPM options');
      setShowBPMOptions(true);
      return;
    }

    // Cek ISO (sudah tidak dipakai karena langsung navigate)
    if (item.type === 'iso') {
      console.log('Opening ISO options');
      setShowISOOptions(true);
      return;
    }
    
    // Cek Navigate
    if (item.type === 'navigate') {
      console.log('Navigating to:', item.navigateTo);
      window.location.href = item.navigateTo;
      return;
    }
    
    // Fetch dokumen dari Supabase
    if (item.type === 'documents') {
      console.log('Fetching documents for category:', item.id);
      setSelectedItem(item);
      setLoadingDocs(true);
      
      try {
        const { data, error } = await supabase
          .from('governance_documents')
          .select('*')
          .eq('category_id', item.id)
          .order('display_order');
        
        if (error) throw error;
        setDocuments(data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      } finally {
        setLoadingDocs(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">Corporate Governance</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Repository Dokumen Standar, Regulasi, dan Struktur Organisasi BMKG Balikpapan.
        </p>
      </div>

      {/* CARD GRID - TAMPILAN AWAL */}
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
            <p className="text-xs font-semibold text-blue-500 mb-3 uppercase tracking-wide">
              {item.subtitle}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modal untuk Dokumen */}
      {selectedItem && selectedItem.type === 'documents' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full flex flex-col max-h-[90vh] animate-scale-up max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="flex-1 overflow-auto bg-slate-50 p-6">
              {loadingDocs ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading documents...</p>
                </div>
              ) : documents.length > 0 ? (
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
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-700">
                          {doc.doc_name}
                          <div className="text-xs text-gray-400 font-normal">{doc.description}</div>
                        </td>
                        <td className="px-6 py-3">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs border">{doc.doc_type}</span>
                        </td>
                        <td className="px-6 py-3 text-gray-400 font-mono text-xs">{doc.reference}</td>
                        <td className="px-6 py-3 text-center">
                          {doc.doc_link && (
                            <a 
                              href={doc.doc_link} 
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>Belum ada dokumen</p>
                </div>
              )}
            </div>
            
            <div className="bg-white border-t p-4 text-right">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal BPM Options */}
      {showBPMOptions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowBPMOptions(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="p-6 space-y-3">
              {bpmOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setShowBPMOptions(false);
                    window.location.href = option.route;
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