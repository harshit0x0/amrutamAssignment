import React from 'react';

interface Coordinate {
  x: number;
  y: number;
}

interface LineProps {
  from: Coordinate;
  to: Coordinate;
  stroke?: string;
}

const Line: React.FC<LineProps> = ({ from, to, stroke = 'black' }) => {
  const style = {
    position: 'absolute',
    left: Math.min(from.x, to.x),
    top: Math.min(from.y, to.y),
    width: Math.abs(to.x - from.x),
    height: '2px',
    backgroundColor: stroke,
    transform: `rotate(${Math.atan2(to.y - from.y, to.x - from.x)}rad)`,
    transformOrigin: '0 0',
    borderColor: stroke,
  };

  return (
    // @ts-expect-error postion type confilct 
    <div style={style} />
  );
};

export default Line;