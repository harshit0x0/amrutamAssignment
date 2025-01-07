import React from 'react';

const HeaderHeight = 91;

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

  let left = Math.min(from.x, to.x);
  const rot = Math.atan2(Math.abs(to.y - from.y), Math.abs(to.x - from.x));
  const width = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);

  let top = Math.max(from.y, to.y) - HeaderHeight;
  let angle =  -(rot * 180 / Math.PI);
  if(to.y > from.y){
    angle = -angle;
    const offsetY = width * Math.sin(rot);
    top -= offsetY;
  } 
  if(to.x < from.x){
    angle = 180 - angle;
    const offsetX = width * Math.cos(rot);
    left += offsetX;
  }

  // console.log("left, ", left);
  // console.log("top, ", top);
  // console.log("width, ", width);
  // console.log("angle, ", angle);

  const style = {
    position: 'absolute',
    left: left,
    top: top ,
    width: width,
    height: '2px',
    backgroundColor: stroke,
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 0',
    borderColor: stroke,
    zIndex: 20
  };

  return (
    // @ts-expect-error postion type confilct 
    <div style={style} />
  );
};

export default Line;