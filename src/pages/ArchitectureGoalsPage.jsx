import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ArchitectureGoalsPage = () => {
  const [domainGoals, setDomainGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadGoals() {
      setLoading(true);
      setErrMsg("");

      const { data, error } = await supabase
        .from("architecture_domain_goals")
        .select("id, domain, icon, focus, description, goals, sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        setErrMsg(error.message || "Gagal mengambil data Architecture Goals dari Supabase.");
        setDomainGoals([]);
      } else {
        const mapped = (data || []).map((x) => ({
          domain: x.domain,
          icon: x.icon,
          focus: x.focus,
          desc: x.description,
          goals: Array.isArray(x.goals) ? x.goals : [],
        }));
        setDomainGoals(mapped);
      }

      setLoading(false);
    }

    loadGoals();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Architecture Goals</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bagaimana Visi & Misi diterjemahkan ke dalam 4 Domain Arsitektur
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg text-center mb-10 relative">
          <h2 className="text-xl font-bold mb-2">VISI & MISI ORGANISASI</h2>
          <p className="text-blue-200">"Business Goals"</p>

          <div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 
            border-l-[15px] border-l-transparent
            border-r-[15px] border-r-transparent
            border-t-[15px] border-t-blue-900"
          />
        </div>

        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600">
            Memuat data Architecture Goals...
          </div>
        )}

        {!loading && errMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800">
            <div className="font-bold mb-2">Gagal memuat data</div>
            <div className="mb-4">{errMsg}</div>
            <button
              type="button"
              className="px-4 py-2 bg-white border border-red-200 rounded-lg font-bold"
              onClick={() => window.location.reload()}
            >
              Coba lagi
            </button>
          </div>
        )}

        {!loading && !errMsg && (
          <div className="grid md:grid-cols-2 gap-6">
            {domainGoals.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 transition-colors flex gap-4"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-1">{item.domain}</h3>
                  <p className="text-sm font-bold text-orange-500 uppercase mb-2 tracking-wide">
                    Fokus: {item.focus}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.goals.map((goal, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectureGoalsPage;
