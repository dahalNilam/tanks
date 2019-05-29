import React from "react";
import Konva from "konva";
import { Line } from "react-konva";
import { IBullet } from "Src/App/Interfaces/IBullet";

interface IProps {
  bullet: IBullet;
  updateBullet: (bullet: IBullet) => void;
}

export default class Bullet extends React.Component<IProps> {
  private bulletRef;
  private animation;

  public componentDidMount() {
    const { bullet } = this.props;

    this.animation = new Konva.Animation((frame: { time: number }) => {
      const positionY = bullet.positionY - frame.time / 5;

      this.bulletRef.setY(positionY);

      this.props.updateBullet({
        ...this.props.bullet,
        positionY
      });
    }, this.bulletRef.getLayer());

    this.animation.start();
  }

  public componentWillUnmount() {
    this.animation.stop();
  }

  public render() {
    const { bullet } = this.props;

    return (
      <Line
        ref={node => {
          this.bulletRef = node;
        }}
        x={bullet.positionX}
        y={bullet.positionY}
        points={[3, -15, 6, 0, 0, 0]}
        tension={0.5}
        closed
        stroke="black"
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
      />
    );
  }
}
