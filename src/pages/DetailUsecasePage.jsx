import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { appData } from "../services/data";
import { ArrowLeft, ZoomIn, ZoomOut, RefreshCw, X, Info, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [svgContent, setSvgContent] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = appData.find((item) => item.id === id);

  useEffect(() => {
    if (data?.diagramUrl) {
      fetch(data.diagramUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Gagal memuat file SVG");
          return res.text();
        })
        .then((svg) => setSvgContent(svg))
        .catch((err) => console.error(err));
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary-950">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Data tidak ditemukan!</h2>
        <button onClick={() => navigate("/app/usecase")} className="mt-4 text-primary-600 font-bold hover:underline"> Kembali ke Galeri</button>
      </div>
    );
  }

  const handleSvgClick = (e) => {
    e.preventDefault();
    let current = e.target;
    let foundId = null;

    while (current && current.tagName !== 'svg') {
      const idAttr = current.getAttribute('id') || current.getAttribute('data-cell-id');
      if (idAttr && data.useCaseDetails && data.useCaseDetails[idAttr]) {
        foundId = idAttr;
        break;
      }
      current = current.parentNode;
    }

    if (foundId) {
      setSelectedUseCase(data.useCaseDetails[foundId]);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Navigation & Header Section - CENTERED */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-12">
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={() => navigate("/app/usecase")} 
            className="p-3 bg-primary-50 text-primary-700 rounded-2xl hover:bg-primary-100 transition-all flex items-center gap-2 font-black uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
        </div>

        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full">
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            {data.title}
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
            <Info size={20} className="text-secondary-600 flex-shrink-0" />
            {data.description}
          </p>
        </div>
      </div>

      {/* 2. Interactive Diagram Area */}
      
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
        <TransformWrapper initialScale={1} centerOnInit={true} minScale={0.5} maxScale={3}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Zoom Controls */}
              <div className="absolute top-24 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100">
                <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><RefreshCw size={24}/></button>
              </div>

              {/* Header Box Diagram */}
              <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
                  <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
                  Use Case Interactivity Enabled
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-primary-800 px-4 py-2 rounded-xl border border-primary-600">
                  <Maximize2 size={12} className="text-secondary-500" />
                  Interactive SVG HD
                </div>
              </div>

              {/* SVG Canvas Area */}
              <div className="h-[70vh] bg-slate-50/50 cursor-grab active:cursor-grabbing relative flex items-center justify-center">
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                  <div 
                    className="flex justify-center items-center w-[1200px] p-12 transition-all"
                    onClick={handleSvgClick}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Helper Hint */}
      <div className="mt-8 text-center text-primary-400 font-bold uppercase tracking-[0.2em] text-[10px]">
        Klik pada elips Use Case untuk melihat rincian fungsionalitas
      </div>

      {/* 3. Modal Popup Section */}
      <AnimatePresence>
        {isModalOpen && selectedUseCase && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-primary-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-primary-700 p-8 text-white flex justify-between items-start border-b-4 border-secondary-500">
                <div className="flex flex-col items-start">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-3 tracking-widest uppercase shadow-sm">
                    Use Case Detail
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-left">{selectedUseCase.title}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all text-white"><X size={24}/></button>
              </div>

              <div className="p-10 text-center flex flex-col items-center">
                <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-[0.2em] mb-4 text-center">Deskripsi Fungsionalitas</h4>
                <p className="text-primary-900 text-xl leading-relaxed font-bold italic max-w-sm">
                  "{selectedUseCase.description}"
                </p>
                <div className="mt-8 bg-primary-50 p-4 rounded-2xl border border-primary-100 flex items-center gap-3">
                   <Info size={18} className="text-primary-600" />
                   <p className="text-xs text-primary-700 font-black uppercase tracking-wider">Functional Requirement v1.0</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global SVG Interactions CSS */}
      <style>{`
        svg [id], svg [data-cell-id] { cursor: pointer !important; transition: all 0.3s ease; }
        svg text, svg tspan { pointer-events: none !important; }
        svg [id]:hover ellipse, svg [data-cell-id]:hover ellipse { 
          fill: #fefce8 !important; 
          stroke: #fbbf24 !important; 
          stroke-width: 4px !important;
        }
        svg [id]:hover rect, svg [data-cell-id]:hover rect { 
          stroke: #fbbf24 !important;
        }
      `}</style>
    </div>
  );
};

export default DetailPage;