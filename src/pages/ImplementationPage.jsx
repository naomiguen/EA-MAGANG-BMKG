import React, { useState } from 'react';
import { Calendar, ChevronRight, Activity, Target, LayoutDashboard, FileText } from 'lucide-react';
import RoadmapPage from './RoadmapPage';
import GapAnalysisPage from './GapAnalysisPage';
import KpiDashboard from '../components/KpiDashboard';
import { getStrategicMetrics, getRoadmapData, getChartData, getGapAnalysisData } from '../services/ImplementationData';
import { motion } from 'framer-motion';

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
      description: 'Peta jalan transformasi menuju "Global Player" BMKG (Periode 2025-2029).',
      icon: Calendar,
      color: 'bg-primary-700',
      hoverColor: 'hover:bg-primary-800',
      bgLight: 'bg-primary-50',
      page: 'roadmap',
      subsections: [
        'Foundation Phase (2025)',
        'Acceleration Phase (2027)',
        'Global Leadership (2029)',
        'Modernisasi Infrastruktur MKG'
      ]
    },
    {
      id: 'gap-analysis',
      title: 'Gap & Needs Analysis',
      description: 'Analisis komprehensif kesenjangan kapasitas MKG Nasional vs Standar Global.',
      icon: Activity,
      color: 'bg-secondary-600',
      hoverColor: 'hover:bg-secondary-700',
      bgLight: 'bg-secondary-50',
      page: 'gap',
      subsections: [
        'Kemandirian Teknologi (TKDN)',
        'Integrasi One Data Policy',
        'Kapasitas High Performance Computing',
        'Kompetensi SDM Advanced'
      ]
    }
  ];

  if (currentPage === 'roadmap') {
    return <RoadmapPage onBack={() => setCurrentPage('hub')} roadmapData={roadmapData} chartData={chartData} />;
  }
  
  if (currentPage === 'gap') {
    return <GapAnalysisPage onBack={() => setCurrentPage('hub')} gapData={gapData} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* 1. HERO SECTION - CENTERED */}
      <div className="pt-16 pb-12 px-6 flex flex-col items-center">
        <div className="max-w-4xl text-center border-b-4 border-secondary-500 pb-10 w-full">
          <div className="flex items-center justify-center gap-3 mb-4 text-primary-700">
            <LayoutDashboard size={32} className="text-secondary-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Implementation Planning</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
            Implementation Hub
          </h1>
          <p className="text-primary-800 text-lg md:text-xl font-bold italic opacity-80 uppercase tracking-widest">
            Monitoring & Eksekusi Rencana Strategis BMKG 2025-2029
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* 2. KPI DASHBOARD SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-secondary-500" size={24} />
            <h3 className="font-black text-primary-900 uppercase tracking-widest text-sm">Strategic Performance Metrics</h3>
          </div>
          <KpiDashboard metrics={strategicMetrics} />
        </div>

        {/* 3. MAIN NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={section.id}
                className="group bg-white rounded-[2.5rem] shadow-2xl shadow-primary-900/5 overflow-hidden border border-primary-100 hover:border-secondary-400 transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => setCurrentPage(section.page)}
              >
                {/* Card Header */}
                <div className={`${section.bgLight} p-10 border-b border-primary-50 relative overflow-hidden`}>
                  <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${section.color} opacity-5 transition-transform group-hover:scale-150 duration-700`}></div>
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className={`p-5 ${section.color} rounded-2xl text-white shadow-xl shadow-primary-900/20 group-hover:rotate-6 transition-transform`}>
                      <IconComponent size={32} />
                    </div>
                    <span className="text-[10px] font-black text-primary-300 uppercase tracking-[0.2em]">Module {index + 1}</span>
                  </div>
                  
                  <h2 className="text-3xl font-black text-primary-950 mb-3 relative z-10 uppercase tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-primary-800/60 text-sm font-medium leading-relaxed relative z-10 italic">
                    "{section.description}"
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-10 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 gap-4 mb-10 flex-1">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-sm group/item bg-slate-50 p-3 rounded-xl border border-transparent hover:border-primary-100 transition-all">
                        <div className="w-2 h-2 rounded-full bg-secondary-500 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                        <span className="text-primary-900 font-bold uppercase tracking-tight text-xs leading-none">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className={`w-full ${section.color} ${section.hoverColor} text-white font-black uppercase text-xs tracking-widest py-5 px-8 rounded-2xl flex items-center justify-between transition-all shadow-lg shadow-primary-900/10 active:scale-95`}
                  >
                    <span>Analisis Detail Arsitektur</span>
                    <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. FOOTER & COMPLIANCE - CENTERED */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-200 mb-6 shadow-inner">
             <FileText size={16} className="text-primary-400" />
             <p className="text-primary-900/50 text-[10px] font-black uppercase tracking-widest leading-none">
               Dokumen Resmi Perka BMKG No. 5 Tahun 2025 • Renstra 2025-2029
             </p>
          </div>
          <div className="flex justify-center gap-4 opacity-20 grayscale">
             {/* Mock logo placeholders for compliance symbols if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationHub;