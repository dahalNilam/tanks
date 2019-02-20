import React from "react";
import { Circle } from "react-konva";

interface IProps {
  startPositionX: number;
  startPositionY: number;
}

interface IState {
  currentPositionX: number;
  currentPositionY: number;
}

export default class Bullet extends React.Component<IProps, IState> {
  private interval;

  public readonly state = {
    currentPositionX: 0,
    currentPositionY: 0
  };

  public componentDidMount() {
    const { startPositionX, startPositionY } = this.props;
    this.setState({
      currentPositionX: startPositionX,
      currentPositionY: startPositionY
    });

    this.interval = setInterval(() => this.tick(), 10);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  private tick = () => {
    this.setState(prevState => ({
      currentPositionY: prevState.currentPositionY - 5
    }));
  };

  public render() {
    const { currentPositionX, currentPositionY } = this.state;

    return (
      <Circle x={currentPositionX} y={currentPositionY} radius={5} fill="red" />
    );
  }
}
