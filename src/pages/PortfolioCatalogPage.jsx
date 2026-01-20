<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import React from "react";
>>>>>>> zaraa
import { ArrowLeft, Database, Server, CheckCircle2 } from "lucide-react";
// Import client supabase
import { supabase } from "../lib/supabaseClient";

const ApplicationPortfolioPage = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  
  // State untuk data dan loading
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat halaman dimuat
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('application_portfolio')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error.message);
    } finally {
      setLoading(false);
    }
  };
=======
  const portfolioData = [
    // --- CORE BUSINESS (UTAMA - OBSERVASI & KOMUNIKASI) ---
    {
      id: 1,
      physicalName: "BMKGSoft",
      logicalComp: "Meteorological Data Entry",
      service: "Layanan Pengolahan Data Observasi",
      category: "Core Business",
      status: "Active",
    },
    {
      id: 2,
      physicalName: "CMSS",
      logicalComp: "Data Communication System",
      service: "Layanan Pertukaran Data Global (GTS)",
      category: "Core Business",
      status: "Active",
    },
    
    // --- CORE ANALYSIS (FORECASTER) ---
    {
      id: 3,
      physicalName: "Synergie, Radar & Nowcasting",
      logicalComp: "Forecaster Workstation",
      service: "Layanan Analisis & Prakiraan Cuaca",
      category: "Core Analysis",
      status: "Active",
    },

    // // --- PUBLIC SERVICE (DATIN) - BARU ---
    // {
    //   id: 4,
    //   physicalName: "Portal Web, PNBP & Database Center",
    //   logicalComp: "Public Service System",
    //   service: "Layanan Informasi & Jasa Meteorologi",
    //   category: "Core Business",
    //   status: "Active",
    // },
    
    // --- SUPPORT (KEUANGAN - TU) ---
    {
      id: 5,
      physicalName: "SAKTI, SAIBA, GPP & SPRINT",
      logicalComp: "Financial Management System",
      service: "Layanan Perbendaharaan, Gaji & Anggaran",
      category: "Support (Gov)",
      status: "Active",
    },

    // --- SUPPORT (ASET - TU) ---
    {
      id: 6,
      physicalName: "SIMAK, SIMAN, SAKTI & SIPPB",
      logicalComp: "Asset Management System",
      service: "Layanan Inventarisasi Aset Negara",
      category: "Support (Gov)",
      status: "Active",
    },

    // --- MANAGEMENT (SDM - TU) ---
    {
      id: 7,
      physicalName: "SIMAS, SPRESO, MySAPK & E-Kinerja",
      logicalComp: "HR Information System",
      service: "Layanan Manajemen SDM & Absensi",
      category: "Management",
      status: "Active",
    },
    {
      id: 8,
      physicalName: "E-Office BMKG",
      logicalComp: "Office Automation",
      service: "Layanan Persuratan Digital",
      category: "Management",
      status: "Active",
    },

    // --- TEKNIS & PEMELIHARAAN (TEKNISI) ---
    {
      id: 9,
      physicalName: "WIGOS, Monitoring Tools & Logbook",
      logicalComp: "Maintenance & Metadata System",
      service: "Layanan Standarisasi & Pemeliharaan Alat",
      category: "Core Technical",
      status: "Active",
    },
  ];
>>>>>>> zaraa

  // Helper untuk warna kategori
  const getCategoryColor = (category) => {
    if (!category) return "bg-slate-100 text-slate-700";
    if (category.includes("Core")) return "bg-blue-100 text-blue-700";
    if (category.includes("Support")) return "bg-orange-100 text-orange-700";
    return "bg-purple-100 text-purple-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      
      {/* --- 1. HEADER HALAMAN --- */}
      <div className="max-w-7xl mx-auto mb-10 text-center relative">
<<<<<<< HEAD
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 md:-left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Kembali</span>
        </button>
=======
>>>>>>> zaraa

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 pt-8 md:pt-0">
            Application Portfolio Catalog
          </h1>
          <p className="text-slate-600 mt-3 text-lg max-w-3xl mx-auto">
            Daftar inventaris seluruh aplikasi, layanan sistem informasi, dan komponen logis 
            yang beroperasi di lingkungan BMKG Balikpapan.
          </p>
        </div>
      </div>

      {/* --- 2. TABEL DATA --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold border-r border-slate-700 w-16 text-center">No</th>
                <th className="p-4 font-bold border-r border-slate-700 min-w-[250px]">Physical App Component</th>
                <th className="p-4 font-bold border-r border-slate-700 min-w-[200px]">Logical App Component</th>
                <th className="p-4 font-bold border-r border-slate-700 min-w-[250px]">Info System Service</th>
                <th className="p-4 font-bold border-r border-slate-700 w-[150px]">Category</th>
                <th className="p-4 font-bold w-[100px] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
              
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500 italic">
                    Memuat data portofolio...
                  </td>
                </tr>
              )}

              {/* Data Loop */}
              {!loading && portfolioData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                >
                  <td className="p-4 text-center font-medium text-slate-400 border-r border-slate-100">
                    {index + 1}
                  </td>
                  {/* Perhatikan penamaan properti (snake_case) sesuai DB */}
                  <td className="p-4 border-r border-slate-100 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
<<<<<<< HEAD
                      <Database size={16} className="text-slate-400" />
                      {item.physical_name}
=======
                      <Database size={16} className="text-slate-400 shrink-0" />
                      {item.physicalName}
>>>>>>> zaraa
                    </div>
                  </td>
                  <td className="p-4 border-r border-slate-100">
                    <div className="flex items-center gap-2">
<<<<<<< HEAD
                      <Server size={16} className="text-slate-400" />
                      {item.logical_comp}
=======
                      <Server size={16} className="text-slate-400 shrink-0" />
                      {item.logicalComp}
>>>>>>> zaraa
                    </div>
                  </td>
                  <td className="p-4 border-r border-slate-100">
                    {item.service}
                  </td>
                  <td className="p-4 border-r border-slate-100">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full text-xs">
                      <CheckCircle2 size={12} />
                      {item.status}
                    </span>
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

export default ApplicationPortfolioPage;