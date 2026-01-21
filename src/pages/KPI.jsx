import React, { useState } from "react";

import KPITeknisi from "../assets/KPI-Teknisi.svg";
import KPIDatin from "../assets/KPI-Datin.svg";
import KPIObservasi from "../assets/KPI-Observasi.svg";
import KPITU from "../assets/KPI-TU.svg";
import KPIWMM from "../assets/KPI-WMM.svg";

const kpiItems = [
  { title: "Teknisi", image: KPITeknisi },
  { title: "Datin", image: KPIDatin },
  { title: "Observasi", image: KPIObservasi },
  { title: "TU", image: KPITU },
  { title: "WMM", image: KPIWMM },
];

const KPIpage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="p-10">
      <div className="border border-gray-400 rounded-lg p-8">
        <h1 className="text-center text-2xl font-bold mb-10">KPI</h1>

        <div className="flex justify-center gap-6 flex-wrap">
          {kpiItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer w-40 h-20 bg-green-100 border border-green-400 flex items-center justify-center font-semibold rounded hover:bg-green-200 hover:shadow-md transition"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              KPI {selectedItem.title}
            </h2>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-auto rounded shadow"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIpage;
