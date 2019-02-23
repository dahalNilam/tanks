import React from "react";
import URLImage from "../CanvasElements/URLImage";
import { IHero } from "Src/App/Interfaces/IHero";

interface IProps {
  hero: IHero;
  stageWidth: number;
  stageHeight: number;
  handleFire: () => void;
  handleMove: (distance: number) => void;
}

export default class Hero extends React.Component<IProps> {
  public readonly state = {
    positionX: 0,
    positionY: 0
  };

  public componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!event || !event.key) {
      return;
    }

    const key = event.code;

    switch (key) {
      case "ArrowRight":
        this.props.handleMove(10);
        break;

      case "ArrowLeft":
        this.props.handleMove(-10);
        break;

      case "Space":
        this.props.handleFire();
        break;

      default:
    }
  };

  private move = (value: number) => {
    const positionX = this.state.positionX + value;

    // Don't move when the position gets out of range
    if (positionX >= this.props.stageWidth - 50 || positionX <= 0) {
      return;
    }

    this.setState({
      positionX
    });
  };

  public render() {
    const { hero } = this.props;
    const { positionX, positionY } = hero;

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
