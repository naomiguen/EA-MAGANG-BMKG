import React, { useState, useEffect } from 'react';
import { Scale, Globe, FileText, Users, GitBranch, X, ChevronRight, Loader2, Info } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CorporateGovernancePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBPMOptions, setShowBPMOptions] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // Data disesuaikan dengan Branding BMKG
  const governanceData = [
    {
      id: 1,
      title: 'Regulasi & Kebijakan',
      subtitle: 'Legal Framework',
      icon: Scale,
      color: 'bg-primary-50 text-primary-600',
      description: 'Peraturan perundang-undangan dan kebijakan strategis operasional BMKG.',
      type: 'documents'
    },
    {
      id: 2,
      title: 'Kebijakan Mutu',
      subtitle: 'Quality Management',
      icon: Globe,
      color: 'bg-primary-50 text-primary-600',
      description: 'Dokumen kebijakan mutu, pedoman mutu, dan rencana mutu organisasi.',
      type: 'navigate',
      navigateTo: '/quality-policy'
    },
    {
      id: 3,
      title: 'SOP',
      subtitle: 'Operating Procedure',
      icon: FileText,
      color: 'bg-primary-50 text-primary-600',
      description: 'Standar Operasional Prosedur untuk berbagai aktivitas teknis dan layanan.',
      type: 'navigate',
      navigateTo: '/sop-list'
    },
    {
      id: 4,
      title: 'Business Process Map',
      subtitle: 'Process Architecture',
      icon: GitBranch,
      color: 'bg-primary-50 text-primary-600',
      description: 'Peta proses bisnis level 0, 1, dan 2 organisasi BMKG.',
      type: 'bpm'
    },
    {
      id: 5,
      title: 'Struktur Organisasi',
      subtitle: 'Organization Structure',
      icon: Users,
      color: 'bg-primary-50 text-primary-600',
      description: 'Struktur dan tata kelola organisasi resmi BMKG Balikpapan.',
      type: 'navigate',
      navigateTo: '/vision/organization'
    }
  ];

  const bpmOptions = [
    {
      id: 1,
      title: 'Peta Konsep Enterprise',
      description: 'Peta proses bisnis tingkat strategis organisasi.',
      route: '/business-process/peta-konsep',
      icon: '🌐'
    },
    {
      id: 2,
      title: 'Peta Konsep Level 0',
      description: 'Kelompok proses bisnis utama (Core Business).',
      route: '/business-process/level-0',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Peta Konsep Level 0-1',
      description: 'Detail sub-proses dan aktivitas operasional.',
      route: '/business-process/level-01',
      icon: '🔍'
    }
  ];

  const handleCardClick = async (item) => {
    if (item.type === 'bpm') {
      setShowBPMOptions(true);
      return;
    }

    if (item.type === 'navigate') {
      window.location.href = item.navigateTo;
      return;
    }
    
    if (item.type === 'documents') {
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
        console.error('Error:', error);
        setDocuments([]);
      } finally {
        setLoadingDocs(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans p-4 md:p-12 flex flex-col items-center">
      
      {/* Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Corporate Governance
        </h1>
        <p className="text-primary-800 text-lg font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Repository Dokumen Standar, Regulasi, dan Struktur Tata Kelola BMKG Balikpapan.
        </p>
      </div>

      {/* CARD GRID - 5 Columns for Desktop */}
      <div className="max-w-[1400px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {governanceData.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-[2rem] border-2 border-primary-50 p-8 cursor-pointer hover:shadow-2xl hover:border-primary-100 hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center shadow-lg shadow-primary-50/50"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.color}`}>
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-black text-primary-900 mb-2 uppercase tracking-tight leading-tight">
              {item.title}
            </h3>
            <p className="text-xs font-black text-secondary-600 mb-4 uppercase tracking-[0.2em]">
              {item.subtitle}
            </p>
            <p className="text-primary-800/70 text-sm font-medium leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modal untuk Dokumen */}
      {selectedItem && selectedItem.type === 'documents' && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] overflow-hidden border border-primary-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary-700 px-10 py-8 border-b-4 border-secondary-500 flex justify-between items-center text-white">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white/10 rounded-2xl shadow-inner">
                  <selectedItem.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-none">{selectedItem.title}</h2>
                  <p className="text-secondary-400 text-xs font-bold uppercase tracking-widest mt-1">{selectedItem.subtitle}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 p-8">
              {loadingDocs ? (
                <div className="flex flex-col items-center justify-center py-20 text-primary-600">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p className="font-black uppercase tracking-widest">Memuat Dokumen...</p>
                </div>
              ) : documents.length > 0 ? (
                <div className="grid gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-white p-6 rounded-2xl border border-primary-50 hover:border-primary-200 hover:shadow-md transition-all group flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-black text-primary-900 uppercase text-sm mb-1">{doc.doc_name}</h4>
                        <p className="text-primary-800/60 text-xs font-medium">{doc.description}</p>
                        <div className="flex gap-3 mt-3">
                           <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-primary-100">{doc.doc_type}</span>
                           <span className="text-primary-300 text-[10px] font-mono self-center uppercase">{doc.reference}</span>
                        </div>
                      </div>
                      {doc.doc_link && (
                        <a 
                          href={doc.doc_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-2xl transition-all shadow-lg shadow-primary-200 group-hover:scale-105"
                        >
                          <ChevronRight size={24} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-primary-300">
                  <FileText size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="font-black uppercase tracking-widest italic">Belum ada dokumen yang terdaftar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal BPM Options */}
      {showBPMOptions && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setShowBPMOptions(false)}
        >
          <div 
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-primary-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary-700 px-10 py-8 border-b-4 border-secondary-500 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <GitBranch size={28} />
                </div>
                <button onClick={() => setShowBPMOptions(false)} className="p-2 hover:bg-white/10 rounded-xl">
                  <X size={28} />
                </button>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Business Process Map</h2>
              <p className="text-secondary-400 text-xs font-bold uppercase tracking-widest mt-1">Pilih Level Peta Proses</p>
            </div>

            <div className="p-8 space-y-4">
              {bpmOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => window.location.href = option.route}
                  className="flex items-center gap-5 p-6 bg-white hover:bg-primary-50 border-2 border-primary-50 hover:border-primary-200 rounded-2xl cursor-pointer transition-all duration-300 group"
                >
                  <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-primary-900 uppercase tracking-tight group-hover:text-primary-700">
                      {option.title}
                    </h3>
                    <p className="text-xs font-medium text-primary-800/60 mt-1">{option.description}</p>
                  </div>
                  <ChevronRight size={24} className="text-primary-200 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Helper Hint */}
      <div className="mt-12 text-center text-primary-400 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">
        Pilih modul tata kelola untuk melihat detail dokumen dan arsitektur
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CorporateGovernancePage;