import * as React from "react";
import Background from "Src/App/Components/CanvasElements/Background";

export default class Homepage extends React.Component {
  render() {
    const width = 500;
    const height = 500;

    return (
      <div style={{ border: "5x solid #CCC" }}>
        <Background width={width} height={height} />
      </div>
    );
  }
}
