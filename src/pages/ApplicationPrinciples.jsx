import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";
import './css/ApplicationPrinciples.css';

const ApplicationPrinciples = () => {
  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrinciples();
  }, []);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('application_principles')
        .select('*')
        .order('id', { ascending: true }); // Mengurutkan berdasarkan ID agar urutan konsisten

      if (error) throw error;
      setPrinciples(data || []);
    } catch (error) {
      console.error('Error fetching principles:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ea-container">
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Memuat Prinsip Arsitektur...
        </div>
      </div>
    );
  }

  return (
    <div className="ea-container">
      <header className="ea-header">
        <h1>Application Principles</h1>
        <p className="subtitle">Referensi: Perpres No. 95/2018 & Perka BMKG No. 9/2023</p>
      </header>
      
      <div className="principles-grid">
        {principles.map((principle, index) => (
          <div key={principle.id} className="principle-card">
            <div className="card-header">
              {/* Kita bisa menggunakan ID dari database atau index + 1 */}
              <span className="principle-badge">Prinsip #{index + 1}</span>
              <h3>{principle.title}</h3>
            </div>
            
            <div className="card-body">
              <div className="info-group">
                <label>Pernyataan:</label>
                <p>{principle.statement}</p>
              </div>
              
              <div className="info-group">
                <label>Rasional:</label>
                <p>{principle.rationale}</p>
              </div>
              
              <div className="info-group technical">
                <label>Implikasi Teknis:</label>
                <p>{principle.implication}</p>
              </div>
            </div>

            <div className="card-footer">
              <small>Sumber: {principle.source}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPrinciples;