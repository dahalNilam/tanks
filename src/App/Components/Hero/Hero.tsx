import React from "react";
import URLImage from "../CanvasElements/URLImage";
import { IHero } from "Src/App/Interfaces/IHero";
import { Direction } from "Src/App/Enums/Direction";

interface IProps {
  hero: IHero;
  updateHero: (hero: IHero) => void;
}

export default class Hero extends React.Component<IProps> {
  public componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (!event || !event.key) {
      return;
    }

    const key = event.code;
    const { hero } = this.props;
    let { movingDirection, isFiring } = hero;

    switch (key) {
      case "ArrowRight":
        movingDirection = Direction.Right;
        break;

      case "ArrowLeft":
        movingDirection = Direction.Left;
        break;

      case "Space":
        isFiring = true;
        break;

      default:
    }

    this.props.updateHero({
      ...this.props.hero,
      movingDirection,
      isFiring
    });
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault();
    if (!event || !event.key) {
      return;
    }

    const key = event.code;
    const { hero } = this.props;
    let { movingDirection, isFiring } = hero;

    switch (key) {
      case "ArrowRight":
      case "ArrowLeft":
        movingDirection = Direction.None;
        break;

      case "Space":
        isFiring = false;
        break;

      default:
    }

    this.props.updateHero({
      ...this.props.hero,
      movingDirection,
      isFiring
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
