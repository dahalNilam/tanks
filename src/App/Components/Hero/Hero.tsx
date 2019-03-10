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

    let { hero } = this.props;
    if (event.code === "ArrowRight") {
      hero.movingDirection = Direction.Right;
    }

    if (event.code === "ArrowLeft") {
      hero.movingDirection = Direction.Left;
    }

    this.props.updateHero({
      ...hero,
      isFiring: false
    });
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault();
    if (!event || !event.code) {
      return;
    }

    let { hero } = this.props;

    if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
      hero.movingDirection = Direction.None;
    }

    this.props.updateHero({
      ...hero,
      isFiring: event.code === "Space"
    });
  };

  public render() {
    const { positionX, positionY } = this.props.hero;

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
