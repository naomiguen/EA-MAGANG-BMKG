import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "./css/BusinessAppMatrix.css";

const BusinessProcessAppMatrix = () => {
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

      // Fetch business processes (sorted) - MENGGUNAKAN TABEL YANG SAMA
      const { data: processesData, error: processesError } = await supabase
        .from('business_processes')
        .select('*')
        .order('sort_order');

      if (processesError) throw processesError;

      // Fetch applications - MENGGUNAKAN TABEL YANG SAMA
      const { data: appsData, error: appsError } = await supabase
        .from('appbusinessprocessmatrix')
        .select('*')
        .order('name');

      if (appsError) throw appsError;

      // Fetch app-process mapping - MENGGUNAKAN TABEL YANG SAMA
      const { data: mappingData, error: mappingError } = await supabase
        .from('app_process_mapping')
        .select('application_id, process_id');

      if (mappingError) throw mappingError;

      // Transform data untuk proses dengan aplikasi mapping (ORIENTASI TERBALIK)
      const transformedProcesses = processesData.map(proc => {
        const appMapping = {};
        
        appsData.forEach(app => {
          const hasMapping = mappingData.some(
            m => m.application_id === app.id && m.process_id === proc.id
          );
          appMapping[app.name] = hasMapping;
        });

        return {
          id: proc.id,
          name: proc.name,
          apps: appMapping
        };
      });

      setApplications(appsData.map(a => a.name));
      setProcesses(transformedProcesses);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CheckmarkImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="checkmark-icon"
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

  if (loading) {
    return (
      <div className="app-matrix-page app-matrix-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-matrix-page app-matrix-error-page">
        <div className="error-container">
          <h3 className="error-title">Error Loading Data</h3>
          <p className="error-message">{error}</p>
          <button
            onClick={fetchData}
            className="error-retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-matrix-page">
      <div className="app-matrix-container">
        <div className="app-matrix-header">
          <h2 className="app-matrix-title">
            Matriks Proses Bisnis & Aplikasi
          </h2>
          <button
            onClick={fetchData}
            className="refresh-button"
          >
            Refresh Data
          </button>
        </div>

        <div className="app-matrix-table-wrapper">
          <table className="app-matrix-table">
            <thead className="app-matrix-thead">
              <tr>
                <th className="app-matrix-corner-header">
                  Process \ Application
                </th>
                {applications.map((app) => (
                  <th
                    key={app}
                    className="app-matrix-column-header"
                  >
                    {app}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="app-matrix-tbody">
              {processes.map((proc) => (
                <tr key={proc.id} className="app-matrix-row">
                  <td className="app-matrix-row-header">
                    {proc.name}
                  </td>

                  {applications.map((app) => {
                    const isChecked = proc.apps[app] === true;
                    return (
                      <td
                        key={`${proc.id}-${app}`}
                        className={`app-matrix-cell ${isChecked ? "app-matrix-cell-checked" : ""}`}
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

        <div className="app-matrix-footer">
          Total: {processes.length} proses bisnis × {applications.length} aplikasi
        </div>
      </div>
    </div>
  );
};

export default BusinessProcessAppMatrix;