import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

const DataEntityPage = () => {
  const [dataCatalog, setDataCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataEntities();
  }, []);

  const fetchDataEntities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data entities dengan logical attributes (JOIN)
      const { data, error } = await supabase
        .from('data_entities')
        .select(`
          id,
          entity,
          description,
          logical_attributes (
            id,
            attribute_name,
            sort_order
          )
        `)
        .order('id', { ascending: true });

      if (error) throw error;

      // Transform data agar sesuai format component
      const transformedData = data.map(item => ({
        id: item.id,
        entity: item.entity,
        description: item.description,
        logicalAttributes: item.logical_attributes
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(attr => attr.attribute_name)
      }));

      setDataCatalog(transformedData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mb-4"></div>
          <p className="text-slate-600 text-lg">Memuat data catalog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={fetchDataEntities}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      {/* Header Halaman */}
      <div className="text-center mb-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
          Data Entity - Data Component Catalog
        </h1>
        <p className="text-slate-500 text-lg">
          Katalog entitas data dan rincian atribut logis (informasi) yang dikelola dalam operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* Tabel Catalog */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-700 text-white text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold w-1/4 border-r border-teal-600">Data Entity</th>
                <th className="px-6 py-4 font-bold w-1/3 border-r border-teal-600">Deskripsi Entitas</th>
                <th className="px-6 py-4 font-bold w-1/3">Logical Data Attributes (Rincian Informasi)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataCatalog.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-400">
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                dataCatalog.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-teal-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    {/* Kolom 1: Data Entity */}
                    <td className="px-6 py-5 align-top border-r border-gray-200">
                      <div className="font-bold text-teal-900 text-base mb-1">{item.entity}</div>
                      <div className="text-xs text-teal-500 font-mono bg-teal-50 inline-block px-2 py-1 rounded">
                        ID: DE-{String(item.id).padStart(2, '0')}
                      </div>
                    </td>

                    {/* Kolom 2: Deskripsi */}
                    <td className="px-6 py-5 align-top text-gray-600 text-sm leading-relaxed border-r border-gray-200">
                      {item.description}
                    </td>

                    {/* Kolom 3: Logical Attributes */}
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-wrap gap-2">
                        {item.logicalAttributes.map((attr, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                          >
                            • {attr}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-slate-400 text-sm italic">
        * Atribut logis disusun berdasarkan formulir standar operasional (ME.48, Logbook) dan uraian tugas dalam SK Kepala Stasiun.
      </div>
    </div>
  );
};

export default DataEntityPage;