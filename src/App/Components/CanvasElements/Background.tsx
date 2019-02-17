import React from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import Star from "./Star";
import URLImage from "./URLImage";

interface IProps {
  stageWidth: number;
  stageHeight: number;
}

export default class Background extends React.Component<IProps> {
  private handleDragStart = event => {
    event.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  private handleDragEnd = event => {
    event.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  public render() {
    const { stageWidth, stageHeight } = this.props;

    return (
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Star
            width={stageWidth}
            height={stageHeight}
            handleDragStart={this.handleDragStart}
            handleDragEnd={this.handleDragEnd}
          />
          <URLImage
            src={require("Src/Assets/redtank.png")}
            height={50}
            width={50}
            positionX={250}
            positionY={50}
          />
        </Layer>
      </Stage>
    );
  }
}
