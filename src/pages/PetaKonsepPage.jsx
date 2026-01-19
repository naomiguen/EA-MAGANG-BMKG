import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, X, Info, CheckCircle, Activity, 
  FileText, Database, Settings, Users, CloudRain,
  Package, Shield, UserCheck, Plane
} from 'lucide-react';
import petaKonsepSvg from '../assets/peta_konsep.drawio.svg?raw';

const PetaKonsepPage = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const processDetails = {
    "PERUM-LPNPI": {
      title: "Perum LPPNPI",
      icon: Plane,
      color: "bg-cyan-500",
      desc: "Lembaga Penyelenggara Pelayanan Navigasi Penerbangan Indonesia - Stakeholder utama pengguna layanan MKG.",
      items: [
        "Permintaan briefing cuaca penerbangan",
        "Koordinasi operasional bandara",
        "Feedback layanan meteorologi"
      ],
      pic: "External Stakeholder"
    },
    "ANGKASA-PURA-I": {
      title: "Angkasa Pura I Balikpapan",
      icon: Plane,
      color: "bg-cyan-500",
      desc: "Pengelola Bandara Sepinggan - Partner dalam operasional bandara dan layanan penerbangan.",
      items: [
        "Koordinasi operasional bandara",
        "Registrasi pilot & crew",
        "Fasilitas ruang briefing"
      ],
      pic: "External Stakeholder"
    },
    "ANGKASA-PURA-II": {
      title: "Angkasa Pura II Balikpapan",
      icon: Plane,
      color: "bg-cyan-500",
      desc: "Partner operasional bandara dalam penyediaan layanan penerbangan.",
      items: [
        "Koordinasi keamanan bandara",
        "Support infrastruktur",
        "Monitoring aktivitas penerbangan"
      ],
      pic: "External Stakeholder"
    },
    "LANUD-DHOMBER": {
      title: "Lanud Dhomber",
      icon: Shield,
      color: "bg-cyan-500",
      desc: "Lanud Dhomber - Pengguna layanan meteorologi untuk kepentingan penerbangan militer.",
      items: [
        "Briefing cuaca untuk operasi militer",
        "Koordinasi penerbangan TNI AU",
        "Data cuaca khusus"
      ],
      pic: "External Stakeholder"
    },
    "AIRLINES": {
      title: "Airlines (Maskapai)",
      icon: Plane,
      color: "bg-cyan-500",
      desc: "Maskapai penerbangan yang membutuhkan informasi cuaca untuk keselamatan penerbangan.",
      items: [
        "Flight briefing sebelum take-off",
        "Informasi cuaca en-route",
        "Data METAR, TAF, SIGMET"
      ],
      pic: "External Stakeholder"
    },

    // ===== PROSES UTAMA (Core Business) =====
    "REGISTRASI": {
      title: "PROSES: Registrasi",
      icon: UserCheck,
      color: "bg-green-600",
      desc: "Tahap pendaftaran pilot/crew sebelum mendapatkan layanan briefing cuaca.",
      items: [
        "Registrasi identitas pilot",
        "Verifikasi dokumen penerbangan",
        "Input data ke sistem",
        "Penjadwalan briefing"
      ],
      pic: "Petugas Pelayanan"
    },
    "KOORD-BIDANG-OBSDATIN": {
      title: "Koordinator Bidang Observasi & Data",
      icon: Users,
      color: "bg-blue-700",
      desc: "Koordinator yang mengawasi seluruh proses observasi dan pengelolaan data meteorologi.",
      items: [
        "Supervisi unit observasi & data",
        "Koordinasi antar unit",
        "Monitoring kualitas data",
        "Evaluasi kinerja"
      ],
      pic: "Koordinator"
    },
    "FORECASTER": {
      title: "FORECASTER (F)",
      icon: CloudRain,
      color: "bg-green-600",
      desc: "Petugas yang melakukan analisis dan membuat prakiraan cuaca untuk penerbangan.",
      items: [
        "Analisis peta sinoptik",
        "Membuat TAF (Terminal Aerodrome Forecast)",
        "Menerbitkan SIGMET/AIRMET",
        "Briefing cuaca untuk pilot"
      ],
      pic: "Unit Forecaster"
    },
    "TEKNISI": {
      title: "TEKNISI",
      icon: Settings,
      color: "bg-green-600",
      desc: "Teknisi yang melakukan maintenance dan kalibrasi alat-alat meteorologi.",
      items: [
        "Maintenance peralatan AWS/AWOS",
        "Kalibrasi sensor meteorologi",
        "Troubleshooting gangguan teknis",
        "Laporan kondisi alat"
      ],
      pic: "Unit Teknisi"
    },
    "OBSERVASI": {
      title: "OBSERVASI (O)",
      icon: Activity,
      color: "bg-green-600",
      desc: "Pengamatan unsur cuaca secara kontinyu untuk menghasilkan data METAR/SPECI.",
      items: [
        "Pengamatan cuaca permukaan",
        "Pembacaan instrumen",
        "Encoding METAR/SPECI",
        "Input data ke CMSS"
      ],
      pic: "Unit Observasi"
    },
    "DATA-DAN-INFORMASI": {
      title: "DATA DAN INFORMASI",
      icon: Database,
      color: "bg-pink-600",
      desc: "Unit yang mengelola database, melakukan QC, dan menyediakan layanan data iklim.",
      items: [
        "Quality Control (QC) data harian",
        "Pengiriman data ke Jakarta",
        "Database klimatologi",
        "Layanan permintaan data"
      ],
      pic: "Unit Data & Informasi"
    },
    "QC": {
      title: "QC (Quality Control)",
      icon: CheckCircle,
      color: "bg-green-600",
      desc: "Proses penjaminan mutu data sebelum didistribusikan ke pengguna.",
      items: [
        "Verifikasi validitas data",
        "Koreksi data anomali",
        "Standardisasi format",
        "Dokumentasi QC"
      ],
      pic: "Unit Data & Informasi"
    },
    "KUPT": {
      title: "KUPT (Kepala Unit Pelaksana Teknis)",
      icon: Users,
      color: "bg-green-600",
      desc: "Pengawas teknis yang memastikan seluruh proses operasional berjalan sesuai standar.",
      items: [
        "Supervisi operasional harian",
        "Evaluasi kinerja unit",
        "Koordinasi dengan pusat",
        "Pengambilan keputusan strategis"
      ],
      pic: "Manajemen"
    },

    // ===== OUTPUT =====
    "KEPUASAN-PELANGGAN": {
      title: "OUTPUT: Kepuasan Pelanggan",
      icon: Users,
      color: "bg-cyan-500",
      desc: "Hasil akhir layanan berupa kepuasan stakeholder dan keselamatan penerbangan.",
      items: [
        "Indeks Kepuasan Masyarakat (IKM)",
        "Zero accident related to weather",
        "Feedback positif dari airlines",
        "Peningkatan kualitas layanan"
      ],
      pic: "Seluruh Unit"
    },

    // ===== SUPPORT SYSTEM (Input dari bawah) =====
    "IT": {
      title: "SUPPORT: IT",
      icon: Database,
      color: "bg-gray-500",
      desc: "Dukungan infrastruktur teknologi informasi untuk sistem operasional.",
      items: [
        "Maintenance jaringan & server",
        "Support sistem CMSS",
        "Keamanan data",
        "Backup & recovery"
      ],
      pic: "Unit IT"
    },
    "TATA-USAHA": {
      title: "SUPPORT: Tata Usaha",
      icon: FileText,
      color: "bg-gray-500",
      desc: "Administrasi umum, keuangan, dan pengelolaan SDM.",
      items: [
        "Administrasi kepegawaian",
        "Pengelolaan keuangan",
        "Pengadaan barang/jasa",
        "Surat menyurat"
      ],
      pic: "Tata Usaha"
    },
    "GUDANG-ALAT-BAHAN": {
      title: "SUPPORT: Gudang Alat/Bahan",
      icon: Package,
      color: "bg-gray-500",
      desc: "Pengelolaan inventaris alat, suku cadang, dan bahan operasional.",
      items: [
        "Penyimpanan alat & spare part",
        "Distribusi kebutuhan operasional",
        "Stock opname",
        "Maintenance logistik"
      ],
      pic: "Teknisi & TU"
    },
    "REGULASI": {
      title: "SUPPORT: Regulasi",
      icon: FileText,
      color: "bg-gray-500",
      desc: "Dasar hukum dan standar operasional yang mengatur seluruh aktivitas.",
      items: [
        "UU No. 31 Tahun 2009 (MKG)",
        "ICAO Annex 3",
        "SOP Operasional",
        "ISO 9001:2015"
      ],
      pic: "Manajemen & QA"
    }
  };

  // LOGIKA KLIK DIAGRAM 
  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    // Memanjat DOM tree mencari ID atau data-cell-id
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      // Cek apakah ID tersebut ada di kamus data kita?
      if (id && processDetails[id]) {
        foundId = id;
        break; 
      }
      
      if (current.id === 'svg-wrapper') break;
      current = current.parentNode;
      attempts++;
    }

    if (foundId) {
      setActiveId(foundId);
      setIsModalOpen(true);
    }
  };

  const activeInfo = activeId ? processDetails[activeId] : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-8">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors shadow-sm flex-shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center flex-1"> 
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Peta Konsep Proses Bisnis</h1>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1">Visualisasi Alur Kerja BMKG Stasiun Balikpapan</p>
          </div>
          <div className="w-10 flex-shrink-0"></div>
        </div>
      </div>

      {/* CONTAINER DIAGRAM */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative flex flex-col">
        
        {/* Banner Info */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center gap-2 text-blue-700 text-sm">
          <Info size={18} />
          <span className="font-medium">Klik pada blok diagram untuk melihat detail aktivitas. Gunakan scroll untuk melihat diagram secara lengkap.</span>
        </div>

        {/* AREA RENDER SVG */}
        <div className="flex-1 p-8 overflow-auto bg-slate-50/30 flex justify-center items-center">
          <div 
            id="svg-wrapper"
            className="w-full max-w-6xl mx-auto flex justify-center cursor-pointer 
                       [&>svg]:w-full [&>svg]:h-auto [&>svg]:drop-shadow-sm"
            onClick={handleDiagramClick}
            dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
          />
        </div>
      </div>

      {/* POP-UP MODAL */}
      {isModalOpen && activeInfo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${activeInfo.color} p-6 text-white flex justify-between items-start`}>
              <div className="flex gap-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <activeInfo.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{activeInfo.title}</h3>
                  <p className="text-white/80 text-xs mt-1 uppercase tracking-wider font-semibold">
                    PIC: {activeInfo.pic}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Deskripsi Aktivitas</h4>
                <p className="text-gray-700 leading-relaxed text-sm border-l-4 border-gray-200 pl-3">
                  {activeInfo.desc}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Key Activities / Items
                </h4>
                <ul className="space-y-2">
                  {activeInfo.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 bg-white p-2 rounded shadow-sm border border-gray-100">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-up { animation: scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

    </div>
  );
};

export default PetaKonsepPage;