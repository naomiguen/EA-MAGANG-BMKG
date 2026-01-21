import React, { useState, useEffect, useMemo } from 'react';
import { X, ArrowRight, Clock, FileText, Users, Activity } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import interactionSvg from '../assets/business-interaction.drawio.svg?raw';

const BusinessInteractionPage = () => {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interactionDetails, setInteractionDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconMap = useMemo(() => ({
    'Activity': Activity,
    'FileText': FileText,
    'Users': Users,
    'ArrowRight': ArrowRight,
    'Clock': Clock
  }), []);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('business_interactions')
          .select('*')
          .order('id');

        if (fetchError) throw fetchError;

        const transformedData = {};
        data.forEach(item => {
          transformedData[item.id] = {
            title: item.title,
            source: item.source,
            target: item.target,
            type: item.type,
            icon: iconMap[item.icon] || Activity,
            desc: item.description,
            dataFormat: item.data_format,
            protocol: item.protocol,
            sla: item.sla,
            frequency: item.frequency
          };
        });

        setInteractionDetails(transformedData);
      } catch (err) {
        console.error('Error fetching interactions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [iconMap]);

  const handleDiagramClick = (e) => {
    let current = e.target;
    let foundId = null;
    let attempts = 0;
    
    while (current && attempts < 10) {
      const id = current.getAttribute ? (current.getAttribute('data-cell-id') || current.id) : null;
      
      if (id && interactionDetails[id]) {
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

  const activeInfo = activeId ? interactionDetails[activeId] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interactions...</p>
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
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Business Interaction Map</h1>
        <p className="text-gray-600">Klik alur diagram untuk melihat detail.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Refresh Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-auto">
        <div 
          id="svg-wrapper"
          className="w-full max-w-5xl mx-auto flex justify-center cursor-pointer"
          onClick={handleDiagramClick}
          dangerouslySetInnerHTML={{ __html: interactionSvg }} 
        />
      </div>

      {isModalOpen && activeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-900 text-white p-4 flex justify-between">
              <h3 className="font-bold">{activeInfo.title}</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between bg-blue-50 p-3 rounded">
                <span className="font-bold text-blue-900">{activeInfo.source}</span>
                <span>➝</span>
                <span className="font-bold text-blue-900">{activeInfo.target}</span>
              </div>
              <p className="text-sm text-gray-700">{activeInfo.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="bg-gray-100 p-2 rounded">
                    <div className="text-xs text-gray-500 font-bold uppercase">Protokol</div>
                    <div className="text-sm font-semibold">{activeInfo.protocol}</div>
                 </div>
                 <div className="bg-gray-100 p-2 rounded">
                    <div className="text-xs text-gray-500 font-bold uppercase">SLA</div>
                    <div className="text-sm font-semibold">{activeInfo.sla}</div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessInteractionPage;