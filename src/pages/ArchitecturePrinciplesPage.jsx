import React, { useState } from 'react';

const ArchitecturePrinciplesPage = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Data Prinsip sesuai input kamu
  const principles = [
    {
      id: "BP1",
      category: "Business Principle",
      title: "Service Excellence",
      statement: "Mengutamakan pelayanan informasi meteorologi penerbangan yang handal dan terpercaya.",
      rationale: "Keselamatan penerbangan bergantung pada akurasi dan kecepatan informasi cuaca. Tidak ada toleransi untuk kesalahan data.",
      implication: "Sistem harus tersedia 24/7 (High Availability) dan SDM harus bersertifikat kompetensi."
    },
    {
      id: "GP1",
      category: "General Principle",
      title: "Standardization",
      statement: "Seluruh proses bisnis, data, dan teknologi harus mengacu pada standar internasional (ICAO & WMO).",
      rationale: "Penerbangan adalah industri global. Ketidakpatuhan pada standar internasional dapat menurunkan kredibilitas negara.",
      implication: "Audit kepatuhan regulasi harus dilakukan secara berkala dan sistem harus interoperable secara global."
    },
    {
      id: "BP2",
      category: "Business Principle",
      title: "Collaboration",
      statement: "Mengedepankan koordinasi aktif antar stakeholder (BMKG Pusat, Bandara, AirNav, Pemda).",
      rationale: "Informasi cuaca adalah rantai nilai yang melibatkan banyak pihak. Silo-silo informasi akan menghambat mitigasi bencana.",
      implication: "Diperlukan platform berbagi data yang terintegrasi antar instansi."
    },
    {
      id: "DP1",
      category: "Data Principle",
      title: "Data Quality",
      statement: "Fokus utama pada kualitas data dan informasi pengamatan sejak dari sumbernya.",
      rationale: "Data yang buruk (Garbage In) akan menghasilkan analisis yang menyesatkan (Garbage Out).",
      implication: "Perlu adanya validasi otomatis (Quality Control) pada setiap input data pengamatan."
    }
  ];

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 32px)',
          fontWeight: '700',
          color: '#1e3a8a',
          margin: '0 0 8px 0'
        }}>
          Architecture Principles
        </h1>
        <p style={{
          fontSize: 'clamp(13px, 3vw, 16px)',
          color: '#64748b',
          margin: 0
        }}>
          4 Pilar Prinsip EA Stasiun Meteorologi Sepinggan
        </p>
      </div>

      {/* Grid Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
        gap: '20px',
        padding: '0 8px'
      }}>
        {principles.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              transform: hoveredId === item.id ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoveredId === item.id 
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.15)' 
                : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            {/* Card Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <h3 style={{
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: '700',
                color: 'white',
                margin: 0
              }}>
                {item.title}
              </h3>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                {item.category}
              </span>
            </div>

            {/* Card Content */}
            <div style={{ padding: '20px' }}>
              {/* Statement */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#94a3b8',
                  letterSpacing: '0.5px',
                  marginBottom: '6px'
                }}>
                  STATEMENT
                </label>
                <p style={{
                  color: '#1e293b',
                  fontSize: 'clamp(13px, 3vw, 15px)',
                  fontWeight: '600',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {item.statement}
                </p>
              </div>

              {/* Rationale */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#94a3b8',
                  letterSpacing: '0.5px',
                  marginBottom: '6px'
                }}>
                  RATIONALE
                </label>
                <p style={{
                  color: '#475569',
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {item.rationale}
                </p>
              </div>

              {/* Implication Box */}
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '12px',
                borderRadius: '8px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#92400e',
                  letterSpacing: '0.5px',
                  marginBottom: '6px'
                }}>
                  IMPLICATION
                </label>
                <p style={{
                  color: '#78350f',
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontStyle: 'italic',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  "{item.implication}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitecturePrinciplesPage;