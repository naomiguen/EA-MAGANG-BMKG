import React, { useState, useEffect } from 'react';
import { Star, Search, Download, Eye, ArrowLeft, Filter } from 'lucide-react';
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
        setPolicyData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching policy data:', error);
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
      filtered = filtered.filter(policy =>
        policy.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedCategory, policyData]);

  const categories = ['all', ...new Set(policyData.map(policy => policy.category))];

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  const getButtonColor = (color) => {
    const colors = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600'
    };
    return colors[color] || colors.blue;
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quality policy documents...</p>
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
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Kembali</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Star size={32} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Kebijakan Mutu</h1>
              <p className="text-gray-600">Dokumen kebijakan dan prosedur sistem manajemen mutu</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari kebijakan berdasarkan judul, deskripsi, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="all">Semua Kategori</option>
                {categories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {filteredData.length} dari {policyData.length} dokumen
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(policy.color)}`}>
                    {policy.category}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {policy.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {policy.description}
                </p>

                <div className="flex-grow"></div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Berlaku:</span>
                    <span className="font-semibold text-gray-700">
                      {new Date(policy.effective_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                      {policy.effective_end_date && (
                        <>
                          {' - '}
                          {new Date(policy.effective_end_date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={policy.doc_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 ${getButtonColor(policy.color)} text-white rounded-lg text-sm font-semibold transition-colors`}
                  >
                    Lihat
                  </a>
                  <button
                    onClick={() => handleDownload(policy.doc_link, `${policy.title}.pdf`)}
                    className="flex items-center justify-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                    title="Download Dokumen"
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
            <Star size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Tidak ada dokumen ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityPolicyPage;