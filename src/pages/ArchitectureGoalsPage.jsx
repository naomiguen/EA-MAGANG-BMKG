import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";

const ArchitectureGoalsPage = () => {
  const navigate = useNavigate();
  const [domainGoals, setDomainGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadGoals() {
      setLoading(true);
      setErrMsg("");

      try {
        const { data, error } = await supabase
          .from("architecture_domain_goals")
          .select("id, domain, icon, focus, description, goals, sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (!mounted) return;

        if (error) throw error;

        const mapped = (data || []).map((x) => ({
          domain: x.domain,
          icon: x.icon || "🏛️",
          focus: x.focus || "General Focus",
          desc: x.description || "Tidak ada deskripsi.",
          goals: Array.isArray(x.goals) ? x.goals : [],
        }));
        setDomainGoals(mapped);
      } catch (err) {
        if (mounted) {
          console.error("Error fetching goals:", err);
          setErrMsg(err.message || "Gagal mengambil data Architecture Goals.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadGoals();
    return () => {
      mounted = false;
    };
  }, []);

  // --- 1. TAMPILAN LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Memuat Data Arsitektur...</p>
      </div>
    );
  }

  // --- 2. TAMPILAN ERROR ---
  if (errMsg) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Terjadi Kesalahan</h3>
          <p className="text-slate-600 mb-6">{errMsg}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // --- 3. TAMPILAN UTAMA ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Tombol Kembali */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Dashboard
        </button>
      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Architecture Goals
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bagaimana Visi & Misi diterjemahkan ke dalam 4 Domain Arsitektur Enterprise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* 4 DOMAIN GRID */}
      <div className="max-w-6xl mx-auto">
        {domainGoals.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl shadow-sm">
            Belum ada data goals yang aktif.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {domainGoals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group flex flex-col h-full"
              >
                {/* Header dengan Gradient Biru */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {item.domain}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  {/* Focus Area */}
                  <div className="bg-blue-50 border-blue-200 border-l-4 p-4 rounded-lg">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Fokus Area
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {item.focus}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {item.desc}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4"></div>

                  {/* Goals Tags */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                      Strategic Goals
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.goals.length > 0 ? (
                        item.goals.map((goal, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            {goal}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400 italic">
                          - Belum ada goals spesifik -
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">
                Integrated Approach
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Keempat domain arsitektur ini saling terintegrasi dan mendukung satu
                sama lain untuk mencapai visi BMKG Balikpapan dalam memberikan
                layanan meteorologi yang handal dan prima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureGoalsPage;