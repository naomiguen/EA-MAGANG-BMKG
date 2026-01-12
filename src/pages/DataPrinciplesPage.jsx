import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

const DataPrinciplesPage = () => {
  const [dataPrinciples, setDataPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataPrinciples();
  }, []);

  const fetchDataPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data principles yang aktif, diurutkan berdasarkan sort_order
      const { data, error } = await supabase
        .from('data_principles')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setDataPrinciples(data || []);
    } catch (err) {
      console.error('Error fetching data principles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 text-lg">Memuat prinsip data architecture...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={fetchDataPrinciples}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Data Architecture Principles
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            BMKG Stasiun Meteorologi Balikpapan
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* GRID KARTU PRINSIP */}
      <div className="max-w-6xl mx-auto space-y-8">
        {dataPrinciples.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-slate-400 text-lg">Tidak ada prinsip data tersedia</p>
          </div>
        ) : (
          dataPrinciples.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row">
                
                {/* Kolom Kiri: Judul & Statement */}
                <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block text-xs font-bold bg-white text-blue-700 px-3 py-1.5 rounded-lg mb-4 shadow-sm">
                      {item.id}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">{item.title}</h3>
                    <div className="w-12 h-1 bg-cyan-400 rounded-full mb-4"></div>
                    <p className="text-blue-50 leading-relaxed italic text-sm">
                      "{item.statement}"
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Rationale & Implication */}
                <div className="lg:w-3/5 p-8 bg-white">
                  <div className="space-y-6">
                    <div className="group/item">
                      <div className="flex items-center gap-3 mb-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                          Rationale
                        </label>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-13">
                        {item.rationale}
                      </p>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                    
                    <div className="group/item">
                      <div className="flex items-center gap-3 mb-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                          Implication
                        </label>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border-l-4 border-yellow-400 shadow-sm">
                        <p className="text-slate-700 leading-relaxed">
                          {item.implication}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataPrinciplesPage;