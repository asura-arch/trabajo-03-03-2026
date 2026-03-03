import React from 'react';
import './GeometricShape.css';

export function GeometricShape({ shape }) {
  const { type, width, height, color = '#667eea', rotation = 0 } = shape;

  const baseStyle = {
    transform: `rotate(${rotation}deg)`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const renderShape = () => {
    switch (type) {
      case 'rectangle':
        return (
          <div
            className="geometric-rectangle"
            style={{
              ...baseStyle,
              backgroundColor: color,
            }}
          />
        );

      case 'circle':
        return (
          <div
            className="geometric-circle"
            style={{
              ...baseStyle,
              height: `${width}px`, // Keep it square for circle
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
        );

      case 'triangle':
        return (
          <div
            className="geometric-triangle"
            style={{
              ...baseStyle,
              width: '0',
              height: '0',
              borderLeft: `${width / 2}px solid transparent`,
              borderRight: `${width / 2}px solid transparent`,
              borderBottom: `${height}px solid ${color}`,
            }}
          />
        );

      case 'diamond':
        return (
          <div
            className="geometric-diamond"
            style={{
              ...baseStyle,
              backgroundColor: color,
              transform: `rotate(${rotation}deg) rotate(45deg)`,
            }}
          />
        );

      case 'star':
        return (
          <svg
            className="geometric-star"
            style={{
              ...baseStyle,
            }}
            viewBox="0 0 100 100"
          >
            <polygon
              points="50,10 61,40 90,40 67,60 78,90 50,70 22,90 33,60 10,40 39,40"
              fill={color}
            />
          </svg>
        );

      case 'line':
        return (
          <svg
            className="geometric-line"
            style={{
              ...baseStyle,
            }}
            viewBox={`0 0 ${width} ${height}`}
          >
            <line
              x1="0"
              y1={height / 2}
              x2={width}
              y2={height / 2}
              stroke={color}
              strokeWidth="3"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return renderShape();
}
