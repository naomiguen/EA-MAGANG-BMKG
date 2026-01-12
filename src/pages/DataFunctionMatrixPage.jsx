import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

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

      // Fetch semua data secara paralel
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

      // Check for errors
      if (functionsRes.error) throw functionsRes.error;
      if (entitiesRes.error) throw entitiesRes.error;
      if (relationshipsRes.error) throw relationshipsRes.error;

      // Set state
      setBusinessFunctions(functionsRes.data || []);
      setDataEntities(entitiesRes.data || []);
      setRelationships(relationshipsRes.data || []);

    } catch (err) {
      console.error('Error fetching matrix data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk mendapatkan nilai sel
  const getRelation = (funcId, dataId) => {
    const rel = relationships.find(r => r.func_id === funcId && r.data_id === dataId);
    return rel ? rel.relationship_type : '';
  };

  // Helper warna sel
  const getCellClass = (type) => {
    if (type === 'C') return 'bg-teal-100 text-teal-800 font-bold';
    if (type === 'U') return 'bg-blue-50 text-blue-600';
    return '';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mb-4"></div>
          <p className="text-slate-600 text-lg">Memuat data matrix...</p>
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
            onClick={fetchMatrixData}
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
      
      {/* Header */}
      <div className="text-center mb-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Data Entity - Business Function Matrix
        </h1>
        <p className="text-slate-500 text-lg">
          Pemetaan hubungan antara fungsi bisnis (baris) dengan entitas data (kolom) dalam operasional stasiun.
        </p>
      </div>

      {/* Tabel Matrix */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {/* Pojok Kiri Atas Kosong */}
                <th className="bg-slate-100 border-b border-r border-slate-200 p-4 text-left font-bold text-slate-700 min-w-[200px]">
                  Fungsi Bisnis \ Entitas Data
                </th>
                {/* Header Kolom (Data Entities) */}
                {dataEntities.map(data => (
                  <th key={data.id} className="bg-slate-50 border-b border-slate-200 p-4 text-center font-semibold text-slate-600 min-w-[100px] hover:bg-slate-100 transition-colors">
                    {data.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businessFunctions.length === 0 || dataEntities.length === 0 ? (
                <tr>
                  <td colSpan={dataEntities.length + 1} className="px-6 py-8 text-center text-slate-400">
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                /* Baris (Business Functions) */
                businessFunctions.map(func => (
                  <tr key={func.id} className="hover:bg-slate-50 transition-colors">
                    {/* Header Baris */}
                    <th className="bg-white border-r border-slate-200 p-4 text-left font-medium text-slate-800 border-b">
                      {func.name}
                    </th>
                    {/* Sel Matriks */}
                    {dataEntities.map(data => {
                      const relation = getRelation(func.id, data.id);
                      return (
                        <td 
                          key={data.id} 
                          className={`border-b border-slate-100 p-4 text-center border-r last:border-r-0 ${getCellClass(relation)}`}
                        >
                          {relation}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-8 flex gap-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-teal-100 text-teal-800 font-bold rounded">C</span>
          <div className="text-sm text-slate-600">
            <strong>Create (Membuat)</strong><br/>
            Fungsi menghasilkan/menciptakan data baru.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-bold rounded">U</span>
          <div className="text-sm text-slate-600">
            <strong>Use (Menggunakan)</strong><br/>
            Fungsi membaca/menggunakan data untuk proses.
          </div>
        </div>
      </div>

    </div>
  );
};

export default DataFunctionMatrixPage;