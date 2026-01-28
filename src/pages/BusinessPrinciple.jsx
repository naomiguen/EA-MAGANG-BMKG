import React, { useState } from "react";
import { ArrowLeft, Trash2, Upload, FileImage } from "lucide-react";
import "./css/BusinessPrinciple.css";

import BusinessPrinciple from "../assets/BusinessPrinciples.svg";

const STORAGE_KEY = "business_principle_image";

const BusinessPrinciplePage = () => {

  const [image, setImage] = useState(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    return savedImage || BusinessPrinciple;
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
    <div className="business-principle-page">
      <div className="business-principle-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-icon">
            <FileImage className="icon" size={32} />
          </div>
          <h1 className="page-title">
            Business Principles
          </h1>
          <p className="page-subtitle">
            Kelola dan tampilkan prinsip bisnis organisasi Anda
          </p>
        </div>

        {/* Main Card */}
        <div className="main-card">
          
          {/* Action Bar */}
          <div className="action-bar">
            <span className="action-bar-title">Manajemen Gambar</span>
            
            <div className="action-buttons">
              <label className="upload-button">
                <Upload size={16} className="upload-icon" />
                <span className="upload-text">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </label>

              {image && (
                <button
                  onClick={handleRemoveImage}
                  className="remove-button"
                >
                  <Trash2 size={16} className="remove-icon" />
                  <span className="remove-text">Hapus</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            {image ? (
              <div className="image-wrapper">
                <div className="image-overlay" />
                <img
                  src={image}
                  alt="Business Principles"
                  className="principle-image"
                />
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileImage className="icon-placeholder" size={40} />
                </div>
                <h3 className="empty-title">
                  Belum Ada Gambar
                </h3>
                <p className="empty-description">
                  Upload gambar business principles untuk ditampilkan di halaman ini
                </p>
                <label className="upload-button-large">
                  <Upload size={18} />
                  <span className="upload-text-large">Upload Gambar</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="info-card">
          <div className="info-icon">
            <span className="info-icon-text">i</span>
          </div>
          <div className="info-content">
            <p className="info-title">Tips:</p>
            <p className="info-text">Gunakan gambar dengan resolusi tinggi untuk hasil terbaik. Format yang didukung: SVG.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPrinciplePage;