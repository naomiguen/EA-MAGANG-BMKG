import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Loader2, AlertCircle, Check, Info, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const AppBusinessProcessMatrixPage = () => {
  const [processes, setProcesses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [processesRes, appsRes, mappingRes] = await Promise.all([
        supabase.from('business_processes').select('*').order('sort_order'),
        supabase.from('appbusinessprocessmatrix').select('*').order('name'),
        supabase.from('app_process_mapping').select('application_id, process_id')
      ]);

      if (processesRes.error) throw processesRes.error;
      if (appsRes.error) throw appsRes.error;
      if (mappingRes.error) throw mappingRes.error;

      const transformedApps = appsRes.data.map(app => {
        const processMapping = {};
        processesRes.data.forEach(process => {
          processMapping[process.name] = mappingRes.data.some(
            m => m.application_id === app.id && m.process_id === process.id
          );
        });
        return { id: app.id, name: app.name, processes: processMapping };
      });

      setProcesses(processesRes.data.map(p => p.name));
      setApplications(transformedApps);
    } catch (err) {
      console.error('Error fetching matrix data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-center">Sinkronisasi Matriks Sistem...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-800 font-black uppercase mb-2">Gagal Memuat Matriks</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button onClick={fetchData} className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg mx-auto uppercase text-xs tracking-widest">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-12">
      
      {/* 1. Header Section - CENTERED & CLEAN */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-16 border-b-4 border-secondary-500 pb-12">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight text-center">
          App - Business Process Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic text-center">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Pemetaan dukungan sistem aplikasi terhadap alur proses bisnis operasional.
        </p>
      </div>

      {/* 2. Matrix Table Section */}
      <div className="w-full max-w-[1400px] bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="sticky left-0 z-20 bg-primary-800 px-8 py-6 text-xs font-black uppercase tracking-widest text-center border-r border-primary-600 min-w-[280px] shadow-md">
                  Application \ Process
                </th>
                {processes.map((proc) => (
                  <th key={proc} className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center border-r border-primary-600 min-w-[200px] whitespace-normal leading-relaxed">
                    {proc}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-primary-50/30 transition-colors group">
                  <td className="sticky left-0 z-10 bg-white group-hover:bg-primary-50 px-8 py-6 border-r border-primary-100 shadow-sm font-black text-primary-900 uppercase tracking-tight text-sm text-center leading-tight">
                    {app.name}
                  </td>
                  {processes.map((proc) => {
                    const isChecked = app.processes[proc] === true;
                    return (
                      <td
                        key={`${app.id}-${proc}`}
                        className={`px-4 py-4 text-center border-r border-primary-50 last:border-r-0 transition-all ${
                          isChecked ? "bg-secondary-500/10" : ""
                        }`}
                      >
                        {isChecked ? (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="bg-secondary-500 text-primary-950 w-8 h-8 rounded-xl flex items-center justify-center mx-auto shadow-md shadow-secondary-500/20"
                          >
                            <Check size={20} strokeWidth={4} />
                          </motion.div>
                        ) : (
                          <span className="text-primary-100 opacity-20 text-xs">•</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Legend & Footer - CENTERED */}
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-50 p-6 rounded-[2rem] border border-primary-100 flex items-center gap-6 shadow-sm">
          <div className="p-4 bg-white rounded-2xl text-primary-600 shadow-sm">
            <LayoutGrid size={24} />
          </div>
          <div>
            <span className="block font-black text-primary-900 uppercase tracking-widest text-[10px] mb-1">Matrix Scale</span>
            <span className="text-xl font-black text-primary-700 leading-none">{applications.length} Apps × {processes.length} Processes</span>
          </div>
        </div>

        <div className="bg-secondary-50 p-6 rounded-[2rem] border border-secondary-200 flex items-center gap-6 shadow-sm text-left">
          <div className="p-4 bg-secondary-500 rounded-2xl text-primary-950 shadow-sm">
            <Check size={24} strokeWidth={3} />
          </div>
          <div>
            <span className="block font-black text-primary-950 uppercase tracking-widest text-[10px] mb-1">Functional Support</span>
            <p className="text-primary-800 text-xs font-bold italic leading-tight">Sistem aplikasi secara langsung mendukung eksekusi fungsi bisnis.</p>
          </div>
        </div>
      </div>

      {/* Helper Hint */}
      <div className="mt-12 text-center">
         <p className="text-primary-300 font-bold uppercase tracking-[0.3em] text-[9px] animate-pulse">
           EA Repository BMKG Balikpapan v2026
         </p>
      </div>

    </div>
  );
};

export default AppBusinessProcessMatrixPage;