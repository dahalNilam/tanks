import * as React from "react";
import GameStage from "Src/App/Components/GameStage/GameStage";
import { SignUpModal } from "Src/App/Components/Modals/SignUpModal";
import { registerModal, showModalByType } from "Src/App/Components/Modals";
import { ModalTypes } from "Src/App/Components/Modals/ModalTypes";

interface IState {
  playerName: string;
  score: number;
}

export default class Gamepage extends React.Component<{}, IState> {
  public readonly state = {
    playerName: "",
    score: 0
  };

  public componentDidMount() {
    showModalByType(ModalTypes.SignUp);
  }

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
              <div style={{ flex: 2 }}>Bullets Left</div>
              <GameStage
                style={{
                  flex: 3,
                  textAlign: "center",
                  margin: "auto",
                  border: "1px solid grey"
                }}
                resetScore={this.handleResetScore}
                increaseScore={this.handleIncreaseScore}
              />
              <div style={{ flex: 2 }}>
                {" "}
                {playerName && (
                  <h3 style={{ color: "#FFF" }}>
                    {playerName}: {score}
                  </h3>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
