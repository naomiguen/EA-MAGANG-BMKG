import React, { useState } from "react";
import { Trash2, Upload, Grid3x3, Sparkles } from "lucide-react";
import BusinessModel from "../assets/BMC.svg";
import "./css/BusinessModelCanvas.css";

const STORAGE_KEY = "bmc_image";

const SolutionConceptPage = () => {
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
    <div className="bmc-container">
      <div className="bmc-wrapper">

        {/* Header Section */}
        <div className="bmc-header">
          <div className="bmc-icon-wrapper">
            <div className="bmc-icon-shimmer"></div>
            <Grid3x3 className="bmc-icon" />
          </div>
          
          <div className="bmc-title-wrapper">
            <Sparkles className="bmc-sparkle" />
            <h1 className="bmc-title">Business Model Canvas</h1>
            <Sparkles className="bmc-sparkle" />
          </div>
          
          <p className="bmc-subtitle">
            Visualisasi strategis model bisnis Anda dalam 9 building blocks yang powerful
          </p>
        </div>

        {/* Main Card */}
        <div className="bmc-main-card">
          
          {/* Action Bar */}
          <div className="bmc-action-bar">
            <span className="bmc-action-bar-title">Diagram Canvas</span>
            
            <div className="bmc-action-buttons">
              <label className="bmc-upload-button">
                <Upload className="bmc-upload-icon" />
                <span className="bmc-upload-text">Upload Canvas</span>
                <span className="bmc-upload-text-mobile">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bmc-file-input"
                />
              </label>

              {image && (
                <button onClick={handleRemoveImage} className="bmc-delete-button">
                  <Trash2 className="bmc-delete-icon" />
                  <span>Hapus</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div 
            className={`bmc-content-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="bmc-image-wrapper">
                <div className="bmc-image-overlay"></div>
                <img
                  src={image}
                  alt="Business Model Canvas"
                  className="bmc-image"
                />
              </div>
            ) : (
              <div className="bmc-empty-state">
                <div className="bmc-empty-icon">
                  <Grid3x3 size={48} color="#94a3b8" />
                </div>
                <h3 className="bmc-empty-title">Belum Ada Canvas</h3>
                <p className="bmc-empty-text">
                  Upload atau drag & drop diagram Business Model Canvas untuk menampilkan 9 building blocks bisnis Anda
                </p>
                <label className="bmc-upload-button-large">
                  <Upload size={20} />
                  <span>Upload Canvas</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bmc-file-input"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="bmc-info-grid">
          <div className="bmc-info-card-blue">
            <div className="bmc-info-icon-blue">
              <span className="bmc-info-icon-text">i</span>
            </div>
            <div className="bmc-info-content">
              <p className="bmc-info-title">9 Building Blocks BMC:</p>
              <p className="bmc-info-desc">
                Customer Segments, Value Propositions, Channels, Customer Relationships, 
                Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure
              </p>
            </div>
          </div>

          <div className="bmc-info-card-green">
            <div className="bmc-info-icon-green">
              <span className="bmc-info-icon-text">✓</span>
            </div>
            <div className="bmc-info-content">
              <p className="bmc-info-title">Tips Upload:</p>
              <p className="bmc-info-desc">
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

export default SolutionConceptPage;