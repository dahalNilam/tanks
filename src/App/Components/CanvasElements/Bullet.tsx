import React from "react";
import Konva from "konva";
import { Circle } from "react-konva";

interface IProps {
  startPositionX: number;
  startPositionY: number;
}

interface IState {
  currentPositionX: number;
  currentPositionY: number;
}

export default class Bullet extends React.Component<IProps, IState> {
  private circle;
  private animation;

  public readonly state = {
    currentPositionX: 0,
    currentPositionY: 0
  };

  public componentDidMount() {
    const { startPositionX, startPositionY } = this.props;

    this.animation = new Konva.Animation((frame: { time: number }) => {
      const positionY = startPositionY - frame.time / 5;

      if (positionY <= 60) {
        this.animation.stop();
      }

      this.circle.setY(positionY);
    }, this.circle.getLayer());

    this.setState({
      currentPositionX: startPositionX,
      currentPositionY: startPositionY
    });

    this.startAnimation();
  }

  public componentWillUnmount() {
    this.animation.stop();
  }

  private startAnimation = () => {
    this.animation.start();
  };

  public render() {
    const { currentPositionX, currentPositionY } = this.state;

    return (
      <Circle
        ref={node => {
          this.circle = node;
        }}
        x={currentPositionX}
        y={currentPositionY}
        radius={5}
        fill="red"
      />
    );
  }
}
