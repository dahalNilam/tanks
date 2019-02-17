import React from "react";
import { Image } from "react-konva";

interface IProps {
  src: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
}

interface IState {
  image: HTMLImageElement;
}

export default class URLImage extends React.Component<IProps, IState> {
  public readonly state = {
    image: new window.Image()
  };

  public componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;

    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  public render() {
    const { height, width, positionX, positionY } = this.props;

    return (
      <Image
        image={this.state.image}
        x={positionX}
        y={positionY}
        height={height}
        width={width}
      />
    );
  }
}
