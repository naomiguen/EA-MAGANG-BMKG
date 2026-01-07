import React, { useState, useEffect } from "react";
import StrategySvgImage from "../components/StrategySvgImage";

const StrategyMapPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Database-like object with keys matching the SVG element IDs
  const strategyDetails = {
    visi: {
      title: "Visi: Sentra Informasi Meteorologi Penerbangan",
      desc: "Menjadi pusat informasi meteorologi penerbangan yang andal, akurat, dan tepat waktu untuk mendukung keselamatan udara dan layanan publik.",
      kpi: "Indeks Kepuasan Stakeholder ≥ 90%"
    },
    Misi1: {
      title: "Misi 1: Pengamatan & Pelayanan",
      desc: "Meningkatkan kualitas pengamatan dan penyebaran informasi meteorologi penerbangan sesuai standar internasional.",
      kpi: "Tingkat ketersediaan data ≥ 99%"
    },
    Misi2: {
      title: "Misi 2: SDM",
      desc: "Mengembangkan kompetensi sumber daya manusia melalui pelatihan dan sertifikasi.",
      kpi: "% SDM tersertifikasi ≥ 80%"
    },
    Misi3: {
      title: "Misi 3: Kolaborasi",
      desc: "Memperkuat koordinasi dengan stakeholder untuk layanan meteorologi yang terintegrasi.",
      kpi: "Jumlah inisiatif kolaborasi tahunan ≥ 4"
    },

    PV1: {
      title: "PV1: Efisiensi Operasional",
      desc: "Optimalisasi proses agar layanan meteorologi lebih cepat dan andal.",
      kpi: "Waktu rata-rata respon layanan ≤ 30 menit"
    },
    PV2: {
      title: "PV2: Kepercayaan Publik",
      desc: "Meningkatkan transparansi dan akurasi informasi kepada publik.",
      kpi: "Tingkat kepercayaan publik ≥ 85%"
    },
    PV3: {
      title: "PV3: Keselamatan Penerbangan",
      desc: "Memberikan informasi yang mencegah risiko dan meningkatkan keselamatan penerbangan.",
      kpi: "Insiden terkait informasi meteorologi = 0"
    },

    C1: {
      title: "C1: Pelayanan Akurat",
      desc: "Memberikan informasi yang tepat dan dapat diandalkan untuk pengguna penerbangan.",
      kpi: "Akurasi laporan ≥ 95%"
    },
    C2: {
      title: "C2: Responsif",
      desc: "Menanggapi kebutuhan pengguna secara cepat dan tepat.",
      kpi: "Waktu tanggapan rata-rata ≤ 15 menit"
    },
    C3: {
      title: "C3: Inovasi Layanan",
      desc: "Mengembangkan layanan digital untuk pengalaman pengguna yang lebih baik.",
      kpi: "Peluncuran fitur baru per tahun ≥ 2"
    },

    IP1: { title: "IP1: Standarisasi Proses", desc: "Menyusun dan menerapkan SOP operasi inti.", kpi: "% kepatuhan SOP ≥ 95%" },
    IP2: { title: "IP2: Quality Control", desc: "Kontrol kualitas data pengamatan.", kpi: "Kesalahan data ≤ 1%" },
    IP3: { title: "IP3: Integrasi Sistem", desc: "Integrasi antar-sistem untuk alur kerja efisien.", kpi: "Waktu proses antar-sistem ≤ 2 detik" },
    IP4: { title: "IP4: Infrastruktur Teknis", desc: "Memastikan ketersediaan perangkat keras dan jaringan.", kpi: "Uptime infrastruktur ≥ 99.5%" },
    IP5: { title: "IP5: Manajemen Data", desc: "Manajemen dan keamanan data pengamatan.", kpi: "Kepatuhan keamanan data 100%" },
    IP6: { title: "IP6: Pemeliharaan & Support", desc: "Pelaksanaan pemeliharaan terjadwal.", kpi: "Tingkat pemeliharaan tepat waktu ≥ 95%" },

    L1: { title: "L1: Pelatihan Teknis", desc: "Program pengembangan kompetensi teknis.", kpi: "Jam pelatihan per karyawan ≥ 40/jam" },
    L2: { title: "L2: Pengembangan Kepemimpinan", desc: "Membangun kompetensi manajerial.", kpi: "% manajer tersertifikasi ≥ 60%" },
    L3: { title: "L3: Budaya Inovasi", desc: "Mendorong ide dan perbaikan berkelanjutan.", kpi: "Jumlah ide terimplementasi ≥ 10/tahun" },
    L4: { title: "L4: Kesejahteraan SDM", desc: "Program kesejahteraan dan retensi karyawan.", kpi: "Tingkat retensi SDM ≥ 90%" }
  };

  // Click handler passed to the SVG component
  const handleBoxClick = (e) => {
    const target = e.target.closest('[data-cell-id]'); 
    
    if (target) {
      // Ambil nilai ID-nya
      const id = target.getAttribute('data-cell-id');
      console.log("ID Ditemukan:", id);


      if (strategyDetails[id]) {
        setActiveId(id);
        setIsModalOpen(true);
      } else {
        console.log("ID ada di Gambar tapi tidak ada di Database:", id);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveId(null);
  };

  // Close modal with Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    if (isModalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const activeInfo = activeId ? strategyDetails[activeId] : null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      padding: '18px',
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      overflow: 'hidden'
    }}>

      <div style={{ marginBottom: '14px', textAlign: 'center', flexShrink: 0 }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
          Strategy Map
        </h1>
        <p style={{ fontSize: '13px', color: '#475569', margin: '8px 0 0 0' }}>
          Klik kotak pada diagram untuk melihat Title, Deskripsi, dan KPI
        </p>
      </div>

      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(2,6,23,0.08)',
        border: '1px solid #e6eef8',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 24
        }}>
            <div style={{ width: '100%', maxWidth: 1200 }}>
            <StrategySvgImage onClick={handleBoxClick} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && activeInfo && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(2,6,23,0.55)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              width: '100%',
              maxWidth: 640,
              maxHeight: '84vh',
              overflow: 'auto',
              padding: 28,
              boxShadow: '0 20px 40px rgba(2,6,23,0.2)',
              position: 'relative',
              transition: 'transform 220ms ease, opacity 220ms ease',
              transform: 'translateY(0)',
              opacity: 1
            }}
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#eef2ff',
                color: '#1e40af',
                cursor: 'pointer',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            <div style={{ marginBottom: 18, marginTop: 4 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0b2545' }}>{activeInfo.title}</h3>
            </div>

            {activeInfo.desc && (
              <div style={{ marginBottom: 18 }}>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{activeInfo.desc}</p>
              </div>
            )}

            {activeInfo.kpi && (
              <div style={{ backgroundColor: '#eefdf6', padding: 16, borderRadius: 10, border: '1px solid #bbf0d0' }}>
                <p style={{ margin: 0, color: '#065f46', fontWeight: 700 }}>🎯 KPI</p>
                <p style={{ margin: '6px 0 0 0', color: '#064e3b', fontWeight: 600 }}>{activeInfo.kpi}</p>
              </div>
            )}
          </div>

          <style>{`\n            @keyframes fadeInModal {\n              from { opacity: 0; transform: translateY(-8px); }\n              to { opacity: 1; transform: translateY(0); }\n            }\n          `}</style>
        </div>
      )}
    </div>
  );
};

export default StrategyMapPage;