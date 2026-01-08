
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { architectureData } from "../data/menuData"; 

const Dashboard = () => {
  const navigate = useNavigate(); // Hook untuk pindah halaman

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
    // Navigasi menggunakan URL (Routing)
    if (item.title === "Organization Decomposition Diagram") {
      navigate('/business/organization');
      return;
    }
    if (item.title === "Vision, Mission and Corporate Strategy") {
      navigate('/vision/strategy');
      return;
    }
    if (item.title === "Value Chain Diagram") {
      navigate('/vision/valuechain');
      return;
    }
    if (item.title === "Stakeholder Catalog") {
      navigate('/vision/stakeholder');
      return;
    }
    if (item.title === "Organizational Actor Catalog") {
      navigate('/business/organizational');
      return;
    }
    alert(`Halaman untuk "${item.title}" belum dibuat.`);
  };

  const renderSection = (title, items) => (
    <div className="architecture-section" key={title}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {items.map((item) => (
          <div
            key={item.id}
            className={`arch-card ${getCardColor(item.type)}`}
            onClick={() => handleCardClick(item)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-icon">📄</div>
            <p className="card-label">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="architecture-container p-6">
      <div className="vision-section">
        {renderSection("Architecture Vision", architectureData.vision)}
      </div>
      <div className="main-sections">
        {renderSection("Business Architecture", architectureData.business)}
        {renderSection("Data Architecture", architectureData.data)}
        {renderSection("Application Architecture", architectureData.application)}
        {renderSection("Technology Architecture", architectureData.technology)}
      </div>
      <div className="implementation-section">
        {renderSection("Architecture Implementation", architectureData.implementation)}
      </div>
    </div>
  );
};

export default Dashboard;