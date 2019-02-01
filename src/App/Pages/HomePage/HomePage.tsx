import React from "react";
import { PixiComponent } from "Src/App/Components/Pixi/PixiComponent";

const image = require("Assets/tank.png");

export default class Homepage extends React.Component {
  render() {
    const width = 500;
    const height = 500;

    return (
      <>
        <PixiComponent width={width} height={height} />
      </>
    );
  }
}
