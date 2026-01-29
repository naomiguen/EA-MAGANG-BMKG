import React, { useEffect, useState } from "react";
import "./css/StakeholderPage.css";
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
          cat: x.category,
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
          <div className="orgMuted">
            Identifikasi peran dan kepentingan pemangku kepentingan BMKG Balikpapan
          </div>
        </div>
      </div>

      <div className="orgDiagramCardFull">
        <div className="orgDiagramHeader">
          <div>Stakeholder Catalog</div>
        </div>

        <div className="orgDiagramCanvasFull">
          {loading && (
            <div className="loading-message">
              Memuat data stakeholder...
            </div>
          )}

          {!loading && errMsg && (
            <div className="error-container">
              <div className="error-title">Gagal memuat data</div>
              <div className="error-message">{errMsg}</div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="error-button"
              >
                Coba lagi
              </button>
            </div>
          )}

          {!loading && !errMsg && (
            <table className="stakeholder-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header">No.</th>
                  <th className="table-header stakeholder-col">Stakeholder</th>
                  <th className="table-header">Kategori</th>
                  <th className="table-header role-col">Peran Utama</th>
                  <th className="table-header interest-col">Kepentingan</th>
                </tr>
              </thead>

              <tbody>
                {stakeholders.map((item) => (
                  <tr key={item.no} className="table-row">
                    <td className="table-cell number-cell">
                      {item.no}
                    </td>

                    <td className="table-cell name-cell">
                      {item.name}
                    </td>

                    <td className="table-cell">
                      <span className={`category-badge ${item.cat === "Internal" ? "internal" : "external"}`}>
                        {item.cat}
                      </span>
                    </td>

                    <td className="table-cell role-cell">
                      {item.role}
                    </td>

                    <td className="table-cell interest-cell">
                      "{item.interest}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mobile-only-hint">
          ← Geser tabel ke samping untuk melihat detail →
        </div>
      </div>
    </div>
  );
};

export default StakeholderPage;