import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RefreshCw } from 'lucide-react';

const PortfolioMatrix = () => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase
  useEffect(() => {
    fetchAppsData();
  }, []);

  const fetchAppsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('app_portfolio_assessment')
        .select('*')
        .order('id');

      if (fetchError) throw fetchError;

      // Transform data ke format yang sesuai
      const transformedData = data.map(app => ({
        id: app.id,
        name: app.name,
        tech: app.technical_quality,
        func: app.functional_quality,
        category: app.category,
        description: app.description
      }));

      setApps(transformedData);
    } catch (err) {
      console.error('Error fetching apps data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDotColor = () => {
    return "bg-slate-800 border-2 border-white";
  };

  const getRecommendation = (tech, func) => {
    if (tech < 50 && func < 50) return { text: 'Eliminate', color: 'text-red-600' };
    if (tech < 50 && func >= 50) return { text: 'Replace', color: 'text-sky-600' };
    if (tech >= 50 && func < 50) return { text: 'Reassess', color: 'text-amber-600' };
    return { text: 'Maintain', color: 'text-emerald-600' };
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data assessment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchAppsData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      
      <div className="w-full max-w-5xl mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">
              Application Portfolio Assessment
            </h1>
            <p className="text-gray-500 text-center text-sm sm:text-base px-4 mt-2">
              Peta strategi modernisasi aplikasi berdasarkan kualitas teknis & fungsional
            </p>
          </div>
          <button
            onClick={fetchAppsData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            title="Refresh Data"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-5xl">
        
        {/* CONTAINER MATRIX */}
        <div className="aspect-[4/3] bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 relative ml-6 sm:ml-8">
          
          {/* LABEL SUMBU Y (Vertical) - DI SAMPING KIRI */}
          <div className="absolute -left-10 sm:-left-12 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-bold tracking-wider text-gray-700 whitespace-nowrap z-50">
            <div className="-rotate-90 origin-center">FUNCTIONAL QUALITY</div>
          </div>

          {/* LABEL SUMBU X (Horizontal) - DI BAWAH */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold tracking-widest text-gray-600 whitespace-nowrap">
            TECHNICAL QUALITY (HEALTH)
          </div>

          {/* GRID CONTAINER */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 relative border-2 border-gray-300 bg-gray-300">
          
            {/* KUADRAN 1: REPLACE (Kiri Atas) - Tech Rendah, Func Tinggi */}
            <div className="bg-sky-100 p-3 sm:p-6 flex flex-col items-end justify-end relative group transition-colors hover:bg-sky-200">
              <div className="text-right pr-2 pb-2">
                <h3 className="text-lg sm:text-2xl font-bold text-sky-800 leading-tight mb-1">Replace</h3>
                <p className="text-[9px] sm:text-[11px] text-sky-700 leading-tight max-w-[140px] ml-auto">Fungsi penting, teknologi usang. Perlu modernisasi segera.</p>
              </div>
            </div>

            {/* KUADRAN 2: MAINTAIN (Kanan Atas) - Tech Tinggi, Func Tinggi */}
            <div className="bg-emerald-100 p-3 sm:p-6 flex flex-col items-start justify-end relative transition-colors hover:bg-emerald-200">
              <div className="text-left pl-2 pb-2">
                <h3 className="text-lg sm:text-2xl font-bold text-emerald-800 leading-tight mb-1">Maintain</h3>
                <p className="text-[9px] sm:text-[11px] text-emerald-700 leading-tight max-w-[140px]">Sistem sehat & berguna. Lanjutkan investasi dan pemeliharaan.</p>
              </div>
            </div>

            {/* KUADRAN 3: ELIMINATE (Kiri Bawah) - Tech Rendah, Func Rendah */}
            <div className="bg-red-100 p-3 sm:p-6 flex flex-col items-end justify-start relative transition-colors hover:bg-red-200">
              <div className="text-right pr-2 pt-2">
                <h3 className="text-lg sm:text-2xl font-bold text-red-800 leading-tight mb-1">Eliminate</h3>
                <p className="text-[9px] sm:text-[11px] text-red-700 leading-tight max-w-[140px] ml-auto">Tidak berguna & teknologi rusak. Hapus sistem ini.</p>
              </div>
            </div>

            {/* KUADRAN 4: REASSESS (Kanan Bawah) - Tech Tinggi, Func Rendah */}
            <div className="bg-amber-100 p-3 sm:p-6 flex flex-col items-start justify-start relative transition-colors hover:bg-amber-200">
              <div className="text-left pl-2 pt-2">
                <h3 className="text-lg sm:text-2xl font-bold text-amber-800 leading-tight mb-1">Reassess</h3>
                <p className="text-[9px] sm:text-[11px] text-amber-800 leading-tight max-w-[140px]">Teknologi bagus, sepi peminat. Tambah fitur atau pivot.</p>
              </div>
            </div>

            {/* TITIK PLOTTING APLIKASI (SCATTER PLOT) */}
            {apps.map((app) => (
              <div
                key={app.id}
                className={`absolute w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform z-10 ${getDotColor()}`}
                style={{
                  left: `${app.tech}%`,
                  top: `${100 - app.func}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredApp(app)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <span className="text-[9px] sm:text-[11px] font-bold text-white">{String.fromCharCode(64 + app.id)}</span>
              </div>
            ))}

          </div>

          {/* HOVER TOOLTIP */}
          {hoveredApp && (
            <div 
              className="absolute bg-white p-3 rounded-lg shadow-2xl border-2 border-gray-300 z-50 pointer-events-none w-48"
              style={{
                left: `calc(${hoveredApp.tech}% + 20px)`,
                bottom: `calc(${hoveredApp.func}% + 20px)`,
              }}
            >
              <h4 className="font-bold text-gray-800 text-sm">{hoveredApp.name}</h4>
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Tech Score:</span>
                  <span className="font-semibold text-blue-600">{hoveredApp.tech}</span>
                </div>
                <div className="flex justify-between">
                  <span>Func Score:</span>
                  <span className="font-semibold text-green-600">{hoveredApp.func}</span>
                </div>
              </div>
              <div className="mt-2 text-[10px] uppercase font-bold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                {hoveredApp.category}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* LEGENDA / KETERANGAN DATA */}
      <div className="mt-8 w-full max-w-5xl bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4 text-sm sm:text-base">Detail Penilaian Aplikasi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-gray-600">
            <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-2">Kode</th>
                <th className="px-2 sm:px-4 py-2">Nama Aplikasi</th>
                <th className="px-2 sm:px-4 py-2">Kualitas Teknis</th>
                <th className="px-2 sm:px-4 py-2">Kualitas Fungsional</th>
                <th className="px-2 sm:px-4 py-2">Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                    Tidak ada data aplikasi
                  </td>
                </tr>
              ) : (
                apps.map((app) => {
                  const recommendation = getRecommendation(app.tech, app.func);
                  return (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-2 font-bold">{String.fromCharCode(64 + app.id)}</td>
                      <td className="px-2 sm:px-4 py-2 font-medium text-gray-900">{app.name}</td>
                      <td className="px-2 sm:px-4 py-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${app.tech}%`}}></div>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{app.tech}%</div>
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full transition-all" style={{width: `${app.func}%`}}></div>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{app.func}%</div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 font-bold text-xs sm:text-sm">
                        <span className={recommendation.color}>{recommendation.text}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Statistics */}
        {apps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div>
              <div className="text-emerald-600 font-bold text-lg">
                {apps.filter(a => a.tech >= 50 && a.func >= 50).length}
              </div>
              <div className="text-gray-500">Maintain</div>
            </div>
            <div>
              <div className="text-sky-600 font-bold text-lg">
                {apps.filter(a => a.tech < 50 && a.func >= 50).length}
              </div>
              <div className="text-gray-500">Replace</div>
            </div>
            <div>
              <div className="text-amber-600 font-bold text-lg">
                {apps.filter(a => a.tech >= 50 && a.func < 50).length}
              </div>
              <div className="text-gray-500">Reassess</div>
            </div>
            <div>
              <div className="text-red-600 font-bold text-lg">
                {apps.filter(a => a.tech < 50 && a.func < 50).length}
              </div>
              <div className="text-gray-500">Eliminate</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default PortfolioMatrix;