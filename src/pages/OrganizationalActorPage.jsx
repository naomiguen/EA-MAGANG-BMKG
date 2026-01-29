import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabaseClient';
import { Info, X, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 2. KOMPONEN CARD POHON (TREE NODE) ---
const TreeNode = ({ node, onNodeClick }) => {
  // Styling berdasarkan tipe jabatan (Menyesuaikan Palette BMKG)
  const getStyle = (type) => {
    switch (type) {
      case 'Pimpinan': return 'border-primary-600 bg-primary-50 text-primary-900';
      case 'Manajemen': return 'border-emerald-500 bg-emerald-50 text-emerald-900';
      case 'Teknis': return 'border-secondary-500 bg-orange-50 text-orange-900';
      case 'Fungsional': return 'border-indigo-400 bg-white text-indigo-900';
      default: return 'border-slate-300 bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* KARTU JABATAN */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className={`
          relative z-10 cursor-pointer 
          w-56 p-5 rounded-2xl border-l-8 shadow-md hover:shadow-xl 
          transition-all duration-300 
          bg-white flex flex-col items-start text-left group
          ${getStyle(node.type)}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node);
        }}
      >
        <div className="flex justify-between w-full items-start mb-2">
          <span className="text-[10px] font-black tracking-widest opacity-60 uppercase">
            {node.type}
          </span>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
        </div>
        <h3 className="text-sm font-black leading-tight tracking-tight uppercase">
          {node.title}
        </h3>
      </motion.div>

      {/* GARIS PENGHUBUNG */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {/* Garis Vertikal Turun dari Parent */}
          <div className="w-0.5 h-10 bg-slate-300"></div>

          {/* Container Anak-anak */}
          <div className="flex justify-center relative">
            {node.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const isOnlyOne = node.children.length === 1;

              return (
                <div key={child.id} className="flex flex-col items-center px-4 relative">
                  
                  {/* Garis Horizontal Penghubung Antar Anak */}
                  {!isOnlyOne && (
                    <>
                      <div className={`absolute top-0 left-0 w-1/2 h-0.5 bg-slate-300 ${isFirst ? 'hidden' : 'block'}`}></div>
                      <div className={`absolute top-0 right-0 w-1/2 h-0.5 bg-slate-300 ${isLast ? 'hidden' : 'block'}`}></div>
                    </>
                  )}

                  {/* Garis Vertikal Turun ke Anak */}
                  <div className="w-0.5 h-6 bg-slate-300"></div>
                  
                  {/* Render Anak Secara Rekursif */}
                  <div className="pt-2">
                    <TreeNode node={child} onNodeClick={onNodeClick} />
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
const OrgStructurePage = () => {
  const [orgData, setOrgData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: positions, error: fetchError } = await supabase
        .from('org_positions')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      const buildTree = (items, parentId = null) => {
        return items
          .filter(item => item.parent_id === parentId)
          .map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            desc: item.description,
            children: buildTree(items, item.id)
          }));
      };

      const tree = buildTree(positions, null);
      if (tree.length > 0) setOrgData(tree[0]);
      else throw new Error('Data struktur organisasi tidak ditemukan');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedNode(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-medium animate-pulse text-center uppercase tracking-widest">Memuat Struktur Organisasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Gagal Memuat Data</h3>
        <p className="text-slate-500 mb-6 max-w-md">{error}</p>
        <button onClick={fetchOrgData} className="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
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

      {/* Header Halaman - CENTERED */}
      <div className="relative z-10 pt-16 pb-12 px-4 text-center border-b-4 border-secondary-500 mb-8 mx-auto w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 tracking-tighter uppercase leading-tight">
          Organizational Actor Catalog
        </h1>
        <p className="text-primary-800 text-lg max-w-2xl font-medium flex items-center gap-2">
          <Info size={20} className="text-secondary-600" />
          Struktur peran dan hierarki jabatan dalam operasional Stasiun Meteorologi Balikpapan.
        </p>
      </div>

      {/* DIAGRAM AREA */}
      <div className="flex-1 w-full overflow-x-auto z-10 pb-32 px-10 custom-scrollbar">
        <div className="min-w-max mx-auto pt-10">
           {orgData && <TreeNode node={orgData} onNodeClick={setSelectedNode} />}
        </div>
      </div>

      {/* Modal Popup (Portal) */}
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
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-3 tracking-widest uppercase">
                    {selectedNode.type}
                  </span>
                  <h2 className="text-2xl font-black leading-tight tracking-tight uppercase">{selectedNode.title}</h2>
                </div>
                <button onClick={closeModal} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"><X size={20}/></button>
              </div>

              <div className="p-8 text-center md:text-left">
                <div className="mb-8">
                  <h4 className="text-[11px] font-black text-primary-400 uppercase tracking-[0.2em] mb-4">Tugas & Tanggung Jawab</h4>
                  <p className="text-primary-900 text-lg leading-relaxed font-medium italic">
                    "{selectedNode.desc || "Deskripsi jabatan sedang dalam tahap validasi."}"
                  </p>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 flex items-start gap-4 shadow-sm">
                  <div className="mt-1 text-primary-600 bg-white p-2 rounded-lg shadow-sm">
                    <Info size={20} />
                  </div>
                  <p className="text-sm text-primary-800 font-bold leading-snug">
                    Aktor ini memiliki wewenang operasional yang terintegrasi dengan matriks kapabilitas bisnis stasiun.
                  </p>
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

export default OrgStructurePage;