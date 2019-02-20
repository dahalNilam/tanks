import React from "react";
import URLImage from "../CanvasElements/URLImage";

interface IState {
  positionX: number;
  positionY: number;
}

interface IProps {
  stageWidth: number;
  stageHeight: number;
  fire: (positionX: number, positionY: number) => void;
}

export default class Hero extends React.Component<IProps, IState> {
  public readonly state = {
    positionX: 0,
    positionY: 0
  };

  public componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    this.setPosition();
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  public componentDidUpdate(nextProps: IProps) {
    if (
      nextProps.stageWidth !== this.props.stageWidth &&
      nextProps.stageHeight !== this.props.stageHeight
    ) {
      this.setPosition();
    }
  }

  private setPosition = () => {
    const positionX = this.props.stageWidth / 2 - 25;
    const positionY = this.props.stageHeight - 60;

    this.setState({
      positionX,
      positionY
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!event || !event.key) {
      return;
    }

    const key = event.code;

    switch (key) {
      case "ArrowRight":
        this.move(10);
        break;

      case "ArrowLeft":
        this.move(-10);
        break;

      case "Space":
        this.fire();
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

  private fire = () => {
    const { positionX, positionY } = this.state;
    const bulletInitialPositionX = positionX + 26;
    const bulletInitialPositionY = positionY - 10;

    this.props.fire(bulletInitialPositionX, bulletInitialPositionY);
  };

  public render() {
    const { positionX, positionY } = this.state;

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
