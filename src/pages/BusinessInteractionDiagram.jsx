import React, { useState } from 'react';
import { X, ArrowRight, Clock, FileText, Users, Activity } from 'lucide-react';
import interactionSvg from '../assets/business-interaction.drawio.svg?raw';

const BusinessInteractionPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const interactionDetails = {
    // CORE BUSINESS INTERACTIONS
    "INT-01": {
      title: "Data Pengamatan (Observasi → Prakiraan)",
      source: "Observer",
      target: "Forecaster",
      type: "Core Process",
      icon: Activity,
      desc: "Pengiriman data mentah hasil observasi (METAR, SPECI, SYNOP) secara real-time melalui jaringan lokal (LAN) dan aplikasi CMSS. Data mencakup parameter suhu, kelembaban, tekanan udara, arah & kecepatan angin, visibility, dan fenomena cuaca signifikan.",
      dataFormat: "FM-15 (METAR), FM-16 (SPECI), FM-12 (SYNOP)",
      protocol: "CMSS API / FTP",
      sla: "Real-time (delay maksimal 10 menit)",
      frequency: "METAR setiap 30 menit, SPECI on-demand"
    },
    "INT-02": {
      title: "METAR Real-time (Observasi → AirNav Tower)",
      source: "Observer",
      target: "AirNav Indonesia",
      type: "Core Process",
      icon: Activity,
      desc: "Pengiriman data METAR langsung ke Tower ATC untuk keperluan immediate landing/takeoff clearance. Data harus sampai maksimal 5 menit setelah observasi selesai.",
      dataFormat: "FM-15 (METAR/SPECI)",
      protocol: "AFTN (Aeronautical Fixed Telecommunication Network)",
      sla: "Immediate (maksimal 5 menit)",
      frequency: "Setiap 30 menit + SPECI on-demand"
    },
    "INT-03": {
      title: "Produk Cuaca Penerbangan (Prakiraan → AirNav)",
      source: "Forecaster",
      target: "AirNav Indonesia",
      type: "Core Process",
      icon: FileText,
      desc: "Penyampaian dokumen TAF (Terminal Aerodrome Forecast), TREND (Landing Forecast), dan SIGMET (Significant Meteorological Information) untuk panduan navigasi lalu lintas udara (ATC). Produk ini digunakan untuk flight planning dan safety management.",
      dataFormat: "FM-51 (TAF), FM-54 (SIGMET)",
      protocol: "AFTN / AFS Circuit",
      sla: "TAF: H-6 sebelum masa berlaku, SIGMET: Immediate",
      frequency: "TAF setiap 6 jam, SIGMET on-demand"
    },
    "INT-04": {
      title: "Flight Briefing (Prakiraan → Airlines)",
      source: "Forecaster",
      target: "Airlines (Pilot/FOO)",
      type: "Core Process",
      icon: Users,
      desc: "Layanan konsultasi tatap muka atau penyerahan dokumen Flight Folder yang berisi kondisi cuaca di rute penerbangan, bandara tujuan, dan alternate airport. Briefing mencakup analisis cuaca en-route, turbulence forecast, dan icing level.",
      dataFormat: "Flight Folder (PDF/Print)",
      protocol: "Face-to-face / Email",
      sla: "Pre-flight (minimal 2 jam sebelum departure)",
      frequency: "On-request per flight"
    },
    "INT-05": {
      title: "Request Amandemen (AirNav → Prakiraan)",
      source: "AirNav Indonesia",
      target: "Forecaster",
      type: "Feedback Loop",
      icon: ArrowRight,
      desc: "Permintaan klarifikasi atau koreksi produk cuaca dari AirNav jika terjadi ketidaksesuaian antara prakiraan dengan kondisi aktual di lapangan. Forecaster wajib merespons dalam 15 menit untuk amandemen TAF atau SIGMET.",
      dataFormat: "Voice (Telepon/Radio) / Email",
      protocol: "Hotline / Email",
      sla: "Response: 15 menit, Amandemen: 30 menit",
      frequency: "On-demand (jarang)"
    },

    // SUPPORT INTERACTIONS
    "SUP-01": {
      title: "Laporan Kerusakan Alat (Observasi → Teknisi)",
      source: "Observer",
      target: "Teknisi Instrumentasi",
      type: "Support Process",
      icon: Activity,
      desc: "Pelaporan kerusakan atau abnormalitas pada peralatan observasi (AWOS, AWS, Radar, Sensor) yang memerlukan perbaikan segera agar kontinuitas data tidak terganggu.",
      dataFormat: "Form Kerusakan (Hardcopy/Digital)",
      protocol: "Internal Communication",
      sla: "Response: 30 menit, Perbaikan: 4 jam (critical)",
      frequency: "On-demand (insidentil)"
    },
    "SUP-02": {
      title: "Maintenance & Perbaikan (Teknisi → Observasi)",
      source: "Teknisi Instrumentasi",
      target: "Observer",
      type: "Support Process",
      icon: Activity,
      desc: "Kegiatan preventive maintenance (kalibrasi rutin), corrective maintenance (perbaikan kerusakan), dan instalasi peralatan baru. Teknisi memberikan status completion report kepada Observer setelah selesai.",
      dataFormat: "Logbook Maintenance + Certificate",
      protocol: "Internal Handover",
      sla: "Preventive: Mingguan, Corrective: 4 jam",
      frequency: "Harian/Mingguan/Insidentil"
    },
    "SUP-03": {
      title: "Koordinasi Perangkat Jaringan (Teknisi ↔ IT)",
      source: "Teknisi Instrumentasi",
      target: "IT / Datin",
      type: "Support Process",
      icon: Activity,
      desc: "Kolaborasi troubleshooting untuk perangkat yang berbasis jaringan (CMSS, AWOS network, Radar data transmission). Koordinasi mencakup konfigurasi IP, firewall, dan bandwidth allocation.",
      dataFormat: "Technical Discussion",
      protocol: "Internal Meeting / Chat",
      sla: "Response: 1 jam",
      frequency: "Mingguan / On-demand"
    },
    "SUP-04": {
      title: "Konektivitas & Backup Data (IT → Observasi)",
      source: "IT / Datin",
      target: "Observer",
      type: "Support Process",
      icon: Activity,
      desc: "Pemantauan dan pemeliharaan konektivitas jaringan CMSS, akses internet, dan backup data observasi ke server pusat. IT memastikan uptime 99.9% untuk sistem kritikal.",
      dataFormat: "Network Monitoring Dashboard",
      protocol: "Automated Monitoring + Manual Check",
      sla: "Uptime: 99.9%, Backup: Daily",
      frequency: "Continuous monitoring"
    },
    "SUP-05": {
      title: "Infrastruktur Sistem (IT → Prakiraan)",
      source: "IT / Datin",
      target: "Forecaster",
      type: "Support Process",
      icon: Activity,
      desc: "Penyediaan akses ke sistem prakiraan (SADEWA, BMKG Online, NWP Model Output), troubleshooting aplikasi, dan maintenance workstation forecaster.",
      dataFormat: "System Access + Technical Support",
      protocol: "Helpdesk / Remote Desktop",
      sla: "Response: 1 jam, Resolution: 4 jam",
      frequency: "On-demand"
    },
    "SUP-06": {
      title: "Administrasi Kepegawaian (TU → Observasi)",
      source: "Tata Usaha",
      target: "Observer",
      type: "Administrative",
      icon: Users,
      desc: "Pengurusan administrasi kepegawaian (cuti, lembur, perjalanan dinas, tunjangan), pengadaan ATK, dan koordinasi kebutuhan operasional Observer.",
      dataFormat: "Form Administrasi",
      protocol: "Internal Memo",
      sla: "3 hari kerja",
      frequency: "Bulanan / On-request"
    },
    "SUP-07": {
      title: "Administrasi Kepegawaian (TU → Prakiraan)",
      source: "Tata Usaha",
      target: "Forecaster",
      type: "Administrative",
      icon: Users,
      desc: "Sama seperti SUP-06, untuk unit Forecaster.",
      dataFormat: "Form Administrasi",
      protocol: "Internal Memo",
      sla: "3 hari kerja",
      frequency: "Bulanan / On-request"
    },
    "SUP-08": {
      title: "Administrasi Kepegawaian (TU → Teknisi)",
      source: "Tata Usaha",
      target: "Teknisi Instrumentasi",
      type: "Administrative",
      icon: Users,
      desc: "Sama seperti SUP-06, untuk unit Teknisi.",
      dataFormat: "Form Administrasi",
      protocol: "Internal Memo",
      sla: "3 hari kerja",
      frequency: "Bulanan / On-request"
    },

    // MANAGEMENT REPORTING
    "MGT-01": {
      title: "Laporan Kinerja Operasional (Observasi → KUPT)",
      source: "Observer",
      target: "Kepala Stasiun (KUPT)",
      type: "Management",
      icon: FileText,
      desc: "Laporan Operasional Harian (LPH) yang mencakup jumlah observasi, keandalan data, downtime alat, dan kejadian cuaca signifikan. Digunakan untuk evaluasi kinerja operasional.",
      dataFormat: "Excel/PDF Report",
      protocol: "Email / SIMAK-BMG",
      sla: "Harian (setiap pukul 08:00)",
      frequency: "Harian"
    },
    "MGT-02": {
      title: "Laporan Akurasi Prakiraan (Prakiraan → KUPT)",
      source: "Forecaster",
      target: "Kepala Stasiun (KUPT)",
      type: "Management",
      icon: FileText,
      desc: "Laporan verifikasi akurasi TAF dan TREND berdasarkan perbandingan dengan kondisi aktual. Termasuk analisis false alarm dan missed event.",
      dataFormat: "Excel/PDF Report",
      protocol: "Email / SIMAK-BMG",
      sla: "Bulanan (tanggal 5 setiap bulan)",
      frequency: "Bulanan"
    },
    "MGT-03": {
      title: "Laporan Preventive Maintenance (Teknisi → KUPT)",
      source: "Teknisi Instrumentasi",
      target: "Kepala Stasiun (KUPT)",
      type: "Management",
      icon: FileText,
      desc: "Laporan kegiatan maintenance rutin, status keandalan alat (availability %), dan rekomendasi pengadaan sparepart atau alat baru.",
      dataFormat: "Excel/PDF Report",
      protocol: "Email / SIMAK-BMG",
      sla: "Bulanan (tanggal 10)",
      frequency: "Bulanan"
    },
    "MGT-04": {
      title: "Laporan Sistem Komunikasi (IT → KUPT)",
      source: "IT / Datin",
      target: "Kepala Stasiun (KUPT)",
      type: "Management",
      icon: FileText,
      desc: "Laporan uptime sistem, bandwidth utilization, security incident, dan status backup data. Termasuk usulan upgrade infrastruktur IT.",
      dataFormat: "Excel/PDF Report",
      protocol: "Email / SIMAK-BMG",
      sla: "Bulanan (tanggal 10)",
      frequency: "Bulanan"
    },
    "MGT-05": {
      title: "Laporan Administrasi Kepegawaian (TU → KUPT)",
      source: "Tata Usaha",
      target: "Kepala Stasiun (KUPT)",
      type: "Management",
      icon: FileText,
      desc: "Laporan absensi, cuti, diklat, mutasi, dan urusan kepegawaian lainnya. Termasuk rekapitulasi anggaran belanja administrasi.",
      dataFormat: "Excel/PDF Report",
      protocol: "Email / SIMAK-BMG",
      sla: "Bulanan (tanggal 1)",
      frequency: "Bulanan"
    }
  };

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    // Memanjat ke atas mencari atribut data-cell-id atau id
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      if (id && interactionDetails[id]) {
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

  const activeInfo = activeId ? interactionDetails[activeId] : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Business Interaction Map</h1>
        <p className="text-gray-600">Klik alur diagram untuk melihat detail.</p>
      </div>

      {/* CONTAINER SVG */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-auto">
        
        {/* LANGSUNG TAMPIL (Tanpa Loading State) */}
        {/* 👇 INI YANG DIUBAH: HAPUS OPACITY HOVER & TAMBAH CENTER */}
        <div 
          id="svg-wrapper"
          className="w-full max-w-5xl mx-auto flex justify-center cursor-pointer"
          onClick={handleDiagramClick}
          dangerouslySetInnerHTML={{ __html: interactionSvg }} 
        />

      </div>

      {/* MODAL POPUP */}
      {isModalOpen && activeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-900 text-white p-4 flex justify-between">
              <h3 className="font-bold">{activeInfo.title}</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between bg-blue-50 p-3 rounded">
                <span className="font-bold text-blue-900">{activeInfo.source}</span>
                <span>➝</span>
                <span className="font-bold text-blue-900">{activeInfo.target}</span>
              </div>
              <p className="text-sm text-gray-700">{activeInfo.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="bg-gray-100 p-2 rounded">
                    <div className="text-xs text-gray-500 font-bold uppercase">Protokol</div>
                    <div className="text-sm font-semibold">{activeInfo.protocol}</div>
                 </div>
                 <div className="bg-gray-100 p-2 rounded">
                    <div className="text-xs text-gray-500 font-bold uppercase">SLA</div>
                    <div className="text-sm font-semibold">{activeInfo.sla}</div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessInteractionPage;