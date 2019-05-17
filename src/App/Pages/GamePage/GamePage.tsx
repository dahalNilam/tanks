import * as React from "react";
import GameStage from "Src/App/Components/GameStage/GameStage";
import { SignUpModal } from "Src/App/Components/Modals/SignUpModal";
import { registerModal, showModalByType } from "Src/App/Components/Modals";
import { ModalTypes } from "Src/App/Components/Modals/ModalTypes";
import BulletStock from "Src/App/Components/BulletStock/BulletStock";
import ScoreBoard from "Src/App/Components/ScoreBoard/ScoreBoard";
import RestartGame from "Src/App/Components/Modals/RestartGameModal/RestartGameModal";

interface IState {
  playerName: string;
  score: number;
  bulletsLeft: number;
  bulletsUsed: number;
}

export default class Gamepage extends React.Component<{}, IState> {
  public readonly state = {
    playerName: "",
    score: 0,
    bulletsLeft: 10,
    bulletsUsed: 0
  };

  public componentDidMount() {
    showModalByType(ModalTypes.SignUp);
  }

  private showRestartModal = () => {
    showModalByType(ModalTypes.RestartGame);
  };

  private handleSubmitPlayerName = (playerName: string) => {
    this.setState({ playerName });
  };

  private handleRestartGame = () => {
    console.log("Restart");
  };

  private handleIncreaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  private handleResetScore = () => {
    this.setState({ score: 0 });
  };

  private handleReduceBulletsLeft = () => {
    this.setState({
      bulletsLeft: this.state.bulletsLeft - 1
    });
  };

  private handleUpdateBulletsUsed = () => {
    this.setState(
      {
        bulletsUsed: this.state.bulletsUsed + 1
      },
      () => {
        this.state.bulletsUsed >= 10 && this.showRestartModal();
      }
    );
  };

  public render() {
    const { playerName, score, bulletsLeft, bulletsUsed } = this.state;

    return (
      <>
        <SignUpModal submit={this.handleSubmitPlayerName} ref={registerModal} />

        {playerName && (
          <>
            <h1
              style={{
                textAlign: "center"
              }}
            >
              Tanks
            </h1>

            <div style={{ display: "flex" }}>
              <BulletStock bulletsLeft={bulletsLeft} />

              <GameStage
                style={{
                  flex: 3,
                  textAlign: "center",
                  margin: "auto",
                  border: "1px solid grey"
                }}
                bulletsLeft={bulletsLeft}
                resetScore={this.handleResetScore}
                increaseScore={this.handleIncreaseScore}
                reduceBulletsLeft={this.handleReduceBulletsLeft}
                updateBulletsUsed={this.handleUpdateBulletsUsed}
              />

              <ScoreBoard playerName={playerName} score={score} />
            </div>
          </>
        )}
        <RestartGame submit={this.handleRestartGame} ref={registerModal} />
      </>
    );
  }
}
