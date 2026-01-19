import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

const ApplicationClassificationMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter logika disesuaikan dengan nama kolom database (snake_case)
  const filteredApps = filter === 'All' 
    ? applications 
    : applications.filter(app => app.classification_level_1 === filter);

  const getBadgeColor = (level2) => {
    if (!level2) return "badge-default";
    if (level2.includes("Administrasi")) return "badge-admin";
    if (level2.includes("Layanan Publik")) return "badge-public";
    if (level2.includes("Tertentu")) return "badge-mission";
    return "badge-default";
  };

  if (loading) {
    return <div style={{...styles.container, textAlign: 'center', padding: '40px'}}>Loading data...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Classification Matrix</h1>
        <p style={styles.headerSubtitle}>Klasifikasi Domain Arsitektur Aplikasi (DAA) berdasarkan Peraturan BMKG No. 9 Tahun 2023</p>
      </header>

      <div style={styles.controls}>
        <button 
          style={{...styles.filterBtn, ...(filter === 'All' ? styles.filterBtnActive : {})}}
          onClick={() => setFilter('All')}
        >
          Semua Aplikasi ({applications.length})
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'Aplikasi Umum' ? styles.filterBtnActive : {})}}
          onClick={() => setFilter('Aplikasi Umum')}
        >
          Aplikasi Umum (Berbagi Pakai)
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'Aplikasi Khusus' ? styles.filterBtnActive : {})}}
          onClick={() => setFilter('Aplikasi Khusus')}
        >
          Aplikasi Khusus (Spesifik)
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '80px'}}>KODE DAA</th>
              <th style={{...styles.th, width: '200px'}}>NAMA APLIKASI</th>
              <th style={styles.th}>DESKRIPSI & FUNGSI</th>
              <th style={{...styles.th, width: '150px'}}>KLASIFIKASI (L1)</th>
              <th style={{...styles.th, width: '180px'}}>DOMAIN (L2)</th>
              <th style={{...styles.th, width: '150px'}}>UNIT PENGELOLA</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id} style={styles.tr}>
                <td style={styles.tdId}>{app.id}</td>
                <td style={styles.tdName}>{app.name}</td>
                <td style={styles.tdDesc}>{app.description}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    ...(app.classification_level_1 === 'Aplikasi Umum' ? styles.badgeL1Umum : styles.badgeL1Khusus)
                  }}>
                    {app.classification_level_1}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    ...(getBadgeColor(app.classification_level_2) === 'badge-admin' ? styles.badgeAdmin : {}),
                    ...(getBadgeColor(app.classification_level_2) === 'badge-public' ? styles.badgePublic : {}),
                    ...(getBadgeColor(app.classification_level_2) === 'badge-mission' ? styles.badgeMission : {})
                  }}>
                    {app.classification_level_2}
                  </span>
                </td>
                <td style={styles.tdOwner}>{app.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer style={styles.footer}>
        <p>Total Aplikasi terdata: {applications.length} item. Sumber: Database & Lampiran Perka BMKG 9/2023 Tabel 3.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    maxWidth: '100%',
    margin: '0 auto',
    padding: '16px',
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#2980b9',
    color: 'white',
    padding: '20px 24px',
    marginBottom: '0',
    borderRadius: '0'
  },
  headerTitle: {
    color: 'white',
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center'
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '4px 0 0',
    fontSize: '12px',
    textAlign: 'center'
  },
  controls: {
    marginBottom: '0',
    display: 'flex',
    gap: '0',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    padding: '0',
    borderBottom: '1px solid #ddd'
  },
  filterBtn: {
    padding: '12px 20px',
    border: 'none',
    borderBottom: '3px solid transparent',
    backgroundColor: '#ffffff',
    color: '#666',
    cursor: 'pointer',
    fontWeight: '400',
    fontSize: '13px',
    borderRadius: '0'
  },
  filterBtnActive: {
    color: '#2980b9',
    borderBottomColor: '#2980b9',
    fontWeight: '600'
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderTop: 'none'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px',
    backgroundColor: '#ffffff'
  },
  th: {
    backgroundColor: '#ffffff',
    color: '#495057',
    fontWeight: '600',
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #dee2e6'
  },
  tr: {
    backgroundColor: '#ffffff'
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #e9ecef',
    fontSize: '13px',
    verticalAlign: 'top',
    color: '#333',
    lineHeight: '1.5',
    backgroundColor: '#ffffff'
  },
  tdId: {
    padding: '14px 16px',
    borderBottom: '1px solid #e9ecef',
    fontFamily: "'Consolas', 'Monaco', monospace",
    color: '#333',
    fontWeight: '600',
    fontSize: '12px',
    backgroundColor: '#ffffff'
  },
  tdName: {
    padding: '14px 16px',
    borderBottom: '1px solid #e9ecef',
    fontWeight: '600',
    color: '#222',
    fontSize: '13px',
    backgroundColor: '#ffffff'
  },
  tdDesc: {
    padding: '14px 16px',
    borderBottom: '1px solid #e9ecef',
    color: '#555',
    fontSize: '13px',
    lineHeight: '1.6',
    backgroundColor: '#ffffff'
  },
  tdOwner: {
    padding: '14px 16px',
    borderBottom: '1px solid #e9ecef',
    color: '#777',
    fontSize: '12px',
    fontStyle: 'italic',
    backgroundColor: '#ffffff'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },
  badgeL1Umum: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460'
  },
  badgeL1Khusus: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460'
  },
  badgeAdmin: {
    backgroundColor: '#e2e3e5',
    color: '#383d41'
  },
  badgePublic: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460'
  },
  badgeMission: {
    backgroundColor: '#e2e3e5',
    color: '#383d41'
  },
  footer: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '11px',
    color: '#999',
    padding: '12px',
    fontStyle: 'italic',
    backgroundColor: '#ffffff'
  }
};

export default ApplicationClassificationMatrix;