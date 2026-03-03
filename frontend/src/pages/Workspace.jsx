import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../AuthContext';
import { ShapeLibrary } from '../components/ShapeLibrary';
import { GeometricShape } from '../components/GeometricShape';
import './Workspace.css';

export function Workspace() {
  const { user, logout } = useContext(AuthContext);
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeClipboard, setShapeClipboard] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' && selectedShape) {
          e.preventDefault();
          setShapeClipboard(selectedShape);
        } else if (e.key === 'v' && shapeClipboard) {
          e.preventDefault();
          const newShape = {
            ...shapeClipboard,
            id: `shape-${Date.now()}`,
            x: shapeClipboard.x + 20,
            y: shapeClipboard.y + 20,
          };
          setShapes((prev) => [...prev, newShape]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShape, shapeClipboard]);

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // first check if an existing shape was dragged
    const shapeId = e.dataTransfer.getData('text/plain');
    if (shapeId) {
      setShapes((prev) =>
        prev.map((s) => {
          if (s.id === shapeId) {
            return { ...s, x: Math.max(0, x - 50), y: Math.max(0, y - 50) };
          }
          return s;
        })
      );
      return;
    }

    const shapeType = e.dataTransfer.getData('shapeType');
    if (shapeType) {
      const newShape = {
        id: `shape-${Date.now()}`,
        type: shapeType,
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 50),
        width: 100,
        height: 100,
        rotation: 0,
        color: '#667eea',
      };
      setShapes((prev) => [...prev, newShape]);
    }
  };

  const deleteShape = (id) => setShapes((prev) => prev.filter((s) => s.id !== id));

  const copyShape = (shape) => {
    const newShape = { ...shape, id: `shape-${Date.now()}`, x: shape.x + 20, y: shape.y + 20 };
    setShapes((prev) => [...prev, newShape]);
    setSelectedShape(newShape);
    setShapeClipboard(shape);
  };

  // ShapeLibrary calls onDragStart(shapeType), so accept shapeType only
  const handleShapeDragStart = () => {
    // no-op: ShapeLibrary sets dataTransfer directly
  };

  return (
    <div className="workspace">
      <header className="workspace-header">
        <h1>SmartFall Workspace</h1>
        <div className="header-actions">
          <span className="user-info">{user?.username}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="workspace-content">
        <aside className="sidebar">
          <ShapeLibrary onDragStart={handleShapeDragStart} />
        </aside>

        <main className="editor">
          <div
            ref={canvasRef}
            className="canvas"
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            {shapes.length === 0 ? (
              <div className="empty-state">
                <p>Arrastra figuras desde la barra izquierda para comenzar.</p>
              </div>
            ) : (
              shapes.map((shape) => (
                <div
                  key={shape.id}
                  className={`shape-wrapper ${selectedShape?.id === shape.id ? 'selected' : ''}`}
                  style={{ position: 'absolute', left: `${shape.x}px`, top: `${shape.y}px` }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', shape.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onClick={() => setSelectedShape(shape)}
                >
                  <GeometricShape shape={shape} />
                  <div className="shape-toolbar">
                    <button
                      className="shape-action-btn"
                      onClick={() => copyShape(shape)}
                      title="Copiar"
                    >
                      📋
                    </button>
                    <button
                      className="shape-action-btn"
                      onClick={() => deleteShape(shape.id)}
                      title="Eliminar"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
