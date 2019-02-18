import React from "react";
import URLImage from "../CanvasElements/URLImage";

interface IState {
  positionX: number;
}

interface IProps {
  stageWidth: number;
  stageHeight: number;
}

export default class Villian extends React.Component<IProps, IState> {
  public readonly state = {
    positionX: 10
  };

  public render() {
    const { stageWidth, stageHeight } = this.props;
    const positionX = stageWidth / 2 - 25;

    return (
      <URLImage
        src={require("Src/Assets/redtank.png")}
        height={50}
        width={50}
        positionX={positionX}
        positionY={10}
      />
    );
  }
}
