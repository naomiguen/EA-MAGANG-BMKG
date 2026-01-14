import React from "react";
import { ArrowLeft, Users, AppWindow } from "lucide-react";

const AppOrgMatrixPage = () => {
  const matrixData = [
    {
      id: 1,
      orgUnit: "Unit Observasi",
      role: "Pengamatan & Pengumpulan Data",
      applications: [
        "BMKGSoft (Input Data & Pengiriman)",
        "CMSS (Communication Meteo Switching System)",
        "AFTN (Aeronautical Fixed Telecom Network)",
        "Aplikasi WXREV"
      ],
    },
    {
      id: 2,
      orgUnit: "Unit Analisa & Prakiraan",
      role: "Analisis Cuaca & Peringatan Dini",
      applications: [
        "Synergie Workstation",
        "Weather Radar Application",
        "CMSS & GTS",
        "Aplikasi Nowcasting (Gawar Dini)",
      ],
    },
    {
      id: 3,
      orgUnit: "Tata Usaha (Keuangan)",
      role: "Pengelolaan Anggaran & Laporan",
      applications: [
        "Aplikasi SAKTI (Sistem Aplikasi Keuangan Tingkat Instansi)",
        "Aplikasi SAIBA (Sistem Akuntansi Instansi)",
        "Aplikasi GPP (Gaji)",
        "SPRINT KPPN"
      ],
    },
    {
      id: 4,
      orgUnit: "Tata Usaha (Aset/BMN)",
      role: "Manajemen Barang Milik Negara",
      applications: [
        "SIMAK BMN (Sistem Informasi Manajemen dan Akuntansi BMN)",
        "SIMAN (Sistem Informasi Manajemen Aset Negara)",
        "Aplikasi Persediaan",
        "SIPPB"
      ],
    },
    {
      id: 5,
      orgUnit: "Tata Usaha (Kepegawaian)",
      role: "Manajemen SDM & Administrasi",
      applications: [
        "Aplikasi SIMAS (Sistem Informasi Manajemen ASN)",
        "E-Kinerja & SPRESO (Presensi Online)",
        "MySAPK BKN",
        "E-Office BMKG (Surat Menyurat)"
      ],
    },
    {
      id: 6,
      orgUnit: "Unit Data & Informasi",
      role: "Pengelolaan Database & Layanan",
      applications: [
        "Database Center System",
        "Portal Web Layanan",
        "Aplikasi Pelayanan Jasa (PNBP)"
      ],
    },
    {
      id: 7,
      orgUnit: "Unit Teknisi",
      role: "Pemeliharaan & Metadata",
      applications: [
        "Monitoring Tools (Alat & Jaringan)",
        "Aplikasi Metadata WIGOS",
        "Aplikasi Maintenance Logbook"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 pt-8 md:pt-0">
              Application - Organization Matrix
            </h1>
        </div>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-4">
          Pemetaan hubungan antara Unit Organisasi dengan Aplikasi yang digunakan untuk mendukung tugas dan fungsinya sesuai SK Uraian Tugas.
        </p>
      </div>

      {/* Tabel Matriks */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm uppercase tracking-wider">
                <th className="p-5 font-semibold w-1/3 border-r border-slate-700">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    Organization Unit
                  </div>
                </th>
                <th className="p-5 font-semibold w-2/3">
                  <div className="flex items-center gap-2">
                    <AppWindow size={18} />
                    Applications Used
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {matrixData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-slate-100 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-blue-50`}
                >
                  {/* Kolom Organisasi */}
                  <td className="p-5 border-r border-slate-200 align-top">
                    <div className="font-bold text-slate-900 text-base mb-1">
                      {item.orgUnit}
                    </div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                      {item.role}
                    </div>
                  </td>

                  {/* Kolom Aplikasi */}
                  <td className="p-5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {item.applications.map((app, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-white border border-slate-300 text-slate-700 shadow-sm"
                        >
                          {app}
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


    </div>
  );
};

export default AppOrgMatrixPage;