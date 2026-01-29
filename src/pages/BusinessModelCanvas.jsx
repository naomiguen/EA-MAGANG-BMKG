import React, { useState } from "react";
import { Trash2, Upload, Grid3x3, Sparkles } from "lucide-react";
import BusinessModel from "../assets/BMC.svg";

const STORAGE_KEY = "bmc_image";

const BusinessModelCanvas = () => {
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(STORAGE_KEY, reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-16 px-5" style={{ background: '#f0f7ff' }}>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .shimmer-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }
        .sparkle-icon {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          
          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#00467f' }}>
              Business Model Canvas
            </h1>
          </div>
          
          <p className="text-xl font-semibold max-w-2xl mx-auto mb-6" style={{ color: '#003660' }}>
            Visualisasi strategis model bisnis Anda dalam 9 building blocks yang powerful
          </p>

          {/* Divider */}
          <div className="w-24 h-1 mx-auto rounded-full" 
               style={{ background: 'linear-gradient(to right, #0064b5, #fbbf24)' }}></div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl overflow-hidden mb-8 border-2"
             style={{ boxShadow: '0 2px 12px rgba(0, 100, 181, 0.08)', borderColor: '#bfe2ff' }}>
          
          {/* Action Bar */}
          <div className="px-6 py-5 flex flex-wrap justify-between items-center gap-4 border-b-4"
               style={{ 
                 background: 'linear-gradient(135deg, #00467f 0%, #0064b5 100%)',
                 borderBottomColor: '#fbbf24'
               }}>
            <span className="text-lg font-extrabold text-white tracking-wide">
              Diagram Canvas
            </span>
            
            <div className="flex gap-3 flex-wrap">
              <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg font-bold text-sm cursor-pointer transition-all hover:-translate-y-0.5 border-2"
                     style={{ color: '#00467f', borderColor: '#bfe2ff' }}>
                <Upload className="w-5 h-5" />
                <span>Upload Canvas</span>
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-100 text-red-900 rounded-lg font-bold text-sm cursor-pointer transition-all hover:-translate-y-0.5 border-2 border-red-300">
                  <Trash2 className="w-5 h-5" />
                  <span>Hapus</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div 
            className={`p-8 min-h-[500px] transition-all ${
              isDragging ? 'border-2 border-dashed' : ''
            }`}
            style={{
              background: isDragging ? 'linear-gradient(135deg, #f0f7ff 0%, #bfe2ff 100%)' : 'white',
              borderColor: isDragging ? '#0064b5' : 'transparent'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: 'linear-gradient(to bottom, rgba(0,70,127,0.02) 0%, transparent 20%, transparent 80%, rgba(0,70,127,0.02) 100%)' }}></div>
                <img
                  src={image}
                  alt="Business Model Canvas"
                  className="w-full h-auto block rounded-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8">
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl mb-6 border-2"
                     style={{ background: '#f0f7ff', borderColor: '#bfe2ff' }}>
                  <Grid3x3 size={48} style={{ color: '#0064b5' }} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 tracking-wide" style={{ color: '#00467f' }}>
                  Belum Ada Canvas
                </h3>
                <p className="text-base max-w-lg mb-8 leading-relaxed" style={{ color: '#003660' }}>
                  Upload atau drag & drop diagram Business Model Canvas untuk menampilkan 9 building blocks bisnis Anda
                </p>
                <label className="inline-flex items-center gap-2 px-8 py-3.5 bg-white rounded-lg font-bold text-base cursor-pointer transition-all hover:-translate-y-0.5 border-2"
                       style={{ color: '#00467f', borderColor: '#bfe2ff' }}>
                  <Upload size={20} />
                  <span>Upload Canvas</span>
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
        <div className="grid md:grid-cols-2 gap-6">
          {/* Blue Info Card */}
          <div className="rounded-xl p-6 flex gap-4 items-start transition-all hover:-translate-y-1 border-2"
               style={{ 
                 background: 'linear-gradient(135deg, #f0f7ff 0%, #bfe2ff 100%)',
                 borderColor: '#0064b5'
               }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
                 style={{ background: '#0064b5', borderColor: '#00467f' }}>
              <span className="text-white font-extrabold text-2xl">i</span>
            </div>
            <div className="flex-1">
              <p className="font-extrabold mb-2 text-lg tracking-wide" style={{ color: '#00467f' }}>
                9 Building Blocks BMC:
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#003660' }}>
                Customer Segments, Value Propositions, Channels, Customer Relationships, 
                Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure
              </p>
            </div>
          </div>

          {/* Yellow Info Card */}
          <div className="rounded-xl p-6 flex gap-4 items-start transition-all hover:-translate-y-1 border-2"
               style={{ 
                 background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                 borderColor: '#fbbf24'
               }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
                 style={{ background: '#fbbf24', borderColor: '#f59e0b' }}>
              <span className="text-white font-extrabold text-2xl">✓</span>
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-yellow-900 mb-2 text-lg tracking-wide">
                Tips Upload:
              </p>
              <p className="text-yellow-900 text-sm leading-relaxed">
                Gunakan gambar beresolusi tinggi untuk memastikan semua detail canvas terlihat jelas. 
                Format yang didukung: SVG.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelCanvas;