import React, { useState, useEffect } from 'react';
import { FileText, Search, Download, Eye, ArrowLeft, Filter } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SOPListPage = () => {
  const [sopData, setSopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSOPData = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('sop_documents')
          .select('*')
          .order('title');
        
        if (error) throw error;
        setSopData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching SOP data:', error);
        setLoading(false);
      }
    };

    fetchSOPData();
  }, []);

  useEffect(() => {
    let filtered = sopData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sop => sop.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(sop =>
        sop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.presenter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.created_by?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, sopData]);

  const categories = ['all', ...new Set(sopData.map(sop => sop.category))];

  const getCategoryColor = (category) => {
    const colors = {
      'SOP Teknisi': 'bg-green-100 text-green-700 border-green-200',
      'SOP Datin': 'bg-green-100 text-green-700 border-green-200',
      'SOP Observasi': 'bg-green-100 text-green-700 border-green-200',
      'SOP TU': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusColor = (status) => {
    return status === 'Aktif' 
      ? 'bg-green-100 text-green-700 border-green-300' 
      : 'bg-yellow-100 text-yellow-700 border-yellow-300';
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
      alert('Gagal mengunduh file. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SOP documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Kembali</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Standard Operating Procedures</h1>
              <p className="text-gray-600">Daftar lengkap SOP BMKG Balikpapan</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari SOP berdasarkan judul, deskripsi, atau pembuat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">Semua Kategori</option>
                {categories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {filteredData.length} dari {sopData.length} SOP
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((sop) => (
            <div
              key={sop.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(sop.category)}`}>
                    {sop.category}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(sop.status)}`}>
                    {sop.status}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {sop.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {sop.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Berlaku:</span>
                    <span className="font-semibold text-gray-700">
                      {new Date(sop.effective_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={sop.doc_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Lihat
                  </a>
                  <button
                    onClick={() => handleDownload(sop.doc_link, `${sop.title}.pdf`)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                    title="Download SOP"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <FileText size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Tidak ada SOP ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOPListPage;