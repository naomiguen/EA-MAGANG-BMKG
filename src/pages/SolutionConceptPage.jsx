import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

import SolutionDiagram from "../assets/SolutionConcept.drawio.svg"; 

const SolutionConceptPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      
      {/* 1. Tombol Kembali */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Dashboard
        </button>
      </div>

      {/* 2. Header Halaman */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-700 rounded-full mb-4">
          <Lightbulb size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Solution Concept Diagram
        </h1>
      </div>

      {/* 3. Area Diagram */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Box Diagram */}
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <span className="font-semibold text-slate-700">Diagram View</span>
          <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border">SVG Format</span>
        </div>

        {/* Kontainer SVG */}
        <div className="p-4 md:p-10 overflow-x-auto flex justify-center bg-white">
          {/* Cara menampilkan SVG sebagai gambar agar tidak error syntax React.
             Pastikan file SolutionConcept.svg ada di folder assets.
          */}
          <img 
            src={SolutionDiagram} 
            alt="Solution Concept Diagram" 
            className="max-w-full h-auto drop-shadow-sm"
            style={{ minWidth: "600px" }} // Agar tidak terlalu gepeng di HP
          />
        </div>

        {/* Keterangan Bawah */}
        <div className="bg-blue-50 px-8 py-6 border-t border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">Penjelasan Alur:</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm md:text-base">
            <li><strong>User Layer:</strong> Masyarakat dan Petugas BMKG mengakses layanan.</li>
            <li><strong>Service Layer:</strong> Layanan Informasi BMKG & Portal Informasi sebagai gerbang akses.</li>
            <li><strong>Data Layer:</strong> Sistem Data Terintegrasi (Cuaca, Iklim, Gempa) yang menjadi pusat penyimpanan.</li>
            <li><strong>Infrastructure:</strong> Infrastruktur TI yang menopang seluruh operasional sistem.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SolutionConceptPage;