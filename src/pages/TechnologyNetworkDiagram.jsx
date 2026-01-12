import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 0 }, 
    data: { label: 'User Device (Client)' }, 
    type: 'input',
    style: { 
      background: '#4CAF50', 
      color: 'white', 
      border: '2px solid #2E7D32',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
  { 
    id: '2', 
    position: { x: 250, y: 100 }, 
    data: { label: 'Firewall / WAF' },
    style: { 
      background: '#FF5722', 
      color: 'white', 
      border: '2px solid #D84315',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
  { 
    id: '3', 
    position: { x: 250, y: 200 }, 
    data: { label: 'Web Server (Nginx)' },
    style: { 
      background: '#2196F3', 
      color: 'white', 
      border: '2px solid #1565C0',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
  { 
    id: '4', 
    position: { x: 100, y: 350 }, 
    data: { label: 'App Service (Backend)' },
    style: { 
      background: '#9C27B0', 
      color: 'white', 
      border: '2px solid #6A1B9A',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
  { 
    id: '5', 
    position: { x: 400, y: 350 }, 
    data: { label: 'Auth Service (OAuth2)' },
    style: { 
      background: '#9C27B0', 
      color: 'white', 
      border: '2px solid #6A1B9A',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
  { 
    id: '6', 
    position: { x: 250, y: 500 }, 
    data: { label: 'Primary Database' }, 
    type: 'output',
    style: { 
      background: '#FF9800', 
      color: 'white', 
      border: '2px solid #E65100',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold'
    }
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    label: 'HTTPS (443)', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    animated: true,
    style: { stroke: '#4CAF50', strokeWidth: 2 }
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    label: 'Allowed Traffic', 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 }
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    label: 'REST API / JSON', 
    style: { stroke: '#2e86de', strokeWidth: 2 }, 
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5', 
    label: 'gRPC', 
    style: { stroke: '#ff9f43', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e4-6', 
    source: '4', 
    target: '6', 
    label: 'JDBC / TCP (5432)', 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 }
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6', 
    label: 'JDBC', 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 }
  },
];

export default function TechnologyNetworkDiagram() {
  // ✅ PERBAIKAN: Destructure ketiga nilai dari hooks
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), 
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          Enterprise Network Communication Diagram
        </h2>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
          Interactive Technology Stack Visualization
        </p>
      </div>
      
      <div style={{ flex: 1, background: '#f5f5f5' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeStrokeWidth={3} 
            zoomable 
            pannable
            style={{ background: '#f8f8f8' }}
          />
          <Background variant="dots" gap={16} size={1} color="#ccc" />
        </ReactFlow>
      </div>
    </div>
  );
}