import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowLeft, Database, Server, CheckCircle2, RefreshCw } from "lucide-react";

const ApplicationPortfolioPage = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase
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
      console.error('Error fetching portfolio data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return "bg-slate-100 text-slate-700";
    if (category.includes("Core")) return "bg-blue-100 text-blue-700";
    if (category.includes("Support")) return "bg-orange-100 text-orange-700";
    return "bg-purple-100 text-purple-700";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return "text-emerald-600 bg-emerald-50";
      case 'Inactive':
        return "text-slate-600 bg-slate-50";
      case 'Deprecated':
        return "text-red-600 bg-red-50";
      case 'Planned':
        return "text-blue-600 bg-blue-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat data aplikasi...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchPortfolioData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto mb-10 text-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 md:-left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Kembali</span>
        </button>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 pt-8 md:pt-0">
            Application Portfolio Catalog
          </h1>
          <p className="text-slate-600 mt-3 text-lg max-w-3xl mx-auto">
            Daftar inventaris seluruh aplikasi dan layanan sistem informasi di lingkungan BMKG Balikpapan.
          </p>
        </div>

        <button
          onClick={fetchPortfolioData}
          className="absolute right-0 top-0 md:-right-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          title="Refresh Data"
        >
          <RefreshCw size={20} />
          <span className="hidden md:inline">Refresh</span>
        </button>
      </div>

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
              {portfolioData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    Tidak ada data aplikasi tersedia
                  </td>
                </tr>
              ) : (
                portfolioData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                    <td className="p-4 text-center font-medium text-slate-400 border-r border-slate-100">
                      {index + 1}
                    </td>
                    <td className="p-4 border-r border-slate-100 font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Database size={16} className="text-slate-400 shrink-0" />
                        {item.physical_name}
                      </div>
                    </td>
                    <td className="p-4 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <Server size={16} className="text-slate-400 shrink-0" />
                        {item.logical_component}
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
                      <span className={`inline-flex items-center gap-1 font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
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

        {/* Footer dengan statistik */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Total Aplikasi: <span className="font-bold text-slate-900">{portfolioData.length}</span>
            </span>
            <span className="text-slate-600">
              Active: <span className="font-bold text-emerald-600">
                {portfolioData.filter(item => item.status === 'Active').length}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPortfolioPage;