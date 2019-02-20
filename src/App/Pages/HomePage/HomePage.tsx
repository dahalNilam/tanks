import * as React from "react";
import { Stage, Layer } from "react-konva";
import Hero from "Src/App/Components/Hero";
import Villian from "Src/App/Components/Villian";
import Bullet from "Src/App/Components/CanvasElements/Bullet";
import { IBullet } from "Src/App/Interfaces/IBullet";

interface IState {
  stageWidth: number;
  stageHeight: number;
  bullets: IBullet[];
}

export default class Homepage extends React.Component {
  private backGroundRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
  }

  public readonly state: IState = {
    stageWidth: 500,
    stageHeight: 500,
    bullets: []
  };

  private checkSize = () => {
    const backGroundNode = this.backGroundRef.current;

    if (!backGroundNode) {
      return;
    }

    const stageWidth = backGroundNode.offsetWidth;
    const stageHeight = backGroundNode.offsetHeight;

    this.setState({
      stageWidth,
      stageHeight
    });
  };

  private handleFire = (positionX: number, positionY: number) => {
    const newBullet: IBullet = {
      initialPositionX: positionX,
      initialPositionY: positionY
    };

    const bullets = [...this.state.bullets, newBullet];

    this.setState({
      bullets
    });
  };

  public render() {
    const { stageWidth, stageHeight, bullets } = this.state;

    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          width: "50%",
          border: "1px solid grey"
        }}
        ref={this.backGroundRef}
      >
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            <Hero
              stageWidth={stageWidth}
              stageHeight={stageHeight}
              fire={this.handleFire}
            />
            <Villian stageWidth={stageWidth} stageHeight={stageHeight} />
            {bullets &&
              bullets.length > 0 &&
              bullets.map((bullet, i) => (
                <Bullet
                  key={i}
                  startPositionX={bullet.initialPositionX}
                  startPositionY={bullet.initialPositionY}
                />
              ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}
