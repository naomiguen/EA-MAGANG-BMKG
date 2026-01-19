import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { fetchArchitectureData } from "../services/architectureDataService";
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [architectureData, setArchitectureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase saat komponen mount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchArchitectureData();
        
        if (isMounted) {
          setArchitectureData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading architecture data:', err);
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCardColor = (type) => {
    const colors = {
      text: "card-green",
      diagram: "card-blue",
      matrix: "card-pink",
      catalog: "card-yellow",
    };
    return colors[type] || "card-blue";
  };

  const handleCardClick = (item) => {
    // Vision Section
    if (item.title === "Vision, Mission and Corporate Strategy") {
      navigate("/vision/strategy");
      return;
    }
    if (item.title === "Value Chain Diagram") {
      navigate("/vision/valuechain");
      return;
    }
    if (item.title === "Architecture Principles") {
      navigate("/vision/principles");
      return;
    }
    if (item.title === "Architecture Goals") {
      navigate("/vision/goals");
      return;
    }
    if (item.title === "Stakeholder Catalog") {
      navigate("/vision/stakeholder");
      return;
    }
    if (item.title === "Technology Principles") {
      navigate("/vision/technologyPrinciples");
      return;
    }
    if (item.title === "Organization Decomposition Diagram") {
      navigate("/vision/organization");
      return;
    }
    
    
    // Business Section
    if (item.title === "Solution Concept Diagram") {
      navigate('/vision/solution');
      return;
    }
    if (item.title === "Organizational Actor Catalog") {
      navigate('/business/organizational');
      return;
    }
    if (item.title === "Functional Decomposition Diagram") {
      navigate('/vision/functional');
      return;
    }
    if (item.title === "Business Process - Risk Matrix") {
      navigate("/business/RiskMatrix");
      return;
    }
    if (item.title === "Business Process") {
      navigate('/business/probis');
      return;
    }
    if (item.title === "Business Interaction Diagram") {
      navigate('/business/Interaction');
      return;
    }
    if (item.title === "Corporate Governance") {
      navigate('/business/corporate_governance');
      return;
    }


    // Data Section
    if (item.title === "Data Entity - Data Component Catalog") {
      navigate('/data/component');
      return;
    }
    if (item.title === "Logical Data Diagram") {
      navigate('/data/logical');
      return;
    }
    if (item.title === "Data Entity - Business Function Matrix") {
      navigate('/data/function_matrix');
      return;
    }
    if (item.title === "Data Principles") {
      navigate('/data/dataprinciples');
      return;
    }
    if (item.title === "Application - Data Matrix") {
      navigate('/data/appmatrix');
      return;
    }
    if (item.title === "Conceptual Data Diagram") {
      navigate('/data/concept');
      return;
    }

    // Technology Section
    if (item.title === 'Technology Standard Catalog') {
      navigate("/tech/standardsCatalog");
      return;
    }
    if (item.title === "Environment and Location Diagram") {
      navigate("/tech/environmentDiagram");
      return;
    }
    if (item.title === "Network Communication Diagram") {
      navigate("/tech/networkCommunicationDiagram");
      return;
    }
    if (item.title === "Technology - Application Matrix") {
      navigate("/tech/appMatrix");
      return;
    }
    // application section
    if (item.title === "Application Portfolio Catalog") {
      navigate("/app/portfolio");
      return;
    }
    if (item.title === "Application - Organization Matrix") {
      navigate("/app/org_matrix");
      return;
    }
    if (item.title === "Application - Communication Diagram") {
      navigate("/app/communicationDiagram");
      return;
    }
    if (item.title === "Application - Portofolio Assessment") {
      navigate("/app/porto-assesment");
      return;
    }
    alert(`Halaman untuk "${item.title}" belum dibuat.`);
  };

  const renderCard = (item) => (
    <div
      key={item.id}
      className={`arch-card ${getCardColor(item.type)}`}
      onClick={() => handleCardClick(item)}
    >
      <div className="card-icon-top">
        <Share2 size={14} />
      </div>
      <div className="card-content">
        <p className="card-label">{item.title}</p>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="architecture-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #1d4ed8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ color: '#64748b', fontSize: '18px', fontWeight: '600' }}>
            Memuat Enterprise Architecture...
          </h2>
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
      <div className="architecture-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #fca5a5',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: '#dc2626', 
            margin: '0 0 16px 0', 
            fontSize: '24px',
            fontWeight: 'bold' 
          }}>
            ⚠️ Gagal Memuat Data
          </h2>
          <p style={{ 
            color: '#991b1b', 
            margin: '0 0 20px 0', 
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            {error}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!architectureData) {
    return (
      <div className="architecture-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '18px' }}>
          Tidak ada data tersedia
        </p>
      </div>
    );
  }

  return (
    <div className="architecture-container">
      <div className="architecture-wrapper">
        {/* Header Title */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Enterprise Architecture</h1>
          <h2 className="dashboard-subtitle">BMKG Balikpapan</h2>
        </div>

        {/* Architecture Vision Section */}
        <div className="vision-section">
          <h2 className="section-title">
            Architecture Vision 
            <span style={{ 
              marginLeft: '10px', 
              fontSize: '14px', 
              fontWeight: 'normal', 
              color: '#64748b' 
            }}>
              ({architectureData.vision?.length || 0} items)
            </span>
          </h2>
          <div className="vision-grid">
            {architectureData.vision?.map((item) => renderCard(item)) || (
              <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
            )}
          </div>
        </div>

        {/* Main Architecture Sections */}
        <div className="main-sections-grid">
          {/* Business Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">
              Business Architecture
              <span style={{ 
                marginLeft: '10px', 
                fontSize: '14px', 
                fontWeight: 'normal', 
                color: '#64748b' 
              }}>
                ({architectureData.business?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.business?.map((item) => renderCard(item)) || (
                <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
              )}
            </div>
          </div>

          {/* Data Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">
              Data Architecture
              <span style={{ 
                marginLeft: '10px', 
                fontSize: '14px', 
                fontWeight: 'normal', 
                color: '#64748b' 
              }}>
                ({architectureData.data?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.data?.map((item) => renderCard(item)) || (
                <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
              )}
            </div>
          </div>

          {/* Application Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">
              Application Architecture
              <span style={{ 
                marginLeft: '10px', 
                fontSize: '14px', 
                fontWeight: 'normal', 
                color: '#64748b' 
              }}>
                ({architectureData.application?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.application?.map((item) => renderCard(item)) || (
                <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
              )}
            </div>
          </div>

          {/* Technology Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">
              Technology Architecture
              <span style={{ 
                marginLeft: '10px', 
                fontSize: '14px', 
                fontWeight: 'normal', 
                color: '#64748b' 
              }}>
                ({architectureData.technology?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.technology?.map((item) => renderCard(item)) || (
                <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
              )}
            </div>
          </div>
        </div>

        {/* Architecture Implementation Section */}
        <div className="implementation-section">
          <h2 className="section-title">
            Architecture Implementation
            <span style={{ 
              marginLeft: '10px', 
              fontSize: '14px', 
              fontWeight: 'normal', 
              color: '#64748b' 
            }}>
              ({architectureData.implementation?.length || 0})
            </span>
          </h2>
          <div className="implementation-grid">
            {architectureData.implementation?.map((item) => renderCard(item)) || (
              <p style={{ color: '#94a3b8' }}>Tidak ada data</p>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="legend-container">
          <div className="legend-item">
            <div className="legend-box card-green"></div>
            <span>Text</span>
          </div>
          <div className="legend-item">
            <div className="legend-box card-blue"></div>
            <span>Diagram</span>
          </div>
          <div className="legend-item">
            <div className="legend-box card-pink"></div>
            <span>Matrix</span>
          </div>
          <div className="legend-item">
            <div className="legend-box card-yellow"></div>
            <span>Catalog</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;