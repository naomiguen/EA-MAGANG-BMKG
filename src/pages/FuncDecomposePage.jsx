import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from "../lib/supabaseClient";

// --- 2. KOMPONEN NODE (Style Kotak Fungsional) ---
const FunctionNode = ({ node, onNodeClick }) => {
  const getNodeStyle = (type) => {
    switch (type) {
      case 'Level 0': return 'bg-indigo-700 text-white border-indigo-900 shadow-xl'; 
      case 'Level 1': return 'bg-white border-l-4 border-indigo-600 text-gray-800'; 
      case 'Level 2': return 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* KARTU FUNGSI */}
      <div 
        className={`
          relative z-10 cursor-pointer 
          w-64 p-4 rounded-lg shadow-sm hover:shadow-lg 
          transition-all duration-300 transform hover:-translate-y-1
          flex flex-col items-center text-center
          ${getNodeStyle(node.type)}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node);
        }}
      >
        <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${node.type === 'Level 0' ? 'text-indigo-200' : 'text-gray-400'}`}>
          {node.type}
        </span>
        <h3 className={`text-sm font-bold leading-tight ${node.type === 'Level 0' ? 'text-white' : 'text-gray-900'}`}>
          {node.title}
        </h3>
      </div>

      {/* GARIS PENGHUBUNG (CONNECTORS) */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center">
          {/* Garis Vertikal Turun dari Parent */}
          <div className="w-px h-8 bg-indigo-300"></div>

          {/* Container Anak-anak */}
          <div className="flex justify-center relative pt-4">
            
            {/* Garis Horizontal Top Bar */}
            {node.children.length > 1 && (
              <div 
                className="absolute top-0 h-px bg-indigo-300"
                style={{
                  left: '50%', 
                  right: '50%',
                  width: 'auto',
                }}
              ></div>
            )}

            {node.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const isOnlyOne = node.children.length === 1;

              return (
                <div key={child.id} className="flex flex-col items-center px-4 relative">
                  
                  {/* LOGIKA GARIS KIRI/KANAN */}
                  {!isOnlyOne && (
                    <>
                      <div className={`absolute top-0 left-0 w-1/2 h-px bg-indigo-300 ${isFirst ? 'hidden' : 'block'}`}></div>
                      <div className={`absolute top-0 right-0 w-1/2 h-px bg-indigo-300 ${isLast ? 'hidden' : 'block'}`}></div>
                    </>
                  )}

                  {/* Garis Vertikal Pendek Turun ke Anak */}
                  <div className="w-px h-4 bg-indigo-300 absolute top-0"></div>
                  
                  {/* Render Anak Secara Rekursif */}
                  <div className="mt-4">
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
        setError(null);

        // Fetch semua functions yang aktif
        const { data, error } = await supabase
          .from('functions')
          .select('*')
          .eq('is_active', true)
          .order('level', { ascending: true })
          .order('sort_order', { ascending: true });

        if (error) throw error;

        // Build hierarchical structure
        const hierarchy = buildHierarchy(data);
        setFunctionData(hierarchy);
      } catch (err) {
        console.error('Error fetching function data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFunctionData();
  }, []);

  // Helper function untuk build hierarki dari flat array
  const buildHierarchy = (flatData) => {
    const map = {};
    const roots = [];

    // Create a map of all nodes
    flatData.forEach(item => {
      map[item.id] = {
        id: item.id,
        title: item.title,
        type: item.type,
        desc: item.description,
        children: []
      };
    });

    // Build the hierarchy
    flatData.forEach(item => {
      if (item.parent_id && map[item.parent_id]) {
        map[item.parent_id].children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    // Return the root node (should be only one)
    return roots[0] || null;
  };

  const closeModal = () => setSelectedNode(null);

  // Modal Popup
  const ModalPopup = () => {
    if (!selectedNode) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
        onClick={closeModal}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Modal */}
          <div className="bg-indigo-700 p-6 text-white flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 rounded bg-white/20 text-xs font-semibold mb-2 tracking-wider uppercase">
                {selectedNode.type}
              </span>
              <h2 className="text-xl font-bold leading-tight">{selectedNode.title}</h2>
            </div>
            <button 
              onClick={closeModal} 
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Modal */}
          <div className="p-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Deskripsi Fungsi</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              {selectedNode.desc}
            </p>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mb-4"></div>
          <p className="text-slate-600 text-lg">Memuat functional decomposition...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!functionData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <p className="text-slate-400 text-lg">Tidak ada data functional decomposition tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      
      {/* Background Decor (Dihapus/Polos) */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>

      {/* Header Halaman */}
      <div className="relative z-10 pt-12 pb-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3 tracking-tight">
          Functional Decomposition Diagram
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Pemetaan fungsi bisnis berdasarkan SK Uraian Tugas Stasiun Meteorologi.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden z-10 pb-20 px-4 custom-scrollbar">
        <div className="min-w-max mx-auto pt-4 pb-12 pr-8 pl-8">
           <FunctionNode node={functionData} onNodeClick={setSelectedNode} />
        </div>
      </div>

      <ModalPopup />

      {/* Style Scrollbar Abu-abu Jelas */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 14px;
          width: 14px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #e2e8f0;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #64748b;
          border-radius: 8px;
          border: 3px solid #e2e8f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FunctionalDecompositionPage;