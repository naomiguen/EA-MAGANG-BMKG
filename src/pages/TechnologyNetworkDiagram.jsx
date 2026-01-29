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
import { Shield, Server, Database, Smartphone, Cloud, Radio, Activity, Info } from 'lucide-react';

// --- 1. CUSTOM NODE (BMKG Standard Style) ---
const CustomNode = ({ data }) => {
  const isSelected = data.selected;
  return (
    <div className={`px-5 py-4 rounded-2xl border-2 transition-all duration-300 shadow-xl min-w-[180px] bg-white 
      ${data.className ? data.borderColor : 'border-primary-100'} 
      hover:shadow-2xl hover:scale-105 active:scale-95`}>
      
      {/* Handles */}
      <Handle type="target" position={Position.Top} id="t" className="w-2 h-2 !bg-primary-300 border-2 border-white" />
      <Handle type="source" position={Position.Right} id="r" className="w-2 h-2 !bg-primary-300 border-2 border-white" />
      <Handle type="source" position={Position.Bottom} id="b" className="w-2 h-2 !bg-primary-300 border-2 border-white" />
      <Handle type="target" position={Position.Left} id="l" className="w-2 h-2 !bg-primary-300 border-2 border-white" />
      <Handle type="source" position={Position.Left} id="l-out" className="w-2 h-2 !bg-primary-300 border-2 border-white" />
      <Handle type="target" position={Position.Right} id="r-in" className="w-2 h-2 !bg-primary-300 border-2 border-white" />

      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl text-white shadow-md ${data.iconBg || 'bg-primary-600'}`}>
          {data.icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-black uppercase tracking-widest text-primary-300 leading-none mb-1">
            {data.category}
          </span>
          <span className="text-sm font-black text-primary-950 uppercase tracking-tighter leading-tight">
            {data.title}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- 2. CONFIGURATION (Nodes & Edges) ---
const initialNodes = [
  {
    id: '1', type: 'custom',
    data: { title: 'User Device', category: 'Client', icon: <Smartphone size={18}/>, iconBg: 'bg-slate-700', borderColor: 'border-slate-200' },
    position: { x: 400, y: 0 },
  },
  {
    id: '2', type: 'custom',
    data: { title: 'Firewall / WAF', category: 'Security', icon: <Shield size={18}/>, iconBg: 'bg-red-600', borderColor: 'border-red-200' },
    position: { x: 400, y: 150 },
  },
  {
    id: '3', type: 'custom',
    data: { title: 'Web Gateway', category: 'Nginx', icon: <Server size={18}/>, iconBg: 'bg-primary-600', borderColor: 'border-primary-200' },
    position: { x: 400, y: 300 },
  },
  {
    id: '4', type: 'custom',
    data: { title: 'App Service', category: 'Backend', icon: <Cloud size={18}/>, iconBg: 'bg-primary-500', borderColor: 'border-primary-100' },
    position: { x: 100, y: 500 },
  },
  {
    id: '5', type: 'custom',
    data: { title: 'Auth Service', category: 'OAuth2', icon: <Activity size={18}/>, iconBg: 'bg-primary-500', borderColor: 'border-primary-100' },
    position: { x: 700, y: 500 },
  },
  {
    id: '6', type: 'custom',
    data: { title: 'Database', category: 'Storage', icon: <Database size={18}/>, iconBg: 'bg-secondary-600', borderColor: 'border-secondary-200' },
    position: { x: 400, y: 700 },
  },
  {
    id: '7', type: 'custom',
    data: { title: 'Weather Radar', category: 'Sensor', icon: <Radio size={18}/>, iconBg: 'bg-emerald-600', borderColor: 'border-emerald-200' },
    position: { x: 1000, y: 450 },
  },
  {
    id: '8', type: 'custom',
    data: { title: 'Edge Node', category: 'Processing', icon: <Server size={18}/>, iconBg: 'bg-emerald-500', borderColor: 'border-emerald-100' },
    position: { x: 1000, y: 650 },
  },
];

const edgeStyle = { stroke: '#0064b5', strokeWidth: 3 };
const dashStyle = { stroke: '#fbbf24', strokeWidth: 2, strokeDasharray: '8,5' };
const marker = { type: MarkerType.ArrowClosed, color: '#0064b5', width: 20, height: 20 };
const goldMarker = { type: MarkerType.ArrowClosed, color: '#fbbf24' };

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'b', targetHandle: 't', label: 'HTTPS', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'b', targetHandle: 't', label: 'Filtered', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'b', targetHandle: 't', label: 'Proxy', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e3-5', source: '3', target: '5', sourceHandle: 'b', targetHandle: 't', label: 'Auth', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e4-3', source: '4', target: '3', sourceHandle: 'l-out', targetHandle: 'l', label: 'Response', type: 'smoothstep', style: dashStyle, markerEnd: goldMarker },
  { id: 'e5-3', source: '5', target: '3', sourceHandle: 'r', targetHandle: 'r-in', label: 'Valid', type: 'smoothstep', style: dashStyle, markerEnd: goldMarker },
  { id: 'e4-6', source: '4', target: '6', sourceHandle: 'b', targetHandle: 't', label: 'Query', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e5-6', source: '5', target: '6', sourceHandle: 'b', targetHandle: 't', label: 'Data', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e7-8', source: '7', target: '8', sourceHandle: 'b', targetHandle: 't', label: 'Signal', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
  { id: 'e8-6', source: '8', target: '6', sourceHandle: 'l-out', targetHandle: 'r-in', label: 'Ingest', type: 'smoothstep', style: edgeStyle, markerEnd: marker },
];

// --- 3. MAIN COMPONENT ---
export default function TechnologyNetworkDiagram() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-12 px-4 font-sans">
      
      {/* Header Section - CENTERED */}
      <div className="w-full max-w-5xl text-center mb-12 border-b-4 border-secondary-500 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary-700 mb-4 uppercase tracking-tighter leading-tight">
          Technology Network Diagram
        </h1>
        <p className="text-primary-800 text-lg md:text-xl font-bold flex items-center justify-center gap-2 italic uppercase tracking-widest">
          <Info size={20} className="text-secondary-600 flex-shrink-0" />
          Arsitektur Jaringan dan Topologi Aliran Data Sistem
        </p>
      </div>

      {/* React Flow Container */}
      <div className="w-full max-w-7xl h-[80vh] bg-slate-50 rounded-[2.5rem] shadow-2xl border border-primary-100 overflow-hidden relative group">
        
        {/* Floating Legend - Inside Flow */}
        <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-primary-100 max-w-[200px]">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 mb-4">Infrastructure Legend</h3>
          <div className="space-y-3">
            {[
              { label: 'Security Layer', color: 'bg-red-600' },
              { label: 'Gateway / Network', color: 'bg-primary-600' },
              { label: 'Application Logic', color: 'bg-primary-500' },
              { label: 'Data Persistence', color: 'bg-secondary-500' },
              { label: 'IoT / Sensors', color: 'bg-emerald-600' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                <span className="text-[10px] font-bold text-primary-900 uppercase tracking-tight">{item.label}</span>
              </div>
            ))}
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
          snapGrid={[15, 15]}
        >
          <Background color="#cbd5e1" gap={30} variant="dots" />
          <Controls className="bg-white border-primary-100 shadow-xl rounded-xl overflow-hidden" />
        </ReactFlow>
      </div>

      {/* Mobile Hint */}
      <div className="mt-8 text-center text-primary-300 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Interact to Zoom • Drag Nodes to Reorganize Topology
      </div>
    </div>
  );
}