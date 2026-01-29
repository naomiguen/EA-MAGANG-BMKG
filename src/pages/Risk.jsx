import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Database, Eye, FileText, ShieldCheck, ChevronLeft, ZoomIn, ZoomOut, RefreshCw, Info } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Risk = () => {
  const [view, setView] = useState('main'); 
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  // Auto scroll ke atas setiap kali ganti view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const departments = [
    { 
      id: 'teknisi', 
      label: 'Teknisi', 
      icon: <Settings />, 
      color: 'bg-primary-50', 
      border: 'border-primary-100', 
      accent: 'bg-primary-500', 
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
      color: 'bg-primary-50', 
      border: 'border-primary-100', 
      accent: 'bg-primary-500', 
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
      color: 'bg-primary-50', 
      border: 'border-primary-100', 
      accent: 'bg-primary-500', 
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
    { 
      id: 'tu', 
      label: 'TU', 
      icon: <FileText />, 
      color: 'bg-primary-50', 
      border: 'border-primary-100', 
      accent: 'bg-primary-500', 
      diagrams: [{ label: 'Kegiatan Rutin Harian', file: '/risk/tu/risk-admin.drawio.svg' }] 
    },
    { 
      id: 'wmm', 
      label: 'WMM', 
      icon: <ShieldCheck />, 
      color: 'bg-primary-50', 
      border: 'border-primary-100', 
      accent: 'bg-primary-500', 
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
    <div className="min-h-screen bg-white text-black p-4 md:p-12 font-sans flex flex-col justify-start items-center">
      <AnimatePresence mode="wait">
        
        {/* LEVEL 1: MAIN MENU */}
        {view === 'main' && (
          <motion.div 
            key="main" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="max-w-7xl mx-auto w-full flex flex-col items-center"
          >
            <div className="text-center mb-12 border-b-4 border-secondary-500 pb-8 w-full max-w-4xl"> 
              <h1 className="text-4xl md:text-5xl font-black text-primary-700 uppercase tracking-tight leading-tight">Risk Diagram</h1>
              <p className="text-primary-800 text-xl font-medium mt-4">Analisis Matriks Risiko Per Departemen BMKG</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
              {departments.map((dept) => (
                <motion.button 
                  key={dept.id} 
                  whileHover={{ y: -8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={() => handleDeptClick(dept)} 
                  className={`${dept.color} ${dept.border} border-2 h-72 rounded-[2.5rem] flex flex-col items-center justify-center gap-5 transition-all shadow-xl shadow-primary-100/50 relative overflow-hidden group`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-3 ${dept.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className="bg-white p-6 rounded-2xl text-primary-600 shadow-md">
                    <div className="scale-[2]">{dept.icon}</div>
                  </div>
                  <span className="text-2xl font-black tracking-tight text-primary-800 uppercase">{dept.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* LEVEL 2: DETAILS */}
        {view === 'details' && (
          <motion.div 
            key="details" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="max-w-7xl mx-auto w-full flex flex-col items-center"
          >
            <div className="w-full flex justify-center mb-8">
              <button 
                onClick={() => setView('main')} 
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-black transition-all group uppercase tracking-widest text-sm"
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
                KEMBALI KE MENU UTAMA
              </button>
            </div>
            
            <div className="mb-12 p-8 rounded-[2.5rem] bg-primary-50 border-b-4 border-secondary-500 shadow-sm text-center w-full max-w-4xl">
              <h2 className="text-4xl font-black text-primary-700 uppercase tracking-tight flex justify-center items-center gap-4">
                {selectedDept.label}
              </h2>
              <p className="text-primary-800 mt-4 text-lg font-bold flex justify-center items-center gap-2 italic">
                <Info size={18} className="text-secondary-600" />
                Pilih kategori proses bisnis untuk detail matriks risiko
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {selectedDept.diagrams.map((diagram, index) => (
                <motion.button 
                  key={index} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                  onClick={() => handleDiagramClick(diagram)} 
                  className="bg-primary-50 border-2 border-primary-100 p-8 rounded-3xl text-center relative overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all min-h-[110px] flex items-center justify-center shadow-lg"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-2.5 ${selectedDept.accent} opacity-70`} />
                  <span className="text-lg font-black text-primary-800 leading-tight uppercase tracking-tight px-4">
                    {typeof diagram === 'object' ? diagram.label : diagram}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* LEVEL 3: VIEWER */}
        {view === 'viewer' && (
          <motion.div 
            key="viewer" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto w-full flex flex-col items-center"
          >
            <div className="w-full flex justify-center mb-8">
              <button 
                onClick={() => setView('details')} 
                className="flex items-center gap-2 text-primary-600 font-black hover:bg-primary-50 px-6 py-2 rounded-2xl transition-all uppercase tracking-widest text-sm"
              >
                <ChevronLeft /> KEMBALI KE DAFTAR
              </button>
            </div>
            
            <div className="w-full h-[75vh] border-4 border-primary-100 rounded-[3rem] overflow-hidden bg-slate-50 relative shadow-2xl shadow-primary-100/50">
              <TransformWrapper initialScale={1} centerOnInit={true}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-6 right-6 z-10 flex gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-primary-100">
                      <button onClick={() => zoomIn()} className="p-3 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomIn size={24}/></button>
                      <button onClick={() => zoomOut()} className="p-3 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><ZoomOut size={24}/></button>
                      <button onClick={() => resetTransform()} className="p-3 hover:bg-primary-100 text-primary-700 rounded-xl transition-colors"><RefreshCw size={24}/></button>
                    </div>
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                      <div className="flex justify-center items-center w-[1250px] min-h-[75vh]">
                        <img 
                          src={selectedDiagram.file} 
                          alt={selectedDiagram.label} 
                          className="max-w-full h-auto shadow-2xl bg-white border border-primary-100 rounded-lg p-6" 
                        />
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
            <p className="mt-8 text-primary-400 font-black uppercase tracking-[0.2em] text-xs animate-pulse">
              Viewer Mode: Use Scroll to Zoom & Drag to Pan
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Risk;