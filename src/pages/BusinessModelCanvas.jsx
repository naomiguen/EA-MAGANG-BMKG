import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Upload, Grid3x3 } from "lucide-react";

import BusinessModel from "../assets/BMC.svg";

const STORAGE_KEY = "bmc_image";

const SolutionConceptPage = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    return savedImage || BusinessModel;
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem(STORAGE_KEY, reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 
                   transition-all duration-200 hover:gap-3"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Kembali ke Dashboard
        </button>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl mb-4 shadow-lg">
            <Grid3x3 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Business Model Canvas
          </h1>
          <p className="text-slate-600 text-sm">
            Visualisasi model bisnis dalam 9 building blocks
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Action Bar */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <span className="text-white font-semibold text-sm">Diagram Canvas</span>
            
            <div className="flex gap-3">
              <label className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                              text-white rounded-lg cursor-pointer transition-all duration-200
                              border border-white/20 hover:border-white/40 backdrop-blur-sm">
                <Upload size={16} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">Upload Canvas</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {image && (
                <button
                  onClick={handleRemoveImage}
                  className="group flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 
                           text-white rounded-lg transition-all duration-200 border border-red-400/50"
                >
                  <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Hapus</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-12">
            {image ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                <img
                  src={image}
                  alt="Business Model Canvas"
                  className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 
                           group-hover:scale-[1.01]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Grid3x3 className="text-slate-400" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  Belum Ada Canvas
                </h3>
                <p className="text-slate-500 mb-6 max-w-md">
                  Upload diagram Business Model Canvas untuk menampilkan 9 building blocks bisnis Anda
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 
                                text-white rounded-lg cursor-pointer transition-all duration-200 shadow-md
                                hover:shadow-lg transform hover:-translate-y-0.5">
                  <Upload size={18} />
                  <span className="font-medium">Upload Canvas</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-slate-700">
                <p className="font-semibold mb-1">9 Building Blocks BMC:</p>
                <p>Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="text-sm text-slate-700">
                <p className="font-semibold mb-1">Tips Upload:</p>
                <p>Gunakan gambar beresolusi tinggi untuk memastikan semua detail canvas terlihat jelas. Format: SVG.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionConceptPage;