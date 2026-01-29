import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Info, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

// --- 2. KOMPONEN NODE (Style Kotak Fungsional) ---
const FunctionNode = ({ node, onNodeClick }) => {
  const getNodeStyle = (type) => {
    switch (type) {
      case 'Level 0': return 'bg-primary-700 text-white border-primary-900 shadow-2xl scale-110 mb-4'; 
      case 'Level 1': return 'bg-white border-l-8 border-secondary-500 text-primary-900 shadow-md'; 
      case 'Level 2': return 'bg-primary-50 border border-primary-100 text-primary-800 hover:bg-secondary-50 hover:border-secondary-300';
      default: return 'bg-white border-slate-200';
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* KARTU FUNGSI */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className={`
          relative z-10 cursor-pointer 
          w-64 p-5 rounded-2xl shadow-sm transition-all duration-300
          flex flex-col items-center text-center group
          ${getNodeStyle(node.type)}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node);
        }}
      >
        <span className={`text-[10px] font-black tracking-[0.2em] uppercase mb-2 ${node.type === 'Level 0' ? 'text-secondary-400' : 'text-primary-400'}`}>
          {node.type}
        </span>
        <h3 className={`text-sm font-black leading-tight uppercase tracking-tight ${node.type === 'Level 0' ? 'text-white' : 'text-primary-900'}`}>
          {node.title}
        </h3>
        {node.children && node.children.length > 0 && (
          <ChevronDown size={14} className={`mt-2 opacity-40 group-hover:opacity-100 transition-opacity ${node.type === 'Level 0' ? 'text-white' : 'text-primary-500'}`} />
        )}
      </motion.div>

      {/* GARIS PENGHUBUNG (CONNECTORS) */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {/* Garis Vertikal Turun dari Parent */}
          <div className="w-0.5 h-10 bg-primary-200"></div>

          {/* Container Anak-anak */}
          <div className="flex justify-center relative">
            {node.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const isOnlyOne = node.children.length === 1;

              return (
                <div key={child.id} className="flex flex-col items-center px-4 relative">
                  
                  {/* LOGIKA GARIS KIRI/KANAN */}
                  {!isOnlyOne && (
                    <>
                      <div className={`absolute top-0 left-0 w-1/2 h-0.5 bg-primary-200 ${isFirst ? 'hidden' : 'block'}`}></div>
                      <div className={`absolute top-0 right-0 w-1/2 h-0.5 bg-primary-200 ${isLast ? 'hidden' : 'block'}`}></div>
                    </>
                  )}

                  {/* Garis Vertikal Pendek Turun ke Anak */}
                  <div className="w-0.5 h-6 bg-primary-200"></div>
                  
                  {/* Render Anak Secara Rekursif */}
                  <div className="pt-2">
                    <FunctionNode node={child} onNodeClick={onNodeClick} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// --- 3. HALAMAN UTAMA ---
const FunctionalDecompositionPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [functionData, setFunctionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunctionData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('functions')
          .select('*')
          .eq('is_active', true)
          .order('level', { ascending: true })
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setFunctionData(buildHierarchy(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFunctionData();
  }, []);

  const buildHierarchy = (flatData) => {
    const map = {};
    const roots = [];
    flatData.forEach(item => {
      map[item.id] = { ...item, children: [] };
    });
    flatData.forEach(item => {
      if (item.parent_id && map[item.parent_id]) {
        map[item.parent_id].children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });
    return roots[0] || null;
  };

  const closeModal = () => setSelectedNode(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black animate-pulse uppercase tracking-[0.2em]">Menganalisis Dekomposisi Fungsi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-2xl font-black text-primary-900 mb-2 uppercase">Gagal Memuat Diagram</h3>
        <p className="text-slate-500 mb-6 max-w-md font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 uppercase">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#0064b5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Header Halaman - SEMUA CENTERED */}
      <div className="relative z-10 pt-16 pb-12 px-4 text-center border-b-4 border-secondary-500 mb-12 mx-auto w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 tracking-tighter uppercase leading-tight">
          Functional Decomposition Diagram
        </h1>
        <p className="text-primary-800 text-lg max-w-2xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Pemetaan hierarki fungsi bisnis sesuai SK Uraian Tugas Stasiun Meteorologi.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 w-full overflow-x-auto z-10 pb-32 px-10 custom-scrollbar">
        <div className="min-w-max mx-auto pt-10">
           {functionData && <FunctionNode node={functionData} onNodeClick={setSelectedNode} />}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-950/40 backdrop-blur-md p-4" onClick={closeModal}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-primary-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-primary-700 p-8 text-white flex justify-between items-start border-b-4 border-secondary-500">
                <div className="flex flex-col items-start">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-3 tracking-widest uppercase">
                    {selectedNode.type}
                  </span>
                  <h2 className="text-2xl font-black leading-tight tracking-tight uppercase text-left">{selectedNode.title}</h2>
                </div>
                <button onClick={closeModal} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all text-white"><X size={24}/></button>
              </div>

              <div className="p-10 text-center flex flex-col items-center">
                <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-[0.2em] mb-4">Deskripsi Fungsi Bisnis</h4>
                <p className="text-primary-900 text-xl leading-relaxed font-bold italic max-w-sm">
                  "{selectedNode.desc || "Deskripsi fungsional belum tersedia untuk modul ini."}"
                </p>
                <div className="mt-8 bg-primary-50 p-4 rounded-2xl border border-primary-100 flex items-center gap-3">
                   <Info size={18} className="text-primary-600" />
                   <p className="text-xs text-primary-700 font-black uppercase tracking-wider">Business Capability Model v1.0</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #0064b5; 
          border-radius: 10px; 
          border: 3px solid #f1f5f9; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00467f; }
      `}</style>
    </div>
  );
};

export default FunctionalDecompositionPage;