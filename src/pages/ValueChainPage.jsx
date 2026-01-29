import React, { useState } from 'react';
import { createPortal } from 'react-dom'; 
import { localValueChainData } from '../services/ValueChData'; 
import valueChainRawSvg from '../assets/ValueChain.drawio.svg?raw';

const ModalPopup = ({ selectedData, closeModal }) => {
  if (!selectedData) return null;
  return createPortal(
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 54, 96, 0.6)', // Blue tint overlay
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999999, backdropFilter: 'blur(3px)'
      }}
      onClick={closeModal}
    >
      <div 
        style={{
          backgroundColor: '#ffffff', 
          width: '90%', 
          maxWidth: '600px', 
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 70, 127, 0.35)',
          overflow: 'hidden',
          border: '2px solid #bfe2ff'
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Modal Header - Blue gradient */}
        <div style={{ 
          background: 'linear-gradient(135deg, #00467f 0%, #0064b5 100%)', 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '3px solid #fbbf24'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            fontWeight: '800', 
            color: '#ffffff',
            letterSpacing: '0.02em'
          }}>
            {selectedData.title}
          </h2>
          <button 
            onClick={closeModal} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer', 
              fontSize: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ✕
          </button>
        </div>
        
        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: '1.6', 
            color: '#003660',
            marginBottom: '16px'
          }}>
            {selectedData.description}
          </p>
          <span style={{ 
            display: 'inline-block', 
            padding: '6px 16px', 
            background: '#bfe2ff',
            color: '#002541', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: '700',
            border: '2px solid #0064b5',
            letterSpacing: '0.02em'
          }}>
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
    <div className="min-h-screen w-full" style={{ 
      background: '#f0f7ff', // Light blue background
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '60px 20px' 
    }}>
      <style>{`
        svg text, svg tspan { pointer-events: none !important; }
        
        .svg-container svg {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          height: auto;
        }

        /* Hover effects HANYA untuk elemen di dalam svg-container */
        .svg-container [id^="1"], 
        .svg-container [data-cell-id^="1"], 
        .svg-container [id="B"], 
        .svg-container [data-cell-id="B"] {
          cursor: pointer !important;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        [id]:hover { opacity: 0.7; filter: brightness(1.1); }

        /* Mobile Responsive */
        @media (max-width: 479px) {
          .value-chain-title {
            font-size: 1.5rem !important;
            margin: 0 0 8px 0 !important;
          }
          
          .value-chain-subtitle {
            font-size: 0.85rem !important;
          }
          
          .value-chain-container {
            padding: 40px 16px !important;
          }
        }

        @media (max-width: 390px) {
          .value-chain-title {
            font-size: 1.25rem !important;
            margin: 0 0 6px 0 !important;
          }
          
          .value-chain-subtitle {
            font-size: 0.75rem !important;
          }

          .value-chain-container {
            padding: 24px 12px !important;
          }
        }
      `}</style>

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="value-chain-title" style={{ fontSize: '3rem', fontWeight: '900', color: '#000000', margin: '0 0 10px 0' }}>
          Value Chain BMKG
        </h1>
        <p className="value-chain-subtitle" style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Klik kotak pada diagram untuk melihat detail aktivitas
        </p>
        
        {/* Divider */}
        <div style={{
          width: '6rem',
          height: '0.25rem',
          background: 'linear-gradient(to right, #0064b5, #fbbf24)',
          margin: '0 auto',
          borderRadius: '9999px'
        }}></div>
      </div>

      {/* SVG Container */}
      <div 
        className="bg-white shadow-2xl svg-container value-chain-container"
        style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            border: '2px solid #000000', 
            padding: '40px', 
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'center' 
        }}
        onClick={handleSvgClick}
        dangerouslySetInnerHTML={{ __html: valueChainRawSvg }}
      />

      {/* Info Footer */}
      <div style={{
        marginTop: '2rem',
        maxWidth: '1200px',
        width: '100%',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #bfe2ff 100%)',
        padding: '1.5rem 2rem',
        borderRadius: '12px',
        border: '2px solid #0064b5',
        display: 'flex',
        alignItems: 'start',
        gap: '1rem'
      }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          background: '#fbbf24',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0,
          border: '2px solid #f59e0b'
        }}>
          💡
        </div>
        <div>
          <h4 style={{
            fontWeight: '800',
            color: '#00467f',
            marginBottom: '0.5rem',
            fontSize: '1.125rem',
            letterSpacing: '0.02em'
          }}>
            Cara Menggunakan
          </h4>
          <p style={{
            color: '#003660',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            Diagram ini menunjukkan rantai nilai aktivitas BMKG. Klik pada setiap kotak aktivitas untuk melihat deskripsi detail mengenai proses dan kontribusinya terhadap layanan meteorologi.
          </p>
        </div>
      </div>

      <ModalPopup selectedData={selectedData} closeModal={() => setSelectedData(null)} />
    </div>
  );
};

export default ValueChainPage;