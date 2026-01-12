import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './css/TechnologyStandarCatalog.css';

const TechnologyStandarCatalog = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const fetchCatalogData = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('technology_standards')
        .select('*')
        .order('service_area', { ascending: true }) // Order by Area first
        .order('category', { ascending: true });

      if (fetchError) throw fetchError;
      setCatalogData(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIC PENGELOMPOKAN DATA (GROUPING) ---
  const getGroupedData = () => {
    // 1. Filter dulu berdasarkan search
    const filtered = catalogData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.service_area && item.service_area.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 2. Grouping: Area -> Category -> Items
    const grouped = filtered.reduce((acc, item) => {
      const area = item.service_area || 'Uncategorized Area';
      const cat = item.category || 'General';

      if (!acc[area]) acc[area] = {};
      if (!acc[area][cat]) acc[area][cat] = [];
      
      acc[area][cat].push(item);
      return acc;
    }, {});

    return grouped;
  };

  const groupedData = getGroupedData();

  if (loading) return <div className="loading-state">Memuat Katalog...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="catalog-container">
      {/* Header */}
      <div className="catalog-header">
        <h1 className="catalog-title">Technology Standard Catalog</h1>
        <p className="catalog-subtitle">Referensi Arsitektur SPBE & Standar Infrastruktur</p>
      </div>

      {/* Search Bar */}
      <div className="controls-container">
        <input
          type="text"
          placeholder="Cari teknologi, kategori, atau area..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- VISUALISASI DIAGRAM --- */}
      <div className="diagram-wrapper">
        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([areaName, categories]) => (
            
            /* LEVEL 1: SERVICE AREA (Blue Container) */
            <div key={areaName} className="service-area-container">
              <div className="service-area-header">
                <h3>{areaName}</h3>
              </div>

              <div className="service-category-grid">
                {Object.entries(categories).map(([categoryName, items]) => (
                  
                  /* LEVEL 2: SERVICE CATEGORY (Green Box) */
                  <div key={categoryName} className="category-card">
                    <div className="category-header">
                      {categoryName}
                    </div>
                    
                    {/* LEVEL 3: ITEMS (List inside Green Box) */}
                    <div className="category-items">
                      {items.map(tech => (
                        <div key={tech.id} className="tech-item" title={tech.description}>
                          <span className="tech-name">{tech.name}</span>
                          <span className={`mini-badge status-${tech.lifecycle.toLowerCase().replace(' ', '-')}`}>
                            {tech.standard_id}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">Data tidak ditemukan untuk pencarian tersebut.</div>
        )}
      </div>
    </div>
  );
};

export default TechnologyStandarCatalog;