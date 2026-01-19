import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import './css/TechnologyNetworkDiagram.css';

// --- 1. CUSTOM NODE (Wajib punya 4 Pintu/Handle) ---
const CustomNode = ({ data }) => {
  return (
    <div className={`custom-node-body ${data.className || ''}`}>
      {/* Handle dengan ID spesifik: t (top), r (right), b (bottom), l (left) */}
      <Handle type="target" position={Position.Top} id="t" className="handle-dot" />
      <Handle type="source" position={Position.Top} id="t-out" className="handle-dot" />
      
      <Handle type="source" position={Position.Right} id="r" className="handle-dot" />
      <Handle type="target" position={Position.Right} id="r-in" className="handle-dot" />

      <Handle type="source" position={Position.Bottom} id="b" className="handle-dot" />
      
      <Handle type="target" position={Position.Left} id="l" className="handle-dot" />
      <Handle type="source" position={Position.Left} id="l-out" className="handle-dot" />

      {/* Label Node */}
      <div className="node-content">
        {data.label}
      </div>
    </div>
  );
};

// --- 2. POSISI NODE (Grid Layout) ---
const initialNodes = [
  // Kolom Tengah
  {
    id: '1', type: 'custom',
    data: { label: <div>User Device<span className="sub">Client</span></div>, className: 'node-user' },
    position: { x: 400, y: 0 },
  },
  {
    id: '2', type: 'custom',
    data: { label: <div>Firewall / WAF<span className="sub">Security</span></div>, className: 'node-security' },
    position: { x: 400, y: 150 },
  },
  {
    id: '3', type: 'custom', // Nginx (Pusat)
    data: { label: <div>Web Server (Nginx)<span className="sub">Gateway</span></div>, className: 'node-network' },
    position: { x: 400, y: 300 },
  },

  // Sayap Kiri (App)
  {
    id: '4', type: 'custom',
    data: { label: <div>App Service<span className="sub">Backend</span></div>, className: 'node-app' },
    position: { x: 100, y: 500 }, // Geser jauh ke kiri
  },

  // Sayap Kanan (Auth)
  {
    id: '5', type: 'custom',
    data: { label: <div>Auth Service<span className="sub">OAuth2</span></div>, className: 'node-app' },
    position: { x: 700, y: 500 }, // Geser jauh ke kanan
  },

  // Bawah (DB)
  {
    id: '6', type: 'custom',
    data: { label: <div>Database<span className="sub">Storage</span></div>, className: 'node-data' },
    position: { x: 400, y: 700 },
  },

  // IoT (Pojok Kanan)
  {
    id: '7', type: 'custom',
    data: { label: <div>Weather Radar<span className="sub">Sensor</span></div>, className: 'node-iot' },
    position: { x: 1000, y: 500 },
  },
  {
    id: '8', type: 'custom',
    data: { label: <div>Edge Software<span className="sub">Processing</span></div>, className: 'node-iot' },
    position: { x: 1000, y: 650 },
  },
];

// --- 3. WIRING KABEL (Solusi Masalah Garis) ---
const edgeStyle = { stroke: '#fbbf24', strokeWidth: 1.5 };
const marker = { type: MarkerType.ArrowClosed, color: '#fbbf24' };

const initialEdges = [
  // --- A. Flow Turun (Main Request) ---
  // User (Bawah) -> Firewall (Atas)
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'b', targetHandle: 't', label: 'HTTPS', type: 'step', style: edgeStyle, markerEnd: marker },
  // Firewall (Bawah) -> Nginx (Atas)
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'b', targetHandle: 't', label: 'Allowed Traffic', type: 'step', style: edgeStyle, markerEnd: marker },

  // --- B. Percabangan Nginx (Bawah) ke Service (Atas) ---
  // Ini yang membuat garis siku "L" turun ke bawah lalu belok
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'b', targetHandle: 't', label: 'API Request', type: 'step', style: edgeStyle, markerEnd: marker },
  { id: 'e3-5', source: '3', target: '5', sourceHandle: 'b', targetHandle: 't', label: 'Validate Token', type: 'step', style: edgeStyle, markerEnd: marker },

  // --- C. Jalur Balik / Response (SOLUSI TABRAKAN) ---
  // App Service (KIRI) -> Nginx (KIRI)
  // Ini memaksa garis membuat putaran "C" besar di sisi kiri luar
  { 
    id: 'e4-3', source: '4', target: '3', 
    sourceHandle: 'l-out', targetHandle: 'l', 
    label: 'API Response', 
    type: 'step', 
    style: { ...edgeStyle, strokeDasharray: '5,5' }, 
    markerEnd: marker 
  },

  // Auth Service (KANAN) -> Nginx (KANAN)
  // Ini memaksa garis membuat putaran "C" besar di sisi kanan luar
  { 
    id: 'e5-3', source: '5', target: '3', 
    sourceHandle: 'r', targetHandle: 'r-in', 
    label: 'Token Valid', 
    type: 'step', 
    style: { ...edgeStyle, strokeDasharray: '5,5' }, 
    markerEnd: marker 
  },

  // --- D. Database ---
  { id: 'e4-6', source: '4', target: '6', sourceHandle: 'b', targetHandle: 't', label: 'Query', type: 'step', style: edgeStyle, markerEnd: marker },
  { id: 'e5-6', source: '5', target: '6', sourceHandle: 'b', targetHandle: 't', label: 'User Data', type: 'step', style: edgeStyle, markerEnd: marker },

  // --- E. IoT Flow ---
  { id: 'e7-8', source: '7', target: '8', sourceHandle: 'b', targetHandle: 't', label: 'Raw Signal', type: 'step', style: edgeStyle, markerEnd: marker },
  // Edge (Kiri) -> Database (Kanan)
  { id: 'e8-6', source: '8', target: '6', sourceHandle: 'l-out', targetHandle: 'r-in', label: 'Ingest Data', type: 'step', style: edgeStyle, markerEnd: marker },
];

export default function ArchitectureDiagram() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div className="diagram-wrapper">
      <div className="diagram-legend">
        <h3>EA Design (Fixed Wiring)</h3>
        <div className="legend-item" style={{color: '#ffffff'}}>
          <div className="dot" style={{background: '#fff', border: '2px solid #333'}}></div> 
          User
        </div>
        <div className="legend-item" style={{color: '#ffffff'}}>
          <div className="dot" style={{background: '#fff3cd', border: '2px solid #ffc107'}}></div> 
          Security
        </div>
        <div className="legend-item" style={{color: '#ffffff'}}>
          <div className="dot" style={{background: '#cce5ff', border: '2px solid #007bff'}}></div> 
          Application
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        snapToGrid={true}
      >
        <Background color="#eee" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}