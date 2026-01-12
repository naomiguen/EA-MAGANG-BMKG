import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// --- 1. DATA STRUKTUR ORGANISASI (MURNI JABATAN / ROLE) ---
const orgData = {
  id: 'root',
  title: 'KEPALA STASIUN',
  type: 'Pimpinan',
  desc: 'Mengkoordinir pelaksanaan tugas operasional, evaluasi pengamatan, dan penanggung jawab anggaran. Bertanggung jawab langsung kepada Kepala Balai Besar MKG Wilayah III.',
  children: [
    {
      id: 'tu',
      title: 'KASUBAG TATA USAHA',
      type: 'Manajemen',
      desc: 'Menyusun anggaran, mengelola kepegawaian, persuratan, dan kerumahtanggaan kantor. Bertanggung jawab atas administrasi umum stasiun.',
      children: [
        { 
          id: 'tu1', 
          title: 'BENDAHARA', 
          type: 'Staff', 
          desc: 'Mengurus gaji, belanja pegawai, laporan keuangan (SAKTI/SAIBA), dan PNBP.' 
        },
        { 
          id: 'tu2', 
          title: 'ARSIPARIS & UMUM', 
          type: 'Staff', 
          desc: 'Mengelola arsip surat masuk/keluar, administrasi umum, dan inventaris barang (BMN).' 
        },
        { 
          id: 'tu3', 
          title: 'PPNPN (SUPPORT)', 
          type: 'Support', 
          desc: 'Menjaga keamanan lingkungan kantor, kebersihan taman alat, dan operasional kendaraan dinas.' 
        }
      ]
    },
    {
      id: 'obs',
      title: 'KOORDINATOR OBSERVASI',
      type: 'Teknis',
      desc: 'Mengawasi kelancaran operasional pengamatan meteorologi permukaan/udara atas dan pemeliharaan seluruh peralatan teknis.',
      children: [
        { 
          id: 'obs1', 
          title: 'OBSERVER (PENGAMAT)', 
          type: 'Fungsional', 
          desc: 'Melakukan pengamatan cuaca 24 jam (synop/metar), mengisi logbook, dan mengirim berita cuaca via CMSS/AFTN.' 
        },
        { 
          id: 'obs2', 
          title: 'TEKNISI PERALATAN', 
          type: 'Fungsional', 
          desc: 'Memelihara radar cuaca, AWOS, taman alat, server, dan melakukan perbaikan perangkat IT/jaringan.' 
        }
      ]
    },
    {
      id: 'datin',
      title: 'KOORDINATOR DATA & INFO',
      type: 'Teknis',
      desc: 'Mengkoordinir analisis data, pembuatan prakiraan cuaca, peringatan dini cuaca ekstrem, dan pelayanan informasi publik.',
      children: [
        { 
          id: 'datin1', 
          title: 'FORECASTER (PRAKIRAWAN)', 
          type: 'Fungsional', 
          desc: 'Membuat TAF/Trend Forecast, Aerodrome Warning, analisis citra satelit/radar, dan briefing pilot.' 
        }
      ]
    }
  ]
};

// --- 2. KOMPONEN CARD POHON (TREE NODE) ---
const TreeNode = ({ node, onNodeClick }) => {
  // Warna Border Berdasarkan Tipe Jabatan
  const getBorderColor = (type) => {
    switch (type) {
      case 'Pimpinan': return 'border-blue-600 bg-blue-50';
      case 'Manajemen': return 'border-emerald-500 bg-emerald-50';
      case 'Teknis': return 'border-orange-500 bg-orange-50';
      case 'Fungsional': return 'border-indigo-400 bg-white';
      case 'Staff': return 'border-gray-400 bg-gray-50';
      case 'Support': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* KARTU JABATAN (Tanpa Nama) */}
      <div 
        className={`
          relative z-10 cursor-pointer 
          w-52 p-4 rounded-xl border-l-4 shadow-sm hover:shadow-lg 
          transition-all duration-300 transform hover:-translate-y-1
          bg-white flex flex-col items-start text-left
          ${getBorderColor(node.type)}
        `}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(node);
        }}
      >
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
          {node.type}
        </span>
        <h3 className="text-sm font-extrabold text-gray-800 leading-tight">
          {node.title}
        </h3>
      </div>

      {/* GARIS PENGHUBUNG (CONNECTORS) */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center">
          {/* Garis Vertikal Turun dari Parent */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Container Anak-anak */}
          <div className="flex justify-center relative pt-4">
            
            {/* Garis Horizontal Top Bar */}
            {node.children.length > 1 && (
              <div 
                className="absolute top-0 h-px bg-gray-300"
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
                  
                  {/* LOGIKA GARIS HORIZONTAL KIRI/KANAN */}
                  {!isOnlyOne && (
                    <>
                      <div className={`absolute top-0 left-0 w-1/2 h-px bg-gray-300 ${isFirst ? 'hidden' : 'block'}`}></div>
                      <div className={`absolute top-0 right-0 w-1/2 h-px bg-gray-300 ${isLast ? 'hidden' : 'block'}`}></div>
                    </>
                  )}

                  {/* Garis Vertikal Pendek Turun ke Anak */}
                  <div className="w-px h-4 bg-gray-300 absolute top-0"></div>
                  
                  {/* Render Anak Secara Rekursif */}
                  <div className="mt-4">
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
  const [selectedNode, setSelectedNode] = useState(null);

  const closeModal = () => setSelectedNode(null);

  // Modal Popup Component
  const ModalPopup = () => {
    if (!selectedNode) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
        onClick={closeModal}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Modal */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white flex justify-between items-start">
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
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tugas & Tanggung Jawab</h4>
              <p className="text-gray-700 text-base leading-relaxed">
                {selectedNode.desc || "Tidak ada deskripsi tersedia untuk jabatan ini."}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-blue-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-blue-800">
                  Aktor ini menjalankan fungsi bisnis yang terhubung langsung dengan Value Chain Diagram.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Modal */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
            <button 
              onClick={closeModal} 
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Header Halaman */}
      <div className="relative z-10 pt-12 pb-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Organizational Actor Catalog
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Daftar peran dan struktur jabatan dalam operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* --- SCROLLABLE CONTAINER DIAGRAM --- */}
      {/* overflow-x-auto: WAJIB ADA untuk scroll horizontal */}
      {/* w-full: Agar container mengambil lebar penuh layar */}
      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden z-10 pb-20 px-4 custom-scrollbar">
        
        {/* min-w-max: WAJIB ADA agar diagram tidak dipaksa mengecil, tapi memicu scroll */}
        <div className="min-w-max mx-auto pt-4 pb-12 pr-8 pl-8">
           <TreeNode node={orgData} onNodeClick={setSelectedNode} />
        </div>
        
      </div>

      {/* Modal Popup */}
      <ModalPopup />

      {/* Style Scrollbar Custom */}
{/* Style Scrollbar Custom - DIBUAT LEBIH JELAS & TEBAL */}
      <style>{`
        /* 1. Ukuran Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          height: 14px; /* Lebih tinggi agar mudah di-klik */
          width: 14px;
        }

        /* 2. Track (Latar Belakang Scrollbar) - Abu-abu Terang */
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #e2e8f0; /* Slate-200 (Abu terang jelas) */
          border-radius: 8px;
          border: 1px solid #cbd5e1; /* Tambah garis pinggir biar makin jelas */
        }

        /* 3. Thumb (Batang Geser) - Abu-abu Gelap */
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #64748b; /* Slate-500 (Abu gelap solid) */
          border-radius: 8px;
          border: 3px solid #e2e8f0; /* Memberi jarak sedikit dari track */
        }

        /* 4. Saat Hover (Disorot Mouse) - Jadi Lebih Gelap Lagi */
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569; /* Slate-600 */
        }

        /* Animasi Modal */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrgStructurePage;