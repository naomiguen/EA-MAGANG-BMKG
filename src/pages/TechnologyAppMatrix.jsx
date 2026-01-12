import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import './css/TechnologyAppMatrix.css'; // Import CSS terpisah

const TechnologyAppMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [matrixData, setMatrixData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch semua data dari Supabase
  useEffect(() => {
    let isMounted = true;
    let fetchTimeout;

    const fetchAllData = async () => {
      try {
        // Cek cache
        const cached = localStorage.getItem('tech_app_matrix_data');
        const cacheTime = localStorage.getItem('tech_app_matrix_cache_time');
        const now = Date.now();
        
        // Jika cache masih fresh (< 5 menit), pakai cache
        if (cached && cacheTime && (now - parseInt(cacheTime)) < 300000) {
          const cachedData = JSON.parse(cached);
          setApplications(cachedData.applications);
          setTechnologies(cachedData.technologies);
          setMatrixData(cachedData.matrixData);
          setLoading(false);
          return;
        }

        setLoading(true);
        
        // Delay untuk menghindari rate limit
        await new Promise(resolve => setTimeout(resolve, 150));

        // Fetch semua data parallel
        const [appsResponse, techsResponse, matrixResponse] = await Promise.all([
          supabase.from('tech_applications').select('*').order('order_index', { ascending: true }),
          supabase.from('tech_technologies').select('*').order('order_index', { ascending: true }),
          supabase.from('tech_app_matrix').select('*')
        ]);

        // Check for errors
        if (appsResponse.error) throw appsResponse.error;
        if (techsResponse.error) throw techsResponse.error;
        if (matrixResponse.error) throw matrixResponse.error;

        if (!isMounted) return;

        // Transform applications data
        const appsData = appsResponse.data.map(app => ({
          id: app.id,
          name: app.name,
          description: app.description
        }));

        // Transform technologies data
        const techsData = techsResponse.data.map(tech => ({
          id: tech.id,
          category: tech.category,
          name: tech.name
        }));

        // Transform matrix data ke format object
        const matrixObj = {};
        matrixResponse.data.forEach(item => {
          const key = `${item.technology_id}-${item.application_id}`;
          matrixObj[key] = item.relationship_type;
        });

        // Simpan ke cache
        const dataToCache = {
          applications: appsData,
          technologies: techsData,
          matrixData: matrixObj
        };
        localStorage.setItem('tech_app_matrix_data', JSON.stringify(dataToCache));
        localStorage.setItem('tech_app_matrix_cache_time', now.toString());

        setApplications(appsData);
        setTechnologies(techsData);
        setMatrixData(matrixObj);
        setLoading(false);

      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching tech app matrix data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTimeout = setTimeout(() => {
      fetchAllData();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(fetchTimeout);
    };
  }, []);

  // Helper untuk mengecek isi sel
  const getCellContent = (techId, appId) => {
    const key = `${techId}-${appId}`;
    return matrixData[key] || '';
  };

  // Loading State
  if (loading) {
    return (
      <div className="idea-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Memuat data matriks teknologi...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="idea-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '20px' }}>
            ⚠️ Gagal Memuat Data
          </h3>
          <p style={{ color: '#991b1b', margin: '0 0 16px 0', fontSize: '14px' }}>
            {error}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('tech_app_matrix_data');
              localStorage.removeItem('tech_app_matrix_cache_time');
              window.location.reload();
            }}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (applications.length === 0 || technologies.length === 0) {
    return (
      <div className="idea-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <p style={{ fontSize: '18px', margin: 0 }}>📊 Tidak ada data tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="idea-container">
      <div className="idea-header">
        <h2 className="idea-title">Matriks Aplikasi & Teknologi (Technology Application Matrix)</h2>
        <p className="idea-subtitle">Dokumen Arsitektur Teknologi - Peta Hubungan Infrastruktur</p>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          marginTop: '8px'
        }}>
          📊 {technologies.length} Teknologi × {applications.length} Aplikasi
        </div>
      </div>

      <div className="idea-table-wrapper">
        <table className="idea-table">
          <thead>
            <tr>
              <th className="th-tech-header" colSpan="2">Komponen Teknologi</th>
              {applications.map((app) => (
                <th key={app.id} className="th-app-header" title={app.description}>
                  {app.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {technologies.map((tech) => (
              <tr key={tech.id}>
                <td className="td-category">{tech.category}</td>
                <td className="td-tech-name">{tech.name}</td>
                {applications.map((app) => {
                  const content = getCellContent(tech.id, app.id);
                  return (
                    <td 
                      key={app.id} 
                      className={`td-cell ${content ? 'active-cell' : ''}`}
                    >
                      {content && <span className="relationship-tag">{content}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="idea-footer">
        <p>Generated by Enterprise Architecture System</p>
        <p style={{ fontSize: '12px', marginTop: '4px', color: '#94a3b8' }}>
          Data source: Supabase • Last updated: {new Date().toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
};

export default TechnologyAppMatrix;