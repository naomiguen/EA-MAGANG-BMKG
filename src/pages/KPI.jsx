import React, { useState } from "react";
import "./css/KPI.css";

import KPITeknisi from "../assets/KPI-Teknisi.svg";
import KPIDatin from "../assets/KPI-Datin.svg";
import KPIObservasi from "../assets/KPI-Observasi.svg";
import KPITU from "../assets/KPI-TU.svg";
import KPIWMM from "../assets/KPI-WMM.svg";

const kpiItems = [
  { title: "Teknisi", image: KPITeknisi },
  { title: "Datin", image: KPIDatin },
  { title: "Observasi", image: KPIObservasi },
  { title: "TU", image: KPITU },
  { title: "WMM", image: KPIWMM },
];

const KPIpage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="kpi-page">
      <div className="kpi-container">
        <div className="kpi-main-card">
          {/* Header Section */}
          <div className="kpi-header">
            <h1 className="kpi-title">
              Key Performance Indicators
            </h1>
            <p className="kpi-subtitle">
              Pilih departemen untuk melihat KPI
            </p>
          </div>

          {/* KPI Cards Grid */}
          <div className="kpi-content">
            <div className="kpi-grid">
              {kpiItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="kpi-card"
                >
                  <div className="kpi-card-bg" />
                  
                  <div className="kpi-card-content">
                    <span className="kpi-card-title">
                      {item.title}
                    </span>
                    <div className="kpi-card-underline" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="kpi-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="kpi-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="kpi-modal-header">
              <h2 className="kpi-modal-title">
                KPI {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="kpi-modal-close"
                aria-label="Close"
              >
                <svg className="kpi-modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="kpi-modal-content">
              <img
                src={selectedItem.image}
                alt={`KPI ${selectedItem.title}`}
                className="kpi-modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIpage;