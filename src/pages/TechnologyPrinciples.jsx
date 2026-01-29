import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import { 
  ShieldCheck, Network, Layers, Zap, Target, 
  RefreshCw, FileText, Search, Cpu, Info, AlertCircle, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechnologyPrinciples = () => {
  const [principles, setPrinciples] = useState([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Mapping Nama Prinsip ke Icon
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('keamanan')) return <ShieldCheck size={32} />;
    if (lowerName.includes('interoperabilitas')) return <Network size={32} />;
    if (lowerName.includes('keterpaduan')) return <Layers size={32} />;
    if (lowerName.includes('efisiensi')) return <Zap size={32} />;
    if (lowerName.includes('efektivitas')) return <Target size={32} />;
    if (lowerName.includes('kesinambungan')) return <RefreshCw size={32} />;
    if (lowerName.includes('akuntabilitas')) return <FileText size={32} />;
    return <Cpu size={32} />;
  };

  useEffect(() => {
    fetchPrinciples();
  }, []);

  useEffect(() => {
    const results = principles.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrinciples(results);
  }, [searchTerm, principles]);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('technology_principles')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPrinciples(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && principles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
        <p className="font-black uppercase tracking-widest text-primary-600 text-xs">Menyelaraskan Prinsip Teknologi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-16 relative">
        <div className="text-center border-b-4 border-secondary-500 pb-10 w-full">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black mb-6 tracking-widest uppercase shadow-sm border border-primary-100">
            Perpres No. 95 Tahun 2018
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            Technology Principles
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic max-w-3xl mx-auto">
            <Info size={20} className="text-secondary-600 flex-shrink-0" />
            Landasan strategis untuk menjamin keselarasan teknologi dengan tujuan bisnis organisasi.
          </p>
        </div>

        {/* Search Bar - CENTERED */}
        <div className="relative w-full max-w-xl -mt-7 z-10">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-primary-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Cari prinsip arsitektur (misal: Keamanan, Efisiensi)" 
            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-primary-100 rounded-3xl shadow-2xl focus:border-secondary-500 focus:ring-0 transition-all font-bold text-primary-900 placeholder:text-primary-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="max-w-[1400px] w-full">
        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center mx-auto max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-red-800 font-black uppercase text-sm mb-2">Gagal Memuat Data</h3>
            <p className="text-red-600 text-xs mb-6">{error}</p>
            <button onClick={fetchPrinciples} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg text-xs uppercase">Coba Lagi</button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-[2.5rem] shadow-xl border border-primary-50 overflow-hidden flex flex-col hover:shadow-2xl hover:border-primary-200 transition-all"
                >
                  {/* Card Header */}
                  <div className="bg-primary-700 p-8 text-white flex justify-between items-start border-b-4 border-secondary-500 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-secondary-500/20 transition-colors" />
                    <div className="relative z-10 p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm group-hover:bg-secondary-500 group-hover:text-primary-950 transition-all duration-500">
                      {getIcon(principle.name)}
                    </div>
                    <span className="text-4xl font-black opacity-20 tracking-tighter italic">
                      {String(principle.sort_order).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 flex-1 flex flex-col bg-slate-50/30 text-center items-center">
                    <h3 className="text-xl font-black text-primary-900 uppercase tracking-tight mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                      {principle.name}
                    </h3>
                    <p className="text-primary-800/70 text-sm leading-relaxed font-medium italic">
                      "{principle.description}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-8 py-4 bg-white border-t border-primary-50 flex justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-300 bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                      {principle.tag || 'Standard Principle'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredPrinciples.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-primary-100">
            <Search className="w-16 h-16 text-primary-100 mx-auto mb-4" />
            <h3 className="text-primary-900 font-black uppercase tracking-widest text-sm">Tidak Ditemukan</h3>
            <p className="text-primary-300 text-xs italic mt-2">Tidak ada prinsip yang sesuai dengan "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* 3. Footer Decor - CENTERED */}
      
      <div className="mt-20 text-center">
         <p className="text-primary-200 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
           EA Infrastructure Governance Repository v2.0
         </p>
      </div>

    </div>
  );
};

export default TechnologyPrinciples;