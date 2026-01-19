import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import './css/TechnologyAppMatrix.css';

const TechAppMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [matrixLinks, setMatrixLinks] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);

      // ==========================================
      // 1. AMBIL DATA APLIKASI (DARI TABLE PORTFOLIO)
      // ==========================================
      // KOREKSI: Menggunakan tabel 'application_portfolio'
      // Kolom yang diambil: id, physical_name (nama aplikasi), category
      const { data: appsData, error: appsError } = await supabase
        .from('application_portfolio')
        .select('id, physical_name, category')
        .eq('status', 'Active') // Opsional: ambil yang aktif saja
        .order('physical_name');
      
      if (appsError) throw appsError;

      // ==========================================
      // 2. AMBIL DATA TEKNOLOGI (DARI CATALOG)
      // ==========================================
      // KOREKSI: Filter domain 'Infrastruktur' dari spbe_architecture_catalog
      const { data: techData, error: techError } = await supabase
        .from('spbe_architecture_catalog')
        .select('id, name, type, standard_id')
        .eq('domain', 'Infrastruktur') 
        .order('type', { ascending: true });
      
      if (techError) throw techError;

      // ==========================================
      // 3. AMBIL RELASI (MATRIX)
      // ==========================================
      const { data: relations, error: relError } = await supabase
        .from('spbe_tech_app_matrix')
        .select('app_id, tech_id');

      if (relError) throw relError;

      // 4. Mapping Relasi
      const linksMap = {};
      relations.forEach(rel => {
        linksMap[`${rel.app_id}-${rel.tech_id}`] = true;
      });

      setApplications(appsData || []);
      setTechnologies(techData || []);
      setMatrixLinks(linksMap);

    } catch (err) {
      console.error('Error fetching matrix data:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasRelation = (appId, techId) => {
    return matrixLinks[`${appId}-${techId}`];
  };

  // Grouping Technologies
  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.type]) acc[tech.type] = [];
    acc[tech.type].push(tech);
    return acc;
  }, {});

  return (
    <div className="matrix-container">
      <div className="matrix-header-section">
        <h2 className="matrix-title">Technology - Application Matrix</h2>
        <p className="matrix-subtitle">
          Pemetaan Portfolio Aplikasi (Baris) terhadap Standar Infrastruktur (Kolom).
        </p>
      </div>

      {loading ? (
        <div className="loading-state">Sedang memuat data...</div>
      ) : (
        <div className="table-scroll-wrapper">
          <table className="ea-matrix-table">
            <thead>
              {/* Row 1: Header Group & Label */}
              <tr>
                <th className="sticky-corner-top axis-header">
                  <div className="axis-infra">Teknologi ➝</div>
                  <div className="axis-app">⬇ Aplikasi</div>
                </th>
                
                {Object.keys(groupedTech).map((type) => (
                  <th 
                    key={type} 
                    colSpan={groupedTech[type].length} 
                    className="group-header"
                  >
                    {type}
                  </th>
                ))}
              </tr>
              
              {/* Row 2: Nama Teknologi Spesifik */}
              <tr>
                <th className="sticky-col-header">Nama Aplikasi</th>
                {Object.keys(groupedTech).map((type) => 
                  groupedTech[type].map((tech) => (
                    <th key={tech.id} className="tech-header">
                      <div className="vertical-text-inner" title={tech.name}>
                        {tech.name}
                      </div>
                      <span className="tech-code">{tech.standard_id}</span>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    {/* Kolom Kiri: Nama Aplikasi dari application_portfolio */}
                    <td className="app-row-header">
                      <strong>{app.physical_name}</strong>
                      <br/>
                      <small style={{ color: '#6b7280' }}>{app.category}</small>
                    </td>
                    
                    {/* Sel Data (Grid) */}
                    {Object.keys(groupedTech).map((type) => 
                      groupedTech[type].map((tech) => {
                        const isActive = hasRelation(app.id, tech.id);
                        return (
                          <td 
                            key={`${app.id}-${tech.id}`} 
                            className={`matrix-cell ${isActive ? 'active-cell' : ''}`}
                          >
                            {isActive && (
                              <div className="marker-dot"></div>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={technologies.length + 1} className="empty-message">
                    Tidak ada data aplikasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="legend">
        <div className="legend-item">
          <span className="dot-legend active"></span>
          <span>Aplikasi menggunakan teknologi ini</span>
        </div>
      </div>
    </div>
  );
};

export default TechAppMatrix;