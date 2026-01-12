import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

const AppDataMatrixPage = () => {
  const [appDataMatrix, setAppDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase
  useEffect(() => {
    let isMounted = true;
    let fetchTimeout;

    const fetchAppDataMatrix = async () => {
      try {
        // Cek cache dulu
        const cached = localStorage.getItem('app_data_matrix');
        const cacheTime = localStorage.getItem('app_data_matrix_cache_time');
        const now = Date.now();
        
        // Jika cache masih fresh (< 5 menit), pakai cache
        if (cached && cacheTime && (now - parseInt(cacheTime)) < 300000) {
          setAppDataMatrix(JSON.parse(cached));
          setLoading(false);
          return;
        }

        setLoading(true);
        
        // Delay kecil untuk menghindari rate limit
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const { data, error } = await supabase
          .from('app_data_matrix')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        if (!isMounted) return;

        // Transform data untuk match dengan format lama
        const transformedData = data.map(item => ({
          id: item.id,
          app: item.app_name,
          description: item.description,
          dataEntity: item.data_entity,
          dataType: item.data_type
        }));

        // Simpan ke cache
        localStorage.setItem('app_data_matrix', JSON.stringify(transformedData));
        localStorage.setItem('app_data_matrix_cache_time', now.toString());

        setAppDataMatrix(transformedData);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching app data matrix:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Delay fetch untuk menghindari multiple calls
    fetchTimeout = setTimeout(() => {
      fetchAppDataMatrix();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(fetchTimeout);
    };
  }, []);

  // Loading State
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Memuat data aplikasi...</p>
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

  // Error State
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        padding: '16px'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '20px' }}>
            ⚠️ Gagal Memuat Data
          </h3>
          <p style={{ color: '#991b1b', margin: '0 0 16px 0', fontSize: '14px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '48px',
      paddingBottom: '48px',
      paddingLeft: '16px',
      paddingRight: '16px'
    }}>
      
      {/* Header Halaman */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '56rem'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '900',
          color: '#0f172a',
          marginBottom: '12px'
        }}>
          Application - Data Matrix
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Pemetaan hubungan antara komponen aplikasi sistem dengan entitas data yang dikelola.
        </p>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          📊 {appDataMatrix.length} Aplikasi Terdaftar
        </div>
      </div>

      {/* Tabel Matrix (Gaya TOGAF - Header Biru Tua) */}
      <div style={{
        width: '100%',
        maxWidth: '84rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#003366',
                color: 'white',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                height: '64px'
              }}>
                <th style={{
                  padding: '16px 24px',
                  fontWeight: '700',
                  width: '20%',
                  borderRight: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  Application (System)
                </th>
                <th style={{
                  padding: '16px 24px',
                  fontWeight: '700',
                  width: '40%',
                  borderRight: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  Description / Function
                </th>
                <th style={{
                  padding: '16px 24px',
                  fontWeight: '700',
                  width: '20%',
                  borderRight: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  Data Entity
                </th>
                <th style={{
                  padding: '16px 24px',
                  fontWeight: '700',
                  width: '20%'
                }}>
                  Data Entity Type
                </th>
              </tr>
            </thead>
            <tbody>
              {appDataMatrix.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '16px'
                  }}>
                    Tidak ada data aplikasi
                  </td>
                </tr>
              ) : (
                appDataMatrix.map((item, index) => (
                  <tr 
                    key={item.id} 
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc'}
                  >
                    {/* Kolom 1: Aplikasi */}
                    <td style={{
                      padding: '16px 24px',
                      verticalAlign: 'top',
                      fontWeight: '700',
                      color: '#1e293b',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      {item.app}
                    </td>

                    {/* Kolom 2: Deskripsi */}
                    <td style={{
                      padding: '16px 24px',
                      verticalAlign: 'top',
                      color: '#475569',
                      fontSize: '14px',
                      lineHeight: '1.625',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      {item.description}
                    </td>

                    {/* Kolom 3: Entitas Data */}
                    <td style={{
                      padding: '16px 24px',
                      verticalAlign: 'top',
                      fontWeight: '500',
                      color: '#334155',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      {item.dataEntity}
                    </td>

                    {/* Kolom 4: Tipe Data */}
                    <td style={{
                      padding: '16px 24px',
                      verticalAlign: 'top'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '1px solid',
                        backgroundColor: item.dataType.includes('Master') 
                          ? '#d1fae5' 
                          : '#dbeafe',
                        color: item.dataType.includes('Master') 
                          ? '#065f46' 
                          : '#0c4a6e',
                        borderColor: item.dataType.includes('Master') 
                          ? '#a7f3d0' 
                          : '#bfdbfe'
                      }}>
                        {item.dataType}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Sumber */}
      <div style={{
        marginTop: '24px',
        color: '#94a3b8',
        fontSize: '14px',
        fontStyle: 'italic',
        textAlign: 'center',
        maxWidth: '56rem'
      }}>
        * Daftar aplikasi diidentifikasi dari Lampiran SK Uraian Tugas (Tugas Observer, Forecaster, & Tata Usaha).
      </div>
    </div>
  );
};

export default AppDataMatrixPage;