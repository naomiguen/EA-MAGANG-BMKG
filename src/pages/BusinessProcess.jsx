import React from "react";
import { Info, ZoomIn, ZoomOut, RefreshCw, Maximize2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BusinessProcess from "../assets/business-process-0-1.svg";

const BusinessProcessPage = () => {
  
    return (
      <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">

        {/* 1. Header Halaman - SEMUA CENTERED & CLEAN */}
        <div className="max-w-5xl w-full text-center mb-12 border-b-4 border-secondary-500 pb-10">
          <h1 className="text-3xl md:text-6xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            Business Process
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold uppercase tracking-wide">
            Alur proses bisnis utama dan pendukung operasional Stasiun Meteorologi
          </p>
        </div>
  
        {/* 2. Area Diagram dengan Fitur Zoom */}
        <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
          
          <TransformWrapper
            initialScale={1}
            centerOnInit={true}
            minScale={0.5}
            maxScale={3}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Floating Controls - Tombol Zoom */}
                <div className="absolute top-20 right-6 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary-100">
                  <button onClick={() => zoomIn()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors">
                    <ZoomIn size={24}/>
                  </button>
                  <button onClick={() => zoomOut()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors">
                    <ZoomOut size={24}/>
                  </button>
                  <button onClick={() => resetTransform()} className="p-2 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors">
                    <RefreshCw size={24}/>
                  </button>
                </div>

                {/* Header Box Diagram */}
                <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
                    <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
                    Diagram View
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-primary-800 px-4 py-2 rounded-xl border border-primary-600">
                    <Maximize2 size={12} className="text-secondary-500" />
                    Interactive Zoom
                  </div>
                </div>
        
                {/* Kontainer Transform (Area Zoom) */}
                <div className="h-[70vh] bg-slate-50/50 cursor-grab active:cursor-grabbing relative">
                  {/* Background Grid Decor */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
                       style={{ backgroundImage: 'radial-gradient(#0064b5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                  </div>

                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <div className="flex justify-center items-center w-[1200px] p-12">
                      <img 
                        src={BusinessProcess} 
                        alt="Business Process Diagram" 
                        className="max-w-full h-auto drop-shadow-2xl bg-white p-8 rounded-2xl border border-primary-50" 
                      />
                    </div>
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* 3. Helper Hint Minimalis */}
        <div className="mt-8 text-center">
           <p className="text-primary-400 font-bold uppercase tracking-[0.2em] text-[10px]">
             Use Mouse Scroll to Zoom & Drag to Pan
           </p>
        </div>
  
      </div>
    );
};

export default BusinessProcessPage;