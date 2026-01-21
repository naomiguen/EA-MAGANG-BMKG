import React, { useEffect, useState } from "react";
import { Database, FileText, Grid3x3 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const AppDataMatrixPage = () => {
  const [appDataMatrix, setAppDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppData();
  }, []);

  const fetchAppData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('app_data_matrix')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) throw fetchError;
      
      setAppDataMatrix(data || []);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDataTypeStyle = (type) => {
    if (!type) return { bg: "#f1f5f9", text: "#64748b", border: "#cbd5e1" };
    if (type.includes("Master")) return { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" };
    if (type.includes("Analytical")) return { bg: "#f3e8ff", text: "#6b21a8", border: "#e9d5ff" };
    return { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" };
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h3 style={styles.errorTitle}>Error Loading Data</h3>
          <p style={styles.errorMessage}>{error}</p>
          <button onClick={fetchAppData} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>
          <Grid3x3 size={36} color="#2563eb" />
          Application - Data Matrix
        </h1>
        <p style={styles.subtitle}>Pemetaan hubungan antara aplikasi sistem dengan entitas data.</p>
        <button onClick={fetchAppData} style={styles.refreshButton}>
          Refresh Data
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Application (System)</th>
                <th style={styles.th}>Description / Function</th>
                <th style={styles.th}>Data Entity</th>
                <th style={styles.thCentered}>Data Entity Type</th>
              </tr>
            </thead>
            <tbody style={{ color: '#334155', fontSize: '15px' }}>
              {appDataMatrix.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.emptyTd}>No data available</td>
                </tr>
              ) : (
                appDataMatrix.map((item, index) => {
                  const style = getDataTypeStyle(item.data_type);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                      }}
                    >
                      <td style={styles.tdBold}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <Database size={18} color="#94a3b8" />
                          {item.app_name}
                        </div>
                      </td>
                      <td style={styles.tdDesc}>{item.description}</td>
                      <td style={styles.tdEntity}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <FileText size={18} color="#94a3b8" />
                          {item.data_entity}
                        </div>
                      </td>
                      <td style={styles.tdCentered}>
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: style.bg,
                            color: style.text,
                            borderColor: style.border,
                          }}
                        >
                          {item.data_type}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.footer}>
        Total: {appDataMatrix.length} aplikasi terdaftar
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 16px',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '40px',
    maxWidth: '56rem',
    width: '100%',
  },
  title: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '18px',
    marginBottom: '16px',
  },
  refreshButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '84rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#1e293b',
    color: 'white',
    fontSize: '14px',
    textTransform: 'uppercase',
    height: '60px',
  },
  th: {
    padding: '16px 24px',
    textAlign: 'left',
    fontWeight: '600',
  },
  thCentered: {
    padding: '16px 24px',
    textAlign: 'center',
    fontWeight: '600',
  },
  emptyTd: {
    padding: '40px',
    textAlign: 'center',
    color: '#64748b',
  },
  tdBold: {
    padding: '20px 24px',
    fontWeight: '700',
    color: '#0f172a',
    borderRight: '1px solid #e2e8f0',
  },
  tdDesc: {
    padding: '20px 24px',
    color: '#475569',
    lineHeight: '1.6',
    borderRight: '1px solid #e2e8f0',
  },
  tdEntity: {
    padding: '20px 24px',
    fontWeight: '600',
    color: '#334155',
    borderRight: '1px solid #e2e8f0',
  },
  tdCentered: {
    padding: '20px 24px',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    border: '1px solid',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#64748b',
    fontSize: '16px',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '500px',
    textAlign: 'center',
  },
  errorTitle: {
    color: '#991b1b',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  errorMessage: {
    color: '#dc2626',
    fontSize: '14px',
    marginBottom: '16px',
  },
  retryButton: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AppDataMatrixPage;