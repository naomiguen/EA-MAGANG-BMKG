import React from "react";
import { useNavigate } from "react-router-dom"; 
import { appData } from "../services/data";
import { Info, ArrowRight, Monitor } from "lucide-react";
import { motion } from "framer-motion";

const UseCaseGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Application Use Case Gallery
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Katalog fungsionalitas sistem aplikasi operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* 2. Grid Container - SET TO 3 COLUMNS */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {appData.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id} 
            className="group bg-white rounded-[2.5rem] shadow-xl border border-primary-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:border-primary-300 transition-all flex flex-col"
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            {/* Logo Container */}
            <div className="h-64 w-full bg-slate-50 flex items-center justify-center p-12 border-b border-primary-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100/30 rounded-bl-full group-hover:bg-secondary-500/20 transition-colors" />
               
               <img 
                src={item.logoUrl} 
                alt={item.title} 
                className="w-full h-full object-contain relative z-10 filter group-hover:scale-110 transition-transform duration-500" 
                onError={(e) => {e.target.src = "https://via.placeholder.com/300x300.png?text=Logo+App"}} 
              />
            </div>

            {/* Card Content */}
            <div className="p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary-50 text-primary-600 rounded-lg">
                  <Monitor size={16} />
                </div>
                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">System Architecture</span>
              </div>
              
              <h3 className="text-2xl font-black text-primary-900 uppercase tracking-tight mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-primary-800/60 text-sm font-medium leading-relaxed mb-8 italic">
                "{item.description}"
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-primary-50">
                <span className="text-xs font-black uppercase tracking-widest text-primary-500">
                  Lihat Diagram Detail
                </span>
                <div className="p-3 bg-primary-700 text-white rounded-2xl group-hover:bg-secondary-500 group-hover:text-primary-950 transition-all shadow-lg shadow-primary-100">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Footer Decor - CENTERED */}
      
      <div className="mt-20 text-center">
         <p className="text-primary-300 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
           Pilih aplikasi untuk membedah interaksi aktor dan fungsi sistem
         </p>
      </div>

    </div>
  );
};

export default UseCaseGallery;