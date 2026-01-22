import React, { useState } from 'react';
import { Calendar, ChevronRight, Activity } from 'lucide-react';
import RoadmapPage from './RoadmapPage';
import GapAnalysisPage from './GapAnalysisPage';
import KpiDashboard from '../components/KpiDashboard';
import { getStrategicMetrics, getRoadmapData, getChartData, getGapAnalysisData } from '../services/ImplementationData';

const ImplementationHub = () => {
  const [currentPage, setCurrentPage] = useState('hub');
  
  const strategicMetrics = getStrategicMetrics();
  const roadmapData = getRoadmapData();
  const chartData = getChartData();
  const gapData = getGapAnalysisData();

  const sections = [
    {
      id: 'roadmap',
      title: 'Strategic Roadmap',
      description: 'Peta jalan transformasi menuju "Global Player" (2025-2029)',
      icon: Calendar,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      bgLight: 'bg-blue-50',
      page: 'roadmap',
      subsections: [
        'Foundation Phase (2025)',
        'Acceleration Phase (2027)',
        'Global Leadership (2029)',
        'Modernisasi Infrastruktur'
      ]
    },
    {
      id: 'gap-analysis',
      title: 'Gap & Needs Analysis',
      description: 'Analisis kesenjangan kapasitas MKG Nasional vs Global',
      icon: Activity,
      color: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700',
      bgLight: 'bg-teal-50',
      page: 'gap',
      subsections: [
        'Kemandirian Teknologi (TKDN)',
        'Integrasi One Data Policy',
        'Kapasitas High Performance Computing',
        'Kompetensi SDM Advanced'
      ]
    }
  ];

  // Route to different pages
  if (currentPage === 'roadmap') {
    return (
      <RoadmapPage 
        onBack={() => setCurrentPage('hub')} 
        roadmapData={roadmapData}
        chartData={chartData}
      />
    );
  }
  
  if (currentPage === 'gap') {
    return (
      <GapAnalysisPage 
        onBack={() => setCurrentPage('hub')} 
        gapData={gapData}
      />
    );
  }

  // Main Hub Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 font-sans pb-12">
      {/* HERO SECTION */}
      <div className="pb-12 pt-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Implementation Planning 
          </h1>
          <p className="text-gray-600 text-lg">
            Monitoring Rencana Strategis BMKG 2025-2029
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* KPI DASHBOARD */}
        <KpiDashboard metrics={strategicMetrics} />

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                className="group bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer border-2 border-slate-100 hover:border-blue-200"
                onClick={() => setCurrentPage(section.page)}
              >
                {/* Card Header */}
                <div className={`${section.bgLight} p-8 border-b-2 border-slate-100 relative overflow-hidden`}>
                  <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${section.color} opacity-10 transition-transform group-hover:scale-150`}></div>
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`p-4 ${section.color} rounded-xl text-white shadow-lg ring-4 ring-white`}>
                      <IconComponent size={28} />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                    {section.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <div className="space-y-3 mb-8">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 group/item">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-teal-500"></div>
                        <span className="group-hover/item:text-gray-900 transition-colors font-medium">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className={`w-full ${section.color} ${section.hoverColor} text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between transition-all shadow-md group-hover:shadow-lg`}
                  >
                    <span>Akses Detail</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t-2 border-gray-200 pt-8">
          <p className="text-gray-500 text-xs">
            Berdasarkan Dokumen Peraturan BMKG No. 5 Tahun 2025 tentang Renstra 2025-2029.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImplementationHub;