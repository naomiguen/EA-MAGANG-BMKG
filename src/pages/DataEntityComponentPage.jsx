import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Database, Loader2, AlertCircle, Info, Hash } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest">Sinkronisasi Katalog Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 text-center">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Katalog</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchDataEntities} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Data Entity Catalog
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Katalog entitas data dan rincian atribut logis operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* 2. Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600">Data Entity</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600">Entity Description</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">Logical Attributes (Information Detail)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {dataCatalog.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center text-primary-300 font-black uppercase italic">
                    Belum ada entitas data terdaftar
                  </td>
                </tr>
              ) : (
                dataCatalog.map((item, index) => (
                  <tr key={item.id} className="hover:bg-primary-50/30 transition-colors group">
                    
                    {/* KOLOM ENTITY: Logo & ID Sejajar */}
                    <td className="px-8 py-6 border-r border-primary-50 min-w-[280px]">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 bg-primary-50 p-3 rounded-2xl group-hover:bg-white transition-colors shadow-sm">
                          <Database size={24} className="text-primary-600" />
                        </div>
                        <div>
                          <div className="font-black text-primary-900 uppercase tracking-tight text-base leading-tight">
                            {item.entity}
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-black text-secondary-600 uppercase tracking-widest">
                            <Hash size={10} /> DE-{String(item.id).padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* KOLOM DESKRIPSI: Rata Tengah & Italic */}
                    <td className="px-8 py-6 border-r border-primary-50 min-w-[350px]">
                      <p className="text-primary-800/80 text-sm leading-relaxed font-medium text-center italic">
                        "{item.description}"
                      </p>
                    </td>

                    {/* KOLOM ATTRIBUTES: Badges */}
                    <td className="px-8 py-6 min-w-[400px]">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.logicalAttributes.map((attr, idx) => (
                          <span 
                            key={idx} 
                            className="bg-white border-2 border-primary-100 text-primary-700 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tight shadow-sm hover:border-secondary-400 hover:text-secondary-600 transition-all cursor-default"
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

      {/* 3. Footer Info - CENTERED */}
      
      <div className="mt-12 flex flex-col items-center gap-4 max-w-3xl text-center">
        <div className="bg-primary-50 px-8 py-4 rounded-[1.5rem] border border-primary-100 shadow-sm">
          <p className="text-primary-800 font-bold text-sm leading-relaxed italic">
            * Atribut logis disusun berdasarkan formulir standar operasional (ME.48, Logbook) dan uraian tugas dalam SK Kepala Stasiun.
          </p>
        </div>
        <p className="text-primary-300 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
          ← Geser ke samping untuk rincian atribut lengkap →
        </p>
      </div>

    </div>
  );
};

export default DataEntityPage;