import React from "react";
import Konva from "konva";
import { Circle } from "react-konva";
import { IBullet } from "Src/App/Interfaces/IBullet";

interface IProps {
  bullet: IBullet;
  removeBulletById: (id: string) => void;
}

export default class Bullet extends React.Component<IProps> {
  private circle;
  private animation;

  public componentDidMount() {
    const { bullet } = this.props;
    const { Id, positionX, positionY } = bullet;

    this.animation = new Konva.Animation((frame: { time: number }) => {
      const newPositionY = positionY - frame.time / 5;

      this.circle.setY(newPositionY);

      if (newPositionY <= 60) {
        this.props.removeBulletById(Id);
        this.animation.stop();
      }
    }, this.circle.getLayer());

    this.startAnimation();
  }

  public componentWillUnmount() {
    this.animation.stop();
  }

  private startAnimation = () => {
    this.animation.start();
  };

  public render() {
    const { bullet } = this.props;
    const { positionX, positionY } = bullet;

    return (
      <Circle
        ref={node => {
          this.circle = node;
        }}
        x={positionX}
        y={positionY}
        radius={5}
        fill="red"
      />
    );
  }
}
