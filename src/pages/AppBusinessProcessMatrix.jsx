import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AppBusinessProcessMatrixPage = () => {
  const [processes, setProcesses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch business processes (sorted)
      const { data: processesData, error: processesError } = await supabase
        .from('business_processes')
        .select('*')
        .order('sort_order');

      if (processesError) throw processesError;

      // Fetch applications
      const { data: appsData, error: appsError } = await supabase
        .from('appbusinessprocessmatrix')
        .select('*')
        .order('name');

      if (appsError) throw appsError;

      // Fetch app-process mapping
      const { data: mappingData, error: mappingError } = await supabase
        .from('app_process_mapping')
        .select('application_id, process_id');

      if (mappingError) throw mappingError;

      // Transform data untuk aplikasi dengan proses mapping
      const transformedApps = appsData.map(app => {
        const processMapping = {};
        
        processesData.forEach(process => {
          const hasMapping = mappingData.some(
            m => m.application_id === app.id && m.process_id === process.id
          );
          processMapping[process.name] = hasMapping;
        });

        return {
          id: app.id,
          name: app.name,
          processes: processMapping
        };
      });

      setProcesses(processesData.map(p => p.name));
      setApplications(transformedApps);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Komponen Checkmark
  const CheckmarkImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mx-auto text-gray-800"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
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

  // Main render
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Matriks Aplikasi & Proses Bisnis
          </h2>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh Data
          </button>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-gray-900 sticky left-0 bg-gray-100 z-10 shadow-sm border-r border-gray-200 whitespace-nowrap"
                >
                  Application \ Process
                </th>
                {processes.map((proc) => (
                  <th
                    key={proc}
                    scope="col"
                    className="px-4 py-3 text-center min-w-[200px] border-r border-gray-300 whitespace-nowrap"
                  >
                    {proc}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-100 shadow-sm">
                    {app.name}
                  </td>

                  {processes.map((proc) => {
                    const isChecked = app.processes[proc] === true;
                    return (
                      <td
                        key={`${app.id}-${proc}`}
                        className={`px-4 py-4 text-center border-r border-gray-200 last:border-r-0 ${
                          isChecked ? "bg-green-100" : "bg-white"
                        }`}
                      >
                        {isChecked ? <CheckmarkImage /> : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Total: {applications.length} aplikasi × {processes.length} proses bisnis
        </div>
      </div>
    </div>
  );
};

export default AppBusinessProcessMatrixPage;