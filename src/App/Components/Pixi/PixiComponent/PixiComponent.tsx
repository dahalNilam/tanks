import * as React from "react";
import * as Pixi from "pixi.js";

interface IProps {
  width?: number;
  height?: number;
}

export default class PixiComponent extends React.Component<IProps> {
  app: Pixi.Application = {} as any;
  gameCanvas: HTMLDivElement = {} as any;

  /**
   * After mounting, add the Pixi Renderer to the div and start the Application.
   */
  public componentDidMount = () => {
    const { width, height } = this.props;

    this.app = new Pixi.Application(width ? width : 400, height ? height : 400);
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
  };

  /**
   * Stop the Application when unmounting.
   */
  public componentWillUnmount = () => {
    this.app.stop();
  };

  /**
   * Simply render the div that will contain the Pixi Renderer.
   */
  public render() {
    let component = this;

    return (
      <div
        ref={thisDiv => {
          thisDiv ? (component.gameCanvas = thisDiv) : "";
        }}
      />
    );
  }
}
