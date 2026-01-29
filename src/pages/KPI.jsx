import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ZoomIn, ZoomOut, RefreshCw, X, BarChart3 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import KPITeknisi from "../assets/KPI-Teknisi.svg";
import KPIDatin from "../assets/KPI-Datin.svg";
import KPIObservasi from "../assets/KPI-Observasi.svg";
import KPITU from "../assets/KPI-TU.svg";
import KPIWMM from "../assets/KPI-WMM.svg";

const kpiItems = [
  { title: "Teknisi", image: KPITeknisi, color: "bg-blue-50", accent: "bg-blue-500" },
  { title: "Datin", image: KPIDatin, color: "bg-indigo-50", accent: "bg-indigo-500" },
  { title: "Observasi", image: KPIObservasi, color: "bg-emerald-50", accent: "bg-emerald-500" },
  { title: "TU", image: KPITU, color: "bg-orange-50", accent: "bg-orange-500" },
  { title: "WMM", image: KPIWMM, color: "bg-purple-50", accent: "bg-purple-500" },
];

const KPIpage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="max-w-5xl w-full text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Key Performance Indicators
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Indikator Kinerja Utama operasional Stasiun Meteorologi Balikpapan
        </p>
      </div>

      {/* 2. Grid Menu - CENTERED */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {kpiItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedItem(item)}
            className={`${item.color} p-8 rounded-[2.5rem] border-2 border-transparent hover:border-primary-100 flex flex-col items-center justify-center gap-6 transition-all shadow-xl shadow-primary-50/50 relative overflow-hidden group h-64`}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-3 ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
            <div className="bg-white p-6 rounded-2xl shadow-sm group-hover:shadow-md transition-all">
               <BarChart3 size={32} className="text-primary-600" />
            </div>
            <span className="text-xl font-black text-primary-900 uppercase tracking-tight">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 3. Modal Viewer dengan Zoom & Pan */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4" onClick={() => setSelectedItem(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl overflow-hidden border border-primary-100 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-primary-700 p-8 text-white flex justify-between items-center border-b-4 border-secondary-500">
                <div className="flex items-center gap-4">
                   <div>
                     <h2 className="text-2xl font-black uppercase tracking-tight leading-none">KPI {selectedItem.title}</h2>
                     <p className="text-secondary-400 text-xs font-bold uppercase tracking-widest mt-2">Detail Matriks Kinerja</p>
                   </div>
                </div>
                <button onClick={() => setSelectedItem(null)} className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - ZOOM AREA */}
              <div className="relative h-[70vh] bg-slate-50 flex items-center justify-center overflow-hidden">
                <TransformWrapper initialScale={1} centerOnInit={true} minScale={0.5} maxScale={3}>
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      {/* Floating Controls */}
                      <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100 text-primary-700">
                        <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                        <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                        <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 rounded-xl transition-colors"><RefreshCw size={24}/></button>
                      </div>

                      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                        <div className="flex justify-center items-center w-[1200px] p-12 cursor-grab active:cursor-grabbing">
                          <img
                            src={selectedItem.image}
                            alt={`KPI ${selectedItem.title}`}
                            className="max-w-full h-auto drop-shadow-2xl bg-white p-8 rounded-2xl border border-primary-50"
                          />
                        </div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>

              {/* Modal Footer */}
              <div className="bg-primary-50 p-6 text-center border-t border-primary-100">
                 <p className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px]">
                    Scroll to Zoom • Drag to Pan • Click outside to Close
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Helper Hint */}
      <div className="mt-12 text-center">
         <p className="text-primary-300 font-bold uppercase tracking-[0.2em] text-xs animate-pulse">
           Pilih departemen untuk membedah target capaian kinerja
         </p>
      </div>
    </div>
  );
};

export default KPIpage;