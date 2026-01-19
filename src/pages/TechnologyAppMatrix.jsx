import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import './css/TechnologyAppMatrix.css';

const TechAppMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [matrixLinks, setMatrixLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);

      // 1. AMBIL DATA APLIKASI
      const { data: appsData, error: appsError } = await supabase
        .from('application_portfolio')
        .select('id, physical_name, category')
        .eq('status', 'Active')
        .order('physical_name');

      if (appsError) throw appsError;

      // 2. AMBIL DATA TEKNOLOGI (INFRASTRUKTUR)
      const { data: techData, error: techError } = await supabase
        .from('spbe_architecture_catalog')
        .select('id, name, type, standard_id')
        .eq('domain', 'Infrastruktur')
        .order('type', { ascending: true });

      if (techError) throw techError;

      // 3. AMBIL RELASI (MATRIX)
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

  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.type]) acc[tech.type] = [];
    acc[tech.type].push(tech);
    return acc;
  }, {});

  const getTypeColor = (type) => {
    const colors = {
      'Hardware': 'hardware',
      'Network': 'network',
      'Virtualization': 'virtualization',
      'Database': 'database',
    };
    return colors[type] || 'default';
  };

  const countRelations = (appId) => {
    return Object.keys(matrixLinks).filter(key => key.startsWith(`${appId}-`)).length;
  };

  const countTechUsage = (techId) => {
    return Object.keys(matrixLinks).filter(key => key.endsWith(`-${techId}`)).length;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Matrix Data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-wrapper">
      {/* Header Section */}
      <div className="matrix-page-header">
        <h1 className="matrix-main-title">Technology-Application Matrix</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-apps">
          <div className="stat-number">{applications.length}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card stat-tech">
          <div className="stat-number">{technologies.length}</div>
          <div className="stat-label">Technologies</div>
        </div>
        <div className="stat-card stat-relations">
          <div className="stat-number">{Object.keys(matrixLinks).length}</div>
          <div className="stat-label">Active Relations</div>
        </div>
      </div>

      {/* Matrix Container */}
      <div className="matrix-card">
        <div className="matrix-scroll-container">
          <table className="matrix-table">
            <thead>
              {/* Group Headers */}
              <tr>
                <th className="corner-header">
                  <div className="corner-content">
                    <div className="corner-secondary">Technologies ➝</div>
                    <div>⬇ Applications</div>
                  </div>
                </th>
                {Object.keys(groupedTech).map((type) => (
                  <th
                    key={type}
                    colSpan={groupedTech[type].length}
                    className={`group-header type-${getTypeColor(type)}`}
                  >
                    {type}
                  </th>
                ))}
              </tr>
              
              {/* Technology Headers */}
              <tr>
                <th className="app-name-header">Application Name</th>
                {Object.keys(groupedTech).map((type) =>
                  groupedTech[type].map((tech) => {
                    const usage = countTechUsage(tech.id);
                    return (
                      <th
                        key={tech.id}
                        onMouseEnter={() => setSelectedTech(tech.id)}
                        onMouseLeave={() => setSelectedTech(null)}
                        className={`tech-column-header ${selectedTech === tech.id ? 'tech-highlighted' : ''}`}
                      >
                        <div className="tech-name">{tech.name}</div>
                        <div className="tech-badge">{tech.standard_id}</div>
                        {usage > 0 && (
                          <div className="tech-usage-badge">{usage} apps</div>
                        )}
                      </th>
                    );
                  })
                )}
              </tr>
            </thead>
            
            <tbody>
              {applications.map((app) => {
                const relCount = countRelations(app.id);
                return (
                  <tr
                    key={app.id}
                    onMouseEnter={() => setSelectedApp(app.id)}
                    onMouseLeave={() => setSelectedApp(null)}
                    className={selectedApp === app.id ? 'app-row-highlighted' : ''}
                  >
                    <td className="app-cell">
                      <div className="app-name">{app.physical_name}</div>
                      <div className="app-category">{app.category}</div>
                      {relCount > 0 && (
                        <div className="app-relation-count">
                          <span className="relation-icon">🔗</span> {relCount} tech
                        </div>
                      )}
                    </td>
                    
                    {Object.keys(groupedTech).map((type) =>
                      groupedTech[type].map((tech) => {
                        const isActive = hasRelation(app.id, tech.id);
                        const isHighlighted = 
                          selectedApp === app.id || 
                          selectedTech === tech.id ||
                          hoveredCell === `${app.id}-${tech.id}`;
                        
                        return (
                          <td
                            key={`${app.id}-${tech.id}`}
                            className={`matrix-data-cell ${isActive ? 'cell-active' : ''} ${isHighlighted ? 'cell-highlighted' : ''}`}
                            onMouseEnter={() => setHoveredCell(`${app.id}-${tech.id}`)}
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            {isActive && (
                              <div className="connection-marker">
                                <div className="marker-pulse"></div>
                              </div>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="matrix-legend">
        <div className="legend-item">
          <div className="legend-marker active"></div>
          <span>Application uses this technology</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker inactive"></div>
          <span>No relation</span>
        </div>
      </div>
    </div>
  );
};

export default TechAppMatrix;