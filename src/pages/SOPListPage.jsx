import React, { useState, useEffect } from 'react';
import { FileText, Search, Download, ArrowLeft, Filter, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SOPListPage = () => {
  const [sopData, setSopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // 1. FETCH DATA
  useEffect(() => {
    const fetchSOPData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('sop_documents')
          .select('*')
          .order('title');
        
        if (error) throw error;
        setSopData(data || []);
        setFilteredData(data || []);
      } catch (error) {
        console.error('Error fetching SOP data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSOPData();
  }, []);

  // 2. FILTER LOGIC
  useEffect(() => {
    let filtered = sopData;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sop => sop.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(sop =>
        sop.title?.toLowerCase().includes(q) ||
        sop.description?.toLowerCase().includes(q) ||
        sop.presenter?.toLowerCase().includes(q) ||
        sop.created_by?.toLowerCase().includes(q)
      );
    }
    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, sopData]);

  const categories = ['all', ...new Set(sopData.map(sop => sop.category))];

  // 3. STYLING HELPERS
  const getCategoryColor = (category) => {
    const colors = {
      'SOP Teknisi': 'bg-blue-50 text-blue-700 border-blue-100',
      'SOP Datin': 'bg-blue-50 text-blue-700 border-blue-100',
      'SOP Observasi': 'bg-blue-50 text-blue-700 border-blue-100',
      'SOP TU': 'bg-blue-50 text-blue-700 border-blue-100'
    };
    return colors[category] || 'bg-slate-50 text-slate-700 border-slate-100';
  };

  const getStatusColor = (status) => {
    return status === 'Aktif' 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Gagal mengunduh file.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
        <p className="font-black uppercase tracking-widest text-primary-600 text-[10px]">Memuat Dokumen SOP...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* 1. FIXED/STICKY HEADER - Solusi masalah terpotong */}
      <div className="bg-white border-b-4 border-secondary-500 sticky top-0 z-50 shadow-md w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-4">
               <button 
                onClick={() => window.history.back()} 
                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-primary-600"
               >
                 <ArrowLeft size={24} />
               </button>
               <h1 className="text-3xl md:text-5xl font-black text-primary-700 uppercase tracking-tighter">
                 Standard Operating Procedures
               </h1>
            </div>
            
            <p className="text-primary-800 text-sm md:text-base font-bold italic uppercase tracking-widest opacity-70">
              Daftar Lengkap SOP Stasiun Meteorologi Kelas I Balikpapan
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Cari SOP berdasarkan judul, deskripsi, atau pembuat..."
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

            {/* Indicator Count */}
            <div className="bg-primary-50 px-6 py-2 rounded-full border border-primary-100 shadow-sm transition-all">
               <span className="text-[11px] font-black text-primary-700 uppercase tracking-widest">
                 Menampilkan {filteredData.length} dari {sopData.length} Dokumen
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRID CONTENT - Scrollable area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((sop) => (
              <div
                key={sop.id}
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary-300 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${getCategoryColor(sop.category)}`}>
                      {sop.category}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(sop.status)}`}>
                      {sop.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-primary-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight uppercase tracking-tight">
                    {sop.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-8 line-clamp-3 italic leading-relaxed font-medium">
                    "{sop.description}"
                  </p>

                  <div className="pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Tanggal Berlaku</span>
                      <span className="text-xs font-black text-primary-800">
                        {new Date(sop.effective_date).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
                  <a
                    href={sop.doc_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white border-2 border-primary-100 hover:border-primary-600 text-primary-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                  >
                    <ExternalLink size={16} /> Pratinjau
                  </a>
                  <button
                    onClick={() => handleDownload(sop.doc_link, `${sop.title}.pdf`)}
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
            <AlertCircle size={64} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-primary-900 uppercase tracking-tighter">Tidak ada SOP ditemukan</h3>
            <p className="text-slate-400 text-sm mt-2 italic font-medium">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
          </div>
        )}
      </div>

      {/* 3. Footer Decor */}
      <div className="text-center mt-12 pb-12">
         <p className="text-slate-300 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
           Operational Repository v2.0
         </p>
      </div>

    </div>
  );
};

export default SOPListPage;