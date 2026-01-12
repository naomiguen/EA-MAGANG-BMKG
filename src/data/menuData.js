export const architectureData = {

  vision: [
    { id: 1, title: "Architecture Principles", type: "text" },
    { id: 2, title: "Architecture Goals", type: "text" },
    { id: 3, title: "Vision, Mission and Corporate Strategy", type: "diagram" },
    { id: 4, title: "Value Chain Diagram", type: "diagram" },
    { id: 5, title: "Business Model Canvas", type: "diagram" },
    { id: 6, title: "Organization Decomposition Diagram", type: "diagram" },
    { id: 7, title: "Solution Concept Diagram", type: "diagram" },
    { id: 8, title: "Stakeholder Catalog", type: "diagram" }
  ],
  business: [
    { id: 1, title: "Business Principles", type: "text" },
    { id: 2, title: "Risk", type: "diagram" },
    { id: 3, title: "KPI", type: "diagram" },
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
    { id: 2, title: "Data Entity - Data Component Catalog", type: "Catalog" },
    { id: 3, title: "Conceptual Data Diagram", type: "diagram" },
    { id: 4, title: "Logical Data Diagram", type: "diagram" },
    { id: 5, title: "Data Entity - Business Function Matrix", type: "matrix" },
    { id: 6, title: "Application - Data Matrix", type: "matrix" },
  ],
  application: [
    { id: 1, title: "Application Principles", type: "text" },
    { id: 2, title: "Application Portfolio Catalog", type: "catalog" },
    { id: 3, title: "Application Use Case Diagram", type: "diagram" },
    { id: 4, title: "Application - Portofolio Assessment", type: "diagram" },
    { id: 5, title: "Application - User and Location Diagram", type: "diagram" },
    { id: 6, title: "Application - Communication Diagram", type: "diagram" },
    { id: 7, title: "Application - Business Process Matrix", type: "matrix" },
    { id: 8, title: "Application - Classification Matrix", type: "matrix" },
    { id: 9, title: "Application - Organization Matrix", type: "matrix" }
  ],
  technology: [
    { id: 1, title: "Technology Principles", type: "text" },
    { id: 2, title: "Technology Standard Catalog", type: "catalog" },
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
    title: "Observasi",
    description: "Aktivitas pengumpulan data mentah cuaca yang menjadi bahan baku utama. Melakukan pengamatan unsur cuaca permukaan (Suhu, Tekanan, Angin) dan udara atas (Pilot Balon/Radiosonde) secara real-time dan terjadwal 24 jam untuk menghasilkan data dasar (SYNOP/METAR)."
  },

  // --- 2. KOTAK OPERATIONS ---
  "B2": {
    title: "Data dan Informasi",
    description: "Aktivitas pengolahan, analisis, dan pembuatan produk prakiraan. Mengolah data observasi menjadi produk bernilai tambah seperti Prakiraan Cuaca Penerbangan (TAF/Trend), Peringatan Dini Cuaca Ekstrem (Warning), dan Dokumen Penerbangan (Flight Docs) menggunakan sistem pemrosesan data ."
  },

  // --- 3. KOTAK OUTBOUND ---
  "B3": {
    title: "Multimedia",
    description: "Aktivitas pengemasan visual dan diseminasi (penyebaran) informasi kepada publik. Mengelola penyebaran informasi melalui kanal digital (Website, Media Sosial), membuat infografis/videografis cuaca yang mudah dipahami masyarakat, serta pelayanan informasi publik satu pintu"
  },

  "A1": { 
    title: "Infrastruktur",
    description: "Pengelolaan sarana fisik dan fasilitas"
  },

  "A2": { 
    title: "Sumber Daya Manusia",
    description: "Pengelolaan tenaga kerja operasional dan administratif."
  },

  "A3": { 
    title: "Pengembangan Teknologi",
    description: "Pemeliharaan dan peningkatan kapabilitas sistem peralatan teknis."
  }
};