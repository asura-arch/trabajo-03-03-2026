import React from 'react';
import './ShapeLibrary.css';

const SHAPES = [
  { id: 'rectangle', name: 'Rectángulo', icon: '▭', color: '#667eea' },
  { id: 'circle', name: 'Círculo', icon: '●', color: '#f093fb' },
  { id: 'triangle', name: 'Triángulo', icon: '▲', color: '#4facfe' },
  { id: 'line', name: 'Línea', icon: '─', color: '#43e97b' },
  { id: 'diamond', name: 'Diamante', icon: '◆', color: '#fa709a' },
  { id: 'star', name: 'Estrella', icon: '★', color: '#feca57' },
];

export function ShapeLibrary({ onDragStart }) {
  const handleDragStart = (e, shapeType) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('shapeType', shapeType);
    onDragStart?.(shapeType);
  };

  return (
    <div className="shape-library">
      <h3>Figuras Geométricas</h3>
      <div className="shapes-grid">
        {SHAPES.map((shape) => (
          <div
            key={shape.id}
            draggable
            onDragStart={(e) => handleDragStart(e, shape.id)}
            className="shape-item"
            title={`Arrastra ${shape.name} al área de trabajo`}
            style={{ borderLeftColor: shape.color }}
          >
            <div className="shape-icon">{shape.icon}</div>
            <div className="shape-name">{shape.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
