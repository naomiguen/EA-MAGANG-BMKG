import React, { useState, useEffect } from "react";
import StrategySvgImage from "../components/StrategySvgImage";
import { supabase } from "../lib/supabaseClient";

const StrategyMapPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategyDetails, setStrategyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase saat komponen mount
  useEffect(() => {
    const fetchStrategyData = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('strategy_map')
          .select('*');

        if (error) {
          throw error;
        }

        const dataObject = {};
        data.forEach(item => {
          dataObject[item.id] = {
            title: item.title,
            desc: item.description,
            category: item.category
          };
        });

        setStrategyDetails(dataObject);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching strategy data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStrategyData();
  }, []);

  const handleBoxClick = (e) => {
    let current = e.target;
    let foundId = null;

    while (current && current.tagName !== 'svg') {
      const id = current.getAttribute ? current.getAttribute('data-cell-id') : null;
      if (id && strategyDetails[id]) {
        foundId = id;
        break;
      }
      current = current.parentNode;
    }

    if (foundId) {
      setActiveId(foundId);
      setIsModalOpen(true);
    }
  };

  const activeInfo = activeId ? strategyDetails[activeId] : null;

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f0f7ff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', height: '60px', border: '4px solid #bfe2ff',
            borderTop: '4px solid #0064b5', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#003660', fontWeight: '600', fontSize: '1rem' }}>
            Memuat Data Strategi...
          </p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f0f7ff',
        padding: '20px'
      }}>
        <div style={{ 
          backgroundColor: '#fff5f5', border: '2px solid #fed7d7', 
          borderRadius: '12px', padding: '2rem', maxWidth: '500px', textAlign: 'center' 
        }}>
          <h3 style={{ color: '#7f1d1d', margin: '0 0 12px 0', fontWeight: '800', fontSize: '1.25rem' }}>
            ⚠️ Terjadi Kesalahan
          </h3>
          <p style={{ color: '#991b1b', margin: '0 0 20px 0', fontSize: '0.95rem' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              border: '2px solid #feb2b2', background: 'white', padding: '0.65rem 1.25rem',
              borderRadius: '10px', cursor: 'pointer', fontWeight: '800', color: '#7f1d1d',
              fontSize: '0.95rem', transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      padding: '60px 20px', 
      backgroundColor: '#f0f7ff', // Light blue background
      fontFamily: 'sans-serif',
      justifyContent: 'flex-start'
    }}>
      
      {/* HEADER PAGE */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>

        <h1 style={{ 
          color: '#00467f', // Dark blue
          fontSize: '3rem', 
          fontWeight: '800', 
          margin: '0 0 10px 0',
          letterSpacing: '-0.025em'
        }}>
          Strategy Map BMKG
        </h1>
        
        <p style={{ 
          color: '#003660', // Medium blue
          fontSize: '1.25rem', 
          margin: '0 0 1.5rem 0',
          fontWeight: '600'
        }}>
          Klik pada kotak strategi untuk melihat detail KPI & Deskripsi
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

      {/* CONTAINER GAMBAR */}
      <div 
        className="svg-container"
        style={{ 
          display: 'block', 
          height: 'min-content', 
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'white',
          border: '2px solid #bfe2ff', // Light blue border
          borderRadius: '12px', 
          boxShadow: '0 2px 12px rgba(0, 100, 181, 0.08)',
          overflow: 'hidden', 
          padding: '40px 20px 20px 20px', // Top: 40px, Right: 20px, Bottom: 20px, Left: 20px
          lineHeight: 0,
          fontSize: 0,
          marginBottom: '20px'
        }}
      >
        <div style={{ 
            width: '100%', 
            display: 'block',
            lineHeight: 0,
            margin: 0,
            padding: 0
        }}>
           <StrategySvgImage onKlikDiagram={handleBoxClick} />
        </div>
      </div>

      {/* Info Footer */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
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
            letterSpacing: '0.02em',
            margin: '0 0 8px 0'
          }}>
            Cara Menggunakan
          </h4>
          <p style={{
            color: '#003660',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            Diagram ini menunjukkan peta strategi BMKG yang terdiri dari berbagai perspektif. Klik pada setiap kotak untuk melihat detail deskripsi dan kategori strategi.
          </p>
        </div>
      </div>

      {/* MODAL POPUP */}
      {isModalOpen && activeInfo && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0, 54, 96, 0.6)', // Blue tint overlay
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '16px',
          lineHeight: 'normal', fontSize: '16px'
        }}
        onClick={() => setIsModalOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              width: '100%', 
              maxWidth: '550px',
              boxShadow: '0 25px 50px -12px rgba(0, 70, 127, 0.35)',
              overflow: 'hidden', 
              animation: 'popIn 0.3s ease-out',
              display: 'block',
              border: '2px solid #bfe2ff'
            }}
          >
            {/* MODAL HEADER */}
            <div style={{ 
              background: 'linear-gradient(135deg, #00467f 0%, #0064b5 100%)', // Blue gradient
              padding: '20px',
              borderBottom: '3px solid #fbbf24', // Yellow accent
              display: 'flex',
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <h2 style={{ 
                margin: 0, 
                color: 'white', 
                fontSize: '1.25rem', 
                fontWeight: '800', 
                lineHeight: 1.4, 
                flex: 1,
                letterSpacing: '0.02em'
              }}>
                {activeInfo.title}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)', 
                  border: 'none', 
                  color: 'white',
                  width: '32px', 
                  height: '32px', 
                  flexShrink: 0, 
                  borderRadius: '8px',
                  fontSize: '20px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginLeft: '12px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                ✕
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  color: '#0064b5', // Blue label
                  marginBottom: '8px', 
                  letterSpacing: '0.05em',
                  lineHeight: '1.5',
                  textTransform: 'uppercase'
                }}>
                  Deskripsi Strategi
                </label>
                <p style={{ 
                  margin: 0, 
                  color: '#003660', // Medium blue text
                  lineHeight: '1.6', 
                  fontSize: '0.95rem' 
                }}>
                  {activeInfo.desc}
                </p>
              </div>

              {activeInfo.category && (
                <div style={{ marginTop: '16px' }}>
                  <span style={{
                    display: 'inline-block', 
                    padding: '6px 16px',
                    background: '#bfe2ff', // Light blue badge
                    color: '#002541', // Dark blue text
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase', 
                    lineHeight: 'normal',
                    border: '2px solid #0064b5',
                    letterSpacing: '0.02em'
                  }}>
                    {activeInfo.category.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        /* RESPONSIVE FIX - Hapus SEMUA gap di mobile */
        @media (max-width: 768px) {
          /* Reset total untuk container SVG */
          .svg-container {
            padding: 30px 15px 15px 15px !important; /* Top: 30px, sides: 15px, bottom: 15px */
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 20px !important;
            line-height: 0 !important;
          }
          
          /* Reset SEMUA elemen di dalam container */
          .svg-container * {
            margin: 0 !important;
            padding: 0 !important;
            line-height: 0 !important;
            vertical-align: top !important;
          }
          
          /* Target langsung SVG dan IMG */
          .svg-container svg,
          .svg-container img {
            display: block !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            vertical-align: top !important;
            line-height: 0 !important;
          }
          
          /* Hapus semua spacing internal */
          .svg-container > div {
            margin: 0 !important;
            padding: 0 !important;
            line-height: 0 !important;
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StrategyMapPage;