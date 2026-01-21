import React from "react";

const AppBusinessProcessMatrixPage = () => {
  const processes = [
    "Pengamatan Unsur Cuaca Permukaan",
    "Pengamatan Cuaca Udara Atas (Radar)",
    "Encoding Data",
    "Pengiriman Data ke Pusat/Global",
    "Kompilasi Data Global",
    "Visualisasi dan Analisis Cuaca",
    "Analisis Citra Satelit dan Radar",
    "Pembuatan Prakiraan Cuaca",
    "Diseminasi Informasi (Publikasi)",
    "Penyusunan dan Revisi Anggaran",
    "Inventarisasi Aset Tetap (BMN)",
    "Akuntansi Aset dan Pelaporan Keuangan",
    "Pengelolaan Persediaan (Gudang)",
    "Administrasi Data Pegawai",
    "Persuratan dan Disposisi",
    "Pengelolaan Absensi dan Tukin",
    "Pelaksanaan Anggaran (Pembayaran)",
  ];

  const applications = [
    {
      id: 1,
      name: "BMKGSoft",
      processes: {
        "Pengamatan Unsur Cuaca Permukaan": true,
        "Encoding Data": true,
        "Pembuatan Prakiraan Cuaca": true,
      },
    },
    {
      id: 2,
      name: "EDGE",
      processes: {
        "Pengamatan Cuaca Udara Atas (Radar)": true,
      },
    },
    {
      id: 3,
      name: "CMSS",
      processes: {
        "Pengiriman Data ke Pusat/Global": true,
        "Kompilasi Data Global": true,
      },
    },
    {
      id: 4,
      name: "Synergie Workstation",
      processes: {
        "Visualisasi dan Analisis Cuaca": true,
        "Analisis Citra Satelit dan Radar": true,
        "Pembuatan Prakiraan Cuaca": true,
      },
    },
    {
      id: 5,
      name: "Portal Web BMKG",
      processes: {
        "Diseminasi Informasi (Publikasi)": true,
      },
    },
    {
      id: 6,
      name: "SIPPB",
      processes: {
        "Penyusunan dan Revisi Anggaran": true,
      },
    },
    {
      id: 7,
      name: "SIMAN",
      processes: {
        "Inventarisasi Aset Tetap (BMN)": true,
      },
    },
    {
      id: 8,
      name: "SIMAK BMN",
      processes: {
        "Akuntansi Aset dan Pelaporan Keuangan": true,
      },
    },
    {
      id: 9,
      name: "SAKTI",
      processes: {
        "Akuntansi Aset dan Pelaporan Keuangan": true,
        "Pelaksanaan Anggaran (Pembayaran)": true,
      },
    },
    {
      id: 10,
      name: "App Persediaan",
      processes: {
        "Pengelolaan Persediaan (Gudang)": true,
      },
    },
    {
      id: 11,
      name: "My SAPK",
      processes: {
        "Administrasi Data Pegawai": true,
      },
    },
    {
      id: 12,
      name: "SIMAS",
      processes: {
        "Administrasi Data Pegawai": true,
      },
    },
    {
      id: 13,
      name: "E-Office",
      processes: {
        "Persuratan dan Disposisi": true,
      },
    },
    {
      id: 14,
      name: "SPRESO",
      processes: {
        "Pengelolaan Absensi dan Tukin": true,
      },
    },
  ];

  // Komponen Checkmark dengan class Tailwind
  const CheckmarkImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mx-auto text-gray-800"
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
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Matriks Aplikasi & Proses Bisnis
        </h2>

        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-gray-900 sticky left-0 bg-gray-100 z-10 shadow-sm border-r border-gray-200 whitespace-nowrap"
                >
                  Application \ Process
                </th>
                {processes.map((proc) => (
                  <th
                    key={proc}
                    scope="col"
                    className="px-4 py-3 text-center min-w-[200px] border-r border-gray-300 whitespace-nowrap"
                  >
                    {proc}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="bg-white hover:bg-gray-50 transition-colors">
                  
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-100 shadow-sm">
                    {app.name}
                  </td>

                  {processes.map((proc) => {
                    const isChecked = app.processes[proc] === true;
                    return (
                      <td key={`${app.id}-${proc}`} className={`px-4 py-4 text-center border-r border-gray-200 last:border-r-0 
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

export default AppBusinessProcessMatrixPage;