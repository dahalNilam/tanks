import React from "react";
import { Stage, Sprite } from "@inlet/react-pixi";

const image = require("../Assets/tank.png");

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tanks</h1>
        </header>
        <Stage>
          <Sprite image={image} x={100} y={100} />
        </Stage>
      </div>
    );
  }
}

export default App;
