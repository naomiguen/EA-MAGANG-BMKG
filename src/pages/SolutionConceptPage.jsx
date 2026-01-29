import React from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import SolutionDiagram from "../assets/SolutionConcept.drawio.svg";
import "./css/SolutionConceptPage.css";

const SolutionConceptPage = () => {

  return (
    <div className="solution-page">

      {/* 1. Header Halaman */}
      <div className="page-header">
        <div className="icon-wrapper">
          <Lightbulb size={32} />
        </div>
        <h1 className="page-title">
          Solution Concept Diagram
        </h1>
      </div>

      {/* 2. Area Diagram */}
      <div className="diagram-container">
        {/* Header Box Diagram */}
        <div className="diagram-header">
          <span className="diagram-title">Diagram View</span>
          <span className="diagram-format">SVG Format</span>
        </div>

        {/* Kontainer SVG */}
        <div className="diagram-content">
          <img 
            src={SolutionDiagram} 
            alt="Solution Concept Diagram" 
            className="diagram-image"
          />
        </div>

        {/* Keterangan Bawah */}
        <div className="diagram-description">
          <h3 className="description-title">Penjelasan Alur:</h3>
          <ul className="description-list">
            <li><strong>User Layer:</strong> Masyarakat dan Petugas BMKG mengakses layanan.</li>
            <li><strong>Service Layer:</strong> Layanan Informasi BMKG & Portal Informasi sebagai gerbang akses.</li>
            <li><strong>Data Layer:</strong> Sistem Data Terintegrasi (Cuaca, Iklim, Gempa) yang menjadi pusat penyimpanan.</li>
            <li><strong>Infrastructure:</strong> Infrastruktur TI yang menopang seluruh operasional sistem.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SolutionConceptPage;