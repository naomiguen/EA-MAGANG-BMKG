import React, { useState, useEffect } from "react";
import { Users, AppWindow, Loader2, AlertCircle, RefreshCw, Info, Building2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

const AppOrgMatrixPage = () => {
  const [matrixData, setMatrixData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [orgRes, appsRes, mappingRes] = await Promise.all([
        supabase.from('organization_units').select('*').order('id'),
        supabase.from('applications_org').select('*'),
        supabase.from('org_app_mapping').select('org_unit_id, app_id')
      ]);

      if (orgRes.error) throw orgRes.error;
      if (appsRes.error) throw appsRes.error;
      if (mappingRes.error) throw mappingRes.error;

      const transformedData = orgRes.data.map(orgUnit => {
        const orgApps = mappingRes.data
          .filter(m => m.org_unit_id === orgUnit.id)
          .map(m => {
            const app = appsRes.data.find(a => a.id === m.app_id);
            return app ? app.app_name : null;
          })
          .filter(Boolean);

        return {
          id: orgUnit.id,
          orgUnit: orgUnit.org_unit,
          role: orgUnit.role,
          applications: orgApps
        };
      });

      setMatrixData(transformedData);
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
        <p className="font-black uppercase tracking-widest text-center">Sinkronisasi Matriks Organisasi...</p>
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
      
      {/* 1. Header Section - CENTERED */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-16 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight text-center">
          App - Organization Matrix
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic text-center">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Pemetaan Unit Organisasi terhadap Penggunaan Sistem Aplikasi Operasional.
        </p>
      </div>

      {/* 2. Matrix Container */}
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-700 text-white border-b-4 border-secondary-500">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest border-r border-primary-600 w-1/3">
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="text-secondary-500" />
                    Unit Organisasi
                  </div>
                </th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest w-2/3">
                  <div className="flex items-center gap-3">
                    <AppWindow size={18} className="text-secondary-500" />
                    Aplikasi yang Digunakan
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50 text-sm">
              {matrixData.length === 0 ? (
                <tr>
                  <td colSpan="2" className="px-8 py-20 text-center text-primary-300 font-black uppercase italic">
                    Data pemetaan belum tersedia
                  </td>
                </tr>
              ) : (
                matrixData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-primary-50/30 transition-colors group">
                    <td className="px-8 py-6 border-r border-primary-50 align-top">
                      <div className="font-black text-primary-900 uppercase tracking-tight text-base mb-1">
                        {item.orgUnit}
                      </div>
                      <div className="text-[10px] font-black text-secondary-600 uppercase tracking-widest flex items-center gap-1">
                        <Users size={12} /> {item.role}
                      </div>
                    </td>

                    <td className="px-8 py-6 align-top">
                      <div className="flex flex-wrap gap-2">
                        {item.applications.length === 0 ? (
                          <span className="text-primary-300 italic text-xs font-bold uppercase tracking-wider px-3 py-1">
                            • No Applications Assigned
                          </span>
                        ) : (
                          item.applications.map((app, idx) => (
                            <motion.span 
                              whileHover={{ y: -2 }}
                              key={idx} 
                              className="inline-flex items-center px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tight bg-white border-2 border-primary-100 text-primary-700 shadow-sm group-hover:border-primary-300 transition-all"
                            >
                              {app}
                            </motion.span>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Legend & Summary - CENTERED */}
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-50 p-6 rounded-[2rem] border border-primary-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-600">
              <Building2 size={24} />
            </div>
            <span className="font-black text-primary-900 uppercase tracking-widest text-[10px]">Total Unit Kerja</span>
          </div>
          <span className="text-3xl font-black text-primary-700 leading-none">{matrixData.length}</span>
        </div>

        <div className="bg-secondary-50 p-6 rounded-[2rem] border border-secondary-200 flex items-center gap-4 shadow-sm text-left">
           <div className="p-3 bg-white rounded-2xl shadow-sm text-secondary-600">
              <Info size={24} />
            </div>
            <div>
              <span className="font-black text-primary-900 uppercase tracking-widest text-[10px] block mb-1">Keterangan Relasi</span>
              <p className="text-primary-800 text-[11px] font-bold italic leading-tight">
                Hubungan didasarkan pada hak akses sistem sesuai dengan uraian tugas fungsional masing-masing unit.
              </p>
            </div>
        </div>
      </div>

      {/* Helper Hint */}
      <div className="mt-12 text-center text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Enterprise Architecture Repository v2026 - BMKG Balikpapan
      </div>
    </div>
  );
};

export default AppOrgMatrixPage;