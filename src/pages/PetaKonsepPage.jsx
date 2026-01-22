import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { 
  ArrowLeft, X, Info, CheckCircle, Activity, 
  FileText, Database, Settings, Users, CloudRain,
  Package, Shield, UserCheck, Plane
} from 'lucide-react';
import petaKonsepSvg from '../assets/peta_konsep.drawio.svg?raw';

// Icon mapping untuk dynamic icon rendering
const iconMap = {
  Plane,
  Shield,
  UserCheck,
  Users,
  CloudRain,
  Settings,
  Activity,
  Database,
  CheckCircle,
  FileText,
  Package
};

const PetaKonsepPage = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processDetails, setProcessDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data dari Supabase
    const fetchProcessData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch nodes
        const { data: nodesData, error: nodesError } = await supabase
          .from('peta_konsep_nodes')
          .select('*')
          .order('sort_order');

        if (nodesError) throw nodesError;

        // Fetch activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('peta_konsep_activities')
          .select('*')
          .order('sort_order');

        if (activitiesError) throw activitiesError;

        // Transform data ke format yang sama dengan processDetails
        const transformedData = {};
        
        nodesData.forEach(node => {
          const nodeActivities = activitiesData
            .filter(act => act.node_id === node.id)
            .map(act => act.activity_text);

          transformedData[node.id] = {
            title: node.title,
            icon: iconMap[node.icon_name] || FileText,
            color: node.color_class,
            desc: node.description,
            items: nodeActivities,
            pic: node.pic
          };
        });

        setProcessDetails(transformedData);
      } catch (err) {
        console.error('Error fetching process data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, []);

  // LOGIKA KLIK DIAGRAM 
  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      if (id && processDetails[id]) {
        foundId = id;
        break; 
      }
      
      if (current.id === 'svg-wrapper') break;
      current = current.parentNode;
      attempts++;
    }

    if (foundId) {
      setActiveId(foundId);
      setIsModalOpen(true);
    }
  };

  const activeInfo = activeId ? processDetails[activeId] : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data peta konsep...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold mb-2">Error Loading Data</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-8">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors shadow-sm flex-shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center flex-1"> 
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Peta Konsep Proses Bisnis</h1>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1">Visualisasi Alur Kerja BMKG Stasiun Balikpapan</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors shadow-sm flex-shrink-0"
            title="Refresh Data"
          >
            <Activity size={20} />
          </button>
        </div>
      </div>

      {/* CONTAINER DIAGRAM */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative flex flex-col">
        
        {/* Banner Info */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center gap-2 text-blue-700 text-sm">
          <Info size={18} />
          <span className="font-medium">Klik pada blok diagram untuk melihat detail aktivitas. Gunakan scroll untuk melihat diagram secara lengkap.</span>
        </div>

        {/* AREA RENDER SVG */}
        <div className="flex-1 p-8 overflow-auto bg-slate-50/30 flex justify-center items-center">
          <div 
            id="svg-wrapper"
            className="w-full max-w-6xl mx-auto flex justify-center cursor-pointer 
                       [&>svg]:w-full [&>svg]:h-auto [&>svg]:drop-shadow-sm"
            onClick={handleDiagramClick}
            dangerouslySetInnerHTML={{ __html: petaKonsepSvg }} 
          />
        </div>
      </div>

      {/* POP-UP MODAL */}
      {isModalOpen && activeInfo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${activeInfo.color} p-6 text-white flex justify-between items-start`}>
              <div className="flex gap-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <activeInfo.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{activeInfo.title}</h3>
                  <p className="text-white/80 text-xs mt-1 uppercase tracking-wider font-semibold">
                    PIC: {activeInfo.pic}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Deskripsi Aktivitas</h4>
                <p className="text-gray-700 leading-relaxed text-sm border-l-4 border-gray-200 pl-3">
                  {activeInfo.desc}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Key Activities / Items
                </h4>
                <ul className="space-y-2">
                  {activeInfo.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 bg-white p-2 rounded shadow-sm border border-gray-100">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-up { animation: scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

    </div>
  );
};

export default PetaKonsepPage;