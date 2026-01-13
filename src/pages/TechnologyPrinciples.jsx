import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import { 
  ShieldCheck, 
  Network, 
  Layers, 
  Zap, 
  Target, 
  RefreshCw, 
  FileText, 
  Search,
  Cpu
} from 'lucide-react';
import './css/TechnologyPrinciples.css'; 

const TechnologyPrinciples = () => {
  const [principles, setPrinciples] = useState([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mapping Nama Prinsip ke Icon (Lucide React)
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('keamanan')) return <ShieldCheck size={28} />;
    if (lowerName.includes('interoperabilitas')) return <Network size={28} />;
    if (lowerName.includes('keterpaduan')) return <Layers size={28} />;
    if (lowerName.includes('efisiensi')) return <Zap size={28} />;
    if (lowerName.includes('efektivitas')) return <Target size={28} />;
    if (lowerName.includes('kesinambungan')) return <RefreshCw size={28} />;
    if (lowerName.includes('akuntabilitas')) return <FileText size={28} />;
    return <Cpu size={28} />; // Default Icon
  };

  useEffect(() => {
    fetchPrinciples();
  }, []);

  // Filter data saat user mengetik
  useEffect(() => {
    const results = principles.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrinciples(results);
  }, [searchTerm, principles]);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('technology_principles')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPrinciples(data);
      setFilteredPrinciples(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      // Sedikit delay buatan agar animasi loading terlihat (opsional)
      setTimeout(() => setLoading(false), 600);
    }
  };

  return (
    <div className="ea-wrapper">
      {/* --- Header Section --- */}
      <div className="ea-hero">
        <div className="ea-hero-content">
          <span className="ea-badge">Perpres No. 95 Tahun 2018</span>
          <h1>Prinsip Arsitektur Teknologi</h1>
          <p>Landasan strategis kerangka kerja idEA untuk menjamin keselarasan teknologi dengan tujuan bisnis organisasi.</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Cari prinsip (misal: Keamanan, Efisiensi)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="ea-grid-container">
        {loading ? (
          // Skeleton Loading (Tampilan saat memuat)
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="card-skeleton">
              <div className="skeleton-icon"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))
        ) : filteredPrinciples.length > 0 ? (
          filteredPrinciples.map((principle) => (
            <div key={principle.id} className="tech-card">
              <div className="tech-card-header">
                <div className={`icon-wrapper icon-${principle.sort_order % 4}`}>
                  {getIcon(principle.name)}
                </div>
                <div className="card-meta">
                  <span className="principle-number">#{principle.sort_order}</span>
                </div>
              </div>
              
              <div className="tech-card-body">
                <h3>{principle.name}</h3>
                <p>{principle.description}</p>
              </div>

              <div className="tech-card-footer">
                <span className="tag-pill">{principle.tag || 'Principle'}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Tidak ada prinsip yang ditemukan dengan kata kunci "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologyPrinciples;