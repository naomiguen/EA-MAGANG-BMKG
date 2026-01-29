import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowLeft, Database, Server, CheckCircle2, RefreshCw, Loader2, AlertCircle, Info } from "lucide-react";

const ApplicationPortfolioPage = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('application_portfolio')
        .select('*')
        .order('id');

      if (fetchError) throw fetchError;
      setPortfolioData(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStyle = (category) => {
    if (!category) return "bg-slate-100 text-slate-700 border-slate-200";
    if (category.includes("Core")) return "bg-primary-50 text-primary-700 border-primary-200";
    if (category.includes("Support")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-purple-50 text-purple-700 border-purple-200";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case 'Planned': return "text-primary-600 bg-primary-50 border-primary-200";
      case 'Deprecated': return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-500 bg-slate-50 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest">Sinkronisasi Portofolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Data</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchPortfolioData} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-12 relative">
        <div className="w-full flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-primary-50 text-primary-700 rounded-2xl hover:bg-primary-100 transition-all flex items-center gap-2 font-black uppercase text-[10px] tracking-widest shadow-sm"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
          <button 
            onClick={fetchPortfolioData}
            className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-primary-50 hover:text-primary-700 transition-all shadow-sm"
            title="Refresh Portfolio"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full">
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            Application Portfolio Catalog
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
            <Info size={20} className="text-secondary-600 flex-shrink-0" />
            Daftar inventaris komponen fisik, logis, dan layanan sistem informasi BMKG.
          </p>
        </div>
      </div>

      {/* 2. Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="px-6 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600 w-20">ID</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest border-r border-primary-600">Physical App Component</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest border-r border-primary-600">Logical Component</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest border-r border-primary-600">System Service</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest border-r border-primary-600">Category</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {portfolioData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-primary-300 font-black uppercase italic">
                    Belum ada portofolio aplikasi terdaftar
                  </td>
                </tr>
              ) : (
                portfolioData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-primary-50/30 transition-colors group">
                    <td className="px-6 py-6 text-center border-r border-primary-50 text-[10px] font-black text-primary-300 uppercase">
                      APP-{String(item.id).padStart(3, '0')}
                    </td>
                    <td className="px-8 py-6 border-r border-primary-50">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 bg-primary-50 p-2 rounded-lg group-hover:bg-white transition-colors">
                          <Database size={16} className="text-primary-600" />
                        </div>
                        <span className="font-black text-primary-900 uppercase tracking-tight text-sm leading-tight">
                          {item.physical_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-r border-primary-50">
                      <div className="flex items-center gap-3">
                        <Server size={16} className="text-primary-300 group-hover:text-primary-500 transition-colors" />
                        <span className="font-bold text-primary-800 text-sm">{item.logical_component}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-r border-primary-50">
                      <p className="text-primary-950/70 text-sm leading-relaxed font-medium italic">
                        "{item.service}"
                      </p>
                    </td>
                    <td className="px-8 py-6 border-r border-primary-50">
                      <span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getCategoryStyle(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 ${getStatusStyle(item.status)}`}>
                        {item.status === 'Active' && <CheckCircle2 size={12} />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Summary Footer - CENTERED */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-50 p-6 rounded-[2rem] border border-primary-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-600">
              <Server size={24} />
            </div>
            <span className="font-black text-primary-900 uppercase tracking-widest text-xs">Total Enterprise Assets</span>
          </div>
          <span className="text-3xl font-black text-primary-700 leading-none">{portfolioData.length}</span>
        </div>

        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <span className="font-black text-emerald-900 uppercase tracking-widest text-xs">Operational Status</span>
          </div>
          <span className="text-3xl font-black text-emerald-600 leading-none">
            {portfolioData.filter(item => item.status === 'Active').length}
          </span>
        </div>
      </div>

      {/* Helper Hint */}
      <div className="mt-12 text-center">
         <p className="text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
           Application Portfolio Repository v2026 - BMKG Balikpapan
         </p>
      </div>

    </div>
  );
};

export default ApplicationPortfolioPage;