import React, { useEffect, useState } from "react";
import "./css/OrganizationDiagramPage.css";
import { supabase } from "../lib/supabaseClient";

const StakeholderPage = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadStakeholders() {
      setLoading(true);
      setErrMsg("");

      const { data, error } = await supabase
        .from("stakeholder_catalog")
        .select("no, name, category, role, interest, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        setErrMsg(error.message || "Gagal mengambil data stakeholder dari Supabase.");
        setStakeholders([]);
      } else {
        const mapped = (data || []).map((x) => ({
          no: x.no,
          name: x.name,
          cat: x.category, // biar kompatibel dengan style lama (Internal/Eksternal)
          role: x.role,
          interest: x.interest,
        }));
        setStakeholders(mapped);
      }

      setLoading(false);
    }

    loadStakeholders();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="orgPageWrapper">
      <div className="orgTopBar">
        <div>
          <div className="orgPageTitle">Stakeholder Catalog</div>
          <div className="orgMuted" style={{ fontSize: "0.9rem", marginTop: "4px" }}>
            Identifikasi peran dan kepentingan pemangku kepentingan BMKG Balikpapan
          </div>
        </div>
      </div>

      <div className="orgDiagramCardFull">
        <div className="orgDiagramHeader">
          <div>Stakeholder Catalog</div>
        </div>

        <div
          className="orgDiagramCanvasFull"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "1rem",
          }}
        >
          {loading && (
            <div style={{ padding: "18px", color: "#666", fontSize: "0.9rem" }}>
              Memuat data stakeholder...
            </div>
          )}

          {!loading && errMsg && (
            <div
              style={{
                padding: "18px",
                background: "#fff5f5",
                border: "1px solid #fed7d7",
                borderRadius: "10px",
                color: "#742a2a",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ fontWeight: 800, marginBottom: "6px" }}>Gagal memuat data</div>
              <div style={{ marginBottom: "10px" }}>{errMsg}</div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  border: "1px solid #feb2b2",
                  background: "white",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Coba lagi
              </button>
            </div>
          )}

          {!loading && !errMsg && (
            <table
              style={{
                width: "100%",
                minWidth: "900px",
                borderCollapse: "collapse",
                background: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 0 0 1px #edf2f7",
              }}
            >
              <thead>
                <tr style={{ background: "#f0f4f8", borderBottom: "2px solid #2c5282" }}>
                  <th style={styles.th}>No.</th>
                  <th style={{ ...styles.th, minWidth: "150px" }}>Stakeholder</th>
                  <th style={styles.th}>Kategori</th>
                  <th style={{ ...styles.th, minWidth: "250px" }}>Peran Utama</th>
                  <th style={{ ...styles.th, minWidth: "250px" }}>Kepentingan</th>
                </tr>
              </thead>

              <tbody>
                {stakeholders.map((item) => (
                  <tr key={item.no} style={styles.tr}>
                    <td style={{ ...styles.td, textAlign: "center", fontWeight: "bold" }}>
                      {item.no}
                    </td>

                    <td style={{ ...styles.td, fontWeight: "800", color: "#1a1a1a" }}>
                      {item.name}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "800",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          backgroundColor: item.cat === "Internal" ? "#e6fffa" : "#faf5ff",
                          color: item.cat === "Internal" ? "#2c7a7b" : "#6b46c1",
                          border: `1px solid ${
                            item.cat === "Internal" ? "#b2f5ea" : "#e9d8fd"
                          }`,
                        }}
                      >
                        {item.cat}
                      </span>
                    </td>

                    <td style={{ ...styles.td, color: "#4a5568", lineHeight: "1.5" }}>
                      {item.role}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        color: "#4a5568",
                        fontStyle: "italic",
                        lineHeight: "1.5",
                      }}
                    >
                      "{item.interest}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div
          style={{
            padding: "8px 16px",
            fontSize: "0.7rem",
            color: "#999",
            textAlign: "center",
            background: "#f9f9f9",
            borderTop: "1px solid #eee",
          }}
          className="mobile-only-hint"
        >
          ← Geser tabel ke samping untuk melihat detail →
        </div>
      </div>
    </div>
  );
};

const styles = {
  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "0.85rem",
    fontWeight: "800",
    color: "#2c5282",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "16px",
    fontSize: "0.9rem",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "top",
  },
  tr: {
    transition: "background 0.2s ease",
  },
};

export default StakeholderPage;
