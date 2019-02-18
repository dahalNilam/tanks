import * as React from "react";
import { Stage, Layer } from "react-konva";
import Hero from "Src/App/Components/Hero";
import Villian from "Src/App/Components/Villian";

interface IState {
  stageWidth: number;
  stageHeight: number;
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
    stageHeight: 500
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

  public render() {
    const { stageWidth, stageHeight } = this.state;

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
            <Hero stageWidth={stageWidth} stageHeight={stageHeight} />
            <Villian stageWidth={stageWidth} stageHeight={stageHeight} />
          </Layer>
        </Stage>
      </div>
    );
  }
}
