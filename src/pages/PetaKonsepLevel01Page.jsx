import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import petaKonsepSvg from '../assets/business-process-0-1.svg?raw';

const PetaKonsepPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-8">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-center flex-1"> 
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Peta Konsep Proses Bisnis</h1>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1">Visualisasi Alur Kerja BMKG Stasiun Balikpapan</p>
        </div>
        <div className="w-10 flex-shrink-0"></div>
      </div>

      {/* CONTAINER DIAGRAM */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative flex flex-col">
        
        {/* AREA RENDER SVG */}
        <div className="p-8 overflow-auto bg-slate-50/30 flex justify-center items-center">
          <div 
            className="w-full max-w-6xl mx-auto flex justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:drop-shadow-sm"
            dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default PetaKonsepPage;