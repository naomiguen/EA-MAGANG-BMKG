import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import './css/TechnologyStandarCatalog.css';

const TechnologyStandarCatalog = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const fetchCatalogData = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('spbe_architecture_catalog') 
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) throw fetchError;
      setCatalogData(data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = catalogData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.standard_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = filterType === 'All' || item.domain === filterType;
    return matchesSearch && matchesDomain;
  });

  const renderStatusBadge = (lifecycle) => {
    const status = lifecycle.toLowerCase().replace(' ', '-');
    const labels = {
      'active': 'Active',
      'emerging': 'Emerging (Kajian)',
      'retired': 'Retired (Usang)',
      'phasing-out': 'Phasing Out'
    };
    return (
      <span className={`status-badge status-${status}`}>
        {labels[status] || lifecycle}
      </span>
    );
  };

  if (loading) return (
    <div className="catalog-loading">
      <div className="spinner"></div>
      <p>Memuat Katalog Arsitektur SPBE...</p>
    </div>
  );

  return (
    <div className="catalog-container">
      {/* Header */}
      <div className="catalog-header">
        <div className="header-content">
          <h1 className="catalog-title">Katalog Standar Teknologi & Informasi</h1>
          <p className="catalog-subtitle">
            Referensi Arsitektur SPBE - Badan Meteorologi, Klimatologi, dan Geofisika
          </p>
          <div className="header-meta">
            <small>Sesuai Perka BMKG No. 9 Tahun 2023</small>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Cari (Misal: SIH3, Server, RAA...)"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-actions">
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Semua Domain</option>
            <option value="Aplikasi">Domain Aplikasi</option>
            <option value="Infrastruktur">Domain Infrastruktur</option>
            <option value="Data">Domain Data</option>
            <option value="Keamanan">Domain Keamanan</option>
          </select>

          <button onClick={fetchCatalogData} className="refresh-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="catalog-table">
          <thead>
            <tr>
              <th style={{width: '12%'}}>ID Standar</th>
              <th style={{width: '28%'}}>Nama Teknologi & Domain</th>
              <th style={{width: '20%'}}>Kategori & Area Layanan</th>
              <th style={{width: '10%'}}>Status</th>
              <th style={{width: '30%'}}>Deskripsi & Fungsi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((tech) => (
                <tr key={tech.id}>
                  <td className="font-mono">
                    {tech.standard_id}
                  </td>
                  
                  <td>
                    <div className="font-bold-row">{tech.name}</div>
                    <div className="tags-wrapper">
                      {/* ClassName menggantikan inline style */}
                      <span className="badge-base domain-tag">
                        {tech.domain}
                      </span>
                      <span className="badge-base type-tag">
                        {tech.type}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="category-text">
                        {tech.category}
                    </div>
                    {tech.service_area && (
                        <div className="service-area">
                            {tech.service_area}
                        </div>
                    )}
                  </td>

                  <td>{renderStatusBadge(tech.lifecycle)}</td>
                  
                  <td className="description-cell" title={tech.description}>
                    {tech.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-message">
                  <p>Data tidak ditemukan.</p>
                  <small>Coba ubah filter domain atau kata kunci pencarian.</small>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnologyStandarCatalog;