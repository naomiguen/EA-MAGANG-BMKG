import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import './css/TechnologyEnvironmentDiagram.css';

const TechnologyEnvironmentDiagram = () => {
  const [enterpriseData, setEnterpriseData] = useState({
    external: [],
    hq: [],
    remote: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Query relational: Ambil locations, beserta environments, beserta nodes
      const { data, error } = await supabase
        .from('locations')
        .select(`
          id,
          name,
          icon,
          category,
          environments (
            type,
            nodes (
              name
            )
          )
        `);

      if (error) throw error;

      // Transformasi Data: Mengubah format DB kembali ke format UI yang diinginkan
      const structuredData = {
        external: [],
        hq: [],
        remote: []
      };

      data.forEach(loc => {
        // Mapping environments dan nodes agar sesuai struktur lama
        const formattedEnvs = loc.environments.map(env => ({
          type: env.type,
          // DB mengembalikan nodes sebagai array of objects [{name: 'x'}], kita butuh array of strings ['x']
          nodes: env.nodes.map(n => n.name) 
        }));

        const locationObj = {
          id: loc.id,
          name: loc.name,
          icon: loc.icon,
          environments: formattedEnvs
        };

        // Masukkan ke kategori yang sesuai (external, hq, remote)
        if (structuredData[loc.category]) {
          structuredData[loc.category].push(locationObj);
        }
      });

      setEnterpriseData(structuredData);
    } catch (err) {
      console.error("Gagal mengambil data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Komponen Card (Tidak berubah)
  const LocationCard = ({ location }) => (
    <div className="ea-location-card">
      <div className="ea-location-header">
        <span className="ea-location-name">{location.name}</span>
        <span className="ea-location-icon">{location.icon}</span>
      </div>
      
      {location.environments.map((env, idx) => (
        <div key={idx} className="ea-environment">
          <span className="ea-env-label">{env.type}</span>
          <ul className="ea-node-list">
            {env.nodes.map((node, nIdx) => (
              <li key={nIdx} className="ea-node-item">
                <span className="ea-node-status"></span>
                {node}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  if (loading) return <div className="ea-container">Loading Diagram...</div>;

  return (
    <div className="ea-container">
      <h2 className="ea-title">Arsitektur Lingkungan & Lokasi<br/>Stasiun Meteorologi Kelas I Balikpapan</h2>
      
      <div className="ea-diagram-area">
        {/* Level 1: External / Pusat */}
        <div className="ea-level">
          {enterpriseData.external?.map(loc => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        {/* Level 2: Kantor Utama (HQ) */}
        <div className="ea-level">
          {enterpriseData.hq?.map(loc => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        {/* Level 3: Remote / Sensor Sites */}
        <div className="ea-level">
          {enterpriseData.remote?.map(loc => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyEnvironmentDiagram;