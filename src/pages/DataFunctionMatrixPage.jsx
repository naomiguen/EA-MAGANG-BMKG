import React from 'react';

// 1. DEFINISI FUNGSI BISNIS (Baris) - Sesuai FDD
const businessFunctions = [
  { id: 'F1', name: "Pengelolaan Tata Usaha" },
  { id: 'F2', name: "Pengelolaan Observasi" },
  { id: 'F3', name: "Pengelolaan Data & Info" },
  { id: 'F4', name: "Pemeliharaan Teknis" }
];

// 2. DEFINISI ENTITAS DATA (Kolom) - Sesuai Data Catalog
const dataEntities = [
  { id: 'D1', name: "Data Kepegawaian" },
  { id: 'D2', name: "Data Keuangan" },
  { id: 'D3', name: "Inventaris BMN" },
  { id: 'D4', name: "Data Observasi (Surface/Upper)" },
  { id: 'D5', name: "Produk Informasi (Forecast)" },
  { id: 'D6', name: "Peringatan Dini" },
  { id: 'D7', name: "Status Peralatan" }
];

// 3. DEFINISI RELASI (Mapping C/U)
// Format: { funcId: 'F1', dataId: 'D1', type: 'C' }
// C = Create (Membuat), U = Use (Menggunakan/Membaca)
const relationships = [
  // --- F1: TATA USAHA ---
  { funcId: 'F1', dataId: 'D1', type: 'C' }, // Membuat data pegawai
  { funcId: 'F1', dataId: 'D2', type: 'C' }, // Membuat data keuangan
  { funcId: 'F1', dataId: 'D3', type: 'C' }, // Mengelola/Input BMN
  
  // --- F2: OBSERVASI ---
  { funcId: 'F2', dataId: 'D3', type: 'U' }, // Menggunakan alat (BMN)
  { funcId: 'F2', dataId: 'D4', type: 'C' }, // Menghasilkan data observasi (ME.48)
  { funcId: 'F2', dataId: 'D7', type: 'U' }, // Cek status alat saat obs
  
  // --- F3: DATA & INFO (FORECASTER) ---
  { funcId: 'F3', dataId: 'D4', type: 'U' }, // Analisis data observasi
  { funcId: 'F3', dataId: 'D5', type: 'C' }, // Membuat TAF/Flight Docs
  { funcId: 'F3', dataId: 'D6', type: 'C' }, // Membuat Warning
  { funcId: 'F3', dataId: 'D7', type: 'U' }, // Cek radar (status alat)
  
  // --- F4: TEKNISI ---
  { funcId: 'F4', dataId: 'D3', type: 'U' }, // Maintain aset BMN
  { funcId: 'F4', dataId: 'D7', type: 'C' }, // Membuat laporan status alat
];

const DataFunctionMatrixPage = () => {
  // Helper untuk mendapatkan nilai sel
  const getRelation = (fId, dId) => {
    const rel = relationships.find(r => r.funcId === fId && r.dataId === dId);
    return rel ? rel.type : '';
  };

  // Helper warna sel
  const getCellClass = (type) => {
    if (type === 'C') return 'bg-teal-100 text-teal-800 font-bold';
    if (type === 'U') return 'bg-blue-50 text-blue-600';
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      {/* Header */}
      <div className="text-center mb-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Data Entity - Business Function Matrix
        </h1>
        <p className="text-slate-500 text-lg">
          Pemetaan hubungan antara fungsi bisnis (baris) dengan entitas data (kolom) dalam operasional stasiun.
        </p>
      </div>

      {/* Tabel Matrix */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {/* Pojok Kiri Atas Kosong */}
                <th className="bg-slate-100 border-b border-r border-slate-200 p-4 text-left font-bold text-slate-700 min-w-[200px]">
                  Fungsi Bisnis \ Entitas Data
                </th>
                {/* Header Kolom (Data Entities) */}
                {dataEntities.map(data => (
                  <th key={data.id} className="bg-slate-50 border-b border-slate-200 p-4 text-center font-semibold text-slate-600 min-w-[100px] hover:bg-slate-100 transition-colors">
                    {data.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Baris (Business Functions) */}
              {businessFunctions.map(func => (
                <tr key={func.id} className="hover:bg-slate-50 transition-colors">
                  {/* Header Baris */}
                  <th className="bg-white border-r border-slate-200 p-4 text-left font-medium text-slate-800 border-b">
                    {func.name}
                  </th>
                  {/* Sel Matriks */}
                  {dataEntities.map(data => {
                    const relation = getRelation(func.id, data.id);
                    return (
                      <td key={data.id} className={`border-b border-slate-100 p-4 text-center border-r last:border-r-0 ${getCellClass(relation)}`}>
                        {relation}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-8 flex gap-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-800 font-bold rounded">C</span>
          <div className="text-sm text-slate-600">
            <strong>Create (Membuat)</strong><br/>
            Fungsi menghasilkan/menciptakan data baru.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-bold rounded">U</span>
          <div className="text-sm text-slate-600">
            <strong>Use (Menggunakan)</strong><br/>
            Fungsi membaca/menggunakan data untuk proses.
          </div>
        </div>
      </div>

    </div>
  );
};

export default DataFunctionMatrixPage;