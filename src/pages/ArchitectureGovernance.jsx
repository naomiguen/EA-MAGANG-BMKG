import React, { useState } from "react";
import { X } from "lucide-react"; // Pastikan install lucide-react atau ganti icon manual

// --- 1. DATA PENJELASAN (DATABASE PURA-PURA) ---
// Di sini kamu bisa isi detail panjangnya buat tiap kotak
const governanceDetails = {
  "KEPALA BMKG": "Penanggung jawab tertinggi dalam seluruh tata kelola arsitektur BMKG. Memberikan arahan strategis sesuai visi misi nasional.",
  "Sekretaris Utama": "Bertanggung jawab atas dukungan administrasi, keuangan, dan sumber daya manusia untuk mendukung implementasi arsitektur.",
  "Inspektorat": "Melakukan audit internal untuk memastikan kepatuhan terhadap standar dan regulasi yang berlaku.",
  "DEPUTI INSKALREKJARKOM": "Bertindak sebagai CIO (Chief Information Officer). Memimpin tim arsitektur dan menjembatani strategi bisnis dengan teknologi.",
  "Deputi Meteorologi": "Stakeholder utama dari sisi bisnis Meteorologi. Menentukan kebutuhan operasional pengamatan cuaca.",
  
  // Business Architecture
  "BUSINESS ARCHITECTURE": "Domain yang mendefinisikan strategi bisnis, tata kelola, organisasi, dan proses bisnis utama.",
  "Deputi Bidang Teknis & Biro Perencanaan": "Pemilik domain bisnis. Bertanggung jawab merumuskan Renstra dan Peta Proses Bisnis.",
  "Arahan Strategis & Renstra": "Fase Inisiasi: Mengumpulkan input dari dokumen perencanaan jangka panjang (Renstra 5 Tahunan).",
  "Penyusunan Peta Proses Bisnis": "Fase Penetapan: Memodelkan proses bisnis level 0 hingga level n menggunakan BPMN.",
  "Mengelola Visi & Misi Organisasi": "Proses rutin: Memastikan seluruh aktivitas IT selaras dengan Visi Misi BMKG.",

  // Data Architecture
  "DATA ARCHITECTURE": "Domain yang mengatur struktur data logis dan fisik serta sumber daya manajemen data.",
  "Pusat Database (Bid. Manajemen Data)": "Pemilik domain data. Mengelola gudang data (Data Warehouse) dan standar metadata.",
  "Standarisasi Format Data (WMO)": "Fase Inisiasi: Mengadopsi standar internasional (WMO/ICAO) untuk format pertukaran data.",
  "Kebijakan Satu Data MKG": "Fase Penetapan: Menetapkan 'Single Source of Truth' agar tidak ada duplikasi data antar unit.",
  "Mengelola Arsitektur Data & Security": "Proses rutin: Maintenance database, backup, dan memastikan keamanan data (CIA Triad).",

  // Application Architecture
  "APPLICATION ARCHITECTURE": "Domain yang menyediakan blueprint untuk sistem aplikasi individu dan interaksinya.",
  "Pusat Database (Bid. Pengembangan)": "Pemilik domain aplikasi. Mengawasi siklus hidup pengembangan software (SDLC).",
  "Analisis Kebutuhan User (UPT)": "Fase Inisiasi: Mengumpulkan requirement dari user di stasiun daerah.",
  "Blueprint Aplikasi & Integrasi": "Fase Penetapan: Membuat desain sistem, API contract, dan arsitektur microservices.",
  "Development & Maintenance (SDLC)": "Proses rutin: Coding, Testing (UAT), Deployment, dan Bug Fixing.",
  
  // Technology Architecture
  "TECHNOLOGY ARCHITECTURE": "Domain yang menjelaskan kemampuan perangkat lunak dan perangkat keras pendukung.",
  "Pusat Jaringan Komunikasi": "Pemilik domain teknologi/infrastruktur (Network & Server).",
  "Perencanaan Infrastruktur": "Fase Inisiasi: Menghitung kebutuhan kapasitas server, bandwidth, dan cloud.",
  "Standarisasi Server & Jaringan": "Fase Penetapan: Menentukan spek hardware minimum dan topologi jaringan.",
  "Operasional Data Center & GTS": "Proses rutin: Monitoring uptime server, pendingin (PAC), dan kelistrikan (UPS).",

  // Default fallback
  "default": "Detail untuk bagian ini belum didefinisikan secara spesifik dalam sistem governance."
};

// --- 2. KOMPONEN MODAL (POPUP) ---
const DetailModal = ({ isOpen, onClose, title, subtitle, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all scale-100">
        
        {/* Header Modal */}
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {subtitle && <p className="text-slate-300 text-xs">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white transition-colors">
            {/* Kalau ga ada lucide-react, ganti <X /> dengan huruf "X" */}
            <span className="font-bold text-xl">✕</span>
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6">
          <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Deskripsi & Tugas:</h4>
          <p className="text-slate-700 leading-relaxed text-sm">
            {details || "Tidak ada informasi detail untuk komponen ini."}
          </p>
        </div>

        {/* Footer Modal */}
        <div className="bg-gray-100 p-3 text-right">
          <button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. KOMPONEN KOTAK INTERAKTIF ---
const InteractiveBox = ({ title, subTitle, color = "bg-slate-600", textColor = "text-white", className = "", onClick }) => (
  <div 
    onClick={() => onClick(title, subTitle)}
    className={`${color} ${textColor} p-2 border border-slate-400 text-center flex flex-col justify-center items-center shadow-sm ${className} 
    cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-150 group`}
  >
    {title && <span className="font-bold text-xs md:text-sm group-hover:underline">{title}</span>}
    {subTitle && <span className="text-[10px] md:text-xs mt-1 opacity-90">{subTitle}</span>}
  </div>
);

// --- 4. KOMPONEN KOLOM ARSITEKTUR ---
const ArchitectureColumn = ({ title, owner, initiation, determination, process, onBoxClick }) => (
  <div className="flex flex-col gap-1 w-full border-r border-slate-500 last:border-r-0 px-1">
    {/* Header Kolom */}
    <div 
        onClick={() => onBoxClick(title, "Domain Arsitektur")}
        className="bg-blue-900 text-white text-center py-1 text-sm font-bold border border-slate-600 cursor-pointer hover:bg-blue-800 transition-colors">
      {title}
    </div>
    
    {/* Baris Unit Penanggung Jawab */}
    <InteractiveBox title={owner} subTitle="(Domain Owner)" color="bg-slate-500" className="h-12" onClick={onBoxClick} />

    {/* Fase Inisiasi */}
    <div className="relative border-t-2 border-slate-800 pt-1">
      <span className="absolute -top-3 left-0 bg-yellow-500 text-[8px] text-black px-1 font-bold rounded-sm">Inisiasi</span>
      <InteractiveBox title={initiation} color="bg-slate-600" className="h-16" onClick={onBoxClick} />
    </div>

    {/* Fase Penetapan */}
    <div className="relative border-t border-slate-700 pt-1">
      <span className="absolute -top-2 left-0 bg-green-500 text-[8px] text-black px-1 font-bold rounded-sm">Penetapan</span>
      <InteractiveBox title={determination} color="bg-slate-600" className="h-16" onClick={onBoxClick} />
    </div>

    {/* Fase Proses Pengelolaan */}
    <div className="relative border-t border-slate-700 pt-1 flex-grow">
      <span className="absolute -top-2 left-0 bg-blue-400 text-[8px] text-black px-1 font-bold rounded-sm">Proses</span>
      <InteractiveBox title={process} color="bg-slate-700" className="h-24" onClick={onBoxClick} />
    </div>
  </div>
);

// --- 5. MAIN PAGE ---
const ArchitectureGovernancePage = () => {
  // State untuk Popup
  const [modalState, setModalState] = useState({ isOpen: false, title: "", subtitle: "", details: "" });

  // Fungsi saat kotak diklik
  const handleBoxClick = (title, subtitle) => {
    const details = governanceDetails[title] || governanceDetails["default"];
    setModalState({
      isOpen: true,
      title: title,
      subtitle: subtitle,
      details: details
    });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans overflow-x-auto">
      
      {/* RENDER MODAL DI SINI */}
      <DetailModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.title}
        subtitle={modalState.subtitle}
        details={modalState.details}
      />

      <div className="min-w-[1000px] bg-white shadow-xl border border-gray-300 p-4">
        
        {/* === HEADER: TOP LEVEL GOVERNANCE === */}
        <div className="mb-4">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">BMKG Architecture Governance</h1>
            
            {/* Level 1: Kepala BMKG */}
            <div className="bg-slate-800 text-white text-center py-2 mb-1 border border-slate-600">
              <h2 className="text-lg font-bold">Architecture Governance Board</h2>
            </div>
            
            {/* Wrapper biar Kepala BMKG bisa diklik */}
            <div onClick={() => handleBoxClick("KEPALA BMKG", "Penanggung Jawab Utama")} 
                 className="bg-blue-800 text-white text-center py-3 mb-4 border border-blue-900 shadow-md cursor-pointer hover:bg-blue-700 transition-colors">
              <h2 className="text-xl font-bold">KEPALA BMKG</h2>
              <p className="text-xs opacity-80">(Penanggung Jawab Utama)</p>
            </div>

            {/* Level 2: Steering Committee */}
            <div className="grid grid-cols-12 gap-2 mb-6">
                {/* Kiri: Pengelola Administrasi */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm">Pengelola & Administrasi</div>
                    <div className="grid grid-cols-2 gap-2">
                        <InteractiveBox title="Sekretaris Utama" subTitle="(Keuangan & SDM)" color="bg-blue-700" onClick={handleBoxClick} />
                        <InteractiveBox title="Inspektorat" subTitle="(Audit Internal)" color="bg-blue-700" onClick={handleBoxClick} />
                    </div>
                </div>

                {/* Tengah: CIO (Penghubung) */}
                <div className="col-span-2 flex flex-col justify-center items-center">
                    <div className="h-1 w-full bg-slate-800 mb-1"></div>
                    <InteractiveBox title="DEPUTI INSKALREKJARKOM" subTitle="(CIO / Ketua Tim Arsitektur)" color="bg-orange-600" className="w-full h-full" onClick={handleBoxClick} />
                    <div className="h-1 w-full bg-slate-800 mt-1"></div>
                </div>

                {/* Kanan: Komite Teknis */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm">Komite Teknis Operasional</div>
                    <div className="grid grid-cols-3 gap-1">
                        <InteractiveBox title="Deputi Meteorologi" color="bg-blue-600" className="text-[10px]" onClick={handleBoxClick} />
                        <InteractiveBox title="Deputi Klimatologi" color="bg-blue-600" className="text-[10px]" onClick={handleBoxClick} />
                        <InteractiveBox title="Deputi Geofisika" color="bg-blue-600" className="text-[10px]" onClick={handleBoxClick} />
                    </div>
                </div>
            </div>
        </div>

        {/* === CORE: ENTERPRISE ARCHITECTURE MATRIX === */}
        <div className="border-4 border-slate-800 p-1 bg-slate-900">
            <div className="text-white text-center font-bold py-1 mb-1">Enterprise Architecture BMKG</div>
            
            <div className="bg-slate-200 grid grid-cols-4 gap-0 p-1">
                
                <ArchitectureColumn 
                    title="BUSINESS ARCHITECTURE"
                    owner="Deputi Bidang Teknis & Biro Perencanaan"
                    initiation="Arahan Strategis & Renstra"
                    determination="Penyusunan Peta Proses Bisnis"
                    process="Mengelola Visi & Misi Organisasi"
                    onBoxClick={handleBoxClick}
                />

                <ArchitectureColumn 
                    title="DATA ARCHITECTURE"
                    owner="Pusat Database (Bid. Manajemen Data)"
                    initiation="Standarisasi Format Data (WMO)"
                    determination="Kebijakan Satu Data MKG"
                    process="Mengelola Arsitektur Data & Security"
                    onBoxClick={handleBoxClick}
                />

                <ArchitectureColumn 
                    title="APPLICATION ARCHITECTURE"
                    owner="Pusat Database (Bid. Pengembangan)"
                    initiation="Analisis Kebutuhan User (UPT)"
                    determination="Blueprint Aplikasi & Integrasi"
                    process="Development & Maintenance (SDLC)"
                    onBoxClick={handleBoxClick}
                />

                <ArchitectureColumn 
                    title="TECHNOLOGY ARCHITECTURE"
                    owner="Pusat Jaringan Komunikasi"
                    initiation="Perencanaan Infrastruktur"
                    determination="Standarisasi Server & Jaringan"
                    process="Operasional Data Center & GTS"
                    onBoxClick={handleBoxClick}
                />

            </div>
            
            <div className="bg-slate-700 text-white text-center py-2 mt-1 border-t border-slate-500">
                <span className="text-sm">Proses Pengelolaan Enterprise Architecture Berkelanjutan (Continuous Improvement)</span>
            </div>
        </div>

        {/* === BOTTOM SECTIONS (OPERATIONAL & FOOTER) === */}
        {/* Kamu bisa terapkan onClick ke kotak-kotak di bawah ini juga dengan cara yang sama */}
        <div className="mt-4 bg-slate-800 p-2 text-white">
            <div className="text-center text-sm font-bold mb-2">Implementation Approach</div>
            <div className="grid grid-cols-4 gap-4 px-4">
                <InteractiveBox title="Training / Diklat" subTitle="(Pusdiklat BMKG)" color="bg-blue-600" onClick={handleBoxClick} />
                <InteractiveBox title="Manual Guide / SOP" subTitle="(Dokumentasi)" color="bg-blue-600" onClick={handleBoxClick} />
                <InteractiveBox title="Policy / Peraturan" subTitle="(Perka BMKG)" color="bg-blue-600" onClick={handleBoxClick} />
                <InteractiveBox title="Sosialisasi" subTitle="(Rakorwil/Rakornas)" color="bg-blue-600" onClick={handleBoxClick} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureGovernancePage;