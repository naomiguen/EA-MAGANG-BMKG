import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import "./css/BusinessDataMatrix.css";

const BusinessDataMatrixPage = () => {
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
    if (type === 'C') return 'matrix-cell-create';
    if (type === 'U') return 'matrix-cell-use';
    return '';
  };

  // Loading state
  if (loading) {
    return (
      <div className="matrix-page matrix-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Memuat data matrix...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="matrix-page matrix-error-page">
        <div className="error-container">
          <h3 className="error-title">Error Loading Data</h3>
          <p className="error-message">{error}</p>
          <button 
            onClick={fetchMatrixData}
            className="error-retry-button"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-page">
      
      {/* Header */}
      <div className="matrix-header">
        <h1 className="matrix-title">
          Business Process - Data Entity Matrix
        </h1>
        <p className="matrix-subtitle">
          Pemetaan hubungan antara fungsi bisnis (baris) dengan entitas data (kolom) dalam operasional stasiun.
        </p>
      </div>

      {/* Tabel Matrix */}
      <div className="matrix-table-container">
        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                {/* Pojok Kiri Atas Kosong */}
                <th className="matrix-corner-header">
                  Fungsi Bisnis \ Entitas Data
                </th>
                {/* Header Kolom (Data Entities) */}
                {dataEntities.map(data => (
                  <th key={data.id} className="matrix-column-header">
                    {data.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businessFunctions.length === 0 || dataEntities.length === 0 ? (
                <tr>
                  <td colSpan={dataEntities.length + 1} className="matrix-empty-state">
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                /* Baris (Business Functions) */
                businessFunctions.map(func => (
                  <tr key={func.id} className="matrix-row">
                    {/* Header Baris */}
                    <th className="matrix-row-header">
                      {func.name}
                    </th>
                    {/* Sel Matriks */}
                    {dataEntities.map(data => {
                      const relation = getRelation(func.id, data.id);
                      return (
                        <td 
                          key={data.id} 
                          className={`matrix-cell ${getCellClass(relation)}`}
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
      <div className="matrix-legend">
        <div className="legend-item">
          <span className="legend-badge legend-badge-create">C</span>
          <div className="legend-text">
            <strong>Create (Membuat)</strong><br/>
            Fungsi menghasilkan/menciptakan data baru.
          </div>
        </div>
        <div className="legend-item">
          <span className="legend-badge legend-badge-use">U</span>
          <div className="legend-text">
            <strong>Use (Menggunakan)</strong><br/>
            Fungsi membaca/menggunakan data untuk proses.
          </div>
        </div>
      </div>

    </div>
  );
};

export default BusinessDataMatrixPage;