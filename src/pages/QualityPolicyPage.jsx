import React, { useState, useEffect } from 'react';
import { Star, Search, Download, Eye, ArrowLeft, Filter, Loader2, Calendar, FileCheck, Info } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const QualityPolicyPage = () => {
  const [policyData, setPolicyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('quality_policy_documents')
          .select('*')
          .order('title');
        
        if (error) throw error;
        setPolicyData(data || []);
        setFilteredData(data || []);
      } catch (error) {
        console.error('Error fetching policy data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicyData();
  }, []);

  useEffect(() => {
    let filtered = policyData;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(policy => policy.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(policy =>
        policy.title?.toLowerCase().includes(q) ||
        policy.description?.toLowerCase().includes(q) ||
        policy.category?.toLowerCase().includes(q)
      );
    }
    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, policyData]);

  const categories = ['all', ...new Set(policyData.map(policy => policy.category))];

  const getCategoryStyle = (color) => {
    const styles = {
      blue: 'bg-blue-50 text-blue-700 border-blue-100',
      green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      purple: 'bg-purple-50 text-purple-700 border-purple-100'
    };
    return styles[color] || styles.blue;
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'Kebijakan_Mutu_BMKG.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert('Gagal mengunduh file.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
      <p className="font-black uppercase tracking-widest text-primary-600 text-[10px]">Memuat Kebijakan Mutu...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* 1. Header Section - CENTERED */}
      <div className="bg-white border-b-4 border-secondary-500 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-4">
               <button 
                onClick={() => window.history.back()} 
                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-primary-600"
               >
                 <ArrowLeft size={24} />
               </button>
               <h1 className="text-3xl md:text-5xl font-black text-primary-700 uppercase tracking-tighter">
                 Kebijakan Mutu
               </h1>
            </div>
            
            <p className="text-primary-800 text-sm md:text-base font-bold italic uppercase tracking-widest opacity-70 flex items-center gap-2">
              <FileCheck size={20} className="text-secondary-600" />
              Sistem Manajemen Mutu Stasiun Meteorologi Kelas I Balikpapan
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Cari kebijakan, deskripsi, atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-primary-500 focus:outline-none transition-all shadow-inner font-bold text-slate-700 text-sm"
                />
              </div>
              
              <div className="relative min-w-[220px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-11 pr-10 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-primary-500 appearance-none font-black text-[10px] uppercase tracking-widest text-slate-600 cursor-pointer shadow-inner transition-all"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.filter(cat => cat !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">▼</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid Content - CENTERED */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((policy) => (
              <div
                key={policy.id}
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary-300 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${getCategoryStyle(policy.color)}`}>
                      {policy.category}
                    </span>
                    <Star size={20} className="text-secondary-500 group-hover:rotate-45 transition-transform duration-500" fill="currentColor" />
                  </div>
                  
                  <h3 className="text-xl font-black text-primary-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight uppercase tracking-tight">
                    {policy.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-8 line-clamp-3 italic leading-relaxed font-medium">
                    "{policy.description}"
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Masa Berlaku</span>
                      </div>
                      <span className="text-[10px] font-black text-primary-800 bg-primary-50 px-3 py-1 rounded-lg border border-primary-100">
                        {new Date(policy.effective_date).getFullYear()}
                        {policy.effective_end_date && ` - ${new Date(policy.effective_end_date).getFullYear()}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
                  <a
                    href={policy.doc_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white border-2 border-primary-100 hover:border-primary-600 text-primary-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                  >
                    <Eye size={16} /> Pratinjau
                  </a>
                  <button
                    onClick={() => handleDownload(policy.doc_link, `${policy.title}.pdf`)}
                    className="flex items-center justify-center p-4 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl transition-all active:scale-95 shadow-lg shadow-primary-200"
                    title="Download PDF"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-inner max-w-4xl mx-auto">
            <Star size={64} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-primary-900 uppercase tracking-tighter">Dokumen Tidak Ditemukan</h3>
            <p className="text-slate-400 text-sm mt-2 italic font-medium">Coba sesuaikan kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* 3. Footer Decor - CENTERED */}
      
      <div className="text-center mt-12 space-y-4">
        <div className="inline-flex items-center gap-2 text-primary-200">
            <Info size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Quality Assurance Repository</p>
         </div>
         <p className="text-slate-300 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
           Standardization Framework v2.0
         </p>
      </div>
    </div>
  );
};

export default QualityPolicyPage;