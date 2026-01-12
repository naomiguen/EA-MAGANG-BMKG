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

        // Konversi array ke object dengan id sebagai key
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

  // Click handler passed to the SVG component
  const handleBoxClick = (e) => {
    console.log("KLIK DITERIMA DI PARENT! Elemen:", e.target.tagName);

    let current = e.target;
    let foundId = null;

    while (current && current.tagName !== 'svg') {
      const id = current.getAttribute ? current.getAttribute('data-cell-id') : null;
      
      if (id) {
        console.log(`Cek ID: ${id}`);
        if (strategyDetails[id]) {
          foundId = id;
          break;
        }
      }
      current = current.parentNode;
    }

    if (foundId) {
      console.log("MATCH! Buka Modal untuk:", foundId);
      setActiveId(foundId);
      setIsModalOpen(true);
    } else {
      console.log("❌ Gagal ketemu ID yang ada di database.");
    }
  };

  const activeInfo = activeId ? strategyDetails[activeId] : null;

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #1e40af',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b' }}>Memuat data strategi...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          backgroundColor: '#fee2e2', 
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', margin: '0 0 8px 0' }}>
            ⚠️ Gagal Memuat Data
          </h3>
          <p style={{ color: '#991b1b', margin: 0 }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      padding: '24px', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'sans-serif' 
    }}>
      
      {/* HEADER PAGE */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>
          Strategy Map BMKG
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      padding: '24px', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'sans-serif' 
    }}>
      
      {/* HEADER PAGE */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>
          Strategy Map BMKG
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          Klik pada kotak strategi untuk melihat detail KPI & Deskripsi
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          Klik pada kotak strategi untuk melihat detail KPI & Deskripsi
        </p>
      </div>

      {/* CONTAINER GAMBAR */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        border: '1px solid #e2e8f0', 
        borderRadius: '16px', 
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ width: '100%', maxWidth: '1200px', minWidth: '800px' }}>
          {/* KOMPONEN SVG */}
          <StrategySvgImage onKlikDiagram={handleBoxClick} />
        </div>
      </div>

      {/* MODAL POPUP */}
      {isModalOpen && activeInfo && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setIsModalOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              width: '90%',
              maxWidth: '550px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              animation: 'popIn 0.3s ease-out'
            }}
          >
            {/* MODAL HEADER */}
            <div style={{ 
              backgroundColor: '#1e40af',
              padding: '20px 24px',
              borderBottom: '4px solid #1e3a8a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
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
                  borderRadius: '50%',
                  fontSize: '20px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                &times;
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  color: '#94a3b8', 
                  marginBottom: '6px', 
                  letterSpacing: '1px' 
                }}>
                  DESKRIPSI STRATEGI
                </label>
                <p style={{ 
                  margin: 0, 
                  color: '#334155', 
                  lineHeight: '1.6', 
                  fontSize: '15px' 
                }}>
                  {activeInfo.desc}
                </p>
              </div>

              {/* Badge Kategori */}
              {activeInfo.category && (
                <div style={{ marginTop: '16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {activeInfo.category.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animasi PopIn */}
      <style>
        {`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default StrategyMapPage;