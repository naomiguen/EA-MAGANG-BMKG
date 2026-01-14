import React from "react";
import { ArrowLeft, Database, FileText, Table as TableIcon } from "lucide-react";

const AppDataMatrixPage = () => {
  const appDataMatrix = [
    {
      id: 1,
      app: "BMKGSoft & WXREV",
      description: "Sistem penginputan, pengolahan, dan pengiriman data pengamatan meteorologi permukaan.",
      dataEntity: "Data Observasi (Surface, Upper Air, ME.48), Laporan WXREV",
      dataType: "Transactional Data"
    },
    {
      id: 2,
      app: "CMSS & AFTN",
      description: "Sistem pertukaran data meteorologi global dan penerbangan.",
      dataEntity: "WMO Coded Data (SYNOP, METAR, SPECI)",
      dataType: "Transactional Data"
    },
    {
      id: 3,
      app: "Synergie, Radar & Nowcasting",
      description: "Workstation analisis peta cuaca, citra radar, dan sistem peringatan dini.",
      dataEntity: "Produk Informasi (Forecast), Citra Radar, Peringatan Dini",
      dataType: "Analytical Data"
    },
    {
      id: 4,
      app: "Portal Web, PNBP & Database Center",
      description: "Sistem pelayanan informasi publik dan penerimaan negara bukan pajak.",
      dataEntity: "Informasi Cuaca Publik, Data PNBP, Request Data",
      dataType: "Transactional Data"
    },
    {
      id: 5,
      app: "Aplikasi SAKTI, SAIBA, GPP & SPRINT",
      description: "Sistem terintegrasi pengelolaan keuangan, anggaran, dan penggajian.",
      dataEntity: "Data Keuangan, DIPA, Realisasi Anggaran, Gaji",
      dataType: "Transactional Data"
    },
    {
      id: 6,
      app: "SIMAK, SIMAN, Persediaan & SIPPB",
      description: "Sistem informasi manajemen aset negara dan persediaan barang.",
      dataEntity: "Inventaris BMN (Aset), Status Barang, Stok Persediaan",
      dataType: "Master Data"
    },
    {
      id: 7,
      app: "SIMAS, SPRESO, MySAPK & E-Kinerja",
      description: "Sistem manajemen data pegawai, presensi, dan kinerja ASN.",
      dataEntity: "Data Kepegawaian (Personil), Absensi, SKP",
      dataType: "Master Data"
    },
    {
      id: 8,
      app: "E-Office BMKG",
      description: "Sistem persuratan digital dan disposisi elektronik.",
      dataEntity: "Dokumen Naskah Dinas, Surat Masuk/Keluar",
      dataType: "Transactional Data"
    },
    {
      id: 9,
      app: "WIGOS, Monitoring Tools & Logbook",
      description: "Sistem pengelolaan metadata alat dan pencatatan pemeliharaan teknis.",
      dataEntity: "Metadata Alat (OSCAR), Log Kerusakan/Perbaikan",
      dataType: "Master Data"
    }
  ];

  // Helper untuk warna badge tipe data
  const getDataTypeStyle = (type) => {
    if (type.includes("Master")) {
      return { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" }; // Hijau
    } else if (type.includes("Analytical")) {
      return { bg: "#f3e8ff", text: "#6b21a8", border: "#e9d5ff" }; // Ungu
    } else {
      return { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" }; // Biru (Transactional)
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '48px',
      paddingBottom: '48px',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      
      {/* Header Halaman */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '56rem',
        position: 'relative',
        width: '100%'
      }}>

        <h1 style={{
          fontSize: '36px',
          fontWeight: '900',
          color: '#0f172a',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <TableIcon size={36} color="#2563eb" />
          Application - Data Matrix
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Pemetaan hubungan antara komponen aplikasi sistem dengan entitas data yang dikelola.
        </p>
      </div>

      {/* Tabel Matrix */}
      <div style={{
        width: '100%',
        maxWidth: '84rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#1e293b', 
                color: 'white',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                height: '60px'
              }}>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '25%' }}>
                  Application (System)
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '35%' }}>
                  Description / Function
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '25%' }}>
                  Data Entity
                </th>
                <th style={{ padding: '16px 24px', fontWeight: '600', width: '15%', textAlign: 'center' }}>
                  Data Entity Type
                </th>
              </tr>
            </thead>
            <tbody style={{ color: '#334155', fontSize: '15px' }}>
              {appDataMatrix.map((item, index) => {
                const style = getDataTypeStyle(item.dataType);
                return (
                  <tr 
                    key={item.id} 
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                    }}
                  >
                    {/* Kolom 1: Aplikasi */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      fontWeight: '700',
                      color: '#0f172a',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <Database size={18} color="#94a3b8" style={{ marginTop: '3px' }} />
                        {item.app}
                      </div>
                    </td>

                    {/* Kolom 2: Deskripsi */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      color: '#475569',
                      lineHeight: '1.6',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      {item.description}
                    </td>

                    {/* Kolom 3: Entitas Data */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      fontWeight: '600',
                      color: '#334155',
                      borderRight: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                         <FileText size={18} color="#94a3b8" style={{ marginTop: '3px' }} />
                         {item.dataEntity}
                      </div>
                    </td>

                    {/* Kolom 4: Tipe Data */}
                    <td style={{
                      padding: '20px 24px',
                      verticalAlign: 'top',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: style.bg,
                        color: style.text,
                        border: `1px solid ${style.border}`,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.dataType}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Sumber */}
      <div style={{
        marginTop: '24px',
        color: '#94a3b8',
        fontSize: '14px',
        fontStyle: 'italic',
        textAlign: 'center',
        maxWidth: '56rem'
      }}>
        * Data dipetakan berdasarkan SK Uraian Tugas & katalog portofolio aplikasi.
      </div>
    </div>
  );
};

export default AppDataMatrixPage;