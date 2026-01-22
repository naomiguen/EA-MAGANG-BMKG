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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans overflow-x-auto">
      <div className="min-w-[1000px] bg-white shadow-xl border border-gray-300 p-4">
        
        {/* === HEADER: TOP LEVEL GOVERNANCE === */}
        <div className="mb-4">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">BMKG Architecture Governance</h1>
            
            {/* Level 1: Kepala BMKG */}
            <div className="bg-slate-800 text-white text-center py-2 mb-1 border border-slate-600">
              <h2 className="text-lg font-bold">Architecture Governance</h2>
            </div>
            <div className="bg-blue-800 text-white text-center py-3 mb-4 border border-blue-900 shadow-md">
              <h2 className="text-xl font-bold">KEPALA BMKG</h2>
              <p className="text-xs opacity-80">(Penanggung Jawab Utama)</p>
            </div>

            {/* Level 2: Steering Committee */}
            <div className="grid grid-cols-12 gap-2 mb-6">
                {/* Kiri: Pengelola Administrasi */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm">Pengelola & Administrasi</div>
                    <div className="grid grid-cols-2 gap-2">
                        <Box title="Sekretaris Utama" subTitle="(Keuangan & SDM)" color="bg-blue-700" />
                        <Box title="Inspektorat" subTitle="(Audit Internal)" color="bg-blue-700" />
                    </div>
                </div>

                {/* Tengah: CIO (Penghubung) */}
                <div className="col-span-2 flex flex-col justify-center items-center">
                    <div className="h-1 w-full bg-slate-800 mb-1"></div>
                    <Box title="DEPUTI INSKALREKJARKOM" subTitle="(CIO / Ketua Tim Arsitektur)" color="bg-orange-600" className="w-full h-full" />
                    <div className="h-1 w-full bg-slate-800 mt-1"></div>
                </div>

                {/* Kanan: Komite Teknis */}
                <div className="col-span-5 border border-slate-400 p-2 bg-slate-200">
                    <div className="text-center font-bold text-slate-700 mb-2 text-sm">Komite Teknis Operasional</div>
                    <div className="grid grid-cols-3 gap-1">
                        <Box title="Deputi Meteorologi" color="bg-blue-600" className="text-[10px]" />
                        <Box title="Deputi Klimatologi" color="bg-blue-600" className="text-[10px]" />
                        <Box title="Deputi Geofisika" color="bg-blue-600" className="text-[10px]" />
                    </div>
                </div>
            </div>
        </div>

        {/* === CORE: ENTERPRISE ARCHITECTURE MATRIX === */}
        <div className="border-4 border-slate-800 p-1 bg-slate-900">
            <div className="text-white text-center font-bold py-1 mb-1">Enterprise Architecture BMKG</div>
            
            <div className="bg-slate-200 grid grid-cols-4 gap-0 p-1">
                
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
            
            {/* Layer Bawah Matrix: Proses Pengelolaan Umum */}
            <div className="bg-slate-700 text-white text-center py-2 mt-1 border-t border-slate-500">
                <span className="text-sm">Proses Pengelolaan Enterprise Architecture Berkelanjutan (Continuous Improvement)</span>
            </div>
        </div>

        {/* === BOTTOM: OPERATIONAL & IMPLEMENTATION === */}
        <div className="mt-4 grid grid-cols-12 gap-2">
            
            {/* Kiri: Level Operasional */}
            <div className="col-span-9 border-2 border-slate-700 p-2 bg-slate-100">
                <div className="text-xs font-bold text-slate-600 mb-2 vertical-text">OPERATIONAL</div>
                <div className="grid grid-cols-4 gap-4">
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Pengguna" subTitle="(Stasiun UPT Daerah)" color="bg-gray-500" />
                        <div className="text-center text-[10px]">Mengakses Layanan</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Operator Unit" subTitle="(Admin Stasiun)" color="bg-gray-500" />
                        <div className="text-center text-[10px]">Mengelola Data</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Tim Teknis Pusat" subTitle="(Pusat Database)" color="bg-gray-500" />
                        <div className="text-center text-[10px]">Maintenance Sistem</div>
                     </div>
                     <div className="col-span-1 flex flex-col gap-2">
                        <Box title="Administrator" subTitle="(Super Admin)" color="bg-gray-500" />
                        <div className="text-center text-[10px]">Konfigurasi Global</div>
                     </div>
                </div>
            </div>

             {/* Kanan: Audit & Compliance */}
             <div className="col-span-3 border-2 border-slate-700 p-2 flex flex-col justify-center gap-2 bg-slate-100">
                <div className="text-center text-xs font-bold mb-1">AUDIT & COMPLIANCE</div>
                <Box title="Evaluasi SPBE" color="bg-red-700" />
                <Box title="Audit TIK" color="bg-red-700" />
            </div>

        </div>

        {/* === FOOTER: IMPLEMENTATION APPROACH === */}
        <div className="mt-4 bg-slate-800 p-2 text-white">
            <div className="text-center text-sm font-bold mb-2">Implementation Approach</div>
            <div className="grid grid-cols-4 gap-4 px-4">
                <Box title="Training / Diklat" subTitle="(Pusdiklat BMKG)" color="bg-blue-600" />
                <Box title="Manual Guide / SOP" subTitle="(Dokumentasi)" color="bg-blue-600" />
                <Box title="Policy / Peraturan" subTitle="(Perka BMKG)" color="bg-blue-600" />
                <Box title="Sosialisasi" subTitle="(Rakorwil/Rakornas)" color="bg-blue-600" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureGovernancePage;