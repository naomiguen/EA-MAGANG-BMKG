import React from 'react';
import "./css/OrganizationDiagramPage.css"; 

const StakeholderPage = () => {
  const stakeholders = [
    { no: 1, name: "Kepala Stasiun", cat: "Internal", role: "Memimpin, menetapkan kebijakan stasiun, dan menandatangani dokumen strategis.", interest: "Keberhasilan visi stasiun, kepatuhan terhadap regulasi (ISO/SPBE), dan efisiensi anggaran." },
    { no: 2, name: "Kasubag Tata Usaha", cat: "Internal", role: "Mengelola administrasi, kepegawaian, keuangan, dan rumah tangga kantor.", interest: "Ketersediaan SDM kompeten, kelancaran logistik, dan pengelolaan aset kantor" },
    { no: 3, name: "Koordinator Bidang Observasi", cat: "Internal", role: "Mengkoordinasikan seluruh kegiatan pengamatan meteorologi permukaan dan udara atas.", interest: "Akurasi data mentah, ketepatan waktu berita METAR/SYNOP, dan keandalan instrumen." },
    { no: 4, name: "Koordinator Bidang Datin", cat: "Internal", role: "Mengelola analisis data, pembuatan prakiraan, dan diseminasi informasi cuaca.", interest: "Kecepatan distribusi peringatan dini dan kualitas layanan informasi publik" },
    { no: 5, name: "Petugas Forecaster (Prakirawan)", cat: "Internal", role: "Membuat prakiraan cuaca penerbangan, maritim, dan peringatan dini cuaca ekstrem.", interest: "Akses cepat ke data satelit/radar dan keandalan sistem aplikasi analisis." },
    { no: 6, name: "Petugas Observer (Pengamat)", cat: "Internal", role: "Melakukan pengamatan rutin 24 jam dan menyandi data menjadi berita meteorologi.", interest: "Kemudahan input data dan stabilitas peralatan operasional di taman alat" },
    { no: 7, name: "Teknisi Peralatan", cat: "Internal", role: "Melakukan pemeliharaan, perbaikan, dan kalibrasi peralatan teknologi pengamatan", interest: "Monitoring status alat secara real-time dan ketersediaan suku cadang teknis." },
    { no: 8, name: "Stakeholder Penerbangan (ATC/Pilot)", cat: "Eksternal", role: "Menggunakan informasi cuaca untuk keselamatan navigasi pesawat udara.", interest: "Akurasi dokumen penerbangan dan ketepatan waktu info cuaca bandara." },
    { no: 9, name: "Pemerintah Kota", cat: "Eksternal", role: "Menggunakan data BMKG untuk langkah mitigasi bencana di wilayah kota", interest: "Keandalan informasi peringatan dini untuk keselamatan masyarakat luas." },
    { no: 10, name: "Masyarakat Umum", cat: "Eksternal", role: "Mengonsumsi informasi cuaca harian melalui media sosial atau aplikasi mobile.", interest: "Kemudahan akses informasi yang mudah dipahami dan relevan dengan aktivitas harian." }
  ];

  return (
    <div className="orgPageWrapper">
      <div className="orgTopBar">
        <div>
          <div className="orgPageTitle">Stakeholder Catalog</div>
          <div className="orgMuted" style={{ fontSize: '0.9rem', marginTop: '4px' }}>
            Identifikasi peran dan kepentingan pemangku kepentingan BMKG Balikpapan
          </div>
        </div>
      </div>

      <div className="orgDiagramCardFull">
        <div className="orgDiagramHeader">
          <div>Stakeholder Matrix</div>
        </div>

        {/* WRAPPER: overflowX auto memungkinkan scroll di HP */}
        <div 
          className="orgDiagramCanvasFull" 
          style={{ 
            overflowX: 'auto', 
            WebkitOverflowScrolling: 'touch', // Scroll halus di iOS
            padding: '1rem' // Padding lebih kecil di mobile agar tabel lebih luas
          }}
        >
          <table style={{ 
            width: '100%', 
            minWidth: '900px', // KUNCI: Mencegah tabel menciut di layar kecil
            borderCollapse: 'collapse', 
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px #edf2f7' // Border tipis halus
          }}>
            <thead>
              <tr style={{ background: '#f0f4f8', borderBottom: '2px solid #2c5282' }}>
                <th style={styles.th}>No.</th>
                <th style={{ ...styles.th, minWidth: '150px' }}>Stakeholder</th>
                <th style={styles.th}>Kategori</th>
                <th style={{ ...styles.th, minWidth: '250px' }}>Peran Utama</th>
                <th style={{ ...styles.th, minWidth: '250px' }}>Kepentingan</th>
              </tr>
            </thead>
            <tbody>
              {stakeholders.map((item) => (
                <tr key={item.no} style={styles.tr}>
                  <td style={{ ...styles.td, textAlign: 'center', fontWeight: 'bold' }}>{item.no}</td>
                  <td style={{ ...styles.td, fontWeight: '800', color: '#1a1a1a' }}>{item.name}</td>
                  <td style={styles.td}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap', // Badge tidak terpotong baris
                      backgroundColor: item.cat === 'Internal' ? '#e6fffa' : '#faf5ff',
                      color: item.cat === 'Internal' ? '#2c7a7b' : '#6b46c1',
                      border: `1px solid ${item.cat === 'Internal' ? '#b2f5ea' : '#e9d8fd'}`
                    }}>
                      {item.cat}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: '#4a5568', lineHeight: '1.5' }}>{item.role}</td>
                  <td style={{ ...styles.td, color: '#4a5568', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{item.interest}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Info tambahan untuk user mobile */}
        <div style={{ padding: '8px 16px', fontSize: '0.7rem', color: '#999', textAlign: 'center', background: '#f9f9f9', borderTop: '1px solid #eee' }} className="mobile-only-hint">
            ← Geser tabel ke samping untuk melihat detail →
        </div>
      </div>
    </div>
  );
};

const styles = {
  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '0.85rem',
    fontWeight: '800',
    color: '#2c5282',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '16px',
    fontSize: '0.9rem',
    borderBottom: '1px solid #edf2f7',
    verticalAlign: 'top'
  },
  tr: {
    transition: 'background 0.2s ease'
  }
};

export default StakeholderPage;