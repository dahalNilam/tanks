import React from "react";
import { Star } from "react-konva";

interface IProps {
  width: number;
  height: number;
  handleDragStart: (event) => void;
  handleDragEnd: (event) => void;
}

export default class MyHero extends React.Component<IProps> {
  public render() {
    const { width, height, handleDragStart, handleDragEnd } = this.props;

    const positionX = Math.random() * width;
    const positionY = Math.random() * height;
    const rotation = Math.random() * 180;

    return (
      <Star
        x={positionX}
        y={positionY}
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
}
