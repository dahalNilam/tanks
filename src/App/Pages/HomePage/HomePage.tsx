import React from "react";
import * as PIXI from "pixi.js";
import { Stage, Sprite } from "@inlet/react-pixi";

const image = require("Assets/tank.png");

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Stage width={500} height={500}>
          <Sprite image={image} x={0} y={0} />
        </Stage>
      </div>
    );
  }
}
