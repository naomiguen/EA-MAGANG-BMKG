import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appData } from "../services/data"; // Sesuaikan path data Anda

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari data
  const data = appData.find((item) => item.id === id);

  // Fallback jika data null
  if (!data) {
    return (
      <div style={styles.notFound}>
        <h2>Data tidak ditemukan!</h2>
        <button onClick={() => navigate("/")}>Kembali ke Home</button>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      
      {/* --- TOMBOL BACK (DI LUAR KOTAK - POJOK KIRI) --- */}
      <div style={styles.navContainer}>
        <button 
          onClick={() => navigate("/app/usecase")} 
          style={styles.backBtn}
          title="Kembali ke Gallery"
        >
          {/* Ikon SVG Panah Kiri */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      {/* --- HEADER (JUDUL & DESKRIPSI DI LUAR KOTAK) --- */}
      <div style={styles.header}>
        <h1 style={styles.title}>{data.title}</h1>
        <p style={styles.description}>{data.description}</p>
      </div>

      {/* --- KOTAK PUTIH (BESAR) --- */}
      <div style={styles.imageCard}>
        {/* GAMBAR (UKURAN LEBIH KECIL DI TENGAH) */}
        <img 
          src={data.diagramUrl} 
          alt={`Diagram ${data.title}`} 
          style={styles.diagramImage}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/800x400?text=Gambar+Tidak+Ditemukan";
          }}
        />
      </div>

    </div>
  );
};

// --- STYLING (CSS in JS) ---
const styles = {
  pageBackground: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "20px 40px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  navContainer: {
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },

  backBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#2c3e50",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease",
  },

  header: {
    textAlign: "center",
    maxWidth: "800px",
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.2rem",
    color: "#000000",
    margin: "0 0 15px 0",
    fontWeight: "800",
  },
  description: {
    fontSize: "1.1rem",
    color: "#636e72",
    margin: 0,
    lineHeight: "1.6",
  },

  // Kotak Putih TETAP BESAR
  imageCard: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: "1100px", // Lebar kotak tetap besar
    minHeight: "400px", // Tambahan: agar kotak tidak gepeng jika gambar kecil
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "40px", // Padding ditambah agar ada jarak putih
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Gambar DIKECILKAN
  diagramImage: {
    width: "auto",      // Jangan dipaksa full width
    maxWidth: "750px",  // Batasi lebar maksimal gambar (sesuaikan angka ini jika kurang kecil)
    height: "auto",
    display: "block",
    borderRadius: "8px",
  },

  notFound: {
    textAlign: "center",
    marginTop: "50px",
  }
};

export default DetailPage;