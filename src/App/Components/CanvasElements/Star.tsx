import React from "react";
import { Star } from "react-konva";

interface IProps {
  height: number;
  width: number;
  handleDragStart: (event) => void;
  handleDragEnd: (event) => void;
}

export default function({
  height,
  width,
  handleDragStart,
  handleDragEnd
}: IProps) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const rotation = Math.random() * 180;

  return (
    <Star
      x={x}
      y={y}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill="#89b717"
      opacity={0.8}
      draggable
      rotation={rotation}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
