import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2, Database, Laptop, Network, Layers, Cpu, Link2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechAppMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [matrixLinks, setMatrixLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    fetchMatrixData();
  }, []);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);
      const [appsRes, techRes, relRes] = await Promise.all([
        supabase.from('application_portfolio').select('id, physical_name, category').eq('status', 'Active').order('physical_name'),
        supabase.from('spbe_architecture_catalog').select('id, name, type, standard_id').eq('domain', 'Infrastruktur').order('type', { ascending: true }),
        supabase.from('spbe_tech_app_matrix').select('app_id, tech_id')
      ]);

      if (appsRes.error) throw appsRes.error;
      if (techRes.error) throw techRes.error;
      if (relRes.error) throw relRes.error;

      const linksMap = {};
      relRes.data.forEach(rel => {
        linksMap[`${rel.app_id}-${rel.tech_id}`] = true;
      });

      setApplications(appsRes.data || []);
      setTechnologies(techRes.data || []);
      setMatrixLinks(linksMap);
    } catch (err) {
      console.error('Error fetching matrix data:', err);
    } finally {
      setLoading(false);
    }
  };

  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.type]) acc[tech.type] = [];
    acc[tech.type].push(tech);
    return acc;
  }, {});

  const getTypeStyle = (type) => {
    const styles = {
      'Hardware': { bg: 'bg-slate-100', text: 'text-slate-700', icon: <Cpu size={14}/> },
      'Network': { bg: 'bg-blue-50', text: 'text-blue-700', icon: <Network size={14}/> },
      'Virtualization': { bg: 'bg-purple-50', text: 'text-purple-700', icon: <Layers size={14}/> },
      'Database': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: <Database size={14}/> },
    };
    return styles[type] || { bg: 'bg-gray-50', text: 'text-gray-600', icon: <Laptop size={14}/> };
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-12 h-12 animate-spin text-primary-600 mb-4" />
      <p className="font-black uppercase tracking-widest text-primary-600 text-xs text-center">Sinkronisasi Matriks Teknologi...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-6xl text-center mb-12 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Technology - Application Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Link2 size={24} className="text-secondary-600" />
          Pemetaan Ketergantungan Layanan Aplikasi terhadap Infrastruktur TI
        </p>
      </div>

      {/* 2. Stats Grid - CENTERED */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <div className="bg-primary-50 p-6 rounded-[2rem] border border-primary-100 shadow-sm flex flex-col items-center">
          <span className="text-3xl font-black text-primary-700 leading-none mb-2">{applications.length}</span>
          <span className="font-black text-primary-950/40 uppercase tracking-widest text-[10px]">Active Apps</span>
        </div>
        <div className="bg-secondary-50 p-6 rounded-[2rem] border border-secondary-200 flex flex-col items-center">
          <span className="text-3xl font-black text-secondary-700 leading-none mb-2">{technologies.length}</span>
          <span className="font-black text-primary-950/40 uppercase tracking-widest text-[10px]">IT Assets</span>
        </div>
        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex flex-col items-center">
          <span className="text-3xl font-black text-emerald-700 leading-none mb-2">{Object.keys(matrixLinks).length}</span>
          <span className="font-black text-primary-950/40 uppercase tracking-widest text-[10px]">Dependencies</span>
        </div>
      </div>

      {/* 3. Matrix Table Container */}
      
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-left border-collapse table-fixed min-w-max">
            <thead className="sticky top-0 z-40 bg-white">
              {/* Group Type Headers */}
              <tr className="bg-primary-700 text-white shadow-md">
                <th className="sticky left-0 top-0 z-50 bg-primary-800 w-[280px] p-6 border-r border-primary-600">
                  <div className="flex flex-col text-[10px] font-black uppercase tracking-widest text-secondary-500">
                    <span>Technologies ➝</span>
                    <span className="mt-1 text-white">⬇ Applications</span>
                  </div>
                </th>
                {Object.keys(groupedTech).map((type) => (
                  <th
                    key={type}
                    colSpan={groupedTech[type].length}
                    className={`px-4 py-3 text-center border-r border-primary-600 text-[10px] font-black uppercase tracking-[0.2em] ${getTypeStyle(type).bg} ${getTypeStyle(type).text}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {getTypeStyle(type).icon} {type}
                    </div>
                  </th>
                ))}
              </tr>
              
              {/* Specific Tech Headers */}
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="sticky left-0 z-40 bg-slate-100 p-4 border-r border-slate-200 text-xs font-black uppercase text-slate-500 tracking-widest">
                  System Inventory
                </th>
                {Object.keys(groupedTech).map((type) =>
                  groupedTech[type].map((tech) => (
                    <th
                      key={tech.id}
                      className={`p-3 text-center border-r border-slate-200 min-w-[140px] transition-all relative group
                        ${selectedTech === tech.id ? 'bg-secondary-50 shadow-inner' : ''}`}
                      onMouseEnter={() => setSelectedTech(tech.id)}
                      onMouseLeave={() => setSelectedTech(null)}
                    >
                      <div className="text-[10px] font-black text-primary-900 uppercase leading-tight mb-1 truncate px-2" title={tech.name}>
                        {tech.name}
                      </div>
                      <div className="text-[8px] font-bold text-primary-300 bg-white px-2 py-0.5 rounded-full border border-primary-50 inline-block">
                        {tech.standard_id}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className={`group transition-colors ${selectedApp === app.id ? 'bg-primary-50/50' : 'hover:bg-slate-50/50'}`}
                  onMouseEnter={() => setSelectedApp(app.id)}
                  onMouseLeave={() => setSelectedApp(null)}
                >
                  <td className="sticky left-0 z-30 bg-white group-hover:bg-slate-50 p-4 border-r border-slate-200 shadow-sm transition-colors">
                    <div className="text-xs font-black text-primary-900 uppercase tracking-tight truncate leading-tight">
                      {app.physical_name}
                    </div>
                    <div className="text-[9px] font-bold text-primary-300 uppercase tracking-widest mt-1 italic">
                      {app.category}
                    </div>
                  </td>
                  
                  {Object.keys(groupedTech).map((type) =>
                    groupedTech[type].map((tech) => {
                      const isActive = matrixLinks[`${app.id}-${tech.id}`];
                      const isHighlighted = selectedApp === app.id || selectedTech === tech.id || hoveredCell === `${app.id}-${tech.id}`;
                      
                      return (
                        <td
                          key={`${app.id}-${tech.id}`}
                          className={`p-4 text-center border-r border-slate-100 transition-all cursor-crosshair
                            ${isActive ? 'bg-secondary-50/20' : ''} 
                            ${isHighlighted ? 'ring-1 ring-inset ring-primary-100 shadow-inner' : ''}`}
                          onMouseEnter={() => setHoveredCell(`${app.id}-${tech.id}`)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-xl bg-secondary-500 text-primary-950 flex items-center justify-center mx-auto shadow-md shadow-secondary-500/20 border-2 border-white"
                            >
                              <Link2 size={16} strokeWidth={3} />
                            </motion.div>
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Legend & Info - CENTERED */}
      <div className="mt-12 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-secondary-500 flex items-center justify-center text-primary-950 shadow-sm border border-white">
              <Link2 size={12} strokeWidth={4} />
            </div>
            <span className="text-[10px] font-black text-primary-900 uppercase tracking-widest">Active Dependency</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-200" />
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">No Relation</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-2xl border border-primary-50 shadow-sm">
          <Info size={16} className="text-primary-600" />
          <p className="text-[10px] font-bold text-primary-800 italic uppercase">Hover baris/kolom untuk melacak keterkaitan data.</p>
        </div>
      </div>

      {/* Helper Footer */}
      <div className="mt-12 text-center text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Technology Architecture Alignment v2.0 - BMKG Balikpapan
      </div>
    </div>
  );
};

export default TechAppMatrix;