import React from "react";
import URLImage from "../CanvasElements/URLImage";

interface IState {
  positionX: number;
  positionY: number;
}

interface IProps {
  stageWidth: number;
  stageHeight: number;
}

export default class Hero extends React.Component<IProps, IState> {
  public readonly state = {
    positionX: 0,
    positionY: 0
  };

  public render() {
    const { stageWidth, stageHeight } = this.props;
    const positionX = stageWidth / 2 - 25;
    const positionY = stageHeight - 60;

    return (
      <URLImage
        src={require("Src/Assets/bluetank.png")}
        height={50}
        width={50}
        positionX={positionX}
        positionY={positionY}
      />
    );
  }
}
