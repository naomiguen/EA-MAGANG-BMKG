import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Maximize2, Activity } from 'lucide-react';
import petaKonsepSvg from '../assets/BusinessProcessLevel0.svg?raw';

const PetaKonsepPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-12 relative">
        {/* Back Button - Floating Left */}
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-primary-50 text-primary-700 rounded-2xl hover:bg-primary-100 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest shadow-sm border border-primary-100"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        </div>

        {/* Title Group */}
        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full relative">
          <div className="flex items-center justify-center gap-3 mb-4 text-primary-700">
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight text-center">
            Peta Konsep Proses Bisnis
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic text-center uppercase tracking-widest opacity-70">
            Visualisasi Alur Kerja Strategis BMKG Stasiun Balikpapan
          </p>
        </div>
      </div>

      {/* 2. Diagram Canvas Container */}
      <div className="max-w-7xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative flex flex-col min-h-[700px] group">
        
        {/* Toolbar Header */}
        <div className="bg-primary-700 px-8 py-5 flex justify-between items-center text-white border-b-4 border-secondary-500 relative z-10">
          <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-secondary-100">
            <div className="w-2.5 h-2.5 bg-secondary-500 rounded-full animate-pulse"></div>
            Interactive Process View
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-800 rounded-xl border border-primary-600">
              <Info size={14} className="text-secondary-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">Level 0: Global Architecture</span>
            </div>
          </div>
        </div>

        {/* Area Render SVG dengan Zoom Effect */}
        <div className="flex-1 p-8 md:p-16 overflow-auto bg-slate-50/50 flex justify-center items-center relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0064b5 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
          
          <div 
            className="w-full max-w-6xl mx-auto flex justify-center 
                       [&>svg]:w-full [&>svg]:h-auto [&>svg]:drop-shadow-2xl 
                       transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in"
            dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
          />
        </div>

        {/* Footer Meta */}
        <div className="bg-primary-50 p-4 text-center border-t border-primary-100">
          <p className="text-primary-300 font-black uppercase tracking-[0.4em] text-[9px]">
            Business Architecture Repository v2026 • BMKG Balikpapan
          </p>
        </div>
      </div>

      {/* 3. Legend/Notes - CENTERED */}
      <div className="mt-12 max-w-4xl w-full bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-inner flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-black text-primary-900 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
            <Info size={16} className="text-secondary-500" /> Keterangan Diagram
          </h4>
          <p className="text-primary-800/70 text-sm font-bold leading-relaxed italic">
            Diagram ini merepresentasikan Value Chain (Rantai Nilai) utama stasiun yang mencakup layanan Meteorologi, Klimatologi, dan Geofisika sesuai standar SPBE.
          </p>
        </div>
        <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
        <div className="flex items-center gap-4">
          <div className="text-center">
             <p className="text-[10px] font-black text-primary-300 uppercase tracking-widest mb-1">Standard Compliance</p>
             <p className="text-primary-900 font-black text-lg">ISO 9001:2015</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PetaKonsepPage;