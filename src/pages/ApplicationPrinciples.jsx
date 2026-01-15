import React from 'react';
import './css/ApplicationPrinciples.css';

const principlesData = [
  {
    id: 1,
    title: "Interoperabilitas (Interoperability)",
    statement: "Aplikasi harus dirancang untuk dapat berkomunikasi dan bertukar data dengan sistem lain secara mudah melalui standar terbuka.",
    rationale: "Menghindari terjadinya silo data dan mendukung keterpaduan layanan pemerintah (SPBE) sesuai mandat Perpres 95/2018.",
    implication: "Wajib menggunakan API (RESTful/GraphQL) standar dan format data baku (JSON/XML).",
    source: "Perpres No. 95 Tahun 2018, Pasal 4"
  },
  {
    id: 2,
    title: "Berbasis Layanan (Service-Oriented)",
    statement: "Fungsionalitas aplikasi harus dipetakan langsung sebagai pendukung layanan publik atau administrasi pemerintahan.",
    rationale: "Memastikan setiap pengembangan aplikasi memiliki nilai manfaat (value) yang jelas bagi pengguna.",
    implication: "Arsitektur mengadopsi pendekatan Microservices atau SOA untuk fleksibilitas layanan.",
    source: "Perpres No. 95 Tahun 2018 (Prinsip SPBE)"
  },
  {
    id: 3,
    title: "Berbagi Pakai (Reusability)",
    statement: "Mengutamakan penggunaan komponen atau aplikasi umum yang sudah ada sebelum membangun yang baru.",
    rationale: "Efisiensi anggaran negara dan mencegah duplikasi aplikasi sejenis di lingkungan BMKG.",
    implication: "Cek ketersediaan Aplikasi Umum atau komponen UI/Logic yang reusable sebelum coding.",
    source: "Perpres No. 95 Tahun 2018, Pasal 36"
  },
  {
    id: 4,
    title: "Keamanan Sejak Desain (Security by Design)",
    statement: "Aspek keamanan informasi ditanamkan sejak tahap perancangan, bukan ditambahkan setelah aplikasi jadi.",
    rationale: "Menjaga kerahasiaan, keutuhan, dan ketersediaan data BMKG yang kritis (Keselamatan/Bencana).",
    implication: "Implementasi autentikasi (SSO), enkripsi data, dan validasi input yang ketat pada setiap layer.",
    source: "Perka BMKG No. 9 Tahun 2023"
  },
  {
    id: 5,
    title: "Kemandirian Platform (Platform Independence)",
    statement: "Aplikasi dapat berjalan di berbagai lingkungan perangkat keras dan sistem operasi.",
    rationale: "Menjamin keberlanjutan sistem jangka panjang dan kemudahan migrasi infrastruktur.",
    implication: "Gunakan teknologi berbasis Web (HTML5) dan Containerization (Docker) untuk deployment.",
    source: "Standar Teknis & Arsitektur Infrastruktur"
  },
  {
    id: 6,
    title: "Satu Data (Single Source of Truth)",
    statement: "Aplikasi harus merujuk pada sumber data yang valid dan tidak menciptakan duplikasi master data.",
    rationale: "Mendukung kebijakan Satu Data Indonesia untuk akurasi pengambilan keputusan.",
    implication: "Integrasi langsung dengan database master/wali data; hindari input ulang data referensi.",
    source: "Perpres No. 39 Tahun 2019"
  }
];

const ApplicationPrinciples = () => {
  return (
    <div className="ea-container">
      <header className="ea-header">
        <h1>Prinsip Arsitektur Aplikasi </h1>
        <p className="subtitle">Referensi: Perpres No. 95/2018 & Perka BMKG No. 9/2023</p>
      </header>
      
      <div className="principles-grid">
        {principlesData.map((principle) => (
          <div key={principle.id} className="principle-card">
            <div className="card-header">
              <span className="principle-badge">Prinsip #{principle.id}</span>
              <h3>{principle.title}</h3>
            </div>
            
            <div className="card-body">
              <div className="info-group">
                <label>Pernyataan:</label>
                <p>{principle.statement}</p>
              </div>
              
              <div className="info-group">
                <label>Rasional:</label>
                <p>{principle.rationale}</p>
              </div>
              
              <div className="info-group technical">
                <label>Implikasi Teknis:</label>
                <p>{principle.implication}</p>
              </div>
            </div>

            <div className="card-footer">
              <small>Sumber: {principle.source}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPrinciples;