import { useState } from "react";
import "./App.css";

// 1. IMPORT DATA DARI FOLDER DATA
import { architectureData } from "./data/menuData"; 

// 2. IMPORT HALAMAN DARI FOLDER PAGES

import OrganizationDiagramPage from "./pages/OrganizationDiagramPage";
import StrategyMapPage from "./pages/StrategyMapPage";
import ValueChainPage from "./pages/ValueChainPage";

function App() {
  const [activePage, setActivePage] = useState("architecture");

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
    // Navigasi ke Organisasi
    if (item.title === "Organization Decomposition Diagram") {
      setActivePage("organization");
      return;
    }
    // Navigasi ke Strategy Map (INI YANG BARU)
    if (item.title === "Vision, Mission and Corporate Strategy") {
      setActivePage("strategy");
      return;
    }

    if (item.title === "Value Chain Diagram") {
      setActivePage("value_chain"); // Set state agar render bagian ValueChainPage
      return;
    }
    
    // Default alert kalau belum ada halamannya
    alert(`You clicked: ${item.title}`);
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCardClick(item);
            }}
          >
            <div className="card-icon">📄</div>
            <p className="card-label">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // --- HALAMAN 1: ORGANISASI ---
  if (activePage === "organization") {
    return (
      <div style={{ padding: "0.75rem" }}>
        <button
          type="button"
          onClick={() => setActivePage("architecture")}
          style={{
            padding: "0.55rem 0.8rem",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.2)",
            background: "white",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: "0.75rem",
          }}
        >
          ⬅ Kembali ke Architecture Vision
        </button>

        <OrganizationDiagramPage />
      </div>
    );
  }

  // --- HALAMAN 2: STRATEGY MAP (INI BARU) ---
  if (activePage === "strategy") {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "10px 20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
          <button
            type="button"
            onClick={() => setActivePage("architecture")}
            style={{
              padding: "0.55rem 0.8rem",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬅ Kembali ke Architecture Vision
          </button>
        </div>
        
        {/* Render Halaman Strategy Map */}
        <div style={{ flex: 1, overflow: "hidden" }}>
            <StrategyMapPage />
        </div>
      </div>
    );
  }

  // --- HALAMAN 3: VALUE CHAIN DIAGRAM (TAMBAHAN 3) ---
  if (activePage === "value_chain") {
    return (
      // Menggunakan style full height agar scrolling sidebar berfungsi dengan baik
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "10px 20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
          <button
            type="button"
            onClick={() => setActivePage("architecture")}
            style={{
              padding: "0.55rem 0.8rem",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬅ Kembali ke Architecture Vision
          </button>
        </div>
        
        {/* Render Halaman Value Chain */}
        <div style={{ flex: 1, overflow: "hidden" }}>
            <ValueChainPage />
        </div>
      </div>
    );
  }

  // --- HALAMAN UTAMA: DASHBOARD MENU ---
  return (
    <div className="architecture-container">
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
        {renderSection(
          "Architecture Implementation",
          architectureData.implementation
        )}
      </div>
    </div>
  );
}

export default App;