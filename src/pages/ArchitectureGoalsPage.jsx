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
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Architecture Goals
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bagaimana Visi & Misi diterjemahkan ke dalam 4 Domain Arsitektur
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* 4 DOMAIN GRID */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {domainGoals.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
            >
              {/* Header dengan Gradient Biru */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
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
              <div className="p-6 space-y-4">
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
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Goals Tags */}
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                    Strategic Goals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.goals.map((goal, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
>>>>>>> bcf9a9b51c7e290351de1a785a7a0024c855a471
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            ))}
          </div>
        )}
=======
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Integrated Approach</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Keempat domain arsitektur ini saling terintegrasi dan mendukung satu sama lain untuk mencapai visi BMKG Balikpapan dalam memberikan layanan meteorologi yang handal dan prima.
              </p>
            </div>
          </div>
        </div>
>>>>>>> bcf9a9b51c7e290351de1a785a7a0024c855a471
      </div>
    </div>
  );
};

export default ArchitectureGoalsPage;
