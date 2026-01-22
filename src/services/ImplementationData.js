export const getStrategicMetrics = () => [
  { 
    metric: 'Akurasi Info Cuaca', 
    current: 85, 
    target: 94, 
    unit: '%',
    desc: 'Target akurasi pada tahun 2029'
  },
  { 
    metric: 'Nilai Reformasi Birokrasi', 
    current: 80, 
    target: 91, 
    unit: 'Poin',
    desc: 'Indikator tata kelola berkelas dunia'
  },
  { 
    metric: 'Indeks Kepuasan Masyarakat', 
    current: 3.5, 
    target: 4.0, 
    unit: 'Skala 4',
    desc: 'Layanan prima MKG'
  },
  { 
    metric: 'Kemandirian Teknologi', 
    current: 40, 
    target: 70, 
    unit: '%',
    desc: 'Produksi alat observasi dalam negeri'
  }
];

export const getRoadmapData = () => [
  {
    year: 2025,
    phase: 'Foundation & Modernization',
    color: 'bg-blue-600',
    description: 'Penguatan infrastruktur dasar dan transformasi digital awal.',
    items: [
      'Modernisasi Sistem Observasi (Radar, AWS, Seismograf)',
      'Implementasi Big Data & Cloud Private BMKG',
      'Revitalisasi InaTEWS (Sistem Peringatan Dini Tsunami)',
      'Penyusunan Arsitektur SPBE Terintegrasi',
      'Pilot Project "One Observation Policy"'
    ]
  },
  {
    year: 2027,
    phase: 'Acceleration & Integration',
    color: 'bg-teal-500',
    description: 'Percepatan integrasi sistem dan otomatisasi layanan.',
    items: [
      'Full Implementation of One Observation Policy',
      'High Performance Computing (HPC) Upgrade',
      'AI-Based Weather Prediction System',
      'Integrasi Layanan Penerbangan & Maritim (SIHYMET)',
      'Penguatan Regional Modelling Centre'
    ]
  },
  {
    year: 2029,
    phase: 'Global Player Achievement',
    color: 'bg-purple-600',
    description: 'Pencapaian visi Global Player dan layanan kelas dunia.',
    items: [
      'Global Center of Excellence MKG',
      'Kemandirian Teknologi Sistem Observasi Utama',
      'Layanan Cuaca Presisi (Impact-Based Forecast)',
      'Zero-Trust Security Architecture Full Deploy',
      'Pencapaian Akurasi 94% & RB 91'
    ]
  }
];

export const getGapAnalysisData = () => [
  {
    area: 'Observasi & Data',
    current: 'Alat observasi masih bergantung impor, data tersebar (silo)',
    target: 'Kemandirian alat (TKDN) & "One Observation Policy" terintegrasi',
    action: 'Rekayasa alat mandiri & sentralisasi Data Lake',
    impact: 'Critical'
  },
  {
    area: 'Sistem Peringatan Dini',
    current: 'Diseminasi multi-kanal belum terintegrasi penuh real-time',
    target: 'Next-Gen InaTEWS dengan AI & IoT based dissemination',
    action: 'Upgrade processing node & densifikasi sensor',
    impact: 'Critical'
  },
  {
    area: 'Infrastruktur IT',
    current: 'Server on-premise dengan skalabilitas terbatas',
    target: 'Hybrid Cloud dengan High Performance Computing (HPC) mutakhir',
    action: 'Migrasi infrastruktur ke Cloud & Pengadaan Supercomputer',
    impact: 'High'
  },
  {
    area: 'SDM & Organisasi',
    current: 'Keterbatasan talenta digital spesifik (Data Scientist/AI)',
    target: 'SDM berstandar global & organisasi Agile',
    action: 'Sekolah Lapang & Beasiswa S2/S3 bidang Meteorologi Lanjut',
    impact: 'Medium'
  }
];

// Data untuk Gantt Chart (dalam satuan semester, 1-10 untuk 5 tahun)
export const getChartData = () => [
  { name: 'Modernisasi Alat', type: 'Infrastructure', start: 1, end: 6 }, // 2025-2027
  { name: 'One Obs Policy', type: 'Data', start: 2, end: 8 }, // 2025-2028
  { name: 'HPC & AI System', type: 'Technology', start: 4, end: 10 }, // 2026-2029
  { name: 'Revitalisasi InaTEWS', type: 'Application', start: 1, end: 5 }, // 2025-2027
  { name: 'Talenta Global', type: 'Organization', start: 3, end: 10 }, // Ongoing
  { name: 'Kemandirian Produk', type: 'Infrastructure', start: 5, end: 10 } // 2027-2029
];