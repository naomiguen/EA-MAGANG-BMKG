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
        height: '100vh', fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', height: '50px', border: '4px solid #e2e8f0',
            borderTop: '4px solid #1e40af', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b' }}>Memuat data strategi...</p>
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
        height: '100vh', fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          backgroundColor: '#fee2e2', border: '1px solid #fca5a5', 
          borderRadius: '8px', padding: '20px', maxWidth: '500px', textAlign: 'center' 
        }}>
          <h3 style={{ color: '#dc2626', margin: '0 0 8px 0' }}>⚠️ Gagal Memuat Data</h3>
          <p style={{ color: '#991b1b', margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      padding: '16px', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'sans-serif',
      justifyContent: 'flex-start'
    }}>
      
      {/* HEADER PAGE */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0' }}>
          Strategy Map BMKG
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
          Klik pada kotak strategi untuk melihat detail KPI & Deskripsi
        </p>
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
          border: '1px solid #e2e8f0', 
          borderRadius: '16px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', 
          padding: '0',
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

      {/* MODAL POPUP */}
      {isModalOpen && activeInfo && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '16px',
          lineHeight: 'normal', fontSize: '16px'
        }}
        onClick={() => setIsModalOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              backgroundColor: 'white', borderRadius: '16px', 
              width: '100%', maxWidth: '550px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden', animation: 'popIn 0.3s ease-out',
              display: 'block'
            }}
          >
            {/* MODAL HEADER */}
            <div style={{ 
              backgroundColor: '#1e40af', padding: '16px 20px',
              borderBottom: '4px solid #1e3a8a', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: 'bold', lineHeight: 1.4, flex: 1 }}>
                {activeInfo.title}
              </h2>
              <button onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                  width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%',
                  fontSize: '20px', cursor: 'pointer', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', marginLeft: '12px'
                }}
              >
                &times;
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', fontSize: '11px', fontWeight: 'bold', 
                  color: '#94a3b8', marginBottom: '6px', letterSpacing: '1px',
                  lineHeight: '1.5'
                }}>
                  DESKRIPSI STRATEGI
                </label>
                <p style={{ margin: 0, color: '#334155', lineHeight: '1.6', fontSize: '14px' }}>
                  {activeInfo.desc}
                </p>
              </div>

              {activeInfo.category && (
                <div style={{ marginTop: '16px' }}>
                  <span style={{
                    display: 'inline-block', padding: '4px 12px',
                    backgroundColor: '#dbeafe', color: '#1e40af',
                    borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                    textTransform: 'uppercase', lineHeight: 'normal'
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
            padding: 0 !important;
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