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

      {/* POP-UP MODAL - IMPROVED COLORS */}
      {isModalOpen && activeInfo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Unified Gradient Design */}
            <div className={`${activeInfo.color} p-6 text-white relative overflow-hidden`}>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shadow-lg">
                    <activeInfo.icon size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{activeInfo.title}</h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <UserCheck size={14} />
                      <span className="text-sm font-medium">{activeInfo.pic}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal Body - Unified Design */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
              {/* Description Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Deskripsi Aktivitas</h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  {activeInfo.desc}
                </p>
              </div>

              {/* Activities List - Unified Design */}
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Key Activities</h4>
                </div>
                <ul className="space-y-2.5">
                  {activeInfo.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                      <div className="mt-1.5 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer - Unified Design */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200 flex justify-end">
              
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