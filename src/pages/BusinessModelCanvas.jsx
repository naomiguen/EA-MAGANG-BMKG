import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Upload, Grid3x3, Info, ZoomIn, ZoomOut, RefreshCw, Maximize2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BusinessModelDefault from "../assets/BMC.svg";

const STORAGE_KEY = "bmc_image";

const BusinessModelCanvas = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    return savedImage || BusinessModelDefault;
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem(STORAGE_KEY, reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setImage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(STORAGE_KEY, reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="max-w-5xl w-full text-center mb-12 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Business Model Canvas
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold uppercase tracking-wide italic">
          Visualisasi Strategis 9 Building Blocks Model Bisnis Organisasi
        </p>
      </div>

      {/* 2. Main Card Area */}
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
        
        {/* Action Bar / Header Box */}
        <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
          <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
            <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
            Canvas Interactive View
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl cursor-pointer transition-all border border-primary-500 text-xs font-black uppercase tracking-widest shadow-lg">
              <Upload size={14} />
              <span>Upload</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {image && (
              <button
                onClick={handleRemoveImage}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl transition-all text-xs font-black uppercase tracking-widest shadow-lg"
              >
                <Trash2 size={14} />
                <span>Hapus</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area with Zoom & Pan */}
        <div 
          className={`h-[70vh] relative flex items-center justify-center transition-colors duration-300 ${isDragging ? 'bg-primary-50' : 'bg-slate-50/50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <TransformWrapper initialScale={1} centerOnInit={true} minScale={0.5} maxScale={3}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Floating Controls */}
                  <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100">
                    <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                    <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                    <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><RefreshCw size={24}/></button>
                  </div>

                  {/* Canvas Display */}
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <div className="flex justify-center items-center w-[1200px] p-12 cursor-grab active:cursor-grabbing">
                      <img
                        src={image}
                        alt="Business Model Canvas"
                        className="max-w-full h-auto drop-shadow-2xl bg-white p-8 rounded-2xl border border-primary-50"
                      />
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center text-center p-12 animate-in fade-in zoom-in duration-300">
              <div className="w-24 h-24 bg-primary-50 rounded-3xl flex items-center justify-center mb-6 text-primary-200 border-2 border-primary-100 border-dashed">
                <Grid3x3 size={48} />
              </div>
              <h3 className="text-2xl font-black text-primary-900 uppercase mb-2">Belum Ada Canvas</h3>
              <p className="text-primary-800/60 font-medium mb-8 max-w-xs leading-relaxed">Drag & drop atau upload diagram Business Model Canvas organisasi Anda.</p>
              <label className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-primary-200 active:scale-95">
                Upload Sekarang
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 3. Info Guide - CENTERED */}
      
      <div className="mt-12 max-w-5xl w-full grid md:grid-cols-2 gap-6">
        <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100 flex items-start gap-4 shadow-sm">
          <div className="bg-white p-3 rounded-2xl text-primary-600 shadow-sm flex-shrink-0">
            <Info size={24} />
          </div>
          <div>
            <p className="text-primary-900 font-black uppercase text-xs tracking-widest mb-1">9 Building Blocks:</p>
            <p className="text-primary-800/80 text-sm font-medium leading-relaxed">
              Customer Segments, Value Propositions, Channels, Customer Relationships, 
              Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure.
            </p>
          </div>
        </div>

        <div className="bg-secondary-50 rounded-3xl p-6 border border-secondary-200 flex items-start gap-4 shadow-sm">
          <div className="bg-white p-3 rounded-2xl text-secondary-600 shadow-sm flex-shrink-0">
            <Maximize2 size={24} />
          </div>
          <div>
            <p className="text-primary-900 font-black uppercase text-xs tracking-widest mb-1">Tips Resolusi:</p>
            <p className="text-primary-800/80 text-sm font-medium leading-relaxed italic">
              Gunakan format SVG untuk ketajaman maksimal saat dilakukan zoom pada blok rincian biaya atau aliran pendapatan.
            </p>
          </div>
        </div>
      </div>

      {/* Helper Hint */}
      <div className="mt-8 text-center text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Use Mouse Scroll to Zoom & Drag to Pan the Canvas
      </div>
    </div>
  );
};

export default BusinessModelCanvas;