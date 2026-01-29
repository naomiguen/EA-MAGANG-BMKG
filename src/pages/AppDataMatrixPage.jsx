import React, { useEffect, useState } from "react";
import { Database, FileText, Loader2, AlertCircle, Info } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const AppDataMatrixPage = () => {
  const [appDataMatrix, setAppDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppData();
  }, []);

  const fetchAppData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('app_data_matrix')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) throw fetchError;
      
      setAppDataMatrix(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDataTypeStyle = (type) => {
    if (!type) return "bg-slate-100 text-slate-600 border-slate-200";
    if (type.includes("Master")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (type.includes("Analytical")) return "bg-purple-50 text-purple-700 border-purple-200";
    return "bg-primary-50 text-primary-700 border-primary-200";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest">Sinkronisasi Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 text-center">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Matriks</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchAppData} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Application - Data Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic lowercase first-letter:uppercase">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Pemetaan hubungan antara aplikasi sistem dengan entitas data operasional.
        </p>
      </div>

      {/* 2. Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse"> {/* Layout otomatis agar tidak ada yang terpotong */}
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600 whitespace-nowrap">Application System</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600">Description / Function</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600 whitespace-nowrap">Data Entity</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center whitespace-nowrap">Entity Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {appDataMatrix.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-primary-300 font-black uppercase italic">
                    Belum ada data aplikasi terdaftar
                  </td>
                </tr>
              ) : (
                appDataMatrix.map((item, index) => (
                  <tr key={item.id} className="hover:bg-primary-50/30 transition-colors group">
                    
                    {/* KOLOM APLIKASI: Logo sejajar kiri di dalam kontainer yang lebar */}
                    <td className="px-8 py-6 border-r border-primary-50 min-w-[280px]">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 bg-primary-50 p-2.5 rounded-xl group-hover:bg-white transition-colors shadow-sm">
                          <Database size={20} className="text-primary-600" />
                        </div>
                        <span className="font-black text-primary-900 uppercase tracking-tight text-sm leading-tight">
                          {item.app_name}
                        </span>
                      </div>
                    </td>

                    {/* KOLOM DESKRIPSI: Teks rata tengah dan membungkus ke bawah (tidak terpotong) */}
                    <td className="px-8 py-6 border-r border-primary-50 min-w-[350px]">
                      <p className="text-primary-800/80 text-sm leading-relaxed font-medium text-center italic">
                        "{item.description}"
                      </p>
                    </td>

                    {/* KOLOM ENTITAS DATA: Logo sejajar kiri */}
                    <td className="px-8 py-6 border-r border-primary-50 min-w-[280px]">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 bg-slate-50 p-2.5 rounded-xl group-hover:bg-white transition-colors shadow-sm border border-slate-100">
                          <FileText size={20} className="text-primary-400" />
                        </div>
                        <span className="font-bold text-primary-900 uppercase text-sm leading-tight">
                          {item.data_entity}
                        </span>
                      </div>
                    </td>

                    {/* KOLOM ENTITY TYPE: Badge tetap di tengah */}
                    <td className="px-8 py-6 text-center min-w-[180px]">
                      <span className={`inline-block px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 shadow-sm whitespace-nowrap ${getDataTypeStyle(item.data_type)}`}>
                        {item.data_type}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Footer Info */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="bg-primary-50 px-6 py-3 rounded-2xl border border-primary-100 shadow-sm">
          <p className="text-primary-800 font-black uppercase text-xs tracking-[0.2em]">
            Total Kapabilitas: <span className="text-primary-600">{appDataMatrix.length} Aplikasi Terintegrasi</span>
          </p>
        </div>
        <p className="text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
          ← Geser ke samping untuk melihat detail entitas →
        </p>
      </div>

    </div>
  );
};

export default AppDataMatrixPage;