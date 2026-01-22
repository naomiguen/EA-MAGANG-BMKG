import React from 'react';
import { Target, TrendingUp, Award, Zap } from 'lucide-react';

const KpiDashboard = ({ metrics }) => {
  const icons = {
    'Akurasi Info Cuaca': Target,
    'Nilai Reformasi Birokrasi': Award,
    'Indeks Kepuasan Masyarakat': TrendingUp,
    'Kemandirian Teknologi': Zap
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressGradient = (percentage) => {
    if (percentage >= 90) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (percentage >= 70) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    if (percentage >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((m, idx) => {
        const Icon = icons[m.metric] || Target;
        const percentage = Math.min((m.current / m.target) * 100, 100);
        const statusColor = getStatusColor(percentage);
        const progressGradient = getProgressGradient(percentage);

        return (
          <div 
            key={idx} 
            className="group bg-white p-6 rounded-2xl shadow-md border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                  Target 2029
                </span>
              </div>
            </div>
            
            {/* Metric Title */}
            <h4 className="text-gray-700 font-semibold text-sm mb-3 leading-tight">
              {m.metric}
            </h4>
            
            {/* Current vs Target Values */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className={`text-3xl font-bold ${statusColor} transition-colors`}>
                {m.current}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                / {m.target} {m.unit}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${progressGradient}`}
                style={{ width: `${percentage}%` }}
              ></div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
            </div>
            
            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed">
              {m.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default KpiDashboard;