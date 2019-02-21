import React from "react";
import Konva from "konva";
import URLImage from "../CanvasElements/URLImage";
import { IPosition } from "Src/App/Interfaces/IPosition";

interface IProps {
  startPositionX: number;
  startPositionY: number;
  updateVillianPosition: (position: IPosition) => void;
}

interface IState {
  currentPositionX: number;
  currentPositionY: number;
}

export default class Villian extends React.Component<IProps, IState> {
  public readonly state = {
    currentPositionX: 10,
    currentPositionY: 10
  };

  public componentDidMount() {
    const { startPositionX, startPositionY } = this.props;

    this.setState({
      currentPositionX: startPositionX,
      currentPositionY: startPositionY
    });
  }

  public componentDidUpdate(oldProps: IProps) {
    const newProps = this.props;

    if (
      oldProps.startPositionX !== newProps.startPositionX ||
      oldProps.startPositionY !== newProps.startPositionY
    ) {
      this.setState({
        currentPositionX: newProps.startPositionX,
        currentPositionY: newProps.startPositionY
      });
    }
  }

  public render() {
    const { currentPositionX, currentPositionY } = this.state;

    return (
      <URLImage
        src={require("Src/Assets/redtank.png")}
        height={50}
        width={50}
        positionX={currentPositionX}
        positionY={currentPositionY}
      />
    );
  }
}
