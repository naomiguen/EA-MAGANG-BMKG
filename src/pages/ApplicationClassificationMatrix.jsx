import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Filter, Database, Info, Layers } from 'lucide-react';

const ApplicationClassificationMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = filter === 'All' 
    ? applications 
    : applications.filter(app => app.classification_level_1 === filter);

  const getL2BadgeStyle = (level2) => {
    if (!level2) return "bg-slate-100 text-slate-600 border-slate-200";
    if (level2.includes("Administrasi")) return "bg-slate-100 text-slate-700 border-slate-300";
    if (level2.includes("Layanan Publik")) return "bg-primary-50 text-primary-700 border-primary-200";
    if (level2.includes("Tertentu")) return "bg-secondary-50 text-secondary-700 border-secondary-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-center">Sinkronisasi Matriks Klasifikasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Klasifikasi</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchApplications} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg uppercase text-xs">Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-12 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Application Classification Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Klasifikasi Domain Arsitektur Aplikasi (DAA) - Peraturan BMKG No. 9 Tahun 2023
        </p>
      </div>

      {/* 2. Controls - FILTER BUTTONS */}
      <div className="w-full max-w-5xl mb-8 flex flex-wrap justify-center gap-4">
        {[
          { id: 'All', label: `Semua Aplikasi (${applications.length})` },
          { id: 'Aplikasi Umum', label: 'Aplikasi Umum' },
          { id: 'Aplikasi Khusus', label: 'Aplikasi Khusus' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
              filter === btn.id 
              ? "bg-primary-700 text-white border-primary-700 shadow-lg shadow-primary-100 scale-105" 
              : "bg-white text-primary-400 border-primary-50 hover:border-primary-200"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* 3. Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center border-r border-primary-600 w-24">Kode DAA</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest border-r border-primary-600 min-w-[200px]">Nama Aplikasi</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest border-r border-primary-600">Deskripsi & Fungsi</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center border-r border-primary-600">Klasifikasi (L1)</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center border-r border-primary-600">Domain (L2)</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center">Unit Pengelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-primary-50/30 transition-colors group">
                  <td className="px-6 py-6 text-center border-r border-primary-50 font-mono text-[11px] font-black text-primary-300">
                    {String(app.id).padStart(3, '0')}
                  </td>
                  <td className="px-8 py-6 border-r border-primary-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        <Database size={14} />
                      </div>
                      <span className="font-black text-primary-900 uppercase tracking-tight text-sm leading-tight">
                        {app.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-r border-primary-50 text-center">
                    <p className="text-primary-800/70 text-sm leading-relaxed font-medium italic italic leading-relaxed">
                      "{app.description}"
                    </p>
                  </td>
                  <td className="px-6 py-6 border-r border-primary-50 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                      app.classification_level_1 === 'Aplikasi Umum' 
                      ? "bg-primary-50 text-primary-700 border-primary-200" 
                      : "bg-secondary-50 text-secondary-700 border-secondary-200"
                    }`}>
                      {app.classification_level_1}
                    </span>
                  </td>
                  <td className="px-6 py-6 border-r border-primary-50 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${getL2BadgeStyle(app.classification_level_2)}`}>
                      {app.classification_level_2}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none">
                      {app.owner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Footer Info - CENTERED */}
      
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <div className="bg-primary-50 px-8 py-4 rounded-[1.5rem] border border-primary-100 shadow-sm max-w-2xl">
          <p className="text-primary-800 font-bold text-xs leading-relaxed italic">
            Total Aplikasi: {applications.length} item terdaftar. Data disusun berdasarkan Lampiran Peraturan Kepala BMKG Nomor 9 Tahun 2023 tentang Arsitektur SPBE BMKG.
          </p>
        </div>
        <p className="text-primary-300 font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">
          ← Scroll horizontal untuk melihat detail domain →
        </p>
      </div>

    </div>
  );
};

export default ApplicationClassificationMatrix;