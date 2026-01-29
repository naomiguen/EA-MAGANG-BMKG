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

  // --- DATA 1: TEKNISI ---
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

  // --- DATA 2: DATIN ---
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

  // --- DATA 3: OBSERVASI ---
  const observasiData = [
    {
      process: ['Pengamatan Meteorologi', 'Permukaan (Surface)', '24 Jam'],
      desc: ['Observasi unsur cuaca', '(suhu, tekanan,', 'angin, visibility)', 'tiap jam selama 24 jam.'],
      risks: { operasional: 'Tinggi', aset: 'Sedang', k3: 'Sedang', finansial: 'Rendah', hukum: 'Sedang' }
    },
    {
      process: ['Penyandian &', 'Pengiriman Data', 'Synop (GBON)'],
      desc: ['Coding data synop', 'sesuai standar WMO', 'dan pengiriman', 'tepat waktu.'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Tinggi' }
    },
    {
      process: ['Pengamatan Cuaca', 'Penerbangan &', 'Monitoring AWOS'],
      desc: ['Laporan METAR/SPECI,', 'monitoring display', 'AWOS, dan', 'validasi data otomatis.'],
      risks: { operasional: 'Tinggi', aset: 'Tinggi', k3: 'Rendah', finansial: 'Rendah', hukum: 'Tinggi' }
    },
    {
      process: ['Pengiriman Data', 'via AFTN'],
      desc: ['Memastikan data', 'metar/speci terkirim', 'ke server AFTN', 'selama 24 jam.'],
      risks: { operasional: 'Tinggi', aset: 'Sedang', k3: 'Rendah', finansial: 'Rendah', hukum: 'Tinggi' }
    },
    {
      process: ['Pengelolaan Database', 'Meteorologi'],
      desc: ['Pengarsipan data', 'harian (Logbook)', 'dan backup digital', 'ke database server.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Rendah' }
    }
  ];

  // --- DATA 4: TATA USAHA ---
  const tuData = [
    {
      process: ['Pengelolaan SDM &', 'Kepegawaian'],
      desc: ['Proses cuti,', 'kenaikan pangkat/gaji,', 'serta perhitungan', 'tunjangan kinerja.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Sedang', hukum: 'Sedang' }
    },
    {
      process: ['Pelaksanaan DIPA &', 'Pelaporan Keuangan'],
      desc: ['Penyusunan anggaran,', 'revisi DIPA,', 'pembayaran tagihan,', 'dan laporan SPJ.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Tinggi', hukum: 'Tinggi' }
    },
    {
      process: ['Pengelolaan BMN', '(Barang Milik Negara)'],
      desc: ['Inventarisasi aset,', 'laporan SIMAK BMN,', 'dan opname fisik', 'barang.'],
      risks: { operasional: 'Sedang', aset: 'Tinggi', k3: 'Rendah', finansial: 'Sedang', hukum: 'Sedang' }
    },
    {
      process: ['Pengelolaan Kearsipan', '& Persuratan'],
      desc: ['Administrasi surat', 'masuk/keluar dan', 'penataan arsip', 'dinamis/statis.'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
    },
    {
      process: ['Urusan Rumah Tangga', '& Kebersihan'],
      desc: ['Pemeliharaan gedung,', 'pembayaran listrik/air,', 'dan kebersihan', 'lingkungan kantor.'],
      risks: { operasional: 'Sedang', aset: 'Sedang', k3: 'Sedang', finansial: 'Rendah', hukum: 'Rendah' }
    }
  ];

  // --- DATA 5: WMM (QUALITY CONTROL / ISO) ---
  const wmmData = [
    {
      process: ['Audit Internal', 'ISO 9001:2015'],
      desc: ['Perencanaan audit,', 'pelaksanaan audit', 'internal, dan', 'pelaporan temuan (NC).'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Tinggi' }
    },
    {
      process: ['Rapat Tinjauan', 'Manajemen (RTM)'],
      desc: ['Evaluasi kinerja', 'tahunan, tindak lanjut', 'audit, dan', 'sasaran mutu.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
    },
    {
      process: ['Survei Kepuasan', 'Masyarakat (IKM)'],
      desc: ['Menyebarkan kuesioner', 'kepada stakeholder', 'dan analisa', 'indeks kepuasan.'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
    },
    {
      process: ['Pengendalian', 'Dokumen & SOP'],
      desc: ['Validasi SOP baru,', 'distribusi dokumen,', 'dan penarikan', 'dokumen usang.'],
      risks: { operasional: 'Tinggi', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
    },
    {
      process: ['Penanganan Keluhan', '& Tindakan Korektif'],
      desc: ['Merespon aduan', 'user/masyarakat dan', 'memastikan perbaikan', 'sistem dilakukan.'],
      risks: { operasional: 'Sedang', aset: 'Rendah', k3: 'Rendah', finansial: 'Rendah', hukum: 'Sedang' }
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
      case 'observasi': return { data: observasiData, label: 'OBSERVASI', icon: <Eye size={20} /> };
      case 'tu': return { data: tuData, label: 'TATA USAHA', icon: <FileText size={20} /> };
      case 'wmm': return { data: wmmData, label: 'WMM (Quality)', icon: <ShieldCheck size={20} /> }; // CASE DITAMBAHKAN
      default: return { data: [], label: '', icon: null };
    }
  };

  // Handle Klik Kartu
  const handleCardClick = (id) => {
    // UPDATED: Semua ID sudah diizinkan
    if (['teknisi', 'datin', 'observasi', 'tu', 'wmm'].includes(id)) {
      setSelectedDept(id);
      setView('matrix');
      window.scrollTo(0, 0);
    } else {
      alert(`Data untuk ${id.toUpperCase()} belum tersedia.`);
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

      {/* TAMPILAN 2: MATRIKS TABLE */}
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