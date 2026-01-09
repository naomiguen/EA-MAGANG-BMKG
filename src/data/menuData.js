export const architectureData = {
    vision: [
      { id: 1, title: "Architecture Principles", type: "text" },
      { id: 2, title: "Architecture Goals", type: "text" },
      { id: 3, title: "Vision, Mission and Corporate Strategy", type: "text" },
      { id: 4, title: "Value Chain Diagram", type: "diagram", path: "/value-chain" },
      { id: 5, title: "Business Model Canvas", type: "text" },
      { id: 6, title: "Organization Decomposition Diagram", type: "diagram" },
      { id: 7, title: "Solution Concept Diagram", type: "diagram" },
      { id: 8, title: "Stakeholder Catalog", type: "text" }
    ],
    business: [
      { id: 1, title: "Business Principles", type: "text" },
      { id: 2, title: "Risk", type: "diagram" },
      { id: 3, title: "KPI", type: "text" },
      { id: 4, title: "Organizational Actor Catalog", type: "diagram" },
      { id: 5, title: "Functional Decomposition Diagram", type: "diagram" },
      { id: 6, title: "Business Process", type: "diagram" },
      { id: 7, title: "Business Interaction Diagram", type: "diagram" },
      { id: 8, title: "Corporate Governance", type: "diagram" },
      { id: 9, title: "Business Process - Risk Matrix", type: "matrix" },
      { id: 10, title: "Business Process - KPI Matrix", type: "matrix" },
      { id: 11, title: "Business Process - Data Matrix", type: "matrix" },
      { id: 12, title: "Business Process - Application Matrix", type: "matrix" }
    ],
    data: [
      { id: 1, title: "Data Principles", type: "text" },
      { id: 2, title: "Data Entity - Data Component Catalog", type: "diagram" },
      { id: 3, title: "Data Entity - Business Function Matrix", type: "matrix" },
      { id: 4, title: "Conceptual Data", type: "diagram" },
      { id: 5, title: "Logical Data Diagram", type: "diagram" }
    ],
    application: [
      { id: 1, title: "Application Principles", type: "text" },
      { id: 2, title: "Application Portfolio Catalog", type: "diagram" },
      { id: 3, title: "Application Use Case Diagram", type: "diagram" },
      { id: 4, title: "Application - Data Matrix", type: "matrix" },
      { id: 5, title: "Application - User and Location Diagram", type: "diagram" },
      { id: 6, title: "Application - Business Process Matrix", type: "matrix" },
      { id: 7, title: "Application - Communication Diagram", type: "diagram" },
      { id: 8, title: "Application - Classification Matrix", type: "matrix" },
      { id: 9, title: "Application - Organization Matrix", type: "matrix" }
    ],
    technology: [
      { id: 1, title: "Technology Principles", type: "text" },
      { id: 2, title: "Technology Standard Catalog", type: "diagram" },
      { id: 3, title: "Environment and Location Diagram", type: "diagram" },
      { id: 4, title: "Network Communication Diagram", type: "diagram" },
      { id: 5, title: "Technology - Application Matrix", type: "matrix" }
    ],
    implementation: [
      { id: 1, title: "Architecture Implementation Planning", type: "diagram" },
      { id: 2, title: "Architecture Governance", type: "diagram" }
    ]
  
};

export const valueChainData = {
  // --- 1. KOTAK INBOUND ---
  "B1": { 
    title: "Inbound Logistics (Akuisisi Data)",
    description: "Pengamatan Meteorologi Permukaan,  Pengamatan Udara Atas, Pengukuran Parameter Khusus (Hujan, Angin, Jarak Pandang, Penguapan), Monitoring Sistem Otomatis (AWOS), Melakukan persiapan pelepasan balon, pengisian gas hidrogen, dan pemasangan transmitter."
  },

  // --- 2. KOTAK OPERATIONS ---
  "B2": {
    title: "Operations (Pengolahan & Analisis)",
    description: "Pembuatan Sandi Cuaca Penerbangan, Pembuatan Sandi Sinoptik & Climat, Analisis Data Udara Atas, Verifikasi & Quality Control Data, Melakukan pengamatan manual menggunakan theodolite (Pilot Balon), memantau pesan dari sistem receiver (Radio Sonde), serta melakukan penyandian dan pengiriman kode melalui CMSS."
  },

  // --- 3. KOTAK OUTBOUND ---
  "B3": {
    title: "Outbound Logistics (Diseminasi)",
    description: "Penyebaran Aerodrome Forecast (TAF), Diseminasi Trend Landing Forecast (TTLF), Penyebaran Peringatan Dini Khusus, Distribusi Informasi Cuaca Ekstrem"
  },

  // --- 4. KOTAK MARKETING ---
  "B4": {
    title: "Marketing & Sales (Layanan Publik)",
    description: "Penyusunan Flight Documentation,  Briefing Cuaca Penerbangan, Penyediaan Dokumen Terjadwal, Nowcasting & Update Informasi"
  },

  // --- 5. KOTAK TEKNISI (SUPPORT) ---
  "B5": {
    title: "Technology Development (Teknisi)",
    description: "Pembatalan & Pemutakhiran Berita, Investigasi Kecelakaan"
  },

  "A1": { 
      title: "Pemeliharaan Infrastruktur Daya",
      description: "Melakukan pemeliharaan rutin dan pemanasan berkala (1x seminggu) pada Genset Kantor untuk memastikan cadangan listrik siap pakai serta Melakukan pemeliharaan khusus pada Genset Radar Cuaca, termasuk pembersihan ruang genset dan pemanasan manual jika sistem auto-warming mengalami gangguan."
    },

    "A2": { 
      title: "Perbaikan Sistem Komputer (IT Support)",
      description: "Melakukan perbaikan komprehensif pada sistem komputer operasional, baik dari sisi hardware maupun software."
    },

    "A3": { 
      title: "Dukungan Alat Pengamatan Khusus",
      description: "Mendukung operasional ARWS (Automatic Rain Water Sampler) melalui pengambilan sampel air hujan setiap hari Senin untuk diserahkan ke bagian TU dan dikirim ke pusat."
    },

    "A4": { 
      title: "Pengelolaan Fasilitas Energi",
      description: "Menjamin ketersediaan pasokan listrik cadangan melalui manajemen bahan bakar (solar) dan pengecekan komponen aki/radiator pada sistem genset."
    },

    "A5": { 
      title: "Manajemen Logistik Teknis",
      description: "Pengambilan dan pengelolaan stok barang teknis seperti balon, tali, transmitter, dan stiker dari bagian Tata Usaha untuk kebutuhan operasional udara atas."
    }
};

