import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import petaKonsepSvg from '../assets/communicationDiagram.drawio.svg?raw';

const DiagramArsitektur = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [appDetails, setAppDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppDetails();
  }, []);

  const fetchAppDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: apps, error: appsError } = await supabase
        .from('application_details')
        .select('*');

      if (appsError) throw appsError;

      const { data: fields, error: fieldsError } = await supabase
        .from('application_detail_fields')
        .select('*')
        .order('display_order');

      if (fieldsError) throw fieldsError;

      const transformedData = {};
      
      apps.forEach(app => {
        const appFields = fields.filter(f => f.app_id === app.id);
        
        const details = {};
        appFields.forEach(field => {
          if (field.field_type === 'list') {
            if (!details[field.field_name]) {
              details[field.field_name] = [];
            }
            details[field.field_name].push(field.field_value);
          } else {
            details[field.field_name] = field.field_value;
          }
        });

        transformedData[app.id] = {
          title: app.title,
          type: app.type,
          desc: app.description,
          color: app.color,
          details: details
        };
      });

      setAppDetails(transformedData);
    } catch (err) {
      console.error('Error fetching app details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      if (id && appDetails[id]) {
        foundId = id;
        console.log("Klik terdeteksi pada:", foundId);
        break; 
      }
      
      if (current.id === 'svg-wrapper') break;
      
      current = current.parentNode;
      attempts++;
    }

    if (foundId) {
      setSelectedApp(appDetails[foundId]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-red-800 font-bold mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchAppDetails}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
          Application Communication Diagram
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Klik pada kotak sistem untuk melihat detail.</p>
        <button
          onClick={fetchAppDetails}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Refresh Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 overflow-auto">
        <div 
          id="svg-wrapper"
          className="w-full max-w-6xl mx-auto flex justify-center cursor-pointer"
          onClick={handleDiagramClick}
          dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
        />
      </div>

      {selectedApp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
          onClick={() => setSelectedApp(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-4 sm:p-6 text-white flex justify-between items-start"
              style={{ backgroundColor: selectedApp.color }}
            >
              <div className="flex-1">
                <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold uppercase tracking-wider mb-2">
                  {selectedApp.type}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {selectedApp.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 ml-2 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed border-b pb-4">
                {selectedApp.desc}
              </p>

              <div className="space-y-4">
                {selectedApp.details.fungsi && (
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase mb-2">Fungsi Utama</h3>
                    <p className="text-slate-700 text-sm">{selectedApp.details.fungsi}</p>
                  </div>
                )}

                {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima) && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">
                      {selectedApp.details.dataYangDisediakan ? "Data & Informasi" : "Output Sistem"}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(selectedApp.details.dataYangDisediakan || selectedApp.details.outputYangDiterima).map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="mr-2 text-blue-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedApp.details.fiturUtama && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">Fitur Unggulan</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.details.fiturUtama.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApp.details.alasanIntegrasi && (
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm uppercase mb-3">Alasan Integrasi</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedApp.details.alasanIntegrasi.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="mr-2 text-blue-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedApp.details.metodeAkses && (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-400">
                      <div className="font-semibold text-blue-900 text-xs uppercase mb-1">Metode Akses</div>
                      <div className="text-blue-700 text-sm">{selectedApp.details.metodeAkses}</div>
                    </div>
                  )}
                  {selectedApp.details.frekuensiUpdate && (
                    <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-400">
                      <div className="font-semibold text-green-900 text-xs uppercase mb-1">Frekuensi Update</div>
                      <div className="text-green-700 text-sm">{selectedApp.details.frekuensiUpdate}</div>
                    </div>
                  )}
                  {selectedApp.details.target && (
                    <div className="bg-indigo-50 p-3 rounded-lg border-l-2 border-indigo-400">
                      <div className="font-semibold text-indigo-900 text-xs uppercase mb-1">Target Pengguna</div>
                      <div className="text-indigo-700 text-sm">{selectedApp.details.target}</div>
                    </div>
                  )}
                  {selectedApp.details.metodeIntegrasi && (
                    <div className="bg-orange-50 p-3 rounded-lg border-l-2 border-orange-400">
                      <div className="font-semibold text-orange-900 text-xs uppercase mb-1">Metode Integrasi</div>
                      <div className="text-orange-700 text-sm">{selectedApp.details.metodeIntegrasi}</div>
                    </div>
                  )}
                  {selectedApp.details.statusPenggunaan && (
                    <div className="bg-amber-50 p-3 rounded-lg border-l-2 border-amber-400">
                      <div className="font-semibold text-amber-900 text-xs uppercase mb-1">Status</div>
                      <div className="text-amber-700 text-sm">{selectedApp.details.statusPenggunaan}</div>
                    </div>
                  )}
                  {selectedApp.details.audiensTarget && (
                    <div className="bg-teal-50 p-3 rounded-lg border-l-2 border-teal-400">
                      <div className="font-semibold text-teal-900 text-xs uppercase mb-1">Audiens</div>
                      <div className="text-teal-700 text-sm">{selectedApp.details.audiensTarget}</div>
                    </div>
                  )}
                  {selectedApp.details.teknologi && (
                    <div className="bg-purple-50 p-3 rounded-lg border-l-2 border-purple-400">
                      <div className="font-semibold text-purple-900 text-xs uppercase mb-1">Teknologi</div>
                      <div className="text-purple-700 text-sm">{selectedApp.details.teknologi}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default DiagramArsitektur;