import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Bookmark, Lightbulb, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";

const DataPrinciplesPage = () => {
  const [dataPrinciples, setDataPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataPrinciples();
  }, []);

  const fetchDataPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('data_principles')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setDataPrinciples(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-center">Memuat Prinsip Arsitektur Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 text-center">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Data</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchDataPrinciples} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 uppercase">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Data Architecture Principles
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold uppercase tracking-widest italic">
          BMKG Stasiun Meteorologi Balikpapan
        </p>
      </div>

      {/* 2. Principles Container */}
      <div className="max-w-[1400px] w-full grid grid-cols-1 gap-12">
        {dataPrinciples.length === 0 ? (
          <div className="text-center py-20 bg-primary-50 rounded-[2.5rem] border-2 border-dashed border-primary-200">
            <Info className="w-12 h-12 text-primary-300 mx-auto mb-4" />
            <p className="text-primary-400 font-black uppercase tracking-widest">Tidak ada prinsip data tersedia</p>
          </div>
        ) : (
          dataPrinciples.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.id} 
              className="bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden flex flex-col md:flex-row shadow-primary-50/50 group"
            >
              {/* Sisi Kiri: Statement (Highlight Utama) */}
              <div className="md:w-1/3 bg-primary-700 p-10 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-secondary-500/20 transition-colors" />
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-6 tracking-widest uppercase shadow-sm">
                    Principle {index + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-4">
                    {item.title}
                  </h3>
                  <div className="w-12 h-1 bg-secondary-500 rounded-full mb-6" />
                  <p className="text-primary-50 text-lg font-bold italic leading-relaxed">
                    "{item.statement}"
                  </p>
                </div>
              </div>

              {/* Sisi Kanan: Rationale & Implication */}
              <div className="md:w-2/3 p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/30">
                {/* Rationale */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary-600">
                    <Lightbulb size={20} />
                    <h4 className="font-black uppercase text-xs tracking-[0.2em]">Rationale</h4>
                  </div>
                  <p className="text-primary-900/70 text-sm leading-relaxed font-medium">
                    {item.rationale}
                  </p>
                </div>

                {/* Implication */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-secondary-600">
                    <ShieldCheck size={20} />
                    <h4 className="font-black uppercase text-xs tracking-[0.2em]">Implication</h4>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-sm shadow-primary-50 transition-all group-hover:shadow-md">
                    <p className="text-primary-900/80 text-sm leading-relaxed font-bold italic">
                      {item.implication}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 3. Footer Decor - CENTERED */}
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <div className="bg-primary-50 px-8 py-4 rounded-full border border-primary-100 shadow-sm flex items-center gap-3">
          <Bookmark size={18} className="text-primary-600" />
          <p className="text-primary-800 font-black uppercase text-[10px] tracking-[0.3em]">
            Enterprise Data Architecture Framework v2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataPrinciplesPage;