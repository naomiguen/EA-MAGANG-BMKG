import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RefreshCw, Maximize2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import KPIMatrixTeknisi from "../assets/BusinessProcess-KPIMatrix-Teknisi.svg";
import KPIMatrixDatin from "../assets/BusinessProcess-KPIMatrix-Datin.svg";
import KPIMatrixObservasi from "../assets/BusinessProcess-KPIMatrix-Observasi.svg";
import KPIMatrixTU from "../assets/BusinessProcess-KPIMatrix-TU.svg";
import KPIMatrixWMM from "../assets/BusinessProcess-KPIMatrix-WMM.svg";

const kpimatrixItems = [
  { title: "Teknisi", image: KPIMatrixTeknisi, color: "bg-primary-50", accent: "bg-primary-500" },
  { title: "Datin", image: KPIMatrixDatin, color: "bg-primary-50", accent: "bg-primary-500" },
  { title: "Observasi", image: KPIMatrixObservasi, color: "bg-primary-50", accent: "bg-primary-500" },
  { title: "TU", image: KPIMatrixTU, color: "bg-primary-50", accent: "bg-primary-500" },
  { title: "WMM", image: KPIMatrixWMM, color: "bg-primary-50", accent: "bg-primary-500" },
];

const BusinessProcessKPIMatrixPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CLEAN & CENTERED */}
      <div className="max-w-5xl w-full text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Business Process - KPI Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold uppercase tracking-widest italic">
          Pemetaan Hubungan Proses Bisnis dengan Indikator Kinerja Utama
        </p>
      </div>

      {/* 2. Grid Menu - CENTERED */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {kpimatrixItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedItem(item)}
            className={`${item.color} p-8 rounded-[2.5rem] border-2 border-transparent hover:border-primary-100 flex flex-col items-center justify-center transition-all shadow-xl shadow-primary-50/50 relative overflow-hidden group h-64`}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-3 ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
            <span className="text-2xl font-black text-primary-900 uppercase tracking-tight text-center px-2">
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
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-none">KPI Matrix: {selectedItem.title}</h2>
                  <p className="text-secondary-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3 text-left">Relationship Mapping Architecture</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl transition-all font-black uppercase text-xs tracking-widest">
                  Close
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
                            alt={`KPI Matrix ${selectedItem.title}`}
                            className="max-w-full h-auto drop-shadow-2xl bg-white p-8 rounded-2xl border border-primary-50"
                          />
                        </div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>

              {/* Modal Footer */}
              <div className="bg-primary-50 p-4 text-center border-t border-primary-100">
                 <p className="text-primary-400 font-black uppercase tracking-[0.4em] text-[9px]">
                    Scroll to Zoom • Drag to Pan
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Helper Hint */}
      <div className="mt-12 text-center">
         <p className="text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
           Select department to analyze process-performance alignment
         </p>
      </div>
    </div>
  );
};

export default BusinessProcessKPIMatrixPage;