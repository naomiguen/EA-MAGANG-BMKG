import React from 'react';

// DATA APLIKASI DAN HUBUNGANNYA DENGAN DATA (Berdasarkan PDF SK)
const appDataMatrix = [
  {
    id: 1,
    app: "BMKGSoft & CMSS",
    description: "Sistem penginputan, pengolahan, dan pengiriman data pengamatan meteorologi ke pusat database (Communication Meteorological Switching System).",
    dataEntity: "Data Observasi (Surface, Upper Air, ME.48)",
    dataType: "Transactional Data"
  },
  {
    id: 2,
    app: "Synergie & Radar Weather",
    description: "Sistem workstation forecaster untuk analisis peta cuaca, citra radar, dan pembuatan produk prakiraan/peringatan dini.",
    dataEntity: "Produk Informasi (Forecast), Data Peringatan Dini, Citra Radar",
    dataType: "Analytical & Transactional Data"
  },
  {
    id: 3,
    app: "Aplikasi SAKTI & SAIBA",
    description: "Sistem Aplikasi Keuangan Tingkat Instansi untuk pengelolaan anggaran (DIPA) dan pelaporan realisasi keuangan.",
    dataEntity: "Data Keuangan, DIPA, Realisasi Anggaran",
    dataType: "Transactional Data"
  },
  {
    id: 4,
    app: "SIMAK BMN & SIMAN",
    description: "Sistem Informasi Manajemen dan Akuntansi Barang Milik Negara untuk inventarisasi dan pelaporan aset.",
    dataEntity: "Inventaris BMN (Aset), Status Barang",
    dataType: "Master Data"
  },
  {
    id: 5,
    app: "Aplikasi SIMAS / SDM",
    description: "Sistem Informasi Manajemen ASN untuk pengelolaan data induk kepegawaian, absensi, dan kinerja.",
    dataEntity: "Data Kepegawaian (Personil), Absensi, SKP",
    dataType: "Master Data"
  }
];

const AppDataMatrixPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      {/* Header Halaman */}
      <div className="text-center mb-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Application / Data Matrix
        </h1>
        <p className="text-slate-500 text-lg">
          Pemetaan hubungan antara komponen aplikasi sistem dengan entitas data yang dikelola, berdasarkan standar TOGAF.
        </p>
      </div>

      {/* Tabel Matrix (Gaya TOGAF - Header Biru Tua) */}
      <div className="w-full max-w-6xl shadow-xl overflow-hidden rounded-t-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              {/* Header Sesuai Gambar Referensi */}
              <tr className="bg-[#003366] text-white text-sm uppercase tracking-wider h-16">
                <th className="px-6 py-4 font-bold w-1/5 border-r border-white/20">
                  Application (System)
                </th>
                <th className="px-6 py-4 font-bold w-2/5 border-r border-white/20">
                  Description / Function
                </th>
                <th className="px-6 py-4 font-bold w-1/5 border-r border-white/20">
                  Data Entity
                </th>
                <th className="px-6 py-4 font-bold w-1/5">
                  Data Entity Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appDataMatrix.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  {/* Kolom 1: Aplikasi */}
                  <td className="px-6 py-4 align-top font-bold text-slate-800 border-r border-gray-200">
                    {item.app}
                  </td>

                  {/* Kolom 2: Deskripsi */}
                  <td className="px-6 py-4 align-top text-slate-600 text-sm leading-relaxed border-r border-gray-200">
                    {item.description}
                  </td>

                  {/* Kolom 3: Entitas Data */}
                  <td className="px-6 py-4 align-top font-medium text-slate-700 border-r border-gray-200">
                    {item.dataEntity}
                  </td>

                  {/* Kolom 4: Tipe Data */}
                  <td className="px-6 py-4 align-top">
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-bold border
                      ${item.dataType.includes('Master') 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : 'bg-blue-100 text-blue-800 border-blue-200'}
                    `}>
                      {item.dataType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Sumber */}
      <div className="mt-6 text-slate-400 text-sm italic text-center">
        * Daftar aplikasi diidentifikasi dari Lampiran SK Uraian Tugas (Tugas Observer, Forecaster, & Tata Usaha).
      </div>
    </div>
  );
};

export default AppDataMatrixPage;