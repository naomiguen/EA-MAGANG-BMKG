import React, { useState } from "react";

const StrategyMapPage = () => {
  const [activeId, setActiveId] = useState(null);


  const strategyDetails = {
    // LAYER 1: PUBLIC VALUE
    "pv_zero": {
      title: "PV2: ZERO ACCIDENT (Keselamatan)",
      desc: "Target Puncak: Memastikan nihil kecelakaan penerbangan yang disebabkan oleh faktor cuaca di wilayah bandara Sepinggan.",
      kpi: "Jumlah Kecelakaan Akibat Cuaca = 0 Kasus/Tahun"
    },
    "pv_trust": {
      title: "PV3: Public Trust & Reputation",
      desc: "Membangun kepercayaan dunia internasional bahwa Bandara Sepinggan aman dan memiliki standar meteorologi kelas dunia.",
      kpi: "Indeks Kepuasan Masyarakat > 3.5 (Skala 4)"
    },
    "pv_efficiency": {
      title: "PV1: Efisiensi Operasional",
      desc: "Mendukung maskapai meminimalkan biaya bahan bakar (holding time) dengan memberikan data cuaca real-time dan akurat.",
      kpi: "Akurasi Forecast Cuaca Bandara > 90%"
    },

    // LAYER 2: CUSTOMER
    "c_aviation": {
      title: "C1: Kepuasan Mitra Penerbangan",
      desc: "Memastikan Pilot, ATC (AirNav), dan Ground Handling mendapatkan informasi cuaca tepat waktu (< 2 menit).",
      kpi: "Customer Satisfaction Index (Aviation) > 85%"
    },
    "c_compliance": {
      title: "C2: Kepatuhan Standar Internasional",
      desc: "Seluruh produk layanan wajib mematuhi regulasi ICAO Annex 3 dan WMO Technical Regulations.",
      kpi: "Temuan Audit ISO/ICAO = 0 (Zero Finding)"
    },
    "c_collab": {
      title: "C3: Kolaborasi Stakeholder",
      desc: "Sinergi kuat dengan Pemda, BPBD, dan BBMKG Wilayah III dalam mitigasi bencana hidrometeorologi.",
      kpi: "Jumlah Kegiatan Koordinasi Rutin > 4 kali/tahun"
    },

    // LAYER 3: INTERNAL PROCESS
    "ip_obs": {
      title: "IP1: Standardized Observation Process",
      desc: "Menjalankan SOP pengamatan cuaca (METAR/SPECI) secara disiplin, presisi, dan bebas error.",
      kpi: "% Ketersediaan Data Observasi = 100%"
    },
    "ip_info": {
      title: "IP2: Effective Dissemination",
      desc: "Sistem penyebaran informasi yang cepat melalui berbagai kanal (Citra Satelit, Website, Display Bandara).",
      kpi: "Waktu Diseminasi Peringatan Dini < 5 Menit"
    },
    "ip_data": {
      title: "IP3: Integrated Data System",
      desc: "Modernisasi pengelolaan data dari pencatatan manual ke database digital terpusat (Big Data & AI).",
      kpi: "Uptime Server Database > 99.5%"
    },

    // STRATEGIC ENABLERS (Horizontal Bars)
    "se_iso": {
      title: "SE1: Quality Management (ISO 9001)",
      desc: "Implementasi sistem manajemen mutu untuk menjamin konsistensi layanan.",
      kpi: "Sertifikasi ISO 9001:2015 Terpertahankan"
    },
    "se_k3": {
      title: "SE3: Safety Management (K3)",
      desc: "Penerapan K3 untuk menjamin keselamatan teknisi dan observer saat bertugas.",
      kpi: "Zero Accident Kerja (Internal)"
    },

    // LAYER 4: LEARNING & GROWTH
    "lg_tech": {
      title: "L1: Digital & Tech Capability",
      desc: "Kesiapan infrastruktur TI (Radar, AWS) dan kemampuan SDM menguasai teknologi terbaru.",
      kpi: "Kondisi Alat Laik Operasi > 95%"
    },
    "lg_competency": {
      title: "L2: Certified Competency",
      desc: "Seluruh personel operasional wajib memiliki lisensi/sertifikat kompetensi sesuai standar WMO.",
      kpi: "% Pegawai Bersertifikat Kompetensi = 100%"
    },
    "lg_culture": {
      title: "L3: Safety & Service Culture",
      desc: "Membangun budaya kerja yang mengutamakan keselamatan dan respon cepat (Responsive).",
      kpi: "Indeks Budaya Organisasi (BerAKHLAK) > Baik"
    }
  };

  // Fungsi saat kotak diklik
  const handleBoxClick = (e) => {
    // Mencari elemen <g> terdekat yang punya ID
    const target = e.target.closest("g"); 
    if (target && strategyDetails[target.id]) {
      setActiveId(target.id);
    } else {
      setActiveId(null);
    }
  };

  const activeInfo = activeId ? strategyDetails[activeId] : null;

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 font-sans">
      
      {/* HEADER PAGE */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Strategy Map: BMKG Balikpapan</h1>
        <p className="text-sm text-gray-500">Klik pada kotak strategi untuk melihat detail KPI & Deskripsi</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        
        {/* === AREA KIRI: DIAGRAM SVG === */}
        <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 overflow-auto p-4 relative">
          
          <svg viewBox="0 0 850 780" onClick={handleBoxClick} className="w-full h-auto cursor-pointer select-none">
            
            <defs>
              {/* Definisi Panah */}
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
              {/* Filter Shadow buat kotak biar keren */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.1"/>
              </filter>
            </defs>

            {/* --- LAYER 1: PUBLIC VALUE (MERAH) --- */}
            <rect x="20" y="20" width="810" height="130" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            <text x="425" y="45" textAnchor="middle" fontWeight="bold" fill="#b91c1c" fontSize="14">PUBLIC VALUE PERSPECTIVE (MAXIMIZING SAFETY)</text>

            <g id="pv_efficiency" filter="url(#shadow)">
              <rect x="50" y="60" width="200" height="70" rx="6" fill="white" stroke="#ef4444" strokeWidth="2" />
              <text x="150" y="90" textAnchor="middle" fontSize="12" fontWeight="bold">PV1: Efisiensi</text>
              <text x="150" y="105" textAnchor="middle" fontSize="11">Operasional</text>
            </g>
            <g id="pv_zero" filter="url(#shadow)">
              <rect x="290" y="55" width="270" height="80" rx="6" fill="#fff1f2" stroke="#dc2626" strokeWidth="3" />
              <text x="425" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">PV2: ZERO ACCIDENT</text>
              <text x="425" y="110" textAnchor="middle" fontSize="11" fill="#7f1d1d">Terkait Cuaca</text>
            </g>
            <g id="pv_trust" filter="url(#shadow)">
              <rect x="600" y="60" width="200" height="70" rx="6" fill="white" stroke="#ef4444" strokeWidth="2" />
              <text x="700" y="90" textAnchor="middle" fontSize="12" fontWeight="bold">PV3: Public Trust</text>
              <text x="700" y="105" textAnchor="middle" fontSize="11">Reputasi Global</text>
            </g>


            {/* --- LAYER 2: CUSTOMER (ABU) --- */}
            <rect x="20" y="180" width="810" height="110" rx="10" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" />
            <text x="425" y="200" textAnchor="middle" fontWeight="bold" fill="#4b5563" fontSize="14">CUSTOMER / STAKEHOLDER PERSPECTIVE</text>

            <g id="c_aviation" filter="url(#shadow)">
              <rect x="50" y="215" width="220" height="60" rx="6" fill="white" stroke="#4b5563" strokeWidth="2" />
              <text x="160" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">C1: Kepuasan Mitra</text>
              <text x="160" y="255" textAnchor="middle" fontSize="11">Penerbangan</text>
            </g>
            <g id="c_compliance" filter="url(#shadow)">
              <rect x="315" y="215" width="220" height="60" rx="6" fill="white" stroke="#4b5563" strokeWidth="2" />
              <text x="425" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">C2: Compliance</text>
              <text x="425" y="255" textAnchor="middle" fontSize="11">Standar Internasional</text>
            </g>
            <g id="c_collab" filter="url(#shadow)">
              <rect x="580" y="215" width="220" height="60" rx="6" fill="white" stroke="#4b5563" strokeWidth="2" />
              <text x="690" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">C3: Kolaborasi</text>
              <text x="690" y="255" textAnchor="middle" fontSize="11">Stakeholder Kuat</text>
            </g>


            {/* --- LAYER 3: INTERNAL PROCESS (BIRU) --- */}
            <rect x="20" y="320" width="810" height="110" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <text x="425" y="340" textAnchor="middle" fontWeight="bold" fill="#1e40af" fontSize="14">INTERNAL PROCESS PERSPECTIVE</text>

            <g id="ip_obs" filter="url(#shadow)">
              <rect x="50" y="355" width="220" height="60" rx="6" fill="white" stroke="#2563eb" strokeWidth="2" />
              <text x="160" y="380" textAnchor="middle" fontSize="12" fontWeight="bold">IP1: Standardized Obs.</text>
              <text x="160" y="395" textAnchor="middle" fontSize="11">& Analysis Process</text>
            </g>
            <g id="ip_info" filter="url(#shadow)">
              <rect x="315" y="355" width="220" height="60" rx="6" fill="white" stroke="#2563eb" strokeWidth="2" />
              <text x="425" y="380" textAnchor="middle" fontSize="12" fontWeight="bold">IP2: Effective</text>
              <text x="425" y="395" textAnchor="middle" fontSize="11">Info Dissemination</text>
            </g>
            <g id="ip_data" filter="url(#shadow)">
              <rect x="580" y="355" width="220" height="60" rx="6" fill="white" stroke="#2563eb" strokeWidth="2" />
              <text x="690" y="380" textAnchor="middle" fontSize="12" fontWeight="bold">IP3: Integrated</text>
              <text x="690" y="395" textAnchor="middle" fontSize="11">Data Management</text>
            </g>


            {/* --- STRATEGIC ENABLERS (BARIS HIJAU TOSCA) --- */}
            <rect x="20" y="450" width="810" height="90" rx="5" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1" />
            <text x="425" y="465" textAnchor="middle" fontWeight="bold" fill="#0f766e" fontSize="12">STRATEGIC ENABLERS / FONDASI PROSES</text>

            <g id="se_iso" filter="url(#shadow)">
              <rect x="50" y="475" width="220" height="50" rx="4" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1" />
              <text x="160" y="505" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">SE1: ISO 9001 (Mutu)</text>
            </g>
            <g id="se_bureau" filter="url(#shadow)">
              <rect x="315" y="475" width="220" height="50" rx="4" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1" />
              <text x="425" y="505" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">SE2: Reformasi Birokrasi</text>
            </g>
            <g id="se_k3" filter="url(#shadow)">
              <rect x="580" y="475" width="220" height="50" rx="4" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1" />
              <text x="690" y="505" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">SE3: K3 & Safety</text>
            </g>


            {/* --- LAYER 4: LEARNING & GROWTH (HIJAU) --- */}
            <rect x="20" y="560" width="810" height="110" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" />
            <text x="425" y="580" textAnchor="middle" fontWeight="bold" fill="#166534" fontSize="14">LEARNING & GROWTH PERSPECTIVE</text>

            <g id="lg_tech" filter="url(#shadow)">
              <rect x="50" y="595" width="220" height="60" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
              <text x="160" y="620" textAnchor="middle" fontSize="12" fontWeight="bold">L1: Digital & Tech</text>
              <text x="160" y="635" textAnchor="middle" fontSize="11">Capability</text>
            </g>
            <g id="lg_competency" filter="url(#shadow)">
              <rect x="315" y="595" width="220" height="60" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
              <text x="425" y="620" textAnchor="middle" fontSize="12" fontWeight="bold">L2: Certified</text>
              <text x="425" y="635" textAnchor="middle" fontSize="11">Competency</text>
            </g>
            <g id="lg_culture" filter="url(#shadow)">
              <rect x="580" y="595" width="220" height="60" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
              <text x="690" y="620" textAnchor="middle" fontSize="12" fontWeight="bold">L3: Safety & Service</text>
              <text x="690" y="635" textAnchor="middle" fontSize="11">Culture</text>
            </g>


            {/* --- KONEKTOR / PANAH (Hubungan Sebab Akibat) --- */}
            
            {/* L1 -> IP3 */}
            <line x1="160" y1="595" x2="690" y2="415" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            {/* L2 -> SE1 */}
            <line x1="425" y1="595" x2="160" y2="525" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            
            {/* SE1 -> IP1 */}
            <line x1="160" y1="475" x2="160" y2="415" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* IP1 -> C2 */}
            <line x1="160" y1="355" x2="425" y2="275" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* IP2 -> C1 */}
            <line x1="425" y1="355" x2="160" y2="275" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* IP3 -> C1 (Horizontal Support) */}
            <line x1="690" y1="355" x2="160" y2="280" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            
            {/* C1 -> PV1 */}
            <line x1="160" y1="215" x2="150" y2="130" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* C1 -> PV2 (Zero Accident) */}
            <line x1="160" y1="215" x2="425" y2="135" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* C2 -> PV3 (Trust) */}
            <line x1="425" y1="215" x2="700" y2="130" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* C3 -> PV2 */}
            <line x1="690" y1="215" x2="425" y2="135" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          </svg>
        </div>

        {/* === AREA KANAN: DETAIL PANEL === */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col">
          <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-4">
            Detail Informasi
          </h3>
          
          {activeInfo ? (
            <div className="animate-fade-in-up">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mb-4">
                <h4 className="font-bold text-blue-900 text-lg">{activeInfo.title}</h4>
              </div>
              
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">DESKRIPSI STRATEGI</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {activeInfo.desc}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">🎯 KPI UTAMA</p>
                <p className="text-green-800 font-bold text-md">{activeInfo.kpi}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  Status: On Track
                </span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center p-4">
              <div className="text-5xl mb-4 animate-bounce">👆</div>
              <p className="text-lg font-medium">Pilih Kotak Strategi</p>
              <p className="text-sm mt-2">Klik salah satu kotak di diagram untuk melihat KPI dan penjelasan detail.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StrategyMapPage;