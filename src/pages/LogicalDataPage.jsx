import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Database, Hash } from 'lucide-react';

const LogicalDataDiagram = () => {
  const [erdData, setErdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchERDData();
  }, []);

  const fetchERDData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: entities, error: entitiesError } = await supabase
        .from('erd_entities')
        .select(`
          id, title, type, display_order,
          erd_attributes (name, key_type, description, display_order)
        `)
        .order('display_order', { ascending: true });

      if (entitiesError) throw entitiesError;

      const transformedData = entities.map(entity => ({
        title: entity.title,
        attributes: entity.erd_attributes
          .sort((a, b) => a.display_order - b.display_order)
          .map(attr => ({ name: attr.name, key: attr.key_type || '' }))
      }));
      setErdData(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const findEntity = (keyword) => erdData.find(e => e.title.toLowerCase().includes(keyword.toLowerCase()));

  const EntityCard = ({ entity }) => {
    if (!entity) return null;
    return (
      <div className="w-60 bg-white rounded-2xl shadow-xl border-2 border-primary-100 overflow-hidden group hover:border-primary-500 transition-all duration-300">
        <div className="bg-primary-700 p-3 text-white border-b-4 border-secondary-500 text-center">
          <h3 className="text-[11px] font-black uppercase tracking-widest">{entity.title}</h3>
        </div>
        <ul className="divide-y divide-primary-50">
          {entity.attributes.map((attr, idx) => (
            <li key={idx} className="px-3 py-2 flex items-center gap-2 hover:bg-primary-50 transition-colors">
              <div className="w-5 flex-shrink-0 text-center">
                {attr.key === 'PK' && <span className="text-[8px] font-black bg-secondary-500 text-primary-950 px-1 rounded shadow-sm">PK</span>}
                {attr.key === 'FK' && <span className="text-[8px] font-black bg-primary-100 text-primary-700 px-1 rounded">FK</span>}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tight ${attr.key ? 'text-primary-900' : 'text-slate-500 font-medium'}`}>
                {attr.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary-600" />
      <p className="font-black uppercase tracking-widest text-primary-600 text-xs">Memetakan Model Data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* Header Section */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Logical Data Model (ERD)
        </h1>
        <p className="text-primary-800 text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2 italic">
          <Database size={24} className="text-secondary-600" />
          Arsitektur Hubungan Entitas Data Operasional
        </p>
      </div>

      <div className="w-full max-w-6xl flex flex-col items-center relative">
        
        {/* LEVEL 1: PARENT */}
        <div className="relative z-20">
            <EntityCard entity={findEntity('pegawai')} />
            {/* Titik Keluar Garis */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-primary-700 rounded-full border-2 border-white shadow-sm"></div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-secondary-500 text-primary-950 px-3 py-0.5 rounded-full text-[10px] font-black shadow-md">1</div>
        </div>

        {/* CONNECTOR LINES (SVG) */}
        <div className="w-full h-32 relative -mt-1 z-10">
            <svg viewBox="0 0 1000 120" className="w-full h-full preserve-3d">
                <path 
                  d="M 500 0 L 500 60 M 500 60 L 166 60 L 166 120 M 500 60 L 500 120 M 500 60 L 834 60 L 834 120" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="3" 
                  strokeDasharray="8 4"
                />
            </svg>
            
            {/* Label N (Many) */}
            <div className="absolute bottom-2 left-[16.6%] -translate-x-1/2 bg-white text-primary-700 px-2 py-0.5 rounded border border-primary-200 text-[10px] font-black shadow-sm">N</div>
            <div className="absolute bottom-2 left-[50%] -translate-x-1/2 bg-white text-primary-700 px-2 py-0.5 rounded border border-primary-200 text-[10px] font-black shadow-sm">N</div>
            <div className="absolute bottom-2 left-[83.4%] -translate-x-1/2 bg-white text-primary-700 px-2 py-0.5 rounded border border-primary-200 text-[10px] font-black shadow-sm">N</div>
        </div>

        {/* LEVEL 2: CHILDREN */}
        <div className="flex flex-row justify-between w-full gap-4 relative z-20">
            {[findEntity('aset'), findEntity('observasi'), findEntity('produk')].map((ent, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-3 h-3 bg-primary-700 rounded-full mb-[-6px] z-20 border-2 border-white shadow-sm"></div>
                <EntityCard entity={ent} />
              </div>
            ))}
        </div>
      </div>

      {/* Legend / Keterangan */}
      
      <div className="mt-20 w-full max-w-4xl bg-primary-50 rounded-[2.5rem] border border-primary-100 p-8 shadow-inner">
        <h4 className="text-primary-800 font-black uppercase tracking-[0.2em] text-[10px] mb-6 text-center italic flex items-center justify-center gap-2">
           Analisis Relasi Kardinalitas Data
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {label: 'Pegawai - Aset', desc: 'Satu Teknisi memelihara banyak Alat Meteorologi.'},
            {label: 'Pegawai - Observasi', desc: 'Satu Observer melakukan banyak pengamatan rutin.'},
            {label: 'Pegawai - Produk', desc: 'Satu Forecaster menerbitkan banyak Produk Informasi.'}
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-primary-100 shadow-sm flex flex-col gap-2">
              <span className="w-fit bg-secondary-500 px-2 py-0.5 rounded text-primary-950 font-black text-[9px]">1:N RELATION</span>
              <p className="text-primary-950 text-[11px] font-bold uppercase leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicalDataDiagram;