import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { architectureData } from "../data/menuData";
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

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
    if (item.title === "Organization Decomposition Diagram") {
      navigate("/business/organization");
      return;
    }
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
    // Duplikasi pengecekan Architecture Goals (aman dibiarkan, tapi yang pertama akan dieksekusi)
    if (item.title === "Architecture Goals") {
      navigate('/vision/goals');
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
      return; // Menambahkan return untuk konsistensi
    }
    if (item.title === "Data Principles") {
      navigate('/data/dataprinciples');
      return; // Menambahkan return
    } 
    if (item.title === "Business Process - Risk Matrix") {
      navigate("/business/RiskMatrix");
      return;
    }
    if (item.title === "Technology Principles") {
      navigate("/vision/technologyPrinciples");
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
          <h2 className="section-title">Architecture Vision</h2>
          <div className="vision-grid">
            {architectureData.vision.map((item) => renderCard(item))}
          </div>
        </div>

        {/* Main Architecture Sections */}
        <div className="main-sections-grid">
          {/* Business Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">Business Architecture</h2>
            <div className="section-grid">
              {architectureData.business.map((item) => renderCard(item))}
            </div>
          </div>

          {/* Data Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">Data Architecture</h2>
            <div className="section-grid">
              {architectureData.data.map((item) => renderCard(item))}
            </div>
          </div>

          {/* Application Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">Application Architecture</h2>
            <div className="section-grid">
              {architectureData.application.map((item) => renderCard(item))}
            </div>
          </div>

          {/* Technology Architecture */}
          <div className="architecture-section">
            <h2 className="section-title">Technology Architecture</h2>
            <div className="section-grid">
              {architectureData.technology.map((item) => renderCard(item))}
            </div>
          </div>
        </div>

        {/* Architecture Implementation Section */}
        <div className="implementation-section">
          <h2 className="section-title">Architecture Implementation</h2>
          <div className="implementation-grid">
            {architectureData.implementation.map((item) => renderCard(item))}
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