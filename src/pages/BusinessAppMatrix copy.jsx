import React from "react";

const BusinessProcessAppMatrixPage = () => {
  const applications = [
    "BMKGSoft",
    "EDGE",
    "CMSS",
    "Synergie Workstation",
    "Portal Web BMKG",
    "SIPPB",
    "SIMAN",
    "SIMAK BMN",
    "SAKTI",
    "App Persediaan",
    "My SAPK",
    "SIMAS",
    "E-Office",
    "SPRESO",
  ];

  const processes = [
    {
      id: 1,
      name: "Pengamatan Unsur Cuaca Permukaan",
      apps: { BMKGSoft: true },
    },
    {
      id: 2,
      name: "Pengamatan Cuaca Udara Atas (Radar)",
      apps: { EDGE: true },
    },
    {
      id: 3,
      name: "Encoding Data",
      apps: { BMKGSoft: true },
    },
    {
      id: 4,
      name: "Pengiriman Data ke Pusat/Global",
      apps: { CMSS: true },
    },
    {
      id: 5,
      name: "Kompilasi Data Global",
      apps: { CMSS: true },
    },
    {
      id: 6,
      name: "Visualisasi dan Analisis Cuaca",
      apps: { "Synergie Workstation": true },
    },
    {
      id: 7,
      name: "Analisis Citra Satelit dan Radar",
      apps: { "Synergie Workstation": true },
    },
    {
      id: 8,
      name: "Pembuatan Prakiraan Cuaca",
      apps: { "Synergie Workstation": true, BMKGSoft: true },
    },
    {
      id: 9,
      name: "Diseminasi Informasi (Publikasi)",
      apps: { "Portal Web BMKG": true },
    },
    {
      id: 10,
      name: "Penyusunan dan Revisi Anggaran",
      apps: { SIPPB: true },
    },
    {
      id: 11,
      name: "Inventarisasi Aset Tetap (BMN)",
      apps: { SIMAN: true },
    },
    {
      id: 12,
      name: "Akuntansi Aset dan Pelaporan Keuangan",
      apps: { "SIMAK BMN": true, SAKTI: true },
    },
    {
      id: 13,
      name: "Pengelolaan Persediaan (Gudang)",
      apps: { "App Persediaan": true },
    },
    {
      id: 14,
      name: "Administrasi Data Pegawai",
      apps: { "My SAPK": true, SIMAS: true },
    },
    {
      id: 15,
      name: "Persuratan dan Disposisi",
      apps: { "E-Office": true },
    },
    {
      id: 16,
      name: "Pengelolaan Absensi dan Tukin",
      apps: { SPRESO: true },
    },
    {
      id: 17,
      name: "Pelaksanaan Anggaran (Pembayaran)",
      apps: { SAKTI: true },
    },
  ];

  // Komponen Checkmark dengan class Tailwind
  const CheckmarkImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mx-auto text-gray-800" // Tailwind classes
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    // Container Utama dengan padding dan background abu-abu tipis
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Matriks Aplikasi & Proses Bisnis
        </h2>

        {/* Wrapper Table untuk Scroll Horizontal (Overflow) */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-500">
            {/* HEADER */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                {/* Kolom Pertama Sticky (Nempel di kiri) */}
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-gray-900 sticky left-0 bg-gray-100 z-10 shadow-sm border-r border-gray-200"
                >
                  Process \ Application
                </th>
                {applications.map((app) => (
                  <th
                    key={app}
                    scope="col"
                    className="px-4 py-3 text-center min-w-[100px] border-r border-gray-300" // Min-width biar header gak gepeng
                  >
                    {app}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-200">
              {processes.map((proc) => (
                <tr key={proc.id} className="bg-white hover:bg-gray-50 transition-colors">
                  
                  {/* Nama Proses (Sticky Left) */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-100 shadow-sm">
                    {proc.name}
                  </td>

                  {/* Looping Checkbox */}
                  {applications.map((app) => {
                    const isChecked = proc.apps[app] === true;
                    return (
                      <td key={`${proc.id}-${app}`} className={`px-4 py-4 text-center border-r border-gray-200 last:border-r-0 
                      ${isChecked ? "bg-green-100" : "bg-white"}`}>
                        {isChecked ? <CheckmarkImage /> : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessProcessAppMatrixPage;