import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { appData } from "../services/data";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [svgContent, setSvgContent] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = appData.find((item) => item.id === id);

  useEffect(() => {
    if (data?.diagramUrl) {
      fetch(data.diagramUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Gagal memuat file SVG");
          return res.text();
        })
        .then((svg) => setSvgContent(svg))
        .catch((err) => console.error(err));
    }
  }, [data]);

  if (!data) return <div style={styles.notFound}><h2>Data tidak ditemukan!</h2></div>;

  const handleSvgClick = (e) => {
    e.preventDefault();
    let current = e.target;
    let foundId = null;

    while (current && current.tagName !== 'svg') {
      const idAttr = current.getAttribute('id') || current.getAttribute('data-cell-id');
      if (idAttr && data.useCaseDetails && data.useCaseDetails[idAttr]) {
        foundId = idAttr;
        break;
      }
      current = current.parentNode;
    }

    if (foundId) {
      setSelectedUseCase(data.useCaseDetails[foundId]);
      setIsModalOpen(true);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.navContainer}>
        <button onClick={() => navigate("/app/usecase")} style={styles.backBtn}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>{data.title}</h1>
        <p style={styles.description}>{data.description}</p>
      </div>

      <div style={styles.imageCard}>
        <div 
          style={styles.svgWrapper}
          onClick={handleSvgClick}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* --- POPUP MODAL DENGAN STYLE BARU --- */}
      {isModalOpen && selectedUseCase && (
        <ModalPopup 
          data={selectedUseCase} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <style>{`
        svg [id], svg [data-cell-id] { cursor: pointer !important; }
        svg text, svg tspan { pointer-events: none !important; }
        svg [id]:hover ellipse { fill: #f1f5f9 !important; stroke: #2563eb !important; transition: 0.2s; }
        
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// --- Komponen Modal (Popup) Yang Sudah Diperbaiki ---
const ModalPopup = ({ data, onClose }) => {
  return createPortal(
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        
        {/* MODAL HEADER */}
        <div style={modalStyles.header}>
          <h2 style={modalStyles.headerTitle}>
            {data.title}
          </h2>
          <button onClick={onClose} style={modalStyles.closeBtn}>
            &times;
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div style={modalStyles.body}>
          <div style={{ marginBottom: '20px' }}>
            <label style={modalStyles.label}>
              DESKRIPSI USE CASE
            </label>
            <p style={modalStyles.desc}>
              {data.description}
            </p>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

// --- STYLING OBJECTS ---

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '550px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    animation: 'popIn 0.3s ease-out'
  },
  header: {
    backgroundColor: '#1e40af',
    padding: '20px 24px',
    borderBottom: '4px solid #1e3a8a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    margin: 0,
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.2s'
  },
  body: {
    padding: '24px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: '6px',
    letterSpacing: '1px'
  },
  desc: {
    margin: 0,
    color: '#334155',
    lineHeight: '1.6',
    fontSize: '15px'
  },
  footerBtn: {
    padding: '10px 24px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }
};

const styles = {
  pageBackground: { 
    minHeight: "100vh", 
    backgroundColor: "#f4f6f8", 
    padding: "20px 40px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center" },

  navContainer: { 
    width: "100%", 
    maxWidth: "1100px", 
    display: "flex", 
    marginBottom: "20px" },

  backBtn: { 
    background: "transparent", 
    border: "none", 
    cursor: "pointer", 
    color: "#2c3e50" },

  header: { 
    textAlign: "center", 
    maxWidth: "800px", 
    marginBottom: "30px" },

  title: { fontSize: "2.2rem", 
    fontWeight: "800", 
    margin: "0 0 15px 0" },

  description: { 
    fontSize: "1.1rem", 
    color: "#636e72" },

  imageCard: {
      backgroundColor: "white",
      width: "100%",
      maxWidth: "1100px",
      minHeight: "500px", // Memberikan ruang vertikal yang cukup
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      padding: "40px",
      display: "flex",
      justifyContent: "center", // Tengah secara Horizontal
      alignItems: "center",     // Tengah secara Vertikal
      margin: "0 auto",         // Pastikan card-nya sendiri di tengah halaman
    },

  svgWrapper: {
      width: "100%",
      maxWidth: "800px", // Sesuaikan dengan lebar diagram Anda
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "visible", 
    },

  notFound: { 
    textAlign: "center", 
    marginTop: "50px" }
};

export default DetailPage;