import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, BookOpen, Lightbulb, Cog, Info } from "lucide-react";
import { motion } from "framer-motion";

const ApplicationPrinciples = () => {
  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrinciples();
  }, []);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('application_principles')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setPrinciples(data || []);
    } catch (err) {
      console.error('Error fetching principles:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-center">Sinkronisasi Prinsip Aplikasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Data</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchPrinciples} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg">
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
          Application Principles
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Referensi: Perpres No. 95/2018 & Perka BMKG No. 9/2023
        </p>
      </div>

      {/* 2. Principles Grid Container */}
      <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {principles.map((principle, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={principle.id} 
            className="bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden flex flex-col shadow-primary-50/50 group"
          >
            {/* Card Header: Title & Badge */}
            <div className="bg-primary-700 p-8 text-white relative overflow-hidden border-b-4 border-secondary-500">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-secondary-500/20 transition-colors" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-500 text-primary-950 text-[10px] font-black mb-4 tracking-widest uppercase shadow-sm">
                  Prinsip #{index + 1}
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight">
                  {principle.title}
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8 space-y-8 flex-1 bg-slate-50/30">
              {/* Statement Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary-600 font-black uppercase text-[10px] tracking-[0.2em]">
                  <BookOpen size={14} />
                  <span>Pernyataan Utama</span>
                </div>
                <p className="text-primary-900 text-lg font-bold italic leading-relaxed">
                  "{principle.statement}"
                </p>
              </div>

              {/* Rationale Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary-400 font-black uppercase text-[10px] tracking-[0.2em]">
                  <Lightbulb size={14} />
                  <span>Rasional Bisnis</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {principle.rationale}
                </p>
              </div>

              {/* Implication Section */}
              <div className="p-6 bg-white rounded-2xl border border-primary-100 shadow-sm transition-all group-hover:shadow-md">
                <div className="flex items-center gap-2 text-secondary-600 font-black uppercase text-[10px] tracking-[0.2em] mb-3">
                  <Cog size={14} />
                  <span>Implikasi Teknis</span>
                </div>
                <p className="text-primary-950 text-sm leading-relaxed font-bold">
                  {principle.implication}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-8 py-4 bg-primary-50 border-t border-primary-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">
                Source Document
              </span>
              <span className="text-[10px] font-bold text-primary-700 bg-white px-3 py-1 rounded-lg border border-primary-100 shadow-sm">
                {principle.source || 'Standard EA'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Footer Decor - CENTERED */}
      
      <div className="mt-20 text-center">
         <p className="text-primary-300 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
           Application Architecture Principles Framework v2026
         </p>
      </div>

    </div>
  );
};

export default ApplicationPrinciples;