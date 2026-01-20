import React from "react";
// Pastikan Anda sudah menginstall react-router-dom: npm install react-router-dom
import { useNavigate } from "react-router-dom"; 
import { appData } from "../services/data";

const UseCaseGallery = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Application Use Case Diagram</h1>
      <p style={styles.subHeader}>
        Pilih aplikasi di bawah untuk melihat Use Case Diagram secara detail.
      </p>

      {/* --- GRID CONTAINER --- */}
      <div style={styles.grid}>
        {appData.map((item) => (
          <div 
            key={item.id} 
            style={styles.card} 
            onClick={() => navigate(`/detail/${item.id}`)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            {/* Logo Container */}
            <div style={styles.imageContainer}>
              <img 
                src={item.logoUrl} 
                alt={item.title} 
                style={styles.cardImage} 
                // Fallback gambar jika logo error/belum ada
                onError={(e) => {e.target.src = "https://via.placeholder.com/300x300.png?text=Logo+App"}} 
              />
            </div>

            {/* Card Content */}
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.description}</p>
              <div style={styles.buttonMock}>Lihat Diagram &rarr;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "10px",
    fontSize: "2.5rem",
    fontWeight: "600",
  },
  subHeader: {
    textAlign: "center",
    color: "#7f8c8d",
    marginBottom: "50px",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    overflow: "hidden", // Agar isi tidak keluar border
    boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eaeaea",
  },
  imageContainer: {
    height: "200px", // Tinggi area logo
    width: "100%",
    backgroundColor: "#ffffff", // Background putih agar logo jelas
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px", // Padding agar logo tidak mepet pinggir
    borderBottom: "1px solid #f0f0f0",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain", // PENTING: Agar logo proporsional (tidak gepeng/terpotong)
  },
  cardContent: {
    padding: "25px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    color: "#34495e",
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  cardDesc: {
    margin: "0 0 20px 0",
    color: "#7f8c8d",
    lineHeight: "1.6",
    fontSize: "0.95rem",
  },
  buttonMock: {
    marginTop: "auto",
    color: "#3498db",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  }
};

export default UseCaseGallery;