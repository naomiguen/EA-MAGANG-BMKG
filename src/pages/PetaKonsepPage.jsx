import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { 
  ArrowLeft, X, Info, CheckCircle, Activity, 
  FileText, Database, Settings, Users, CloudRain,
  Package, Shield, UserCheck, Plane, Loader2
} from 'lucide-react';
import petaKonsepSvg from '../assets/peta_konsep.drawio.svg?raw';

const iconMap = {
  Plane, Shield, UserCheck, Users, CloudRain, 
  Settings, Activity, Database, CheckCircle, FileText, Package
};

const PetaKonsepPage = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processDetails, setProcessDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [nodesRes, activitiesRes] = await Promise.all([
        supabase.from('peta_konsep_nodes').select('*').order('sort_order'),
        supabase.from('peta_konsep_activities').select('*').order('sort_order')
      ]);

      if (nodesRes.error) throw nodesRes.error;
      if (activitiesRes.error) throw activitiesRes.error;

      const transformedData = {};
      nodesRes.data.forEach(node => {
        transformedData[node.id] = {
          title: node.title,
          icon: iconMap[node.icon_name] || FileText,
          color: node.color_class,
          desc: node.description,
          items: activitiesRes.data.filter(act => act.node_id === node.id).map(act => act.activity_text),
          pic: node.pic
        };
      });

      setProcessDetails(transformedData);
    } catch (err) {
      console.error('Error fetching process data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    while (current && attempts < 10) {
      const id = current.getAttribute?.('data-cell-id') || current.id;
      if (id && processDetails[id]) {
        foundId = id;
        break; 
      }
      if (current.id === 'svg-wrapper') break;
      current = current.parentNode;
      attempts++;
    }

    if (foundId) {
      setActiveId(foundId);
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
        <p className="font-black uppercase tracking-widest text-primary-700 text-xs">Menyinkronkan Arsitektur Bisnis...</p>
      </div>
    );
  }

  const activeInfo = activeId ? processDetails[activeId] : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED & CLEAN */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center">
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-primary-700 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        </div>

        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full relative">
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            Business Process Map
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
            <Activity size={24} className="text-secondary-600" />
            Visualisasi Rantai Nilai dan Alur Kerja Operasional Stasiun
          </p>
        </div>
      </div>

      {/* 2. Diagram Canvas */}
      
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative flex flex-col min-h-[700px]">
        <div className="bg-primary-700 px-8 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-secondary-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Peta Interaktif: Klik pada blok proses untuk detail teknis</span>
          </div>
          <div className="hidden md:block bg-primary-800 px-4 py-1.5 rounded-full border border-primary-600">
             <span className="text-[9px] font-black uppercase tracking-widest text-primary-300">Last Update: Januari 2026</span>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-16 overflow-auto bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:30px_30px] flex justify-center items-center">
          <div 
            id="svg-wrapper"
            className="w-full max-w-6xl mx-auto flex justify-center cursor-pointer 
                       [&>svg]:w-full [&>svg]:h-auto [&>svg]:drop-shadow-xl transition-all"
            onClick={handleDiagramClick}
            dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
          />
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
        </div>
      </div>

      {/* 3. Detail Modal */}
      {isModalOpen && activeInfo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-primary-100 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${activeInfo.color} p-8 text-white relative overflow-hidden border-b-4 border-black/10`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex gap-5 items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 shadow-xl">
                    <activeInfo.icon size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">{activeInfo.title}</h3>
                    <div className="flex items-center gap-2 bg-black/10 w-fit px-3 py-1 rounded-full border border-white/10">
                      <UserCheck size={14} className="text-secondary-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{activeInfo.pic}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-black/10 hover:bg-black/20 p-2 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8 bg-slate-50/30">
              <div>
                <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" /> Definisi Proses
                </h4>
                <p className="text-primary-900 leading-relaxed font-bold italic bg-white p-5 rounded-3xl border border-primary-100 shadow-sm">
                  "{activeInfo.desc}"
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Aktivitas Utama
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activeInfo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-primary-50 hover:border-primary-200 hover:shadow-md transition-all">
                      <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-bold text-primary-800 uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary-50 p-4 text-center border-t border-primary-100">
               <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:text-primary-800 transition-colors"
               >
                 Tutup Detail
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactions Styling */}
      <style>{`
        #svg-wrapper [id], #svg-wrapper [data-cell-id] {
          cursor: pointer !important;
          transition: all 0.3s ease;
        }
        #svg-wrapper [id]:hover, #svg-wrapper [data-cell-id]:hover {
          filter: brightness(1.05) drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default PetaKonsepPage;