import React from "react";
import URLImage from "../CanvasElements/URLImage";
import { IPosition } from "Src/App/Interfaces/IPosition";
import { IVillian } from "Src/App/Interfaces/IVillian";

interface IProps {
  villian: IVillian;
  updateVillianPosition: (position: IPosition) => void;
}

export default class Villian extends React.Component<IProps> {
  public componentDidMount() {
    const { villian } = this.props;
    const { positionX, positionY } = villian;

    this.setState({
      currentPositionX: positionX,
      currentPositionY: positionY
    });
  }

  public componentDidUpdate(oldProps: IProps) {
    const newProps = this.props;

    if (
      oldProps.villian !== newProps.villian ||
      oldProps.villian.positionX !== newProps.villian.positionX ||
      oldProps.villian.positionY !== newProps.villian.positionY
    ) {
      this.setState({
        currentPositionX: newProps.villian.positionX,
        currentPositionY: newProps.villian.positionY
      });
    }
  }

  public render() {
    const { villian } = this.props;
    const { positionX, positionY } = villian;

    return (
      <URLImage
        src={require("Src/Assets/redtank.png")}
        height={50}
        width={50}
        positionX={positionX}
        positionY={positionY}
      />
    );
  }
}
