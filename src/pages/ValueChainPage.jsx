import React, { useState } from 'react';
import { createPortal } from 'react-dom'; 

// 1. Import Data
import { valueChainData } from '../data/menuData';

// 2. Import SVG Final
import ValueChainSVG from '../assets/Value-Chain.drawio.svg?react';

// --- KOMPONEN MODAL (DEKLARASI DI LUAR) ---
const ModalPopup = ({ selectedData, closeModal }) => {
  if (!selectedData) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999999, backdropFilter: 'blur(3px)'
      }}
      onClick={closeModal}
    >
      <div 
        style={{
          backgroundColor: '#ffffff', width: '90%', maxWidth: '600px', borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', position: 'relative',
          color: '#333333', fontFamily: 'sans-serif'
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div style={{ backgroundColor: '#1d4ed8', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: '#ffffff' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', paddingRight: '20px', color: '#ffffff' }}>
            {selectedData.title || "Detail Aktivitas"}
          </h2>
          <button onClick={closeModal} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', marginBottom: '8px', letterSpacing: '1px' }}>DESKRIPSI</div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151', margin: '0 0 24px 0' }}>
            {selectedData.description || "Tidak ada deskripsi tersedia."}
          </p>
          {selectedData.documents && selectedData.documents.length > 0 && (
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
               <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', marginBottom: '12px', letterSpacing: '1px' }}>DOKUMEN PENDUKUNG</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedData.documents.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                      <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', marginRight: '12px', whiteSpace: 'nowrap' }}>{doc.code}</span>
                      <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>{doc.name}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button onClick={closeModal} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Tutup</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ValueChainPage = () => {
  const [selectedData, setSelectedData] = useState(null);

  // --- LOGIKA KLIK ---
  const handleSvgClick = (e) => {
    const targetElement = e.target.closest('[id], [data-cell-id]'); 
    if (targetElement) {
        const rawId = targetElement.id || targetElement.getAttribute('data-cell-id');
        if (valueChainData && valueChainData[rawId]) {
          setSelectedData(valueChainData[rawId]);
        }
    }
  };

  const closeModal = () => {
    setSelectedData(null);
  };

  const generateStyles = () => {
    return `
      svg text, svg tspan { pointer-events: none !important; }
      [id^="A"], [id^="B"], [data-cell-id^="A"], [data-cell-id^="B"] {
          cursor: pointer !important;
          transition: opacity 0.2s ease;
      }
      [id^="A"]:hover, [id^="B"]:hover { opacity: 0.8; }
    `;
  };

  return (
    // PARENT UTAMA
    // Kita gunakan style inline untuk MEMAKSA layout Flex Column Center
    <div 
        className="min-h-screen w-full bg-gray-50"
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',     // KUNCI 1: Flex Alignment Center
            justifyContent: 'center', // KUNCI 2: Vertical Alignment Center
            padding: '40px 16px'      // Padding aman
        }}
    >
      <style>{generateStyles()}</style>

      {/* JUDUL */}
      {/* Kita paksa textAlign center */}
      <div 
        className="w-full max-w-4xl mb-8"
        style={{ textAlign: 'center' }} 
      >
        <h1 
           className="text-3xl md:text-4xl font-extrabold mb-2"
           style={{ color: '#000000', margin: '0 auto' }}
        >
           Value Chain Diagram
        </h1>
        <p className="text-gray-800 text-sm">
           Klik kotak pada diagram untuk melihat Title, Deskripsi, dan Dokumen
        </p>
      </div>

      {/* --- BAGIAN 2: CONTAINER SVG (KARTU) --- */}
      {/* PERBAIKAN PENTING:
          1. margin: '0 auto' -> Ini cara paling ampuh buat bikin div ke tengah (kalau flex gagal).
          2. width: '90%' & max-width: '900px' -> Agar ukuran card pas, tidak full screen.
      */}
      <div 
        className="bg-white shadow-lg"
        style={{
            marginLeft: 'auto',  // KUNCI 3: Margin Kiri Otomatis
            marginRight: 'auto', // KUNCI 4: Margin Kanan Otomatis
            width: '90%',               
            maxWidth: '900px',          
            border: '2px solid #000000', 
            padding: '30px',            
            borderRadius: '4px',
            boxSizing: 'border-box',
            display: 'flex',            
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onClick={handleSvgClick} 
      >
        <ValueChainSVG 
          style={{ 
            width: '100%',
            height: 'auto',
            display: 'block' 
          }}
        />
      </div>

      <ModalPopup selectedData={selectedData} closeModal={closeModal} />

    </div>
  );
};

export default ValueChainPage;