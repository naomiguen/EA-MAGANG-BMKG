import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient"; 
import './css/LogicalDataDiagram.css';

const LogicalDataDiagram = () => {
  const [erdData, setErdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchERDData();
  }, []);

  const fetchERDData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: entities, error: entitiesError } = await supabase
        .from('erd_entities')
        .select(`
          id,
          title,
          type,
          display_order,
          erd_attributes (
            name,
            key_type,
            description,
            display_order
          )
        `)
        .order('display_order', { ascending: true });

      if (entitiesError) throw entitiesError;

      const transformedData = entities.map(entity => ({
        title: entity.title,
        type: entity.type,
        attributes: entity.erd_attributes
          .sort((a, b) => a.display_order - b.display_order)
          .map(attr => ({
            name: attr.name,
            key: attr.key_type || '',
            desc: attr.description
          }))
      }));

      setErdData(transformedData);
    } catch (err) {
      console.error('Error fetching ERD data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const findEntity = (keyword) => {
    return erdData.find(e => e.title.toLowerCase().includes(keyword.toLowerCase()));
  };

  const pegawaiEntity = findEntity('pegawai');
  const observasiEntity = findEntity('observasi');
  const asetEntity = findEntity('aset');
  const produkEntity = findEntity('produk');

  // Komponen Kartu Entitas
  const EntityCard = ({ entity }) => {
    if (!entity) return null;
    return (
      <div className="erd-card">
        <div className="erd-card-header">
          <h3>{entity.title}</h3>
        </div>
        <div className="erd-card-body">
          <ul className="erd-attribute-list">
            {entity.attributes.map((attr, idx) => (
              <li key={idx} className="erd-attribute-item">
                <div className="erd-attribute-content">
                  {attr.key === 'PK' && (
                    <span className="badge badge-pk">PK</span>
                  )}
                  {attr.key === 'FK' && (
                    <span className="badge badge-fk">FK</span>
                  )}
                  <span className={`attribute-name ${attr.key ? 'is-key' : ''}`} title={attr.name}>
                    {attr.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="erd-page-container" style={{ justifyContent: 'center' }}>
        <div className="erd-loading">Memuat data ERD...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="erd-page-container" style={{ justifyContent: 'center' }}>
        <div className="erd-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="erd-page-container">
      
      <div className="erd-header">
        <h1>Logical Data Model (ERD)</h1>
        <p>Hubungan Entitas: Pegawai ke Observasi, Aset, dan Produk</p>
      </div>

      <div className="erd-diagram-wrapper">
        
        {/* LEVEL 1: PEGAWAI (PARENT) */}
        <div className="erd-level-1-wrapper">
            <EntityCard entity={pegawaiEntity} />
            <div className="connector-label label-1">1</div>
        </div>

        {/* CONNECTOR LINES (SVG) dengan Label N di garis horizontal */}
        <div className="erd-lines-container">
            <svg preserveAspectRatio="none">
                <line x1="50%" y1="0" x2="50%" y2="50%" className="line-stroke" />
                <line x1="16.6%" y1="50%" x2="83.4%" y2="50%" className="line-stroke" />
                <line x1="16.6%" y1="50%" x2="16.6%" y2="100%" className="line-stroke" />
                <line x1="50%" y1="50%" x2="50%" y2="100%" className="line-stroke" />
                <line x1="83.4%" y1="50%" x2="83.4%" y2="100%" className="line-stroke" />
            </svg>
            
            {/* Label N di garis HORIZONTAL - INI YANG DIPERBAIKI */}
            <div className="connector-label label-n-left">N</div>
            <div className="connector-label label-n-center">N</div>
            <div className="connector-label label-n-right">N</div>
        </div>

        {/* LEVEL 2: CHILDREN (GRID 3 KOLOM) */}
        <div className="erd-level-2-grid">
            
            <div className="erd-child-wrapper">
                <EntityCard entity={asetEntity} />
            </div>

            <div className="erd-child-wrapper">
                <EntityCard entity={observasiEntity} />
            </div>

            <div className="erd-child-wrapper">
                <EntityCard entity={produkEntity} />
            </div>

        </div>

      </div>

      <div className="erd-legend">
        <h4>Keterangan:</h4>
        <ul>
          <li><b>Pegawai → Aset (1:N):</b> Satu teknisi memelihara banyak alat.</li>
          <li><b>Pegawai → Observasi (1:N):</b> Satu observer melakukan banyak pengamatan.</li>
          <li><b>Pegawai → Produk (1:N):</b> Satu forecaster menerbitkan banyak produk info.</li>
        </ul>
      </div>

    </div>
  );
};

export default LogicalDataDiagram;