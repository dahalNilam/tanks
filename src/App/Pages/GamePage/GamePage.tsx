import * as React from "react";
import GameStage from "Src/App/Components/GameStage/GameStage";
import { SignUpModal } from "Src/App/Components/Modals/SignUpModal";
import { registerModal } from "Src/App/Components/Modals";

interface IState {
  playerName: string;
  score: number;
}

export default class Gamepage extends React.Component<{}, IState> {
  public readonly state = {
    playerName: "",
    score: 0
  };

  private handleSubmitPlayerName = (playerName: string) => {
    this.setState({ playerName });
  };

  private handleIncreaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };
  private handleResetScore = () => {
    this.setState({ score: 0 });
  };

  public render() {
    const { playerName, score } = this.state;

    return (
      <div>
        <SignUpModal submit={this.handleSubmitPlayerName} ref={registerModal} />

        <GameStage
          resetScore={this.handleResetScore}
          increaseScore={this.handleIncreaseScore}
        />

        {playerName && (
          <h3 style={{ color: "#FFF" }}>
            {playerName}: {score}
          </h3>
        )}
      </div>
    );
  }
}
