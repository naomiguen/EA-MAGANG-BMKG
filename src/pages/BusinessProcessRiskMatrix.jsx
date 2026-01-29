/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Settings, Database, Eye, FileText, ShieldCheck, ChevronLeft } from 'lucide-react';
import './css/BusinessProcessRiskMatrix.css';

const RiskMatrix = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'matrix'
  const [selectedDept, setSelectedDept] = useState(null);

  // --- DATA DEPARTEMEN UTAMA ---
  const departments = [
    { id: 'teknisi', label: 'Teknisi', icon: <Settings size={48} />, colorClass: 'card-teknisi' },
    { id: 'datin', label: 'Datin', icon: <Database size={48} />, colorClass: 'card-datin' },
    { id: 'observasi', label: 'Observasi', icon: <Eye size={48} />, colorClass: 'card-obs' },
    { id: 'tu', label: 'TU', icon: <FileText size={48} />, colorClass: 'card-tu' },
    { id: 'wmm', label: 'WMM', icon: <ShieldCheck size={48} />, colorClass: 'card-wmm' },
  ];

  // --- DATA 1: TEKNISI (Berdasarkan PDF Program Kerja Unit Teknisi) ---
  const teknisiData = [
    { 
      process: ['Pengecekan Harian', 'Peralatan Operasional', '& Administrasi'],
      desc: ['Memeriksa PC', 'Forecaster, Observer,', 'dan alat pendukung', 'lainnya.'],
      risks: { operasional: 'Sedang', aset: 'Tinggi', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    },
    { 
      process: ['Pemeriksaan &', 'Perawatan Genset', '/ Power Supply'],
      desc: ['Cek bahan', 'bakar solar,', 'air accu,', 'tegangan, dan', 'switch otomatis.'],
      risks: { operasional: 'Tinggi', aset: 'Tinggi', k3: 'Tinggi', finansial: 'Sedang', hukum: 'Rendah' }
    },
    { 
      process: ['Perbaikan Peralatan', 'Radar Cuaca'],
      desc: ['Memeriksa supply', 'listrik, parameter', 'radar, pedestal,', 'dan antena.'],
      risks: { operasional: 'Tinggi', aset: 'Tinggi', k3: 'Tinggi', finansial: 'Tinggi', hukum: 'Sedang' }
    },
    { 
      process: ['Perbaikan Sistem', 'Komputer & Server'],
      desc: ['Analisa kerusakan,', 'install ulang', 'software, dan', 'restore data.'],
      risks: { operasional: 'Sedang', aset: 'Tinggi', k3: 'Rendah', finansial: 'Sedang', hukum: 'Rendah' }
    },
    { 
      process: ['Perbaikan Peralatan', 'AWOS'],
      desc: ['Restart CDP,', 'cek kabel FO,', 'modem, dan', 'sensor di lapangan.'],
      risks: { operasional: 'Tinggi', aset: 'Sedang', k3: 'Sedang', finansial: 'Sedang', hukum: 'Rendah' }
    },
    { 
      process: ['Pemeliharaan Jaringan', 'Internet & Komunikasi'],
      desc: ['Memastikan koneksi', 'data operasional', 'berjalan lancar.'],
      risks: { operasional: 'Tinggi', aset: 'Sedang', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    },
    { 
      process: ['Kalibrasi &', 'Pemeliharaan Sensor', 'Meteorologi'],
      desc: ['Kalibrasi sensor', 'suhu, kelembaban,', 'tekanan udara, dll.'],
      risks: { operasional: 'Tinggi', aset: 'Tinggi', k3: 'Sedang', finansial: 'Sedang', hukum: 'Sedang' }
    }
  ];

  // --- DATA 2: DATIN (Berdasarkan PDF Program Kerja - Forecaster & Analisa) ---
  const datinData = [
    { 
      process: ['Analisa & Prakiraan', 'Cuaca Jangka Pendek', '(Forecasting)'],
      desc: ['Analisis citra satelit/radar,', 'pembuatan TAF,', 'prakiraan maritim,', 'dan peringatan dini.'],
      risks: { operasional: 'Tinggi', aset: 'Sedang', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
    },
    { 
      process: ['Diseminasi Informasi', 'Cuaca Publik'],
      desc: ['Penyebaran info', 'via sosial media,', 'website, dan', 'grup stakeholder.'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Tinggi' }
    },
    { 
      process: ['Pengolahan Data', 'Klimatologi &', 'Laporan Bulanan'],
      desc: ['Validasi data harian,', 'input database,', 'pembuatan buletin', 'analisa bulanan.'],
      risks: { operasional: 'Sedang', aset: 'Tinggi', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    },
    { 
      process: ['Pelayanan Jasa', 'Informasi (PTSP)'],
      desc: ['Melayani permintaan', 'data khusus dari', 'peneliti, instansi,', 'atau masyarakat.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Sedang', hukum: 'Sedang' }
    },
    { 
      process: ['Verifikasi Produk', 'Prakiraan'],
      desc: ['Membandingkan hasil', 'prakiraan dengan', 'data observasi', 'riil lapangan.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    },
    { 
      process: ['Monitoring Sistem', 'Display & CMSS'],
      desc: ['Memastikan data', 'tampil di layar', 'operasional dan', 'terkirim ke pusat.'],
      risks: { operasional: 'Tinggi', aset: 'Tinggi', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    }
  ];

  // Definisi Kolom Risiko
  const riskColumns = [
    { key: 'operasional', label: 'Risiko Operasional' },
    { key: 'aset', label: 'Risiko Aset & TI' },
    { key: 'k3', label: 'Risiko K3 (Safety)' },
    { key: 'finansial', label: 'Risiko Finansial' },
    { key: 'hukum', label: 'Risiko Kepatuhan' },
  ];

  // Helper untuk mendapatkan Data & Icon berdasarkan Dept yang dipilih
  const getActiveData = () => {
    switch(selectedDept) {
      case 'teknisi': return { data: teknisiData, label: 'TEKNISI', icon: <Settings size={20} /> };
      case 'datin': return { data: datinData, label: 'DATIN', icon: <Database size={20} /> };
      default: return { data: [], label: '', icon: null };
    }
  };

  // Handle Klik Kartu
  const handleCardClick = (id) => {
    if (id === 'teknisi' || id === 'datin') {
      setSelectedDept(id);
      setView('matrix');
      window.scrollTo(0, 0);
    } else {
      alert(`Data untuk ${id.toUpperCase()} belum tersedia di demo ini (Hanya Teknisi & Datin).`);
    }
  };

  const handleBack = () => {
    setView('dashboard');
    setSelectedDept(null);
  };

  // Helper untuk warna sel matriks
  const getRiskClass = (level) => {
    if (level === 'Tinggi') return 'risk-cell high';
    if (level === 'Sedang') return 'risk-cell medium';
    return 'risk-cell low';
  };

  const activeContent = getActiveData();

  return (
    <div className="risk-matrix-wrapper">
      
      {/* TAMPILAN 1: DASHBOARD MENU */}
      {view === 'dashboard' && (
        <>
          <div className="matrix-header">
            <h1>RISK DIAGRAM</h1>
            <p>Analisis Matriks Risiko Per Departemen</p>
          </div>

          <div className="dashboard-grid">
            {departments.map((dept) => (
              <div 
                key={dept.id} 
                className={`dept-card ${dept.colorClass}`}
                onClick={() => handleCardClick(dept.id)}
              >
                <div className="card-icon">{dept.icon}</div>
                <h3 className="card-title">{dept.label}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAMPILAN 2: MATRIKS TABLE (DINAMIS UNTUK TEKNISI & DATIN) */}
      {view === 'matrix' && activeContent.data.length > 0 && (
        <div className="matrix-view-container">
          <div className="matrix-top-bar">
            <button onClick={handleBack} className="btn-back">
              <ChevronLeft size={20} /> Kembali ke Dashboard
            </button>
            <div className="dept-badge">
              {activeContent.icon} {activeContent.label}
            </div>
          </div>

          <div className="matrix-header-small">
            <h2>Business Process - Risk Matrix</h2>
            <p>Peta risiko berdasarkan Program Kerja {activeContent.label} Tahun 2023</p>
          </div>

          <div className="table-scroll-container">
            <table className="risk-table">
              <thead>
                <tr>
                  <th className="sticky-corner">Business Process \ Risk</th>
                  {riskColumns.map((col) => (
                    <th key={col.key} className="sticky-header">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeContent.data.map((item, index) => (
                  <tr key={index}>
                    <td className="sticky-col">
                      <div className="proc-title">
                        {Array.isArray(item.process) ? (
                          item.process.map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < item.process.length - 1 && <br />}
                            </React.Fragment>
                          ))
                        ) : item.process}
                      </div>
                      <div className="proc-desc">
                        {Array.isArray(item.desc) ? (
                          item.desc.map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < item.desc.length - 1 && <br />}
                            </React.Fragment>
                          ))
                        ) : item.desc}
                      </div>
                    </td>
                    {riskColumns.map((col) => (
                      <td key={col.key} className={getRiskClass(item.risks[col.key])}>
                        {item.risks[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default RiskMatrix;