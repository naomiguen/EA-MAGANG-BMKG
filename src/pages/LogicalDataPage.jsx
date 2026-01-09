import React from 'react';

// DATA LOGICAL MODEL (ERD STRUCTURE)
// Disusun berdasarkan hubungan kerja di SK BMKG
const erdData = [
  {
    title: "PEGAWAI (EMPLOYEE)",
    type: "MASTER DATA",
    attributes: [
      { name: "NIP", key: "PK", desc: "Nomor Induk (Unik)" },
      { name: "Nama_Lengkap", key: "", desc: "Sesuai SK" },
      { name: "Jabatan", key: "", desc: "Struktural/Fungsional" },
      { name: "Unit_Kerja", key: "", desc: "TU/Obs/Datin" },
      { name: "Pangkat_Gol", key: "", desc: "Golongan Ruang" }
    ]
  },
  {
    title: "ASET_ALAT (EQUIPMENT)",
    type: "MASTER DATA",
    attributes: [
      { name: "Kode_Barang", key: "PK", desc: "Kode Aset BMN" },
      { name: "NUP", key: "PK", desc: "No. Urut Pendaftaran" },
      { name: "Nama_Alat", key: "", desc: "Radar/AWOS/Panci" },
      { name: "Kondisi", key: "", desc: "Baik/Rusak" },
      { name: "NIP_PenanggungJawab", key: "FK", desc: "Link ke Pegawai (Teknisi)" }
    ]
  },
  {
    title: "OBSERVASI_SURFACE",
    type: "TRANSACTION",
    attributes: [
      { name: "ID_Obs", key: "PK", desc: "Auto Generated" },
      { name: "Tanggal_Jam_UTC", key: "", desc: "Waktu Pengamatan" },
      { name: "Suhu_Udara", key: "", desc: "Dry Bulb" },
      { name: "Tekanan_QFE_QNH", key: "", desc: "Tekanan Udara" },
      { name: "Arah_Angin", key: "", desc: "Wind Direction" },
      { name: "Kecepatan_Angin", key: "", desc: "Wind Speed" },
      { name: "NIP_Observer", key: "FK", desc: "Link ke Pegawai (Observer)" }
    ]
  },
  {
    title: "PRODUK_INFORMASI",
    type: "TRANSACTION",
    attributes: [
      { name: "ID_Dokumen", key: "PK", desc: "Nomor Surat/Dok" },
      { name: "Jenis_Produk", key: "", desc: "TAF/Warning/Cuaca" },
      { name: "Waktu_Terbit", key: "", desc: "Waktu Release" },
      { name: "Isi_Berita", key: "", desc: "Konten Prakiraan" },
      { name: "Target_Audience", key: "", desc: "Penerbangan/Publik" },
      { name: "NIP_Forecaster", key: "FK", desc: "Link ke Pegawai (Forecaster)" }
    ]
  }
];

const LogicalDataDiagram = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-8">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-800">Logical Data Model (ERD)</h1>
        <p className="text-slate-500 mt-2">
          Visualisasi entitas dan relasi data.
        </p>
      </div>

      {/* CONTAINER DIAGRAM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-5xl relative">
        
        {/* Render Setiap Kartu Entitas */}
        {erdData.map((entity, index) => (
          <div key={index} className="flex flex-col relative group">
            
            {/* CARD ENTITY */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-300 w-full max-w-sm mx-auto z-10 transition-transform hover:-translate-y-1">
              
              {/* Header (Warna Biru Tua seperti contohmu) */}
              <div className="bg-blue-900 text-white p-4 text-center">
                <h3 className="font-bold text-lg uppercase tracking-wider">{entity.title}</h3>
                <span className="text-[10px] bg-blue-800 px-2 py-1 rounded-full opacity-80">{entity.type}</span>
              </div>

              {/* Body (List Attribute) */}
              <div className="p-5">
                <ul className="space-y-3">
                  {entity.attributes.map((attr, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0">
                      <div className="flex items-center gap-2">
                        {/* Penanda PK / FK */}
                        {attr.key === 'PK' && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">PK</span>
                        )}
                        {attr.key === 'FK' && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">FK</span>
                        )}
                        <span className={`font-semibold ${attr.key ? 'text-slate-800' : 'text-slate-600'}`}>
                          {attr.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 italic text-right max-w-[100px] truncate">
                        {attr.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* GARIS RELASI (Visual Sederhana dengan CSS) */}
            {/* Ini simulasi garis, untuk hasil terbaik gunakan Draw.io di laporan */}
            {entity.title === "PEGAWAI (EMPLOYEE)" && (
              <>
                {/* Garis ke Aset */}
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-blue-900 z-0"></div>
                <div className="hidden lg:block absolute top-1/2 -right-8 text-blue-900 text-xs font-bold bg-white px-1">1:N</div>
                
                {/* Garis ke Bawah (Observasi/Produk) */}
                <div className="hidden lg:block absolute -bottom-12 left-1/2 w-0.5 h-12 bg-blue-900 z-0"></div>
              </>
            )}
            
            {entity.title === "ASET_ALAT (EQUIPMENT)" && (
               <div className="hidden lg:block absolute top-1/2 -left-6 w-6 h-0.5 bg-blue-900 z-0"></div>
            )}

          </div>
        ))}

      </div>

      {/* Keterangan */}
      <div className="mt-16 bg-white p-4 rounded-lg shadow border border-slate-200 text-sm text-slate-600 max-w-2xl">
        <h4 className="font-bold mb-2 text-slate-800">Penjelasan Relasi (Berdasarkan SK):</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Pegawai &rarr; Aset Alat (1:N):</b> Satu teknisi (NIP) bertanggung jawab atas pemeliharaan banyak peralatan [cite: 837-838].
          </li>
          <li>
            <b>Pegawai &rarr; Observasi (1:N):</b> Satu observer (NIP) melakukan banyak pengamatan cuaca (setiap jam) [cite: 569-571].
          </li>
          <li>
            <b>Pegawai &rarr; Produk Info (1:N):</b> Satu forecaster (NIP) menerbitkan banyak dokumen prakiraan/peringatan dini [cite: 285-288].
          </li>
        </ul>
      </div>

    </div>
  );
};

export default LogicalDataDiagram;