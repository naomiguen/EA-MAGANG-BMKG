import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { AlertCircle, Loader2 } from "lucide-react";

const BusinessProcessAppMatrix = () => {
  const [processes, setProcesses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    fetchData();
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 900);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: processesData, error: processesError } = await supabase
        .from('business_processes')
        .select('*')
        .order('sort_order');

      if (processesError) throw processesError;

      const { data: appsData, error: appsError } = await supabase
        .from('appbusinessprocessmatrix')
        .select('*')
        .order('name');

      if (appsError) throw appsError;

      const { data: mappingData, error: mappingError } = await supabase
        .from('app_process_mapping')
        .select('application_id, process_id');

      if (mappingError) throw mappingError;

      const transformedProcesses = processesData.map(proc => {
        const appMapping = {};
        appsData.forEach(app => {
          const hasMapping = mappingData.some(
            m => m.application_id === app.id && m.process_id === proc.id
          );
          appMapping[app.name] = hasMapping;
        });
        return { id: proc.id, name: proc.name, apps: appMapping };
      });

      setApplications(appsData.map(a => a.name));
      setProcesses(transformedProcesses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatHeaderText = (text) => {
    const words = text.split(' ');
    const chunks = [];
    for (let i = 0; i < words.length; i += 2) {
      chunks.push(words.slice(i, i + 2).join(' '));
    }
    return chunks;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-medium animate-pulse">Memuat Matriks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md my-20 p-8 bg-red-50 rounded-3xl border border-red-100 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">Gagal Memuat Data</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button onClick={fetchData} className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section - Diperbaiki agar teks di tengah */}
        <div className="flex flex-col items-center justify-center text-center mb-12 border-b-4 border-secondary-500 pb-8">
          <h2 className="text-3xl md:text-5xl font-black text-primary-700 tracking-tight leading-tight uppercase max-w-4xl">
            Matriks Proses Bisnis & Aplikasi
          </h2>
        </div>

        {/* Table Wrapper */}
        <div className="relative overflow-x-auto rounded-3xl border border-primary-100 shadow-2xl shadow-primary-50/50">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-primary-700 text-white">
              <tr>
                <th className="sticky left-0 z-20 bg-primary-800 p-6 text-sm font-bold uppercase tracking-wider border-r border-primary-600 min-w-[250px] text-center">
                  Proses Bisnis \ Aplikasi
                </th>
                {applications.map((app) => (
                  <th key={app} className="p-4 text-center text-xs font-bold uppercase tracking-widest border-l border-primary-600 min-w-[120px]">
                    {isSmallScreen ? (
                      formatHeaderText(app).map((chunk, idx) => (
                        <span key={idx} className="block">{chunk}</span>
                      ))
                    ) : app}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-primary-50">
              {processes.map((proc) => (
                <tr key={proc.id} className="hover:bg-primary-50/30 transition-colors group">
                  <td className="sticky left-0 z-10 bg-white group-hover:bg-primary-50 font-bold text-primary-900 p-5 text-sm border-r border-primary-100 shadow-sm text-center">
                    {proc.name}
                  </td>

                  {applications.map((app) => {
                    const isChecked = proc.apps[app] === true;
                    return (
                      <td
                        key={`${proc.id}-${app}`}
                        className={`p-4 text-center border-l border-primary-50 transition-all ${
                          isChecked ? "bg-secondary-500/10" : ""
                        }`}
                      >
                        {isChecked && (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 bg-secondary-500 text-primary-950 rounded-lg flex items-center justify-center shadow-md shadow-secondary-500/20 transform scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info - Diselaraskan agar tetap rapi */}
        <div className="mt-8 flex flex-col items-center justify-center p-6 bg-primary-50 rounded-2xl border border-primary-100 text-center">
          <div className="text-primary-800 font-bold text-lg">
            Total Kapabilitas: <span className="text-primary-500">{processes.length} Proses</span> × <span className="text-primary-500">{applications.length} Aplikasi</span>
          </div>
          <div className="text-primary-700/60 text-sm font-medium mt-3 uppercase tracking-widest">
            ← Geser tabel ke samping untuk melihat detail aplikasi →
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProcessAppMatrix;