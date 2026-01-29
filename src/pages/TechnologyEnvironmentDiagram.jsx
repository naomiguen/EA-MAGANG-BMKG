import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, Server, Globe, MapPin, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

const TechnologyEnvironmentDiagram = () => {
  const [enterpriseData, setEnterpriseData] = useState({
    external: [],
    hq: [],
    remote: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select(`
          id, name, icon, category,
          environments (
            type,
            nodes ( name )
          )
        `);

      if (error) throw error;

      const structuredData = { external: [], hq: [], remote: [] };

      data.forEach(loc => {
        const formattedEnvs = loc.environments.map(env => ({
          type: env.type,
          nodes: env.nodes.map(n => n.name) 
        }));

        const locationObj = {
          id: loc.id,
          name: loc.name,
          icon: loc.icon,
          environments: formattedEnvs
        };

        if (structuredData[loc.category]) {
          structuredData[loc.category].push(locationObj);
        }
      });

      setEnterpriseData(structuredData);
    } catch (err) {
      console.error("Gagal mengambil data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const LocationCard = ({ location }) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] shadow-xl border border-primary-100 overflow-hidden w-full max-w-[320px] flex flex-col group"
    >
      {/* Header Card */}
      <div className="bg-primary-700 p-5 text-white flex items-center justify-between border-b-4 border-secondary-500">
        <span className="font-black uppercase tracking-tighter text-sm leading-tight max-w-[80%]">
          {location.name}
        </span>
        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
          {location.icon || <Globe size={20}/>}
        </span>
      </div>
      
      {/* Body Card */}
      <div className="p-5 space-y-4 bg-slate-50/50 flex-1">
        {location.environments.map((env, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-2">
              <Server size={14} className="text-secondary-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">
                {env.type}
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-1.5">
              {env.nodes.map((node, nIdx) => (
                <li key={nIdx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-primary-50 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-bold text-primary-900 uppercase tracking-tight">
                    {node}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
        <p className="font-black uppercase tracking-widest text-primary-600 text-xs">Memetakan Infrastruktur...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Technology Environment Diagram
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic uppercase tracking-widest">
          <Activity size={24} className="text-secondary-600" />
          Stasiun Meteorologi Kelas I Balikpapan
        </p>
      </div>

      {/* 2. Diagram Area */}
      
      <div className="w-full max-w-7xl space-y-16 relative">
        
        {/* Level 1: EXTERNAL / CLOUD */}
        <section className="flex flex-col items-center gap-6">
          <div className="bg-primary-50 px-6 py-2 rounded-full border border-primary-100 flex items-center gap-2 shadow-sm">
            <Globe size={16} className="text-primary-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700">Level 1: External / Cloud Infrastructure</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {enterpriseData.external?.map(loc => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </section>

        {/* Connector Line 1 */}
        <div className="flex justify-center -my-8">
           <div className="w-1 h-12 bg-gradient-to-b from-primary-200 to-primary-400 rounded-full" />
        </div>

        {/* Level 2: HEADQUARTER (HQ) */}
        <section className="flex flex-col items-center gap-6">
          <div className="bg-secondary-50 px-6 py-2 rounded-full border border-secondary-200 flex items-center gap-2 shadow-sm">
            <MapPin size={16} className="text-secondary-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-900">Level 2: Headquarter Data Center</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {enterpriseData.hq?.map(loc => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </section>

        {/* Connector Line 2 */}
        <div className="flex justify-center -my-8">
           <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-secondary-300 rounded-full" />
        </div>

        {/* Level 3: REMOTE / SENSOR SITES */}
        <section className="flex flex-col items-center gap-6">
          <div className="bg-slate-50 px-6 py-2 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
            <ShieldCheck size={16} className="text-slate-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Level 3: Edge Computing / Sensor Sites</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {enterpriseData.remote?.map(loc => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </section>

      </div>

      {/* 3. Footer Decor - CENTERED */}
      <div className="mt-20 text-center text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Operational Technology Architecture v2026
      </div>

    </div>
  );
};

export default TechnologyEnvironmentDiagram;