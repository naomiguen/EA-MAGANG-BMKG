import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
// 1. Import data lokal Anda
import { localValueChainData } from '../services/ValueChData'; 
// 2. Import SVG sebagai string (tambahkan ?raw di akhir)
import valueChainRawSvg from '../assets/ValueChain.drawio.svg?raw';

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
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div style={{ backgroundColor: '#1d4ed8', padding: '20px', display: 'flex', justifyContent: 'space-between', color: '#ffffff' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff' }}>{selectedData.title}</h2>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>
        <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>{selectedData.description}</p>
          <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
            {selectedData.category?.toUpperCase()} ACTIVITY
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ValueChainPage = () => {
  const [selectedData, setSelectedData] = useState(null);

  const handleSvgClick = (e) => {
    const targetElement = e.target.closest('[id], [data-cell-id]'); 
    if (targetElement) {
      const rawId = targetElement.id || targetElement.getAttribute('data-cell-id');
      if (localValueChainData[rawId]) {
        setSelectedData(localValueChainData[rawId]);
      }
    }
  };

return (
    <div className="min-h-screen w-full bg-gray-50" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', // Memastikan seluruh konten di tengah layar secara vertikal
      padding: '60px 20px' 
    }}>
      <style>{`
        svg text, svg tspan { pointer-events: none !important; }
        
        /* Tambahan CSS agar elemen SVG yang di-inject benar-benar terpusat */
        .svg-container svg {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          height: auto;
        }

        [id^="1"], [data-cell-id^="1"], [id="B"], [data-cell-id="B"] {
            cursor: pointer !important;
            transition: all 0.2s ease;
        }
        [id]:hover { opacity: 0.7; filter: brightness(1.1); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#000000', margin: '0 0 10px 0' }}>
          Value Chain BMKG
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Klik kotak pada diagram untuk melihat detail aktivitas
        </p>
      </div>

      <div 
        className="bg-white shadow-2xl svg-container" // Tambahkan class 'svg-container'
        style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            border: '2px solid #000000', 
            padding: '40px', 
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            // --- TAMBAHKAN DUA BARIS INI ---
            display: 'flex',
            justifyContent: 'center' 
            // ------------------------------
        }}
        onClick={handleSvgClick}
        dangerouslySetInnerHTML={{ __html: valueChainRawSvg }}
      />

      <ModalPopup selectedData={selectedData} closeModal={() => setSelectedData(null)} />
    </div>
  );
};

export default ValueChainPage;