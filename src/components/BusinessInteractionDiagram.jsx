import React, { useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  MarkerType 
} from 'reactflow';
import 'reactflow/dist/style.css';

// --- 1. DEFINISI NODES (UNIT KERJA) ---
const initialNodes = [
  // --- CORE BUSINESS (Tengah) ---
  { 
    id: 'forecaster', 
    data: { label: 'Forecaster (Prakirawan)' }, 
    position: { x: 400, y: 250 },
    style: { background: '#dbeafe', border: '2px solid #2563eb', width: 180, fontWeight: 'bold' } 
  },
  { 
    id: 'observer', 
    data: { label: 'Observer (Pengamatan)' }, 
    position: { x: 400, y: 400 },
    style: { background: '#dbeafe', border: '2px solid #2563eb', width: 180 } 
  },

  // --- EXTERNAL (Kanan) ---
  { 
    id: 'airnav', 
    type: 'output',
    data: { label: 'AirNav (LPPNPI)' }, 
    position: { x: 750, y: 200 },
    style: { background: '#fef3c7', border: '2px solid #d97706', width: 150 } 
  },
  { 
    id: 'airlines', 
    type: 'output',
    data: { label: 'Airlines / Pilot' }, 
    position: { x: 750, y: 300 },
    style: { background: '#fef3c7', border: '2px solid #d97706', width: 150 } 
  },

  // --- SUPPORT (Kiri) ---
  { 
    id: 'teknisi', 
    data: { label: 'Teknisi' }, 
    position: { x: 100, y: 400 },
    style: { background: '#d1fae5', border: '2px solid #059669', width: 150 } 
  },
  { 
    id: 'it', 
    data: { label: 'IT / Datin' }, 
    position: { x: 100, y: 250 },
    style: { background: '#d1fae5', border: '2px solid #059669', width: 150 } 
  },

  // --- MANAGEMENT (Atas) ---
  { 
    id: 'kupt', 
    data: { label: 'Kepala Stasiun (KUPT)' }, 
    position: { x: 400, y: 50 },
    style: { background: '#f3f4f6', border: '2px solid #4b5563', width: 180 } 
  },
  { 
    id: 'tu', 
    data: { label: 'Tata Usaha' }, 
    position: { x: 100, y: 50 },
    style: { background: '#f3f4f6', border: '2px solid #4b5563', width: 150 } 
  },
];

// --- 2. DEFINISI EDGES (GARIS HUBUNG) ---
const initialEdges = [
  // Observer -> Forecaster (Data Cuaca)
  { id: 'e1-2', source: 'observer', target: 'forecaster', label: 'METAR/SPECI', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Forecaster -> External
  { id: 'e2-3', source: 'forecaster', target: 'airnav', label: 'Flight Folder', animated: true, style: { stroke: '#d97706' } },
  { id: 'e2-4', source: 'forecaster', target: 'airlines', label: 'Briefing', animated: true, style: { stroke: '#d97706' } },

  // Teknisi Interactions
  { id: 'e5-2', source: 'teknisi', target: 'observer', label: 'Perbaikan Alat', type: 'smoothstep' },
  { id: 'e2-5', source: 'observer', target: 'teknisi', label: 'Lapor Kerusakan', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
  { id: 'e5-6', source: 'teknisi', target: 'kupt', label: 'Laporan Kinerja', type: 'smoothstep' },

  // Admin & IT
  { id: 'e8-all', source: 'tu', target: 'kupt', label: 'Administrasi', type: 'smoothstep' },
  { id: 'e7-all', source: 'it', target: 'forecaster', label: 'Jaringan/CMSS', style: { stroke: '#059669' } },
];

const BusinessInteractionDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-700">Business Interaction Diagram</h3>
        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border">
          💡 Geser/Zoom untuk melihat detail
        </span>
      </div>
      
      <div style={{ height: '550px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#fff';
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default BusinessInteractionDiagram;