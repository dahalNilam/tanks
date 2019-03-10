import React from "react";
import URLImage from "../CanvasElements/URLImage";
import { IVillian } from "Src/App/Interfaces/IVillian";

interface IProps {
  villian: IVillian;
  updateVillian: (villain: IVillian) => void;
}

export default class Villian extends React.Component<IProps> {
  public componentDidMount() {
    // requestAnimationFrame(this.tick);
  }

  private tick = () => {
    const { villian, updateVillian } = this.props;

    updateVillian(villian);
    // requestAnimationFrame(this.tick);
  };

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
