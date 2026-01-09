import React from 'react';

// DATA LOGICAL (Berdasarkan PDF SK BMKG)
const dataCatalog = [
  {
    id: 1,
    entity: "Data Kepegawaian (Personil)",
    description: "Data induk seluruh pegawai ASN dan PPNPN di lingkungan stasiun.",
    // Atribut diambil dari tabel Lampiran II (Daftar Personil)
    logicalAttributes: [
      "Nama Lengkap",
      "NIP (Nomor Induk Pegawai)", 
      "Pangkat / Golongan Ruang",
      "Jabatan (Struktural/Fungsional)",
      "Unit Kerja (Tata Usaha/Observasi/Datin)"
    ]
  },
  {
    id: 2,
    entity: "Data Pengamatan Permukaan (Surface)",
    description: "Data hasil observasi cuaca rutin (jam-jaman) dari taman alat.",
    // Atribut berdasarkan parameter standar SYNOP/METAR 
    logicalAttributes: [
      "Tanggal & Jam Pengamatan (UTC)",
      "Arah Angin (Wind Direction)",
      "Kecepatan Angin (Wind Speed)",
      "Jarak Pandang (Visibility)",
      "Keadaan Cuaca (Present Weather)",
      "Suhu Udara (Dry Bulb)",
      "Tekanan Udara (QFE/QNH)"
    ]
  },
  {
    id: 3,
    entity: "Data Udara Atas (Upper Air)",
    description: "Data profil vertikal atmosfer dari pengamatan Pilot Balon/Radiosonde.",
    // Atribut berdasarkan tugas Pilot Balon & Radiosonde 
    logicalAttributes: [
      "Jam Pengamatan (00.00, 06.00, 12.00 UTC)",
      "Sudut Azimuth Balon",
      "Sudut Elevasi Balon",
      "Ketinggian (Altitude)",
      "Suhu & Kelembaban (Vertikal)"
    ]
  },
  {
    id: 4,
    entity: "Data Keuangan (DIPA & PNBP)",
    description: "Data rencana dan realisasi anggaran serta penerimaan negara.",
    // Atribut berdasarkan tugas Bendahara 
    logicalAttributes: [
      "Kode Akun Anggaran",
      "Pagu Anggaran (DIPA)",
      "Realisasi Belanja Pegawai",
      "Jenis Penerimaan (Jasa Met)",
      "Nomor Transaksi Penerimaan Negara (NTPN)"
    ]
  },
  {
    id: 5,
    entity: "Data Inventaris BMN (Aset)",
    description: "Data aset barang milik negara yang dikelola stasiun.",
    // Atribut berdasarkan tugas Pengelola BMN 
    logicalAttributes: [
      "Kode Barang",
      "Nama Barang / Aset",
      "NUP (Nomor Urut Pendaftaran)",
      "Kondisi Barang (Baik/Rusak)",
      "Tahun Perolehan",
      "Lokasi Penempatan"
    ]
  },
  {
    id: 6,
    entity: "Produk Informasi Penerbangan",
    description: "Dokumen prakiraan cuaca khusus untuk stakeholder penerbangan.",
    // Atribut berdasarkan tugas Forecaster 
    logicalAttributes: [
      "Jenis Dokumen (TAF/Trend/Flight Docs)",
      "Kode Bandara (ICAO)",
      "Waktu Validitas (Validity Period)",
      "Isi Prakiraan (Forecast Content)",
      "Status (Normal/Amandemen/Koreksi)"
    ]
  },
  {
    id: 7,
    entity: "Data Peringatan Dini",
    description: "Informasi cuaca ekstrem yang mendesak.",
    // Atribut berdasarkan tugas Warning [cite: 301]
    logicalAttributes: [
      "Jenis Peringatan (Aerodrome Warning/Windshear)",
      "Waktu Kejadian",
      "Durasi Peringatan",
      "Fenomena Cuaca Ekstrem",
      "Area Terdampak"
    ]
  }
];

const DataEntityPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      {/* Header Halaman */}
      <div className="text-center mb-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
          Data Entity - Data Component Catalog
        </h1>
        <p className="text-slate-500 text-lg">
          Katalog entitas data dan rincian atribut logis (informasi) yang dikelola dalam operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* Tabel Catalog */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-700 text-white text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold w-1/4 border-r border-teal-600">Data Entity</th>
                <th className="px-6 py-4 font-bold w-1/3 border-r border-teal-600">Deskripsi Entitas</th>
                <th className="px-6 py-4 font-bold w-1/3">Logical Data Attributes (Rincian Informasi)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataCatalog.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-teal-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  {/* Kolom 1: Data Entity */}
                  <td className="px-6 py-5 align-top border-r border-gray-200">
                    <div className="font-bold text-teal-900 text-base mb-1">{item.entity}</div>
                    <div className="text-xs text-teal-500 font-mono bg-teal-50 inline-block px-2 py-1 rounded">
                      ID: DE-{String(item.id).padStart(2, '0')}
                    </div>
                  </td>

                  {/* Kolom 2: Deskripsi */}
                  <td className="px-6 py-5 align-top text-gray-600 text-sm leading-relaxed border-r border-gray-200">
                    {item.description}
                  </td>

                  {/* Kolom 3: Logical Attributes */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {item.logicalAttributes.map((attr, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          • {attr}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-slate-400 text-sm italic">
        * Atribut logis disusun berdasarkan formulir standar operasional (ME.48, Logbook) dan uraian tugas dalam SK Kepala Stasiun.
      </div>
    </div>
  );
};

export default DataEntityPage;