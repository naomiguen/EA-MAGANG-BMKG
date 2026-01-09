import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./css/TechnologyPrinciples.css";

export default function TechnologyPrinciples() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const pageSubtitle = useMemo(
    () => "Prinsip teknologi yang menjadi acuan kebijakan dan tata kelola.",
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function loadPrinciples() {
      setLoading(true);
      setErrMsg("");

      const { data, error } = await supabase
        .from("technology_principles")
        .select("id, tag, content, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!isMounted) return;

      if (error) {
        setErrMsg(error.message || "Gagal mengambil data dari Supabase.");
        setItems([]);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    }

    loadPrinciples();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="tp-page">
      <div className="tp-bgGlow" aria-hidden="true" />

      <div className="tp-container">
        <div className="tp-topbar">
          <button type="button" className="tp-back" onClick={() => navigate("/")}>
            Kembali ke Dashboard
          </button>
        </div>

        <header className="tp-header">
          <h1 className="tp-title">Technology Principles</h1>

          <div className="tp-logoWrap">
            <img className="tp-logo" src="/assets/Logo.png" alt="Logo BMKG" />
          </div>

          <p className="tp-subtitle">{pageSubtitle}</p>
        </header>

        <section className="tp-section" aria-label="Daftar prinsip teknologi">
          <div className="tp-rail" aria-hidden="true" />

          {loading && (
            <div className="tp-state">
              <div className="tp-skeleton" />
              <div className="tp-skeleton" />
              <div className="tp-skeleton" />
            </div>
          )}

          {!loading && errMsg && (
            <div className="tp-state tp-error" role="alert">
              <div className="tp-errorTitle">Gagal memuat data</div>
              <div className="tp-errorText">{errMsg}</div>
              <button
                type="button"
                className="tp-retry"
                onClick={() => window.location.reload()}
              >
                Coba lagi
              </button>
            </div>
          )}

          {!loading && !errMsg && items.length === 0 && (
            <div className="tp-state tp-empty">
              Belum ada data principle yang aktif di Supabase.
            </div>
          )}

          {!loading && !errMsg && items.length > 0 && (
            <div className="tp-list">
              {items.map((p, idx) => (
                <article className="tp-card" key={p.id}>
                  <div className="tp-cardHeader">
                    <div className="tp-index" aria-hidden="true">
                      {idx + 1}
                    </div>
                    <div className="tp-tag">{p.tag || "<<Principle>>"}</div>
                  </div>

                  <div className="tp-cardBody">
                    <p className="tp-text">{p.content}</p>
                  </div>

                  <div className="tp-cardFooter" aria-hidden="true">
                    <span className="tp-chip">Principle</span>
                    <span className="tp-chip tp-chipSoft">Technology</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
