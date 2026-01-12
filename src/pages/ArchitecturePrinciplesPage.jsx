import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ArchitecturePrinciplesPage = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPrinciples() {
      setLoading(true);
      setErrMsg("");

      const { data, error } = await supabase
        .from("architecture_principles")
        .select("principle_code, category, title, statement, rationale, implication, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        setErrMsg(error.message || "Gagal mengambil data Architecture Principles dari Supabase.");
        setPrinciples([]);
      } else {
        const mapped = (data || []).map((x) => ({
          id: x.principle_code,
          category: x.category,
          title: x.title,
          statement: x.statement,
          rationale: x.rationale,
          implication: x.implication,
        }));
        setPrinciples(mapped);
      }

      setLoading(false);
    }

    loadPrinciples();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: "700",
            color: "#1e3a8a",
            margin: "0 0 8px 0",
          }}
        >
          Architecture Principles
        </h1>
        <p
          style={{
            fontSize: "clamp(13px, 3vw, 16px)",
            color: "#64748b",
            margin: 0,
          }}
        >
          4 Pilar Prinsip EA Stasiun Meteorologi Sepinggan
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
          gap: "20px",
          padding: "0 8px",
        }}
      >
        {loading && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            Memuat data principles...
          </div>
        )}

        {!loading && errMsg && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "#fff5f5",
              border: "1px solid #fed7d7",
              borderRadius: "12px",
              padding: "16px",
              color: "#7f1d1d",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Gagal memuat data</div>
            <div style={{ marginBottom: 12 }}>{errMsg}</div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                border: "1px solid #feb2b2",
                background: "white",
                padding: "8px 10px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Coba lagi
            </button>
          </div>
        )}

        {!loading && !errMsg && principles.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              color: "#64748b",
            }}
          >
            Tidak ada principle yang aktif di database.
          </div>
        )}

        {!loading &&
          !errMsg &&
          principles.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: hoveredId === item.id ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  hoveredId === item.id
                    ? "0 10px 25px -5px rgba(0, 0, 0, 0.15)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(16px, 4vw, 18px)",
                    fontWeight: "700",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div style={{ padding: "20px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94a3b8",
                      letterSpacing: "0.5px",
                      marginBottom: "6px",
                    }}
                  >
                    STATEMENT
                  </label>
                  <p
                    style={{
                      color: "#1e293b",
                      fontSize: "clamp(13px, 3vw, 15px)",
                      fontWeight: "600",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {item.statement}
                  </p>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94a3b8",
                      letterSpacing: "0.5px",
                      marginBottom: "6px",
                    }}
                  >
                    RATIONALE
                  </label>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "clamp(12px, 2.5vw, 14px)",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    {item.rationale}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "12px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #f59e0b",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#92400e",
                      letterSpacing: "0.5px",
                      marginBottom: "6px",
                    }}
                  >
                    IMPLICATION
                  </label>
                  <p
                    style={{
                      color: "#78350f",
                      fontSize: "clamp(12px, 2.5vw, 14px)",
                      fontStyle: "italic",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    "{item.implication}"
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArchitecturePrinciplesPage;
