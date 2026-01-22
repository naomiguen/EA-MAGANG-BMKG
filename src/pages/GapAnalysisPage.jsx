import React from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, Hammer, Search, Activity } from 'lucide-react';

const GapAnalysisPage = ({ onBack, gapData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 font-sans p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl hover:from-teal-100 hover:to-teal-200 transition-all shadow-sm text-teal-600"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* <Activity className="text-teal-600" size={28} /> */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gap Analysis Report</h1>
              </div>
              <p className="text-gray-600">Identifikasi kesenjangan menuju Visi Global Player 2029</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  {gapData.filter(g => g.impact === 'Critical').length} Critical
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                  {gapData.filter(g => g.impact === 'High').length} High Priority
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gap Analysis Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="p-6 border-b-2 border-gray-100 bg-gradient-to-r from-teal-50 to-blue-50">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Search size={20} className="text-teal-600" />
                As-Is vs To-Be Evaluation
              </h3>
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-bold border border-red-200">
                High Priority Items
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-5 font-bold">Area Strategis</th>
                  <th className="px-6 py-5 font-bold">Kondisi Saat Ini (2024)</th>
                  <th className="px-6 py-5 font-bold">Target Renstra (2029)</th>
                  <th className="px-6 py-5 font-bold">Rencana Aksi</th>
                  <th className="px-6 py-5 text-center font-bold">Urgensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {gapData.map((gap, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-6 font-bold text-gray-900 w-1/6">{gap.area}</td>
                    
                    <td className="px-6 py-6 w-1/4">
                      <div className="flex gap-3">
                        {/* <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" /> */}
                        <p className="text-gray-700 leading-relaxed">{gap.current}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-6 w-1/4">
                      <div className="flex gap-3 bg-green-50 p-4 rounded-xl border-2 border-green-200">
                        {/* <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> */}
                        <p className="text-gray-800 font-semibold leading-relaxed">{gap.target}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-6 w-1/5">
                      <div className="flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-3 py-2 rounded-lg">
                        {/* <Hammer size={16} />  */}
                        <span>{gap.action}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-6 text-center">
                      <span className={`inline-flex px-4 py-2 rounded-xl text-sm font-bold border-2 ${
                        gap.impact === 'Critical' ? 'bg-red-100 text-red-800 border-red-300' :
                        gap.impact === 'High' ? 'bg-orange-100 text-orange-800 border-orange-300' : 
                        'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {gap.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapAnalysisPage;