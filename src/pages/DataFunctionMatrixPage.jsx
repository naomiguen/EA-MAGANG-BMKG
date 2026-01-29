import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Info } from "lucide-react";

const DataFunctionMatrixPage = () => {
  const [businessFunctions, setBusinessFunctions] = useState([]);
  const [dataEntities, setDataEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [functionsRes, entitiesRes, relationshipsRes] = await Promise.all([
        supabase
          .from('business_functions')
          .select('*')
          .order('sort_order', { ascending: true }),
        
        supabase
          .from('matrix_data_entities')
          .select('*')
          .order('sort_order', { ascending: true }),
        
        supabase
          .from('data_function_relationships')
          .select('*')
      ]);

      if (functionsRes.error) throw functionsRes.error;
      if (entitiesRes.error) throw entitiesRes.error;
      if (relationshipsRes.error) throw relationshipsRes.error;

      setBusinessFunctions(functionsRes.data || []);
      setDataEntities(entitiesRes.data || []);
      setRelationships(relationshipsRes.data || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRelation = (funcId, dataId) => {
    const rel = relationships.find(r => r.func_id === funcId && r.data_id === dataId);
    return rel ? rel.relationship_type : '';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black animate-pulse text-center uppercase tracking-widest">Sinkronisasi Matriks CRUD...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md my-20 p-8 bg-red-50 rounded-3xl border border-red-100 text-center flex flex-col items-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">Gagal Memuat Matriks</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button onClick={fetchMatrixData} className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors inline-flex items-center gap-2 font-bold">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 bg-white min-h-screen font-sans flex flex-col items-center">
      <div className="max-w-[1400px] w-full flex flex-col items-center">
        
        {/* Header Section - CENTERED */}
        <div className="w-full flex flex-col items-center text-center mb-16 border-b-4 border-secondary-500 pb-10">
          <h1 className="text-3xl md:text-5xl font-black text-primary-700 tracking-tight leading-tight uppercase max-w-4xl">
            Data Entity - Business Function Matrix
          </h1>
          <p className="text-primary-800 font-bold mt-4 flex items-center justify-center gap-2 max-w-2xl text-lg italic">
            <Info size={20} className="text-secondary-600 flex-shrink-0" />
            Pemetaan CRUD (Create & Use) antara Entitas Data dengan Fungsi Bisnis.
          </p>
        </div>

        {/* Matrix Table Wrapper */}
        <div className="relative overflow-x-auto w-full rounded-[2.5rem] border border-primary-100 shadow-2xl shadow-primary-50/50">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-primary-700 text-white">
              <tr>
                <th className="sticky left-0 z-20 bg-primary-800 p-6 text-sm font-black uppercase tracking-wider border-r border-primary-600 min-w-[280px] shadow-md text-center">
                  Entitas Data \ Fungsi Bisnis
                </th>
                {businessFunctions.map(func => (
                  <th key={func.id} className="p-4 text-center text-xs font-black uppercase tracking-widest border-l border-primary-600 min-w-[160px] whitespace-normal leading-relaxed">
                    {func.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {dataEntities.length === 0 || businessFunctions.length === 0 ? (
                <tr>
                  <td colSpan={businessFunctions.length + 1} className="p-20 text-center text-primary-300 font-black uppercase italic">
                    Data entitas atau fungsi belum tersedia dalam katalog.
                  </td>
                </tr>
              ) : (
                dataEntities.map(data => (
                  <tr key={data.id} className="hover:bg-primary-50/30 transition-colors group">
                    <td className="sticky left-0 z-10 bg-white group-hover:bg-primary-50 font-black text-primary-900 p-5 text-sm border-r border-primary-100 shadow-sm transition-colors text-center uppercase tracking-tight">
                      {data.name}
                    </td>
                    {businessFunctions.map(func => {
                      const relation = getRelation(func.id, data.id);
                      return (
                        <td 
                          key={func.id} 
                          className={`p-4 text-center border-l border-primary-50 transition-all font-black text-xl ${
                            relation === 'C' ? "bg-secondary-500/20 text-secondary-600" : 
                            relation === 'U' ? "bg-primary-500/10 text-primary-600" : ""
                          }`}
                        >
                          {relation || <span className="text-primary-100 opacity-20 text-xs font-normal">•</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Legend Section - CENTERED */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-primary-50 rounded-3xl border border-primary-100 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary-500 text-primary-950 flex items-center justify-center rounded-2xl font-black text-2xl shadow-md shadow-secondary-500/20">
              C
            </div>
            <div>
              <h4 className="font-black text-primary-800 uppercase tracking-wide text-lg">Create (Membuat)</h4>
              <p className="text-primary-700/80 text-sm leading-relaxed mt-2 font-bold italic">
                Fungsi bisnis menghasilkan atau menciptakan data baru dalam sistem operasional stasiun.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary-50 rounded-3xl border border-primary-100 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-primary-500 text-white flex items-center justify-center rounded-2xl font-black text-2xl shadow-md shadow-primary-500/20">
              U
            </div>
            <div>
              <h4 className="font-black text-primary-800 uppercase tracking-wide text-lg">Use (Menggunakan)</h4>
              <p className="text-primary-700/80 text-sm leading-relaxed mt-2 font-bold italic">
                Fungsi bisnis melakukan pembacaan atau pemrosesan data untuk mendukung aktivitas rutin.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Helper Hint */}
        <div className="mt-12 text-center text-primary-400 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
          ← Geser ke samping untuk melihat detail fungsi bisnis →
        </div>

      </div>
    </div>
  );
};

export default DataFunctionMatrixPage;