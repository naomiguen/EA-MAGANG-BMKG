import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Upload } from "lucide-react";

import BusinessModel from "../assets/BMC.svg";

const STORAGE_KEY = "bmc_image";

const SolutionConceptPage = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  // Load gambar dari localStorage saat pertama render
  useEffect(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    if (savedImage) {
      setImage(savedImage);
    } else {
      setImage(BusinessModel); // default awal
    }
  }, []);

  // Upload & simpan gambar
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

  // Hapus gambar & localStorage
  const handleRemoveImage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">

      {/* Tombol Kembali */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Business Model Canvas
        </h1>
      </div>

      {/* Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

        {/* Header Card */}
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <span className="font-semibold text-slate-700">Diagram View</span>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-blue-600 hover:text-blue-700">
              <Upload size={16} />
              Tambah / Ganti
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
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Konten */}
        <div className="p-4 md:p-10 flex justify-center items-center min-h-[300px]">
          {image ? (
            <img
              src={image}
              alt="Business Model Canvas"
              className="max-w-full h-auto drop-shadow-sm"
              style={{ minWidth: "600px" }}
            />
          ) : (
            <p className="text-slate-400">
              Belum ada gambar. Silakan upload diagram BMC.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionConceptPage;
