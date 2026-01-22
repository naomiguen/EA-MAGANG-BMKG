import React from 'react';
import { ArrowLeft, Calendar, CheckCircle, Target, Layers, Map } from 'lucide-react';
import StrategicDiagram from '../components/StrategicDiagram';
import RoadmapChart from '../components/RoadmapChart';

const RoadmapPage = ({ onBack, roadmapData, chartData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 font-sans p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm text-blue-600 hover:shadow-md"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* <Target className="text-blue-600" size={28} /> */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Strategic Roadmap</h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">Visualisasi Alur Transformasi BMKG 2025-2029</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">3 Fase</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">5 Tahun</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">18 Inisiatif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* SECTION 1: VISUAL DIAGRAM */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-5 md:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-teal-50 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Map size={22} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Diagram Fase Transformasi</h2>
              <p className="text-xs text-gray-600">Timeline visual perjalanan strategis</p>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <StrategicDiagram />
          </div>
        </div>

        {/* SECTION 2: GANTT CHART */}
        <RoadmapChart data={chartData} />

        {/* SECTION 3: DETAIL BREAKDOWN */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <Layers size={22} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Detail Rencana Aksi</h3>
              <p className="text-sm text-gray-600">Breakdown implementasi per fase</p>
            </div>
          </div>
          
          <div className="relative border-l-4 border-gray-200 ml-4 md:ml-8 space-y-10 pb-8 mt-8">
            {roadmapData.map((phase, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-lg z-10 ${phase.color} group-hover:scale-125 transition-transform`}></div>
                
                <div className="flex flex-col gap-4">
                  {/* Year & Phase Info */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div className="flex-1">
                        <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold text-white mb-3 shadow-sm ${phase.color}`}>
                          Tahun {phase.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{phase.phase}</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{phase.description}</p>
                      </div>
                      <Calendar className="text-gray-400" size={24} />
                    </div>
                  </div>

                  {/* Task List */}
                  <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle size={18} className="text-teal-500" />
                      <span className="text-sm font-semibold text-gray-700">Inisiatif Utama</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all border border-gray-100 hover:border-blue-200 hover:shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-2"></div>
                          <span className="text-sm text-gray-700 font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-center text-white">
          <p className="text-sm md:text-base font-medium">
            Target Akhir: <span className="font-bold">Akurasi Prediksi 94%</span> | Status: <span className="font-bold">Global Center of Excellence</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;