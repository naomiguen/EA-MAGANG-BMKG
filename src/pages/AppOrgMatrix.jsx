import React, { useState, useEffect } from "react";
import { Users, AppWindow } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

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

      // Fetch organization units
      const { data: orgUnits, error: orgError } = await supabase
        .from('organization_units')
        .select('*')
        .order('id');

      if (orgError) throw orgError;

      // Fetch applications
      const { data: apps, error: appsError } = await supabase
        .from('applications_org')
        .select('*');

      if (appsError) throw appsError;

      // Fetch mapping
      const { data: mappings, error: mappingError } = await supabase
        .from('org_app_mapping')
        .select('org_unit_id, app_id');

      if (mappingError) throw mappingError;

      // Transform data
      const transformedData = orgUnits.map(orgUnit => {
        const orgApps = mappings
          .filter(m => m.org_unit_id === orgUnit.id)
          .map(m => {
            const app = apps.find(a => a.id === m.app_id);
            return app ? app.app_name : '';
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
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-red-800 font-bold mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 pt-8 md:pt-0">
          Application - Organization Matrix
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-4">
          Pemetaan hubungan antara Unit Organisasi dengan Aplikasi sesuai SK Uraian Tugas.
        </p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Refresh Data
        </button>
      </div>

      {/* Tabel Matriks */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm uppercase tracking-wider">
                <th className="p-5 font-semibold w-1/3 border-r border-slate-700">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    Organization Unit
                  </div>
                </th>
                <th className="p-5 font-semibold w-2/3">
                  <div className="flex items-center gap-2">
                    <AppWindow size={18} />
                    Applications Used
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {matrixData.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-slate-500">
                    No data available
                  </td>
                </tr>
              ) : (
                matrixData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-slate-100 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="p-5 border-r border-slate-200 align-top">
                      <div className="font-bold text-slate-900 text-base mb-1">
                        {item.orgUnit} 
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {item.role}
                      </div>
                    </td>

                    <td className="p-5 align-top">
                      <div className="flex flex-wrap gap-2">
                        {item.applications.length === 0 ? (
                          <span className="text-slate-400 text-sm italic">No applications</span>
                        ) : (
                          item.applications.map((app, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-white border border-slate-300 text-slate-700 shadow-sm"
                            >
                              {app}
                            </span>
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

      <div className="max-w-6xl mx-auto mt-4 text-center text-sm text-slate-500">
        Total: {matrixData.length} unit organisasi
      </div>
    </div>
  );
};

export default AppOrgMatrixPage;