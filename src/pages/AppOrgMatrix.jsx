import React, { useEffect, useState } from "react";
import { Users, AppWindow } from "lucide-react";
// Import client supabase kamu
import { supabase } from "../lib/supabaseClient";

const AppOrgMatrixPage = () => {
  const [matrixData, setMatrixData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);
      // Supabase otomatis mengonversi kolom array PostgreSQL menjadi array JavaScript
      const { data, error } = await supabase
        .from('app_org_matrix')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setMatrixData(data);
    } catch (error) {
      console.error("Error fetching org matrix:", error.message);
    } finally {
      setLoading(false);
    }
  };

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
              
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-slate-500 italic">
                    Memuat data matriks organisasi...
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!loading && matrixData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-slate-100 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-blue-50`}
                >
                  {/* Kolom Organisasi (item.org_unit) */}
                  <td className="p-5 border-r border-slate-200 align-top">
                    <div className="font-bold text-slate-900 text-base mb-1">
                      {item.org_unit} 
                    </div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                      {item.role}
                    </div>
                  </td>

                  {/* Kolom Aplikasi (item.applications) */}
                  <td className="p-5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {/* Pastikan applications ada isinya sebelum di-map */}
                      {item.applications && item.applications.map((app, idx) => (
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