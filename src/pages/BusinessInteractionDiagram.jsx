import React, { useState, useEffect, useMemo } from 'react';
import { X, ArrowRight, Clock, FileText, Users, Activity, Info, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { supabase } from '../lib/supabaseClient';
import interactionSvg from '../assets/business-interaction.drawio.svg?raw';

const BusinessInteractionPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interactionDetails, setInteractionDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconMap = useMemo(() => ({
    'Activity': Activity,
    'FileText': FileText,
    'Users': Users,
    'ArrowRight': ArrowRight,
    'Clock': Clock
  }), []);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('business_interactions')
          .select('*')
          .order('id');

        if (fetchError) throw fetchError;

        const transformedData = {};
        data.forEach(item => {
          transformedData[item.id] = {
            title: item.title,
            source: item.source,
            target: item.target,
            type: item.type,
            icon: iconMap[item.icon] || Activity,
            desc: item.description,
            dataFormat: item.data_format,
            protocol: item.protocol,
            sla: item.sla,
            frequency: item.frequency
          };
        });

        setInteractionDetails(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [iconMap]);

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      if (id && interactionDetails[id]) {
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

  const activeInfo = activeId ? interactionDetails[activeId] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-primary-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mb-4"></div>
        <p className="font-black uppercase tracking-widest">Menganalisis Interaksi Bisnis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Data</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* Header Halaman - CENTERED & CLEAN */}
      <div className="w-full max-w-5xl text-center mb-12 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Business Interaction Map
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold uppercase tracking-wide flex justify-center items-center gap-2">
          Klik alur diagram untuk melihat detail interaksi antar departemen
        </p>
      </div>

      {/* Area Diagram dengan Fitur Zoom */}
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
        <TransformWrapper initialScale={1} centerOnInit={true} minScale={0.5} maxScale={3}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Controls */}
              <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100">
                <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><RefreshCw size={24}/></button>
              </div>

              {/* Header Box Diagram */}
              <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
                  <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
                  Interactive Map View
                </div>
              </div>

              {/* Kontainer Transform (Area Zoom) */}
              <div className="h-[70vh] bg-slate-50/50 cursor-grab active:cursor-grabbing relative">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(#0064b5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                  <div 
                    id="svg-wrapper"
                    className="flex justify-center items-center w-[1200px] p-12"
                    onClick={handleDiagramClick}
                    dangerouslySetInnerHTML={{ __html: interactionSvg }} 
                  />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Helper Hint */}
      <div className="mt-8 text-center text-primary-400 font-bold uppercase tracking-[0.2em] text-[10px]">
        Gunakan Mouse Scroll untuk Zoom & Klik elemen diagram untuk Detail
      </div>

      {/* Modal Detail Interaksi */}
      {isModalOpen && activeInfo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden border border-primary-100 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="bg-primary-700 text-white p-8 flex justify-between items-start border-b-4 border-secondary-500">
              <div className="flex flex-col items-start">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-3 tracking-widest uppercase shadow-sm">
                  INTERACTION DETAIL
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight">{activeInfo.title}</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"><X /></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center bg-primary-50 p-6 rounded-2xl border border-primary-100 shadow-inner">
                <div className="text-center">
                   <div className="text-[10px] font-black text-primary-400 uppercase mb-1">Source</div>
                   <span className="font-black text-primary-900 uppercase">{activeInfo.source}</span>
                </div>
                <ArrowRight className="text-secondary-500 animate-bounce-x" size={24} />
                <div className="text-center">
                   <div className="text-[10px] font-black text-primary-400 uppercase mb-1">Target</div>
                   <span className="font-black text-primary-900 uppercase">{activeInfo.target}</span>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-[0.2em] mb-3">Deskripsi Interaksi</h4>
                <p className="text-primary-900 text-lg leading-relaxed font-bold italic">"{activeInfo.desc}"</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-50">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-primary-400 font-black uppercase mb-1">Protokol</div>
                    <div className="text-sm font-black text-primary-800 uppercase tracking-tighter">{activeInfo.protocol}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-primary-400 font-black uppercase mb-1">Target SLA</div>
                    <div className="text-sm font-black text-primary-800 uppercase tracking-tighter">{activeInfo.sla}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInteractionPage;