import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { Loader2, Search, Database, Filter, AlertCircle, Info } from 'lucide-react';

const TechnologyStandarCatalog = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const fetchCatalogData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('spbe_architecture_catalog') 
        .select('*')
        .order('standard_id', { ascending: true });

      if (fetchError) throw fetchError;
      setCatalogData(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = catalogData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.standard_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = filterType === 'All' || item.domain === filterType;
    return matchesSearch && matchesDomain;
  });

  const renderStatusBadge = (lifecycle) => {
    const status = lifecycle.toLowerCase();
    const configs = {
      'active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'emerging': 'bg-blue-100 text-blue-700 border-blue-200',
      'retired': 'bg-red-100 text-red-700 border-red-200',
      'phasing-out': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${configs[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
        {lifecycle}
      </span>
    );
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
      <p className="font-black uppercase tracking-widest text-primary-600 text-xs">Menyusun Katalog Standar...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-6xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Technology Standard Catalog
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic uppercase tracking-widest">
          <Database size={24} className="text-secondary-600" />
          Katalog Referensi Arsitektur SPBE BMKG Balikpapan
        </p>
        <div className="mt-4 bg-primary-50 inline-block px-4 py-1.5 rounded-2xl border border-primary-100 shadow-sm">
          <small className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Kepatuhan Perka BMKG No. 9 Tahun 2023</small>
        </div>
      </div>

      {/* 2. Controls - Search & Filters (TANPA REFRESH) */}
      <div className="w-full max-w-6xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-300" size={20} />
          <input
            type="text"
            placeholder="Cari standar (ID, Nama, atau Kategori)..."
            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-primary-50 rounded-[1.5rem] shadow-xl shadow-primary-500/5 focus:border-secondary-500 focus:ring-0 transition-all font-bold text-primary-900 placeholder:text-primary-200 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-72">
          <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
          <select 
            className="appearance-none w-full pl-12 pr-10 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] text-primary-700 focus:bg-white focus:border-primary-100 transition-all cursor-pointer shadow-inner"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Semua Domain</option>
            <option value="Aplikasi">Domain Aplikasi</option>
            <option value="Infrastruktur">Domain Infrastruktur</option>
            <option value="Data">Domain Data</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary-300 font-bold">▾</div>
        </div>
      </div>

      {/* 3. Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden mb-12 relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500 uppercase tracking-[0.2em] text-[10px] font-black">
                <th className="px-8 py-7 border-r border-primary-600 w-32 text-center shadow-inner">ID Standar</th>
                <th className="px-8 py-7 border-r border-primary-600 min-w-[320px]">Komponen Teknologi</th>
                <th className="px-8 py-7 border-r border-primary-600">Kategori & Area</th>
                <th className="px-8 py-7 border-r border-primary-600 text-center">Lifecycle</th>
                <th className="px-8 py-7">Fungsi Strategis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {filteredData.length > 0 ? (
                filteredData.map((tech) => (
                  <tr key={tech.id} className="hover:bg-primary-50/40 transition-all group duration-300">
                    <td className="px-8 py-8 border-r border-primary-50 font-mono text-xs font-black text-primary-300 text-center uppercase tracking-tighter">
                      {tech.standard_id}
                    </td>
                    
                    <td className="px-8 py-8 border-r border-primary-50">
                      <div className="font-black text-primary-950 uppercase tracking-tight text-base leading-tight mb-2 group-hover:text-primary-700 transition-colors">
                        {tech.name}
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-primary-50 text-primary-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border border-primary-100">
                          {tech.domain}
                        </span>
                        <span className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border border-slate-200">
                          {tech.type}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-8 border-r border-primary-50">
                      <div className="text-xs font-black text-primary-800 uppercase mb-1 leading-tight tracking-wider">
                        {tech.category}
                      </div>
                      {tech.service_area && (
                        <div className="text-[10px] font-bold text-primary-300 italic opacity-80 uppercase tracking-tight">
                          {tech.service_area}
                        </div>
                      )}
                    </td>

                    <td className="px-8 py-8 border-r border-primary-50 text-center">
                      {renderStatusBadge(tech.lifecycle)}
                    </td>
                    
                    <td className="px-8 py-8 text-sm text-primary-950/70 font-medium leading-relaxed italic group-hover:text-primary-900 transition-colors">
                      <div className="max-w-xs overflow-hidden text-ellipsis group-hover:max-w-none transition-all duration-500">
                        "{tech.description}"
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-32 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center gap-6">
                      <div className="p-6 bg-white rounded-full shadow-xl border border-primary-50 text-primary-100">
                         <AlertCircle size={64} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-black uppercase text-primary-900 text-lg tracking-[0.2em]">Entry Not Found</p>
                        <p className="text-sm text-primary-300 italic mt-2 font-bold uppercase tracking-widest">Gunakan parameter pencarian atau domain lain.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Footer Info - CENTERED */}
      
      <div className="mt-12 text-center space-y-4">
         <div className="flex items-center justify-center gap-2 text-primary-200">
            <Info size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Enterprise Architecture Repository</p>
         </div>
         <p className="text-primary-100 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
           Stasiun Meteorologi Kelas I Balikpapan v2026
         </p>
      </div>

    </div>
  );
};

export default TechnologyStandarCatalog;