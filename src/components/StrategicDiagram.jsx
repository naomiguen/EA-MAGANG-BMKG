import React from 'react';
import { Settings, Database, Globe, CloudRain, Cpu, ShieldCheck, ChevronRight } from 'lucide-react';

const StrategicDiagram = () => {
  const phases = [
    {
      year: '2025',
      title: 'FOUNDATION',
      theme: 'blue',
      description: 'Penguatan Infrastruktur & Modernisasi',
      milestones: [
        { icon: Settings, label: 'Modernisasi Alat Obs.', sub: 'Radar/AWS/Seis' },
        { icon: Database, label: 'Big Data Setup', sub: 'Infrastruktur Dasar' },
        { icon: CloudRain, label: 'Revitalisasi InaTEWS', sub: 'Next-Gen EWS' }
      ]
    },
    {
      year: '2027',
      title: 'ACCELERATION',
      theme: 'teal',
      description: 'Integrasi Sistem & Otomatisasi',
      milestones: [
        { icon: Database, label: 'One Obs. Policy', sub: 'Integrasi Penuh' },
        { icon: Cpu, label: 'HPC Upgrade', sub: 'High Performance Comp.' },
        { icon: Settings, label: 'Kemandirian Alat', sub: 'TKDN > 50%' }
      ]
    },
    {
      year: '2029',
      title: 'GLOBAL PLAYER',
      theme: 'purple',
      description: 'Layanan Kelas Dunia & Kepemimpinan Global',
      milestones: [
        { icon: Globe, label: 'Global Center', sub: 'Pusat Rujukan Dunia' },
        { icon: ShieldCheck, label: 'Zero Trust Security', sub: 'Keamanan Siber' },
        { icon: CloudRain, label: 'Akurasi 94%', sub: 'Target Renstra' }
      ]
    }
  ];

  const getColor = (theme, type) => {
    const map = {
      blue: { 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        border: 'border-blue-500', 
        gradient: 'from-blue-400 to-blue-600' 
      },
      teal: { 
        bg: 'bg-teal-50', 
        text: 'text-teal-700', 
        border: 'border-teal-500', 
        gradient: 'from-teal-400 to-teal-600' 
      },
      purple: { 
        bg: 'bg-purple-50', 
        text: 'text-purple-700', 
        border: 'border-purple-500', 
        gradient: 'from-purple-400 to-purple-600' 
      }
    };
    return map[theme][type];
  };

  return (
    <div className="w-full p-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-gray-200 shadow-xl">
      <div className="relative">
        {/* SVG Background Lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '400px' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <line 
            x1="15%" y1="160" x2="85%" y2="160" 
            stroke="url(#lineGrad)" 
            strokeWidth="3" 
            strokeDasharray="10 5" 
          />
        </svg>

        {/* Main Content */}
        <div className="flex justify-between items-start relative z-10">
          {phases.map((phase, index) => (
            <div key={index} className="flex flex-col items-center w-1/3 px-3 group">
              
              {/* Year Bubble */}
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center 
                border-4 shadow-2xl bg-white mb-5 
                transition-all duration-300 transform 
                group-hover:scale-110 group-hover:shadow-2xl
                ${getColor(phase.theme, 'border')}
              `}>
                <span className={`text-2xl font-bold ${getColor(phase.theme, 'text')}`}>
                  {phase.year}
                </span>
              </div>

              {/* Phase Title Card */}
              <div className={`
                w-full text-center p-5 rounded-2xl shadow-lg border-t-4 bg-white mb-8 
                transition-all duration-300 group-hover:shadow-xl
                ${getColor(phase.theme, 'border')}
              `}>
                <h3 className={`font-bold text-xl mb-2 ${getColor(phase.theme, 'text')}`}>
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{phase.description}</p>
              </div>

              {/* Milestones */}
              <div className="space-y-4 w-full">
                {phase.milestones.map((ms, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getColor(phase.theme, 'gradient')} shadow-md`}>
                      <ms.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 leading-tight">{ms.label}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{ms.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Connector */}
              {index < phases.length - 1 && (
                <ChevronRight 
                  className="absolute top-40 text-gray-300 hidden lg:block" 
                  size={32} 
                  style={{ left: `${(index + 1) * 33.33 - 3}%` }}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom Legend */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-lg border-2 border-gray-200">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></span> 
              Foundation
            </span>
            <span className="text-gray-300">→</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></span> 
              Acceleration
            </span>
            <span className="text-gray-300">→</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></span> 
              Global Player
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDiagram;