import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

const RoadmapChart = ({ data }) => {
  const colors = { 
    'Organization': '#3b82f6', 
    'Data': '#8b5cf6', 
    'Application': '#10b981', 
    'Technology': '#f59e0b',
    'Infrastructure': '#ef4444' 
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Chart Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Calendar className="text-blue-600" size={24} />
          Timeline Implementasi Program
        </h3>
        <p className="text-sm text-gray-600">Gantt chart rencana strategis 2025-2029</p>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(colors).map(([type, color]) => (
          <div 
            key={type} 
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: color }}></div>
            <span className="text-xs font-semibold text-gray-700">{type}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <BarChart 
          layout="vertical" 
          data={data} 
          margin={{ top: 20, right: 40, left: 160, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={false} 
            stroke="#e5e7eb" 
          />
          
          <XAxis 
            type="number" 
            domain={[0, 10]} 
            tickCount={6} 
            tickFormatter={(val) => `202${5 + Math.floor(val/2)}`}
            label={{ 
              value: 'Timeline Tahunan (Renstra 2025-2029)', 
              position: 'insideBottom', 
              offset: -10, 
              fontSize: 13, 
              fontWeight: 600 
            }} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          
          <YAxis 
            type="category" 
            dataKey="name" 
            width={150} 
            tick={{ fontSize: 12, fontWeight: '600', fill: '#374151' }} 
          />
          
          <Tooltip 
            cursor={{ fill: '#f9fafb', opacity: 0.5 }} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-gray-200">
                    <p className="font-bold text-gray-900 mb-2">{d.name}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors[d.type] }}
                      ></span>
                      <p className="text-sm text-gray-600 font-semibold">{d.type}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Durasi:</span> Semester {d.start} - {d.end}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="font-semibold">Periode:</span> {Math.ceil((d.end - d.start) / 2)} tahun
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }} 
          />
          
          <Bar 
            dataKey="end" 
            minPointSize={2} 
            barSize={24} 
            radius={[0, 6, 6, 0]} 
            background={{ fill: '#f3f4f6', radius: [0, 6, 6, 0] }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[entry.type]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoadmapChart;