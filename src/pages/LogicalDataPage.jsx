import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

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

  // Helper untuk mencari entitas berdasarkan kata kunci judul
  const findEntity = (keyword) => {
    return erdData.find(e => e.title.toLowerCase().includes(keyword.toLowerCase()));
  };

  // Mengambil data spesifik untuk layout
  const pegawaiEntity = findEntity('pegawai');
  const observasiEntity = findEntity('observasi');
  const asetEntity = findEntity('aset');
  const produkEntity = findEntity('produk');

  // Komponen Kartu Entitas (Reusable)
  const EntityCard = ({ entity, className = "" }) => {
    if (!entity) return null;
    return (
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 border-slate-300 w-full max-w-[300px] z-10 ${className}`}>
        {/* Header */}
        <div className="bg-blue-900 text-white p-3 text-center">
          <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">{entity.title}</h3>
        </div>
        {/* Attributes */}
        <div className="p-4 bg-white">
          <ul className="space-y-2">
            {entity.attributes.map((attr, idx) => (
              <li key={idx} className="flex justify-between items-center text-xs border-b border-slate-100 pb-1 last:border-0">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {attr.key === 'PK' && (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1 rounded flex-shrink-0">PK</span>
                  )}
                  {attr.key === 'FK' && (
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-200 px-1 rounded flex-shrink-0">FK</span>
                  )}
                  <span className={`truncate ${attr.key ? 'text-slate-800 font-semibold' : 'text-slate-600'}`}>
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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
          <p className="text-slate-600">Memuat data ERD...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchERDData} className="bg-red-600 text-white px-4 py-2 rounded">Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Logical Data Model (ERD)</h1>
        <p className="text-slate-500 mt-2">Hubungan Entitas: Pegawai ke Observasi, Aset, dan Produk</p>
      </div>

      {/* CONTAINER DIAGRAM UTAMA */}
      <div className="relative w-full max-w-6xl flex flex-col items-center">
        
        {/* --- LEVEL 1: PEGAWAI (PARENT) --- */}
        <div className="relative z-20">
            <EntityCard entity={pegawaiEntity} />
            {/* Label 1 di bawah Pegawai */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded border border-blue-900 text-blue-900 text-xs font-bold z-30 shadow-sm">
              1
            </div>
        </div>

        {/* --- CONNECTOR AREA (GARIS) --- */}
        {/* Area khusus untuk garis agar tidak tertutup kartu */}
        <div className="w-full h-16 relative z-0">
            <svg className="w-full h-full pointer-events-none">
                {/* 1. Garis Vertikal dari Pegawai Turun Setengah */}
                <line x1="50%" y1="0" x2="50%" y2="50%" stroke="#1e3a8a" strokeWidth="2" />
                
                {/* 2. Garis Horizontal Panjang (Menghubungkan Kiri-Kanan) */}
                {/* Mencakup lebar kira-kira dari kolom 1 ke kolom 3 */}
                <line x1="16.5%" y1="50%" x2="83.5%" y2="50%" stroke="#1e3a8a" strokeWidth="2" />

                {/* 3. Tiga Garis Vertikal Turun ke Masing-masing Anak */}
                {/* Ke Aset (Kiri) */}
                <line x1="16.5%" y1="50%" x2="16.5%" y2="100%" stroke="#1e3a8a" strokeWidth="2" />
                {/* Ke Observasi (Tengah) */}
                <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="#1e3a8a" strokeWidth="2" />
                {/* Ke Produk (Kanan) */}
                <line x1="83.5%" y1="50%" x2="83.5%" y2="100%" stroke="#1e3a8a" strokeWidth="2" />
            </svg>
        </div>

        {/* --- LEVEL 2: CHILDREN (GRID 3 KOLOM) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-20">
            
            {/* Child 1: Aset Alat (Kiri) */}
            <div className="flex flex-col items-center relative">
                {/* Label N di atas */}
                <div className="absolute -top-3 bg-white px-2 py-0.5 rounded border border-blue-900 text-blue-900 text-xs font-bold z-30 shadow-sm">N</div>
                <EntityCard entity={asetEntity} />
            </div>

            {/* Child 2: Observasi (Tengah) */}
            <div className="flex flex-col items-center relative">
                <div className="absolute -top-3 bg-white px-2 py-0.5 rounded border border-blue-900 text-blue-900 text-xs font-bold z-30 shadow-sm">N</div>
                <EntityCard entity={observasiEntity} />
            </div>

            {/* Child 3: Produk Informasi (Kanan) */}
            <div className="flex flex-col items-center relative">
                <div className="absolute -top-3 bg-white px-2 py-0.5 rounded border border-blue-900 text-blue-900 text-xs font-bold z-30 shadow-sm">N</div>
                <EntityCard entity={produkEntity} />
            </div>

        </div>

      </div>

      {/* --- KETERANGAN (DIKEMBALIKAN SESUAI REQUEST) --- */}
      <div className="mt-16 bg-white p-4 rounded-lg shadow border border-slate-200 text-sm text-slate-600 max-w-2xl w-full">
        <h4 className="font-bold mb-2 text-slate-800">Keterangan:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Pegawai → Aset Alat (1:N):</b> Satu teknisi (NIP) bertanggung jawab atas pemeliharaan banyak peralatan.
          </li>
          <li>
            <b>Pegawai → Observasi (1:N):</b> Satu observer (NIP) melakukan banyak pengamatan cuaca (setiap jam).
          </li>
          <li>
            <b>Pegawai → Produk Info (1:N):</b> Satu forecaster (NIP) menerbitkan banyak dokumen prakiraan/peringatan dini.
          </li>
        </ul>
      </div>



    </div>
  );
};

export default LogicalDataDiagram;