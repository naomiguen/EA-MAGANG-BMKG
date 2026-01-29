import React, { useState } from "react";

import KPIMatrixTeknisi from "../assets/BusinessProcess-KPIMatrix-Teknisi.svg";
import KPIMatrixDatin from "../assets/BusinessProcess-KPIMatrix-Datin.svg";
import KPIMatrixObservasi from "../assets/BusinessProcess-KPIMatrix-Observasi.svg";
import KPIMatrixTU from "../assets/BusinessProcess-KPIMatrix-TU.svg";
import KPIMatrixWMM from "../assets/BusinessProcess-KPIMatrix-WMM.svg";

const kpimatrixItems = [
  { title: "Teknisi", image: KPIMatrixTeknisi },
  { title: "Datin", image: KPIMatrixDatin },
  { title: "Observasi", image: KPIMatrixObservasi },
  { title: "TU", image: KPIMatrixTU },
  { title: "WMM", image: KPIMatrixWMM },
];

const BusinessProcessKPIMatrixPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-8 py-6">
            <h1 className="text-center text-3xl font-bold text-white tracking-wide">
              Business Process - KPI Matrix
            </h1>
            <p className="text-center text-slate-200 mt-2 text-sm">
              Pilih departemen untuk melihat KPI Matrix
            </p>
          </div>

          {/* KPI Cards Grid */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {kpimatrixItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="group relative overflow-hidden bg-red-50 border-2 border-red-300 rounded-xl p-6 
                        hover:bg-red-100 hover:border-red-500 hover:shadow-xl transition-all duration-300 
                        transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"

                >
                  {/* Subtle background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex flex-col items-center justify-center h-full min-h-[80px]">
                    <span className="text-slate-700 font-semibold text-center group-hover:text-slate-900 transition-colors">
                      {item.title}
                    </span>
                    <div className="mt-2 w-8 h-0.5 bg-slate-300 group-hover:bg-slate-600 group-hover:w-12 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                KPI Matrix {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white hover:text-red-300 transition-colors duration-200 
                         w-8 h-8 flex items-center justify-center rounded-full 
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[80vh] overflow-auto">
              <img
                src={selectedItem.image}
                alt={`KPI Matrix ${selectedItem.title}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProcessKPIMatrixPage;