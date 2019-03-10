import React from "react";
import Konva from "konva";
import { Circle } from "react-konva";
import { IBullet } from "Src/App/Interfaces/IBullet";

interface IProps {
  bullet: IBullet;
  updateBullet: (bullet: IBullet) => void;
}

export default class Bullet extends React.Component<IProps> {
  private circle;
  private animation;

  public componentDidMount() {
    const { bullet } = this.props;

    this.animation = new Konva.Animation((frame: { time: number }) => {
      const positionY = bullet.positionY - frame.time / 5;

      this.circle.setY(positionY);

      this.props.updateBullet({
        ...this.props.bullet,
        positionY
      });
    }, this.circle.getLayer());

    this.animation.start();
  }

  public componentWillUnmount() {
    this.animation.stop();
  }

  public render() {
    const { bullet } = this.props;

    return (
      <Circle
        ref={node => {
          this.circle = node;
        }}
        x={bullet.positionX}
        y={bullet.positionY}
        radius={5}
        fill="red"
      />
    );
  }
}
