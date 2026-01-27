import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Database, Eye, FileText, ShieldCheck, ChevronLeft, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Risk = () => {
  const [view, setView] = useState('main'); // 'main', 'details', 'viewer'
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  const departments = [
    { 
      id: 'teknisi', 
      label: 'Teknisi', 
      icon: <Settings />, 
      color: 'bg-[#D1C4E9]', 
      border: 'border-[#B39DDB]', 
      accent: 'bg-[#9575CD]', 
      diagrams: [
        { label: 'Pengisian balon Pibal dan Rason Menggunakan Gas', file: '/risk/teknisi/risk-balon-pibal.drawio.svg' }, 
        { label: 'Pembuatan gas hidrogen', file: '/risk/teknisi/risk-pembuatan-hidrogen.drawio.svg' }, 
        { label: 'Melakukan pemeliharaan Peralatan Sederhana Elektronik', file: '/risk/teknisi/risk-pemeliharaan-elektronik.drawio.svg' }, 
        { label: 'Pengamatan Pibal', file: '/risk/teknisi/risk-pengamatan-pibal.drawio.svg' }, 
        { label: 'Pengecekan peralatan operasional', file: '/risk/teknisi/risk-cek-operasional.drawio.svg' }, 
        { label: 'Melakukan pemeliharaan peralatan teknologi canggih / modern', file: '/risk/teknisi/risk-perbaikan-canggih.drawio.svg' }, 
        { label: 'Pengamatan Radiosonde', file: '/risk/teknisi/risk-radiosonde.drawio.svg' }, 
        { label: 'Memeriksa jaringan dan inspeksi', file: '/risk/teknisi/risk-jaringan-inspeksi.drawio.svg' }, 
        { label: 'Pengiriman sandi Pibal dan Radiosonde', file: '/risk/teknisi/risk-pengiriman-sandi-pibal.drawio.svg' }, 
        { label: 'Melakukan pemeliharaan Peralatan Sederhana Mekanik / Konvensional', file: '/risk/teknisi/risk-pemeliharaan-sederhana.drawio.svg' }, 
      ] 
    },

    { 
      id: 'datin', 
      label: 'Datin', 
      icon: <Database />, 
      color: 'bg-[#D1C4E9]', 
      border: 'border-[#B39DDB]', 
      accent: 'bg-[#9575CD]', 
      diagrams: [
        { label: 'Pekerjaan rutin harian', file: '/risk/datin/risk-rutin-harian.drawio.svg' },
        { label: 'Pembuatan dan pengiriman flight document', file: '/risk/datin/risk-flight-doc.drawio.svg' },
        { label: 'Menghidupkan peralatan elektronik', file: '/risk/datin/risk-peralatan-elektronik.drawio.svg' },
        { label: 'Pembuatan dan pengiriman peringatan dini cuaca ekstrim', file: '/risk/datin/risk-peringatan-cuaca.drawio.svg' },
        { label: 'Perjalanan dari dan ke kantor', file: '/risk/datin/risk-perjalanan-kantor.drawio.svg' },
        { label: 'Pembuatan sandi tafor', file: '/risk/datin/risk-sandi-tafor.drawio.svg' },
        { label: 'Pembuatan prakiraan cuaca harian', file: '/risk/datin/risk-prakiraan-cuaca.drawio.svg' },
      ] 
    },

{ 
      id: 'observasi', 
      label: 'Observasi', 
      icon: <Eye />, 
      color: 'bg-[#D1C4E9]', 
      border: 'border-[#B39DDB]', 
      accent: 'bg-[#9575CD]', 
      // Data Observasi disesuaikan dengan gambar referensi Anda
      diagrams: [
        { label: 'Mengisi Logbook', file: '/risk/obs/risk-logbook.drawio.svg' },
        { label: 'Mengganti pias semua peralatan operasional, menyetel jam dan tanggal', file: '/risk/obs/risk-ganti-pias.drawio.svg' },
        { label: 'Melaksanakan pelaporan data meteorologi (METAR, SYNOP GBON dll)', file: '/risk/obs/risk-lapor-metar.drawio.svg' },
        { label: 'Melaksanakan pelaporan data dengan AFTN', file: '/risk/obs/risk-lapor-aftn.drawio.svg' },
        { label: 'Pekerjaan Rutin Harian', file: '/risk/obs/risk-obs-rutin-harian.drawio.svg' },
        { label: 'Operasional Radio Sonde dan Pilot Balon', file: '/risk/obs/risk-ops-sonde.drawio.svg' },
        { label: 'Melaksanakan pengamatan data meteorologi', file: '/risk/obs/risk-amat-meteo.drawio.svg' },
        { label: 'Penyandian', file: '/risk/obs/risk-penyandian.drawio.svg' },
        { label: 'Merekapitulasi data cuaca tiap jam dan back-up data', file: '/risk/obs/risk-rekap-cuaca.drawio.svg' },
        { label: 'Membuat WXREV', file: '/risk/obs/risk-buat-wxrev.drawio.svg' },
      ] 
    },

    { id: 'tu', label: 'TU', icon: <FileText />, color: 'bg-[#D1C4E9]', border: 'border-[#B39DDB]', accent: 'bg-[#9575CD]', 
      diagrams: [{ label: 'Kegiatan Rutin Harian', file: '/risk/tu/risk- admin.drawio.svg' }] },

{ 
      id: 'wmm', 
      label: 'WMM', 
      icon: <ShieldCheck />, 
      color: 'bg-[#D1C4E9]', 
      border: 'border-[#B39DDB]', 
      accent: 'bg-[#9575CD]', 
      diagrams: [
        { label: 'Melakukan Monitoring Sasaran Mutu Unit Kerja', file: '/risk/wmm/risk-monitor-mutu.drawio.svg' },
        { label: 'Melaksanakan Survei Kepuasan Pelanggan', file: '/risk/wmm/risk-survei-pelanggan.drawio.svg' },
        { label: 'Melakukan Monitoring Update Daftar Induk Dokumen dan Rekaman', file: '/risk/wmm/risk-update-dokumen.drawio.svg' },
        { label: 'Melakukan Kegiatan RTM', file: '/risk/wmm/risk-kegiatan-rtm.drawio.svg' },
        { label: 'Melakukan Kegiatan Audit Internal', file: '/risk/wmm/risk-audit-internal.drawio.svg' },
        { label: 'Melaksanakan Kegiatan Monitoring Identifikasi Resiko', file: '/risk/wmm/risk-identifikasi-resiko.drawio.svg' },
      ] 
    },
  ];

  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    setView('details');
  };

  const handleDiagramClick = (diag) => {
    setSelectedDiagram(diag);
    setView('viewer');
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans flex flex-col justify-center">
      <AnimatePresence mode="wait">
        
        {/* LEVEL 1: MAIN MENU */}
        {view === 'main' && (
          <motion.div key="main" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-20"> 
              <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-slate-800">Risk Diagram</h1>
              <p className="text-slate-500 text-xl">Analisis Matriks Risiko Per Departemen</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {departments.map((dept) => (
                <motion.button key={dept.id} whileHover={{ y: -10 }} whileTap={{ scale: 0.98 }} onClick={() => handleDeptClick(dept)} className={`${dept.color} ${dept.border} border-2 h-64 rounded-xl flex flex-col items-center justify-center gap-4 transition-all shadow-xl shadow-purple-100 relative overflow-hidden group`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-4 ${dept.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <div className="bg-white/40 p-5 rounded-2xl text-purple-900 shadow-inner">
                    <div className="scale-[1.8]">{dept.icon}</div>
                  </div>
                  <span className="text-2xl font-bold tracking-wide text-purple-900">{dept.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* LEVEL 2: DAFTAR TOMBOL */}
        {view === 'details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-7xl mx-auto w-full">
            <button onClick={() => setView('main')} className="flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 font-semibold">
              <ChevronLeft /> Kembali ke Menu Utama
            </button>
            <div className="mb-10 p-6 rounded-2xl bg-purple-50 border border-purple-100">
              <h2 className="text-4xl font-bold flex items-center gap-4 text-purple-900">
                <span className={`w-3 h-12 ${selectedDept.accent} rounded-full`}></span>
                {selectedDept.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDept.diagrams.map((diagram, index) => (
                <motion.button key={index} onClick={() => handleDiagramClick(diagram)} className={`${selectedDept.color} border-2 ${selectedDept.border} p-6 rounded-lg text-left relative overflow-hidden group hover:shadow-lg transition-all min-h-[100px] flex items-center`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${selectedDept.accent} opacity-60`} />
                  <span className="text-lg font-bold text-purple-900 ml-4 leading-tight">
                    {typeof diagram === 'object' ? diagram.label : diagram}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* LEVEL 3: SVG VIEWER */}
        {view === 'viewer' && (
          <motion.div key="viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto w-full h-[85vh] flex flex-col">
            <button onClick={() => setView('details')} className="flex items-center gap-2 text-purple-600 mb-6 font-bold">
              <ChevronLeft /> Kembali ke Daftar
            </button>
            
            <div className="flex-1 border-2 border-purple-100 rounded-3xl overflow-hidden bg-slate-50 relative">
              <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/80 p-2 rounded-xl shadow-lg border">
                      <button onClick={() => zoomIn()} className="p-2 hover:bg-purple-100 rounded-lg"><ZoomIn size={20}/></button>
                      <button onClick={() => zoomOut()} className="p-2 hover:bg-purple-100 rounded-lg"><ZoomOut size={20}/></button>
                      <button onClick={() => resetTransform()} className="p-2 hover:bg-purple-100 rounded-lg"><RefreshCw size={20}/></button>
                    </div>
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                      <div className="p-10 flex justify-center items-center w-[1200px]">
                        <img 
                          src={selectedDiagram.file} 
                          alt={selectedDiagram.label} 
                          className="max-w-full h-auto shadow-2xl bg-white" 
                        />
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Risk;