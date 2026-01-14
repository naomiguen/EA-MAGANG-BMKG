import React from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";

import BusinessProcess from "../assets/business-process-0-1.svg";

const BusinessProcessPage = () => {

    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">

  
        {/* 2. Header Halaman */}
        <div className="max-w-7xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-700 rounded-full mb-4">
            <Lightbulb size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Business Process
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
              src={BusinessProcess} 
              alt="Business Process" 
              className="max-w-full h-auto drop-shadow-sm"
              style={{ minWidth: "600px" }} // Agar tidak terlalu gepeng di HP
            />
          </div>
        </div>
  
      </div>
    );
};

export default BusinessProcessPage;