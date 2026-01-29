import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import './css/DataEntityPage.css';

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
      <div className="container-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Memuat data catalog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container-error">
        <div className="error-box">
          <h3 className="error-title">Error Loading Data</h3>
          <p className="error-message">{error}</p>
          <button 
            onClick={fetchDataEntities}
            className="btn-retry"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      
      {/* Header Halaman */}
      <div className="page-header">
        <h1 className="page-title">
          Data Entity - Data Component Catalog
        </h1>
        <p className="page-subtitle">
          Katalog entitas data dan rincian atribut logis (informasi) yang dikelola dalam operasional Stasiun Meteorologi.
        </p>
      </div>

      {/* Tabel Catalog */}
      <div className="table-wrapper">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th className="th-entity">Data Entity</th>
                <th className="th-description">Deskripsi Entitas</th>
                <th className="th-attributes">Logical Data Attributes (Rincian Informasi)</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataCatalog.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-state">
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                dataCatalog.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`table-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
                  >
                    {/* Kolom 1: Data Entity */}
                    <td className="cell-entity">
                      <div className="entity-name">{item.entity}</div>
                      <div className="entity-id">
                        ID: DE-{String(item.id).padStart(2, '0')}
                      </div>
                    </td>

                    {/* Kolom 2: Deskripsi */}
                    <td className="cell-description">
                      {item.description}
                    </td>

                    {/* Kolom 3: Logical Attributes */}
                    <td className="cell-attributes">
                      <div className="attributes-container">
                        {item.logicalAttributes.map((attr, idx) => (
                          <span 
                            key={idx} 
                            className="attribute-badge"
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
      <div className="footer-info">
        * Atribut logis disusun berdasarkan formulir standar operasional (ME.48, Logbook) dan uraian tugas dalam SK Kepala Stasiun.
      </div>
    </div>
  );
};

export default DataEntityPage;