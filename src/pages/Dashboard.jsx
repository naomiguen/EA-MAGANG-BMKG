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
      navigate("/vision/value-chain");
      return;
    }
    if (item.title === "Business Model Canvas") {
      navigate("/vision/business-model-canvas");
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
    if (item.title === "Organization Decomposition Diagram") {
      navigate("/vision/organization");
      return;
    }
    if (item.title === "Solution Concept Diagram") {
      navigate('/vision/solution');
      return;
    }
    
    // Business Section
    if (item.title === "Business Principles") {
      navigate('/business/businessprinciples');
      return;
    }
    if (item.title === "KPI") {
      navigate('/business/kpi');
      return;
    }
    if (item.title === "Organizational Actor Catalog") {
      navigate('/business/organizational');
      return;
    }
    if (item.title === "Functional Decomposition Diagram") {
      navigate('/business/functional');
      return;
    }
    if (item.title === "Business Process - Risk Matrix") {
      navigate("/business/risk-matrix");
      return;
    }
    if (item.title === "Business Process - KPI Matrix") {
      navigate("/business/businessprocess-kpimatrix");
      return;
    }
    if (item.title === "Business Process") {
      navigate('/business/probis');
      return;
    }
    if (item.title === "Business Interaction Diagram") {
      navigate('/business/interaction');
      return;
    }
    if (item.title === "Corporate Governance") {
      navigate('/business/corporate_governance');
      return;
    }
    if (item.title === "Business Process - Application Matrix"){
      navigate("/business/application-matrix");
      return;
    }
    if (item.title === "Business Process - Data Matrix"){
      navigate("/business/data-matrix");
      return;
    }
    if (item.title === "Risk"){
      navigate("/business/risk");
      return;
    }

    // Data Section
    if (item.title === "Data Entity - Data Component Catalog") {
      navigate('/data/component-catalog');
      return;
    }
    if (item.title === "Logical Data Diagram") {
      navigate('/data/logical-data-diagram');
      return;
    }
    if (item.title === "Data Entity - Business Function Matrix") {
      navigate('/data/function-matrix');
      return;
    }
    if (item.title === "Data Principles") {
      navigate('/data/principles');
      return;
    }
    if (item.title === "Application - Data Matrix") {
      navigate('/data/application-matrix');
      return;
    }
    if (item.title === "Conceptual Data Diagram") {
      navigate('/data/concept');
      return;
    }
    
    // Application Section
    if (item.title === "Application Portfolio Catalog") {
      navigate("/app/portfolio-catalog");
      return;
    }
    if (item.title === "Application - Organization Matrix") {
      navigate("/app/organization-matrix");
      return;
    }
     if (item.title === "Application - User and Location Diagram") {
      navigate("/app/AppUserLocation");
      return;
    }
    if (item.title === "Application Principles") {
      navigate("/app/principles");
      return;
    }
    if (item.title === "Application - Classification Matrix") {
      navigate("/app/classification-matrix");
      return;
    }
    if (item.title === "Application - Communication Diagram") {
      navigate("/app/communication-diagram");
      return;
    }
    if (item.title === "Application - Portofolio Assessment") {
      navigate("/app/portofolio-assesment");
      return;
    }
    if (item.title === "Application Use Case Diagram") {
      navigate("/app/usecase");
      return;
    }
    if (item.title === "Application - Business Process Matrix"){
      navigate("/app/process-matrix");
      return;
    }
    
    // Technology Section
    if (item.title === "Technology Principles") {
      navigate("/tech/technology-principles");
      return;
    }
    if (item.title === 'Technology Standard Catalog') {
      navigate("/tech/standards-catalog");
      return;
    }
    if (item.title === "Environment and Location Diagram") {
      navigate("/tech/environment-diagram");
      return;
    }
    if (item.title === "Network Communication Diagram") {
      navigate("/tech/network-communication-diagram");
      return;
    }
    if (item.title === "Technology - Application Matrix") {
      navigate("/tech/application-matrix");
      return;
    }

    if(item.title === "Architecture Governance"){
      navigate("/imp/governance");
      return;
    }

    if (item.title === "Architecture Implementation Planning") {
      navigate("/imp/planning");
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Memuat Enterprise Architecture...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2 className="error-title">⚠️ Gagal Memuat Data</h2>
          <p className="error-message">{error}</p>
          <button
            className="error-button"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!architectureData) {
    return (
      <div className="empty-container">
        <p className="empty-text">Tidak ada data tersedia</p>
      </div>
    );
  }

  return (
    <div className="architecture-container">
      <div className="architecture-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Enterprise Architecture</h1>
          <h2 className="dashboard-subtitle">BMKG Balikpapan</h2>
        </div>

        <div className="vision-section">
          <h2 className="section-title">
            Architecture Vision 
            <span className="section-count">
              ({architectureData.vision?.length || 0})
            </span>
          </h2>
          <div className="vision-grid">
            {architectureData.vision?.map((item) => renderCard(item)) || (
              <p className="no-data-text">Tidak ada data</p>
            )}
          </div>
        </div>

        <div className="main-sections-grid">
          <div className="architecture-section">
            <h2 className="section-title">
              Business Architecture
              <span className="section-count">
                ({architectureData.business?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.business?.map((item) => renderCard(item)) || (
                <p className="no-data-text">Tidak ada data</p>
              )}
            </div>
          </div>

          <div className="architecture-section">
            <h2 className="section-title">
              Data Architecture
              <span className="section-count">
                ({architectureData.data?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.data?.map((item) => renderCard(item)) || (
                <p className="no-data-text">Tidak ada data</p>
              )}
            </div>
          </div>

          <div className="architecture-section">
            <h2 className="section-title">
              Application Architecture
              <span className="section-count">
                ({architectureData.application?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.application?.map((item) => renderCard(item)) || (
                <p className="no-data-text">Tidak ada data</p>
              )}
            </div>
          </div>

          <div className="architecture-section">
            <h2 className="section-title">
              Technology Architecture
              <span className="section-count">
                ({architectureData.technology?.length || 0})
              </span>
            </h2>
            <div className="section-grid">
              {architectureData.technology?.map((item) => renderCard(item)) || (
                <p className="no-data-text">Tidak ada data</p>
              )}
            </div>
          </div>
        </div>

        <div className="implementation-section">
          <h2 className="section-title">
            Architecture Implementation
            <span className="section-count">
              ({architectureData.implementation?.length || 0})
            </span>
          </h2>
          <div className="implementation-grid">
            {architectureData.implementation?.map((item) => renderCard(item)) || (
              <p className="no-data-text">Tidak ada data</p>
            )}
          </div>
        </div>

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