import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Loader2, AlertCircle, ZoomIn, ZoomOut, RefreshCw, X, Info, Activity } from "lucide-react";
import petaKonsepSvg from '../assets/communicationDiagram.drawio.svg?raw';

const DiagramArsitektur = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [appDetails, setAppDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppDetails();
  }, []);

  const fetchAppDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [appsRes, fieldsRes] = await Promise.all([
        supabase.from('application_details').select('*'),
        supabase.from('application_detail_fields').select('*').order('display_order')
      ]);

      if (appsRes.error) throw appsRes.error;
      if (fieldsRes.error) throw fieldsRes.error;

      const transformedData = {};
      appsRes.data.forEach(app => {
        const appFields = fieldsRes.data.filter(f => f.app_id === app.id);
        const details = {};
        appFields.forEach(field => {
          if (field.field_type === 'list') {
            if (!details[field.field_name]) details[field.field_name] = [];
            details[field.field_name].push(field.field_value);
          } else {
            details[field.field_name] = field.field_value;
          }
        });

        transformedData[app.id] = {
          title: app.title,
          type: app.type,
          desc: app.description,
          color: app.color,
          details: details
        };
      });

      setAppDetails(transformedData);
    } catch (err) {
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
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      if (id && appDetails[id]) {
        foundId = id;
        break; 
      }
      if (current.id === 'svg-wrapper') break;
      current = current.parentNode;
      attempts++;
    }

    if (foundId) setSelectedApp(appDetails[foundId]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-center">Sinkronisasi Diagram Komunikasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Diagram</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchAppDetails} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg uppercase text-xs">Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Application Communication Diagram
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Activity size={20} className="text-secondary-600 flex-shrink-0" />
          Arsitektur Interaksi dan Aliran Data antar Sistem Informasi
        </p>
      </div>

      {/* 2. Interactive Diagram Area */}
      
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative group">
        <TransformWrapper initialScale={1} centerOnInit={true} minScale={0.5} maxScale={3}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Zoom Controls */}
              <div className="absolute top-24 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100">
                <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><RefreshCw size={24}/></button>
              </div>

              {/* Diagram Header Meta */}
              <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
                  <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
                  Interactive Architecture View
                </div>
                <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest bg-primary-800 px-4 py-2 rounded-xl border border-primary-600">
                  Click on blocks for technical details
                </div>
              </div>

              <div className="h-[70vh] bg-slate-50/50 cursor-grab active:cursor-grabbing relative flex items-center justify-center">
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                  <div 
                    id="svg-wrapper"
                    className="flex justify-center items-center w-[1200px] p-12 transition-all"
                    onClick={handleDiagramClick}
                    dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
                  />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* 3. Modal Detail Section */}
      {selectedApp && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={() => setSelectedApp(null)}>
          <div 
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-primary-100 animate-in zoom-in-95 duration-300" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="p-8 text-white flex justify-between items-start border-b-4 border-secondary-500"
              style={{ backgroundColor: selectedApp.color }}
            >
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-white/30 shadow-sm">
                  {selectedApp.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight uppercase tracking-tighter">
                  {selectedApp.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="bg-white/10 hover:bg-white/20 rounded-2xl p-2 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-8 bg-slate-50/30">
              <div className="text-center flex flex-col items-center border-b border-primary-100 pb-8">
                <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-3">Deskripsi Sistem</h4>
                <p className="text-primary-900 text-lg leading-relaxed font-bold italic max-w-2xl">
                  "{selectedApp.desc}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedApp.details.fungsi && (
                  <div className="bg-white p-6 rounded-3xl border border-primary-100 shadow-sm">
                    <h3 className="font-black text-primary-800 text-xs uppercase tracking-widest mb-3 border-b border-primary-50 pb-2">Fungsi Utama</h3>
                    <p className="text-primary-900/70 text-sm font-medium leading-relaxed">{selectedApp.details.fungsi}</p>
                  </div>
                )}

                {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima) && (
                  <div className="bg-white p-6 rounded-3xl border border-primary-100 shadow-sm">
                    <h3 className="font-black text-primary-800 text-xs uppercase tracking-widest mb-3 border-b border-primary-50 pb-2">
                      {selectedApp.details.dataYangDisediakan ? "Data & Informasi" : "Output Sistem"}
                    </h3>
                    <ul className="space-y-2">
                      {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima).map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm font-bold text-primary-700/80 uppercase tracking-tight">
                          <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-3 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Technical Badges Section */}
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                {selectedApp.details.metodeAkses && (
                  <div className="bg-primary-50 px-5 py-2 rounded-2xl border border-primary-100 flex flex-col items-center">
                    <span className="text-[9px] font-black text-primary-400 uppercase tracking-widest">Akses</span>
                    <span className="text-xs font-black text-primary-700">{selectedApp.details.metodeAkses}</span>
                  </div>
                )}
                {selectedApp.details.frekuensiUpdate && (
                  <div className="bg-emerald-50 px-5 py-2 rounded-2xl border border-emerald-100 flex flex-col items-center">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Update</span>
                    <span className="text-xs font-black text-emerald-700">{selectedApp.details.frekuensiUpdate}</span>
                  </div>
                )}
                {selectedApp.details.teknologi && (
                  <div className="bg-purple-50 px-5 py-2 rounded-2xl border border-purple-100 flex flex-col items-center">
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Stack</span>
                    <span className="text-xs font-black text-purple-700">{selectedApp.details.teknologi}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 text-center border-t border-primary-100">
               <p className="text-primary-300 font-black uppercase tracking-[0.4em] text-[9px]">
                  Communication Architecture Detail v1.0
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Style for SVG Interactions */}
      <style>{`
        #svg-wrapper [id], #svg-wrapper [data-cell-id] { cursor: pointer !important; transition: all 0.3s ease; }
        #svg-wrapper [id]:hover, #svg-wrapper [data-cell-id]:hover { 
          filter: brightness(1.1) drop-shadow(0 0 8px rgba(0,70,127,0.3));
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default DiagramArsitektur;