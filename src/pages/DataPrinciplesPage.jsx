import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import "./css/DataPrinciples.css";

const DataPrinciplesPage = () => {
  const [dataPrinciples, setDataPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataPrinciples();
  }, []);

  const fetchDataPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data principles yang aktif, diurutkan berdasarkan sort_order
      const { data, error } = await supabase
        .from('data_principles')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setDataPrinciples(data || []);
    } catch (err) {
      console.error('Error fetching data principles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="principles-page principles-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Memuat prinsip data architecture...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="principles-page principles-error-page">
        <div className="error-container">
          <h3 className="error-title">Error Loading Data</h3>
          <p className="error-message">{error}</p>
          <button 
            onClick={fetchDataPrinciples}
            className="error-retry-button"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="principles-page">
      
      {/* HEADER */}
      <div className="principles-header">
        <div className="header-content">
          <h1 className="principles-title">
            Data Architecture Principles
          </h1>
          <p className="principles-subtitle">
            BMKG Stasiun Meteorologi Balikpapan
          </p>
          <div className="header-divider"></div>
        </div>
      </div>

      {/* GRID KARTU PRINSIP */}
      <div className="principles-container">
        {dataPrinciples.length === 0 ? (
          <div className="principles-empty">
            <p className="empty-text">Tidak ada prinsip data tersedia</p>
          </div>
        ) : (
          dataPrinciples.map((item, index) => (
            <div 
              key={item.id} 
              className="principle-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-wrapper">
                
                {/* Kolom Kiri: Judul & Statement */}
                <div className="card-left">
                  <div className="card-left-bg-circle circle-1"></div>
                  <div className="card-left-bg-circle circle-2"></div>
                  
                  <div className="card-left-content">
                    <span className="principle-badge">
                      {item.id}
                    </span>
                    <h3 className="principle-title">{item.title}</h3>
                    <div className="title-divider"></div>
                    <p className="principle-statement">
                      "{item.statement}"
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Rationale & Implication */}
                <div className="card-right">
                  <div className="card-right-content">
                    <div className="principle-section">
                      <div className="section-header">
                        <label className="section-label">
                          Rationale
                        </label>
                      </div>
                      <p className="section-text">
                        {item.rationale}
                      </p>
                    </div>
                    
                    <div className="section-divider"></div>
                    
                    <div className="principle-section">
                      <div className="section-header">
                        <label className="section-label">
                          Implication
                        </label>
                      </div>
                      <div className="implication-box">
                        <p className="section-text">
                          {item.implication}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataPrinciplesPage;