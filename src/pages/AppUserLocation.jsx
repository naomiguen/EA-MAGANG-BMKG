import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Upload, ZoomIn, ZoomOut, RefreshCw, Info, MapPin } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import APPUserLocDefault from "../assets/Application-User-and-Location.svg";

const STORAGE_KEY = "appuserloc_image";

const AppUserLocationPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    if (savedImage) {
      setImage(savedImage);
    } else {
      setImage(APPUserLocDefault);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-12 relative">
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-primary-50 text-primary-700 rounded-2xl hover:bg-primary-100 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest shadow-sm"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        </div>

        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full">
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight text-center">
            App - User and Location
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic text-center">
            <MapPin size={20} className="text-secondary-600 flex-shrink-0" />
            Pemetaan sebaran pengguna dan lokasi akses sistem aplikasi operasional.
          </p>
        </div>
      </div>

      {/* 2. Interactive Diagram Area */}
      
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
        
        {/* Action Bar / Header Box */}
        <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
          <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
            <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
            Interactive Location Map
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl cursor-pointer transition-all border border-primary-500 text-[10px] font-black uppercase tracking-widest shadow-lg">
              <Upload size={14} />
              <span>Update Map</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {image && (
              <button
                onClick={handleRemoveImage}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shadow-lg"
              >
                <Trash2 size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Zoom & Pan Content Area */}
        <div className="h-[70vh] bg-slate-50/50 relative flex items-center justify-center">
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

                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <div className="flex justify-center items-center w-[1200px] p-12 cursor-grab active:cursor-grabbing">
                      <img
                        src={image}
                        alt="Application User Location Diagram"
                        className="max-w-full h-auto drop-shadow-2xl bg-white p-8 rounded-2xl border border-primary-50"
                      />
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          ) : (
            <div className="flex flex-col items-center text-center p-12">
              <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mb-6 text-primary-200 border-2 border-primary-100 border-dashed">
                <MapPin size={40} />
              </div>
              <h3 className="text-xl font-black text-primary-900 uppercase mb-2">Peta Belum Tersedia</h3>
              <p className="text-primary-800/60 font-medium mb-8 max-w-xs leading-relaxed">Silakan upload diagram User & Location untuk memetakan arsitektur akses.</p>
              <label className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black uppercase text-xs tracking-widest cursor-pointer shadow-lg transition-all active:scale-95">
                Upload Sekarang
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          )}
        </div>
        
        {/* Helper Footer */}
        <div className="bg-primary-50 p-4 text-center border-t border-primary-100">
          <p className="text-primary-400 font-black uppercase tracking-[0.4em] text-[9px]">
            Scroll to Zoom • Drag to Pan • Enterprise Geography
          </p>
        </div>
      </div>

      {/* 3. Info Legend - CENTERED */}
      <div className="mt-12 max-w-4xl w-full bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-inner flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-white rounded-xl shadow-sm text-primary-600 border border-primary-50">
                <Info size={20} />
             </div>
             <h4 className="font-black text-primary-900 uppercase tracking-widest text-xs">Arsitektur Lokasi</h4>
          </div>
          <p className="text-primary-800/70 text-sm font-bold leading-relaxed italic">
            Diagram ini memvisualisasikan bagaimana unit kerja mengakses aplikasi melalui infrastruktur jaringan di berbagai titik lokasi operasional.
          </p>
        </div>
        <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
        <div className="flex-1 text-center md:text-right">
           <p className="text-[10px] font-black text-primary-300 uppercase tracking-widest mb-1">Last Repository Update</p>
           <p className="text-primary-900 font-black text-lg">JANUARI 2026</p>
        </div>
      </div>

    </div>
  );
};

export default AppUserLocationPage;