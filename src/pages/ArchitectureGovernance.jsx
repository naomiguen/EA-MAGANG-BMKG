import React from "react";

// Komponen Reusable untuk Kotak Standar
const Box = ({ title, subTitle, color = "bg-slate-600", textColor = "text-white", className = "" }) => (
  <div className={`${color} ${textColor} p-2 border border-slate-400 text-center flex flex-col justify-center items-center shadow-sm ${className}`}>
    {title && <span className="font-bold text-xs md:text-sm">{title}</span>}
    {subTitle && <span className="text-[10px] md:text-xs mt-1">{subTitle}</span>}
  </div>
);

// Komponen untuk Kolom Arsitektur (Business, Data, App, Tech)
const ArchitectureColumn = ({ title, owner, initiation, determination, process }) => (
  <div className="flex flex-col gap-1 w-full border-r border-slate-500 last:border-r-0 px-1">
    {/* Header Kolom */}
    <div className="bg-blue-900 text-white text-center py-1 text-sm font-bold border border-slate-600">
      {title}
    </div>
    
    {/* Baris Unit Penanggung Jawab */}
    <Box title={owner} color="bg-slate-500" className="h-12" />

    {/* Fase Inisiasi */}
    <div className="relative border-t-2 border-slate-800 pt-1">
      <span className="absolute -top-3 left-0 bg-yellow-500 text-[8px] text-black px-1 font-bold">Inisiasi</span>
      <Box title={initiation} color="bg-slate-600" className="h-16" />
    </div>

    {/* Fase Penetapan */}
    <div className="relative border-t border-slate-700 pt-1">
      <span className="absolute -top-2 left-0 bg-green-500 text-[8px] text-black px-1 font-bold">Penetapan</span>
      <Box title={determination} color="bg-slate-600" className="h-16" />
    </div>

    {/* Fase Proses Pengelolaan */}
    <div className="relative border-t border-slate-700 pt-1 flex-grow">
      <span className="absolute -top-2 left-0 bg-blue-400 text-[8px] text-black px-1 font-bold">Proses</span>
      <Box title={process} color="bg-slate-700" className="h-24" />
    </div>
  </div>
);

const ArchitectureGovernancePage = () => {
return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans overflow-x-auto flex flex-col items-center">
      
      {/* === PERBAIKAN JUDUL UTAMA === */}
      <div className="w-full max-w-6xl text-center mb-10 border-b-4 border-yellow-500 pb-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
          Architecture Governance
        </h1>
        <p className="text-slate-600 text-lg md:text-xl font-bold uppercase tracking-widest opacity-80 italic mt-2">
          Struktur Tata Kelola Arsitektur SPBE BMKG
        </p>
      </div>

      <div className="min-w-[1000px] bg-white shadow-2xl border border-gray-300 p-6 rounded-lg">
        
        {/* === HEADER: TOP LEVEL GOVERNANCE === */}
        <div className="mb-4">
            {/* Level 1: Kepala BMKG */}
            <div className="bg-slate-800 text-white text-center py-2 mb-1 border border-slate-600 rounded-t-md">
              <h2 className="text-lg font-bold uppercase tracking-widest">Kepemimpinan Strategis</h2>
            </div>
            <div className="bg-blue-800 text-white text-center py-4 mb-4 border border-blue-900 shadow-md">
              <h2 className="text-2xl font-black uppercase tracking-tight">KEPALA BMKG</h2>
              <p className="text-xs opacity-90 font-bold italic mt-1">(Penanggung Jawab Utama Arsitektur)</p>
            </div>

            {/* Level 2: Steering Committee */}
            <div className="grid grid-cols-12 gap-2 mb-6">
                {/* Kiri: Pengelola Administrasi */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200 rounded-l-lg shadow-inner">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm uppercase tracking-tighter">Pengelola & Administrasi</div>
                    <div className="grid grid-cols-2 gap-2">
                        <Box title="Sekretaris Utama" subTitle="(Keuangan & SDM)" color="bg-blue-700" />
                        <Box title="Inspektorat" subTitle="(Audit Internal)" color="bg-blue-700" />
                    </div>
                </div>

                {/* Tengah: CIO (Penghubung) */}
                <div className="col-span-2 flex flex-col justify-center items-center">
                    <div className="h-1 w-full bg-slate-800 mb-1 opacity-20"></div>
                    <Box title="DEPUTI INSKALREKJARKOM" subTitle="(CIO / Ketua Tim Arsitektur)" color="bg-orange-600" className="w-full h-full rounded-md shadow-lg border-b-4 border-orange-800" />
                    <div className="h-1 w-full bg-slate-800 mt-1 opacity-20"></div>
                </div>

                {/* Kanan: Komite Teknis */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200 rounded-r-lg shadow-inner">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm uppercase tracking-tighter">Komite Teknis Operasional</div>
                    <div className="grid grid-cols-3 gap-1">
                        <Box title="Deputi Meteorologi" color="bg-blue-600" className="text-[10px]" />
                        <Box title="Deputi Klimatologi" color="bg-blue-600" className="text-[10px]" />
                        <Box title="Deputi Geofisika" color="bg-blue-600" className="text-[10px]" />
                    </div>
                </div>
            </div>
        </div>

        {/* === CORE: ENTERPRISE ARCHITECTURE MATRIX === */}
        <div className="border-4 border-slate-800 p-1 bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="text-white text-center font-black py-2 mb-1 uppercase tracking-widest text-sm italic">
               Enterprise Architecture BMKG Core Framework
            </div>
            
            <div className="bg-slate-200 grid grid-cols-4 gap-0 p-1 rounded-sm">
                
                {/* Kolom 1: Business Architecture */}
                <ArchitectureColumn 
                    title="BUSINESS ARCHITECTURE"
                    owner="Deputi Bidang Teknis & Biro Perencanaan"
                    initiation="Arahan Strategis & Renstra"
                    determination="Penyusunan Peta Proses Bisnis"
                    process="Mengelola Visi & Misi Organisasi"
                />

                {/* Kolom 2: Data Architecture */}
                <ArchitectureColumn 
                    title="DATA ARCHITECTURE"
                    owner="Pusat Database (Bid. Manajemen Data)"
                    initiation="Standarisasi Format Data (WMO)"
                    determination="Kebijakan Satu Data MKG"
                    process="Mengelola Arsitektur Data & Security"
                />

                {/* Kolom 3: Application Architecture */}
                <ArchitectureColumn 
                    title="APPLICATION ARCHITECTURE"
                    owner="Pusat Database (Bid. Pengembangan)"
                    initiation="Analisis Kebutuhan User (UPT)"
                    determination="Blueprint Aplikasi & Integrasi"
                    process="Development & Maintenance (SDLC)"
                />

                {/* Kolom 4: Technology Architecture */}
                <ArchitectureColumn 
                    title="TECHNOLOGY ARCHITECTURE"
                    owner="Pusat Jaringan Komunikasi"
                    initiation="Perencanaan Infrastruktur"
                    determination="Standarisasi Server & Jaringan"
                    process="Operasional Data Center & GTS"
                />

            </div>
            
            {/* Layer Bawah Matrix */}
            <div className="bg-slate-700 text-white text-center py-2 mt-1 border-t border-slate-500 italic">
                <span className="text-xs font-bold uppercase tracking-widest">Continuous Improvement & Governance Loop</span>
            </div>
        </div>

        {/* === BOTTOM: OPERATIONAL & IMPLEMENTATION === */}
        <div className="mt-6 grid grid-cols-12 gap-4">
            
            {/* Kiri: Level Operasional */}
            <div className="col-span-9 border-2 border-slate-700 p-4 bg-slate-100 rounded-xl relative shadow-inner">
                <div className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.3em]">Operational Level</div>
                <div className="grid grid-cols-4 gap-4">
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Pengguna" subTitle="(Stasiun UPT Daerah)" color="bg-gray-500" className="rounded-lg" />
                        <div className="text-center text-[9px] font-bold text-slate-400 uppercase italic leading-none mt-1">Akses Layanan</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Operator Unit" subTitle="(Admin Stasiun)" color="bg-gray-500" className="rounded-lg" />
                        <div className="text-center text-[9px] font-bold text-slate-400 uppercase italic leading-none mt-1">Input & Validasi</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Tim Teknis Pusat" subTitle="(Pusat Database)" color="bg-gray-500" className="rounded-lg" />
                        <div className="text-center text-[9px] font-bold text-slate-400 uppercase italic leading-none mt-1">Mainframe Care</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Administrator" subTitle="(Super Admin)" color="bg-gray-500" className="rounded-lg" />
                        <div className="text-center text-[9px] font-bold text-slate-400 uppercase italic leading-none mt-1">Global Policy</div>
                     </div>
                </div>
            </div>

             {/* Kanan: Audit & Compliance */}
             <div className="col-span-3 border-2 border-red-800 p-4 flex flex-col justify-center gap-2 bg-red-50 rounded-xl shadow-sm">
                <div className="text-center text-[10px] font-black text-red-800 mb-1 uppercase tracking-widest">Audit & Compliance</div>
                <Box title="Evaluasi SPBE" color="bg-red-700" className="rounded-md" />
                <Box title="Audit TIK" color="bg-red-700" className="rounded-md" />
            </div>

        </div>

        {/* === FOOTER: IMPLEMENTATION APPROACH === */}
        <div className="mt-6 bg-slate-800 p-4 text-white rounded-xl shadow-inner border-t-4 border-blue-600">
            <div className="text-center text-xs font-black uppercase tracking-[0.5em] mb-4 opacity-50">Implementation Approach</div>
            <div className="grid grid-cols-4 gap-4 px-4">
                <Box title="Training / Diklat" subTitle="(Pusdiklat BMKG)" color="bg-blue-600" className="rounded-lg border-blue-400" />
                <Box title="Manual Guide / SOP" subTitle="(Dokumentasi)" color="bg-blue-600" className="rounded-lg border-blue-400" />
                <Box title="Policy / Peraturan" subTitle="(Perka BMKG)" color="bg-blue-600" className="rounded-lg border-blue-400" />
                <Box title="Sosialisasi" subTitle="(Rakorwil/Rakornas)" color="bg-blue-600" className="rounded-lg border-blue-400" />
            </div>
        </div>

      </div>

      {/* Footer Meta */}
      <div className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest pb-10">
        EA Governance Framework v2026 - BMKG Balikpapan
      </div>
    </div>
  );
};

export default ArchitectureGovernancePage;