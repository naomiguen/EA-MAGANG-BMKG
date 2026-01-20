import React, { useEffect, useState } from "react";
import { Database, FileText, Table as TableIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const AppDataMatrixPage = () => {
  // 1. State untuk menampung data
  const [appDataMatrix, setAppDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data saat komponen di-mount
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
      
      // Jika database kosong/error, kita gunakan data fallback agar tidak kosong melompong
      setAppDataMatrix(fallbackData); 
    } finally {
      setLoading(false);
    }
  }; // Kurung penutup fungsi fetchAppData yang tadi hilang

  // 3. Data Fallback (Ganti nama agar tidak bentrok dengan state)
  const fallbackData = [
    { id: 1, app_name: "BMKGSoft", description: "Sistem penginputan data meteorologi.", data_entity: "Data Observasi", data_type: "Transactional Data" },
    { id: 2, app_name: "CMSS", description: "Sistem pertukaran data global.", data_entity: "WMO Coded Data", data_type: "Transactional Data" },
    { id: 3, app_name: "Synergie, Radar & Nowcasting", description: "Workstation analisis cuaca.", data_entity: "Produk Informasi", data_type: "Analytical Data" },
    { id: 4, app_name: "Aplikasi SAKTI", description: "Sistem keuangan terintegrasi.", data_entity: "Data Keuangan", data_type: "Transactional Data" },
    { id: 5, app_name: "Persediaan & SIPNB", description: "Manajemen aset negara.", data_entity: "Inventaris BMN", data_type: "Master Data" },
    { id: 6, app_name: "E-Kinerja", description: "Manajemen kinerja ASN.", data_entity: "Data Kepegawaian", data_type: "Master Data" },
    { id: 7, app_name: "E-Office BMKG", description: "Persuratan digital.", data_entity: "Dokumen Naskah Dinas", data_type: "Transactional Data" },
    { id: 8, app_name: "WIGOS", description: "Metadata alat.", data_entity: "Metadata Alat (OSCAR)", data_type: "Master Data" }
  ];

  // 4. Helper Style
  const getDataTypeStyle = (type) => {
    if (!type) return { bg: "#f1f5f9", text: "#64748b", border: "#cbd5e1" };
    if (type.includes("Master")) return { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" };
    if (type.includes("Analytical")) return { bg: "#f3e8ff", text: "#6b21a8", border: "#e9d5ff" };
    return { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" };
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>
          <TableIcon size={36} color="#2563eb" />
          Application - Data Matrix
        </h1>
        <p style={styles.subtitle}>Pemetaan hubungan antara aplikasi sistem dengan entitas data.</p>
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
              {loading ? (
                <tr>
                  <td colSpan="4" style={styles.loadingTd}>Memuat data...</td>
                </tr>
              ) : (
                appDataMatrix.map((item, index) => {
                  const style = getDataTypeStyle(item.data_type); 
                  return (
                    <tr key={item.id} style={{
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                      }}>
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
                        <span style={{
                          ...styles.badge,
                          backgroundColor: style.bg,
                          color: style.text,
                          borderColor: style.border
                        }}>
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
    </div>
  );
};

// Pemisahan style agar kode lebih bersih
const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 16px' },
  headerContainer: { textAlign: 'center', marginBottom: '40px', maxWidth: '56rem', width: '100%' },
  title: { fontSize: '36px', fontWeight: '900', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' },
  subtitle: { color: '#64748b', fontSize: '18px' },
  tableWrapper: { width: '100%', maxWidth: '84rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', borderRadius: '12px', backgroundColor: 'white', border: '1px solid #e2e8f0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { backgroundColor: '#1e293b', color: 'white', fontSize: '14px', textTransform: 'uppercase', height: '60px' },
  th: { padding: '16px 24px', textAlign: 'left', fontWeight: '600' },
  thCentered: { padding: '16px 24px', textAlign: 'center', fontWeight: '600' },
  loadingTd: { padding: '40px', textAlign: 'center', color: '#64748b' },
  tdBold: { padding: '20px 24px', fontWeight: '700', color: '#0f172a', borderRight: '1px solid #e2e8f0' },
  tdDesc: { padding: '20px 24px', color: '#475569', lineHeight: '1.6', borderRight: '1px solid #e2e8f0' },
  tdEntity: { padding: '20px 24px', fontWeight: '600', color: '#334155', borderRight: '1px solid #e2e8f0' },
  tdCentered: { padding: '20px 24px', textAlign: 'center' },
  badge: { display: 'inline-block', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', border: '1px solid' }
};

export default AppDataMatrixPage;