import * as React from "react";
import Background from "Src/App/Components/CanvasElements/Background";

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
        <Background stageWidth={stageWidth} stageHeight={stageHeight} />;
      </div>
    );
  }
}
