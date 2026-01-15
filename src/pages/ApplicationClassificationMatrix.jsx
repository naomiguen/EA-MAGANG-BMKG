import React, { useState } from 'react';
import './css/ApplicationClassificationMatrix.css';

const ApplicationClassificationMatrix = () => {
  // Data diambil dari Lampiran Peraturan BMKG No 9 Tahun 2023 (Tabel 3. Metadata Domain Aplikasi)
  // Mencakup DAA (Domain Arsitektur Aplikasi)
  const applications = [
    // --- APLIKASI UMUM (General) ---
    {
      id: "DAA-05",
      name: "eSKM (Survei Kepuasan Masyarakat)",
      description: "Survei kepuasan masyarakat secara online untuk mengukur kualitas layanan publik.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Layanan Publik", // RAA.01.01
      owner: "Biro Perencanaan"
    },
    {
      id: "DAA-06",
      name: "Sincan",
      description: "Sistem Perencanaan Kinerja Tahunan (RKT) secara digital.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Administrasi Pemerintahan", // RAA.01.02
      owner: "Biro Perencanaan"
    },
    {
      id: "DAA-07",
      name: "JDIH BMKG",
      description: "Sistem Informasi untuk penyebarluasan produk hukum di lingkungan BMKG.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Layanan Publik", // RAA.01.01
      owner: "Biro Hukum dan Organisasi"
    },
    {
      id: "DAA-08",
      name: "e-Moreg",
      description: "Sistem monitoring regulasi untuk evaluasi progres penyusunan peraturan.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Administrasi Pemerintahan", // RAA.01.02
      owner: "Biro Hukum dan Organisasi"
    },
    {
      id: "DAA-10",
      name: "PTSP BMKG",
      description: "Platform Pengajuan Permohonan Pelayanan MKKuG (Kalibrasi, Konsultasi, Data) dari Publik.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Layanan Publik", // RAA.01.01
      owner: "Pusat Database"
    },
    {
      id: "DAA-11",
      name: "SI SKP",
      description: "Sistem Informasi Penilaian Kinerja Pegawai.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Administrasi Pemerintahan", // RAA.01.02
      owner: "Biro Umum dan SDM"
    },
    {
      id: "DAA-12",
      name: "SITUKIN / PRESMOB",
      description: "Mencatat kehadiran mobile dan menghitung tunjangan kinerja pegawai.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Administrasi Pemerintahan", // RAA.01.02
      owner: "Biro Umum dan SDM"
    },
    {
      id: "DAA-88",
      name: "Website BMKG",
      description: "Media publikasi informasi MKKuG dan perubahan iklim kepada masyarakat luas.",
      classificationLevel1: "Aplikasi Umum", // RAA.01
      classificationLevel2: "Layanan Publik", // RAA.01.01
      owner: "Pusat Database"
    },

    // --- APLIKASI KHUSUS (Specific) ---
    {
      id: "DAA-57",
      name: "INDARE",
      description: "Sistem penyedia informasi data rescue wilayah Indian Ocean (Data Historis).",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Misi Tertentu", // RAA.02.01
      owner: "Pusat Database"
    },
    {
      id: "DAA-58",
      name: "SACA&D",
      description: "Sistem informasi yang menyediakan data harian dan informasi iklim.",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Misi Tertentu", // RAA.02.01
      owner: "Pusat Database"
    },
    {
      id: "DAA-74",
      name: "API KHATULISTIWA",
      description: "Informasi peringatan dini potensi terjadinya kebakaran hutan dan lahan (Karhutla).",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Fungsi Tertentu", // RAA.02.02
      owner: "Pusat Database"
    },
    {
      id: "DAA-75",
      name: "InaNWP",
      description: "Sistem pemodelan cuaca numerik (WRF) dengan asimilasi data observasi.",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Fungsi Tertentu", // RAA.02.02
      owner: "Pusat Litbang"
    },
    {
      id: "DAA-87",
      name: "Signature",
      description: "Model spasial animasi prakiraan cuaca dan informasi prakiraan berbasis dampak.",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Misi Tertentu", // RAA.02.01
      owner: "Pusat Meteorologi Publik"
    },
    {
      id: "DAA-89",
      name: "Ina-TIS (Tide Information System)",
      description: "Sistem informasi prediksi pasang surut dan banjir rob (AWS Maritim).",
      classificationLevel1: "Aplikasi Khusus", // RAA.02
      classificationLevel2: "Layanan Publik", // Note unik: Aplikasi Khusus tapi melayani Publik
      owner: "Pusat Meteorologi Maritim"
    }
  ];

  const [filter, setFilter] = useState('All');

  const filteredApps = filter === 'All' 
    ? applications 
    : applications.filter(app => app.classificationLevel1 === filter);

  // Helper untuk warna badge status
  const getBadgeColor = (level2) => {
    if (level2.includes("Administrasi")) return "badge-admin";
    if (level2.includes("Layanan Publik")) return "badge-public";
    if (level2.includes("Tertentu")) return "badge-mission";
    return "badge-default";
  };

  return (
    <div className="ea-container">
      <header className="ea-header">
        <h1>Classification Matrix</h1>
        <p>Klasifikasi Domain Arsitektur Aplikasi (DAA) berdasarkan Peraturan BMKG No. 9 Tahun 2023</p>
      </header>

      <div className="ea-controls">
        <button 
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`} 
          onClick={() => setFilter('All')}
        >
          Semua Aplikasi ({applications.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'Aplikasi Umum' ? 'active' : ''}`} 
          onClick={() => setFilter('Aplikasi Umum')}
        >
          Aplikasi Umum (Berbagi Pakai)
        </button>
        <button 
          className={`filter-btn ${filter === 'Aplikasi Khusus' ? 'active' : ''}`} 
          onClick={() => setFilter('Aplikasi Khusus')}
        >
          Aplikasi Khusus (Spesifik)
        </button>
      </div>

      <div className="matrix-wrapper">
        <table className="ea-matrix-table">
          <thead>
            <tr>
              <th style={{width: '80px'}}>Kode DAA</th>
              <th style={{width: '200px'}}>Nama Aplikasi</th>
              <th>Deskripsi & Fungsi</th>
              <th style={{width: '150px'}}>Klasifikasi (L1)</th>
              <th style={{width: '180px'}}>Domain (L2)</th>
              <th style={{width: '150px'}}>Unit Pengelola</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app, index) => (
              <tr key={index}>
                <td className="col-id">{app.id}</td>
                <td className="col-name">{app.name}</td>
                <td className="col-desc">{app.description}</td>
                <td>
                  <span className={`badge level-1 ${app.classificationLevel1 === 'Aplikasi Umum' ? 'aplikasi-umum' : 'aplikasi-khusus'}`}>
                    {app.classificationLevel1}
                  </span>
                </td>
                <td>
                  <span className={`badge level-2 ${getBadgeColor(app.classificationLevel2)}`}>
                    {app.classificationLevel2}
                  </span>
                </td>
                <td className="col-owner">{app.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer className="ea-footer">
        <p>Total Aplikasi terdata: {applications.length} item. Sumber: Lampiran Perka BMKG 9/2023 Tabel 3.</p>
      </footer>
    </div>
  );
};

export default ApplicationClassificationMatrix;