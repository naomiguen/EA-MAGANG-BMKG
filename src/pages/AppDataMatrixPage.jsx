import React, { useEffect, useState } from "react";
import { ArrowLeft, Database, FileText, Table as TableIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const AppDataMatrixPage = () => {
  // State untuk menampung data dari Supabase
  const [appDataMatrix, setAppDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat komponen di-mount
  useEffect(() => {
    fetchAppData();
  }, []);

  const fetchAppData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('app_data_matrix')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setAppDataMatrix(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Gagal mengambil data dari database.");
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk warna badge tipe data
  const getDataTypeStyle = (type) => {
    // Validasi agar tidak error jika type undefined saat loading
    if (!type) return { bg: "#f1f5f9", text: "#64748b", border: "#cbd5e1" };

    if (type.includes("Master")) {
      return { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" }; // Hijau
    } else if (type.includes("Analytical")) {
      return { bg: "#f3e8ff", text: "#6b21a8", border: "#e9d5ff" }; // Ungu
    } else {
      return { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" }; // Biru (Transactional)
    }
  };

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
      paddingRight: '16px',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      
      {/* Header Halaman */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '56rem',
        position: 'relative',
        width: '100%'
      }}>

        <h1 style={{
          fontSize: '36px',
          fontWeight: '900',
          color: '#0f172a',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
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
      </div>

      {/* Tabel Matrix */}
      <div style={{
        width: '100%',
        maxWidth: '84rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0'
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
                backgroundColor: '#1e293b', 
                color: 'white',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                height: '60px'
              }}>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '25%' }}>
                  Application (System)
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '35%' }}>
                  Description / Function
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '25%' }}>
                  Data Entity
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '15%', textAlign: 'center' }}>
                  Data Entity Type
                </th>
              </tr>
            </thead>
            <tbody style={{ color: '#334155', fontSize: '15px' }}>
              
              {/* State Loading */}
              {loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    Sedang memuat data dari database...
                  </td>
                </tr>
              )}

              {/* Data Loop */}
              {!loading && appDataMatrix.map((item, index) => {
                // Perhatikan: item.data_type (sesuai nama kolom DB snake_case)
                const style = getDataTypeStyle(item.data_type); 
                
                return (
                  <tr 
                    key={item.id} 
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                    }}
                  >
                    {/* Kolom 1: Aplikasi (item.app_name) */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      fontWeight: '700',
                      color: '#0f172a',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <Database size={18} color="#94a3b8" style={{ marginTop: '3px' }} />
                        {item.app_name}
                      </div>
                    </td>

                    {/* Kolom 2: Deskripsi (item.description) */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      color: '#475569',
                      lineHeight: '1.6',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      {item.description}
                    </td>

                    {/* Kolom 3: Entitas Data (item.data_entity) */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      fontWeight: '600',
                      color: '#334155',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                         <FileText size={18} color="#94a3b8" style={{ marginTop: '3px' }} />
                         {item.data_entity}
                      </div>
                    </td>

                    {/* Kolom 4: Tipe Data (item.data_type) */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: style.bg,
                        color: style.text,
                        border: `1px solid ${style.border}`,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.data_type}
                      </span>
                    </td>
                  </tr>
                );
              })}
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
        * Data dipetakan berdasarkan SK Uraian Tugas & katalog portofolio aplikasi.
      </div>
    </div>
  );
};

export default AppDataMatrixPage;