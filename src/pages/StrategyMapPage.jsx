import React, { useState, } from "react";
import StrategySvgImage from "../components/StrategySvgImage";

const StrategyMapPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Database-like object with keys matching the SVG element IDs
  const strategyDetails = {
    "visi": {
      title: "Visi STASIUN METEOROLOGI KELAS I SULTAN AJI MUHAMMAD SULAIMAN SEPINGGAN BALIKPAPAN",
      desc: "Terwujudnya Stasiun Meteorologi  Kelas I Sultan Aji Muhammad Sulaiman Sepinggan Balikpapan Sebagai Sentra Pelayanan Informasi Meteorologi Penerbangan yang Handal dan Terpercaya guna mendukung Keselamatan Penerbangan. ",
    },
    Misi1: {
      title: "Misi 1: Pengamatan & Data",
      desc: "Mewujudkan peningkatan kualitas dan kuantitas pengamatan,  pengumpulan, penyebaran data dan informasi meteorologi penerbangan sesuai standar Internasional. ",
    },
    Misi2: {
      title: "Misi 2: Analisis & Pelayanan",
      desc: "Mewujudkan peningkatan kualitas analisis dan pelayanan informasi meteorologi penerbangan guna mendukung efisiensi dan keselamatan operasi penerbangan.",
    },
    Misi3: {
      title: "Misi 3: Koordinasi & Kerjasama",
      desc: "Mewujudkan koordinasi yang sinergis dengan BBMKG Wilayah III, Pemerintah Daerah, Otoritas Bandara, AirNav, dan Maskapai Penerbangan.",
    },
    MAS: {
      title: "Maximizing Aviation Safety",
      desc: "Tujuan Puncak: Memaksimalkan keselamatan penerbangan melalui sinergi pelayanan prima, kolaborasi strategis, dan modernisasi digital.",
    },

    pv1: {
      title: "PV1: Efisiensi Operasional Penerbangan",
      desc: "Mendukung efisiensi biaya operasional maskapai (fuel saving) dan bandara melalui informasi cuaca yang presisi, sehingga meminimalkan delay atau divert.",
    },
    pv2: {
      title: "PV2: Kepercayaan Publik",
      desc: "Membangun kepercayaan masyarakat dan komunitas penerbangan internasional terhadap kredibilitas dan transparansi layanan BMKG.",
    },
    pv3: {
      title: "PV3: Keselamatan Penerbangan",
      desc: "Menjamin keselamatan jiwa dan harta benda dalam operasi penerbangan dengan menyediakan peringatan dini cuaca buruk yang cepat dan akurat.",
    },

    C1: {
      title: "C1: High Satisfaction of Aviation Partners",
      desc: "Mencapai tingkat kepuasan tinggi dari mitra penerbangan (Maskapai & AirNav) melalui layanan informasi cuaca yang akurat dan tepat waktu.",
    },
    C2: {
      title: "C2: Compliance with International Standards",
      desc: "Memastikan seluruh produk dan layanan meteorologi mematuhi standar internasional (ICAO/WMO) serta regulasi nasional (CASR 174).",
    },
    C3: {
      title: "C3: Strong Collaborative Engagement",
      desc: "Membangun keterlibatan dan kerjasama yang kuat dengan stakeholder (Pemda, BNPB) dalam mitigasi bencana.",
    },

    IP1: { 
        title: "IP1: Standardized Observation & Analysis Process",
        desc: "Menerapkan proses pengamatan dan analisis cuaca yang terstandarisasi untuk menjamin konsistensi kualitas data.",
    },
    IP2: {
      title: "IP2: Effective Information Dissemination",
      desc: "Menjamin penyebaran informasi cuaca dan peringatan dini yang cepat, luas, dan efektif kepada seluruh pengguna.",
    },
    IP3: {
      title: "IP3: Integrated Data Management System",
      desc: "Mengelola sistem manajemen data yang terintegrasi untuk mendukung akurasi analisis dan kemudahan akses data.",
    },
    IP4: {
      title: "IP4: Implementasi Sistem Manajemen Mutu",
      desc: "Penerapan ISO 9001:2015 secara konsisten untuk menjamin mutu layanan.",
    },
    IP5: {
      title: "IP5: Reformasi Birokrasi & Tata Kelola",
      desc: "Meningkatkan akuntabilitas kinerja dan tata kelola pemerintahan yang baik (Good Governance).",
    },
    IP6: { 
      title: "IP6: Sistem Manajemen Keselamatan & K3",
      desc: "Menjamin keselamatan dan kesehatan kerja (K3) serta lingkungan kerja yang aman.",
    },
    HCTR: {
      title: "Human Capital & Technology Readiness",
      desc: "Kesiapan Modal Manusia dan Teknologi sebagai fondasi utama strategi.",
    },
    L1: {
      title: "L1: Digital & Technological Capability",
      desc: "Meningkatkan kapabilitas digital dan kesiapan teknologi (infrastruktur IT, radar, satelit) untuk mendukung operasional modern.",
    },
    L2: {
      title: "L2: Certified Professional Competency",
      desc: "Memastikan seluruh personil operasional memiliki sertifikasi kompetensi profesional (License) yang diakui secara internasional.",
    },
    L3: {
      title: "L3: Safety & Service Culture",
      desc: "Membangun budaya organisasi yang mengutamakan keselamatan (Safety First) dan pelayanan prima (Service Excellence).",
    },
    L4: {
      title: "L4: Adaptive Human Capital Management",
      desc: "Menerapkan manajemen SDM yang adaptif, termasuk pengelolaan talenta dan perencanaan karir yang dinamis.",
      kpi: "Indeks Keterlibatan Pegawai (Employee Engagement Index)"
    }
  };

  // Click handler passed to the SVG component
  const handleBoxClick = (e) => {
    // 1. Cek apakah fungsi ini terpanggil?
    console.log("KLIK DITERIMA DI PARENT! Elemen:", e.target.tagName);

    let current = e.target;
    let foundId = null;

    // 2. Loop memanjat ke atas cari ID
    while (current && current.tagName !== 'svg') {
      const id = current.getAttribute ? current.getAttribute('data-cell-id') : null;
      
      if (id) {
        console.log(`Cek ID: ${id}`);
        if (strategyDetails[id]) {
          foundId = id;
          break; // Ketemu!
        }
      }
      current = current.parentNode;
    }

    // 3. Buka Modal
    if (foundId) {
      console.log("MATCH! Buka Modal untuk:", foundId);
      setActiveId(foundId);
      setIsModalOpen(true);
    } else {
      console.log(" Gagal ketemu ID yang ada di database.");
    }
  };

  const activeInfo = activeId ? strategyDetails[activeId] : null;

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
        </h1>
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
          backgroundColor: 'rgba(15, 23, 42, 0.6)', // Overlay gelap kebiruan
          backdropFilter: 'blur(4px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setIsModalOpen(false)} // Klik luar untuk tutup
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Supaya klik dalam tidak menutup
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
            {/* 1. MODAL HEADER (BIRU TUA) */}
            <div style={{ 
              backgroundColor: '#1e40af', // Biru BMKG
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
                  width: '32px', height: '32px', borderRadius: '50%',
                  fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                &times;
              </button>
            </div>

            {/* 2. MODAL CONTENT */}
            <div style={{ padding: '24px' }}>
              {/* Deskripsi */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px', letterSpacing: '1px' }}>
                  DESKRIPSI STRATEGI
                </label>
                <p style={{ margin: 0, color: '#334155', lineHeight: '1.6', fontSize: '15px' }}>
                  {activeInfo.desc}
                </p>
              </div>
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