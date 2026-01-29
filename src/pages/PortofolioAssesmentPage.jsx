import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RefreshCw, Info, ShieldCheck, Zap, Trash2, TrendingUp } from 'lucide-react';

const PortfolioMatrix = () => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getRecommendation = (tech, func) => {
    if (tech < 50 && func < 50) return { text: 'Eliminate', color: 'text-red-600', bg: 'bg-red-50' };
    if (tech < 50 && func >= 50) return { text: 'Replace', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (tech >= 50 && func < 50) return { text: 'Reassess', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { text: 'Maintain', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Memuat Data Assessment...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-12 px-4 sm:px-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-5xl mb-12 text-center border-b-4 border-amber-400 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-blue-900 mb-4 uppercase tracking-tighter">
          Application Portfolio Assessment
        </h1>
        <p className="text-blue-800 text-lg md:text-xl font-bold italic opacity-80 uppercase tracking-widest text-center">
          Peta Strategis Modernisasi Sistem Informasi BMKG
        </p>
      </div>

      <div className="relative w-full max-w-5xl">
        {/* CONTAINER MATRIX */}
        <div className="aspect-[4/3] bg-white shadow-2xl rounded-[2.5rem] p-6 sm:p-8 border-2 border-slate-100 relative ml-6 sm:ml-8">
          
          {/* LABELS SUMBU */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.3em] text-blue-900/40 whitespace-nowrap z-40">
            <div className="-rotate-90 origin-center">FUNCTIONAL QUALITY</div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[0.3em] text-blue-900/40 whitespace-nowrap">
            TECHNICAL QUALITY (SYSTEM HEALTH)
          </div>

          {/* GRID CONTAINER - POSISI TULISAN TETAP SESUAI ASLINYA */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 relative border-2 border-slate-200 bg-slate-200 rounded-3xl overflow-hidden">
          
            {/* KUADRAN 1: REPLACE (Kiri Atas) */}
            <div className="bg-blue-50 p-3 sm:p-6 flex flex-col items-end justify-end relative transition-colors">
              <div className="text-right pr-2 pb-2">
                <h3 className="text-lg sm:text-2xl font-black text-blue-800 leading-tight mb-1 uppercase">Replace</h3>
                <p className="text-[9px] sm:text-[11px] text-blue-700 leading-tight max-w-[140px] ml-auto font-bold opacity-60">Fungsi penting, teknologi usang. Perlu modernisasi segera.</p>
              </div>
            </div>

            {/* KUADRAN 2: MAINTAIN (Kanan Atas) */}
            <div className="bg-emerald-50 p-3 sm:p-6 flex flex-col items-start justify-end relative transition-colors">
              <div className="text-left pl-2 pb-2">
                <h3 className="text-lg sm:text-2xl font-black text-emerald-800 leading-tight mb-1 uppercase">Maintain</h3>
                <p className="text-[9px] sm:text-[11px] text-emerald-700 leading-tight max-w-[140px] font-bold opacity-60">Sistem sehat & berguna. Lanjutkan investasi dan pemeliharaan.</p>
              </div>
            </div>

            {/* KUADRAN 3: ELIMINATE (Kiri Bawah) */}
            <div className="bg-red-50 p-3 sm:p-6 flex flex-col items-end justify-start relative transition-colors">
              <div className="text-right pr-2 pt-2">
                <h3 className="text-lg sm:text-2xl font-black text-red-800 leading-tight mb-1 uppercase">Eliminate</h3>
                <p className="text-[9px] sm:text-[11px] text-red-700 leading-tight max-w-[140px] ml-auto font-bold opacity-60">Tidak berguna & teknologi rusak. Hapus sistem ini.</p>
              </div>
            </div>

            {/* KUADRAN 4: REASSESS (Kanan Bawah) */}
            <div className="bg-amber-50 p-3 sm:p-6 flex flex-col items-start justify-start relative transition-colors">
              <div className="text-left pl-2 pt-2">
                <h3 className="text-lg sm:text-2xl font-black text-amber-800 leading-tight mb-1 uppercase">Reassess</h3>
                <p className="text-[9px] sm:text-[11px] text-amber-800 leading-tight max-w-[140px] font-bold opacity-60">Teknologi bagus, sepi peminat. Tambah fitur atau pivot.</p>
              </div>
            </div>

            {/* SCATTER PLOT POINTS */}
            {apps.map((app) => (
              <div
                key={app.id}
                className="absolute w-8 h-8 rounded-xl bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-125 hover:rotate-12 transition-all z-10"
                style={{
                  left: `${app.tech}%`,
                  top: `${100 - app.func}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredApp(app)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <span className="text-[10px] font-black text-white">{String.fromCharCode(64 + app.id)}</span>
              </div>
            ))}

          </div>

          {/* TOOLTIP */}
          {hoveredApp && (
            <div 
              className="absolute bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 pointer-events-none w-52 border-t-4 border-amber-400 animate-in fade-in zoom-in duration-200"
              style={{
                left: hoveredApp.tech > 70 ? 'auto' : `calc(${hoveredApp.tech}% + 30px)`,
                right: hoveredApp.tech > 70 ? '10%' : 'auto',
                top: `calc(${100 - hoveredApp.func}% - 20px)`,
              }}
            >
              <h4 className="font-black text-xs uppercase tracking-widest border-b border-white/10 pb-2 mb-2">{hoveredApp.name}</h4>
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="opacity-60 uppercase">Technical:</span>
                <span className="text-amber-400">{hoveredApp.tech}%</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="opacity-60 uppercase">Functional:</span>
                <span className="text-emerald-400">{hoveredApp.func}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="mt-20 w-full max-w-5xl bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-blue-900 p-6 text-center">
          <h3 className="text-white font-black uppercase tracking-widest text-sm inline-flex items-center gap-2">
            <TrendingUp size={18} className="text-amber-400" /> Detail Penilaian Strategis
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-100">
                <th className="px-6 py-4 font-black uppercase tracking-wider text-slate-400 text-[10px]">ID</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-slate-900">Aplikasi</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-center">Tech Score</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-center">Func Score</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-right">Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {apps.map((app) => {
                const rec = getRecommendation(app.tech, app.func);
                return (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-300">{String.fromCharCode(64 + app.id)}</td>
                    <td className="px-6 py-4 font-bold text-blue-900 uppercase tracking-tight">{app.name}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg font-black text-blue-700">{app.tech}%</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg font-black text-emerald-700">{app.func}%</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 ${rec.color} ${rec.color.replace('text', 'border')}`}>
                        {rec.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY STATS - CENTERED */}
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {[
          { label: 'Maintain', count: apps.filter(a => a.tech >= 50 && a.func >= 50).length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Replace', count: apps.filter(a => a.tech < 50 && a.func >= 50).length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Reassess', count: apps.filter(a => a.tech >= 50 && a.func < 50).length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Eliminate', count: apps.filter(a => a.tech < 50 && a.func < 50).length, color: 'text-red-600', bg: 'bg-red-50' }
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2rem] border-2 border-transparent hover:border-white shadow-sm transition-all text-center`}>
            <div className={`text-4xl font-black ${stat.color} mb-1 leading-none`}>{stat.count}</div>
            <div className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-slate-300 font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">
        Application Architecture Governance v2.0
      </div>

    </div>
  );
};

export default PortfolioMatrix;