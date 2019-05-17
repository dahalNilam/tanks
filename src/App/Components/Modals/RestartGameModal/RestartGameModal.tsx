import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";

interface IState {
  isOpen: boolean;
}

interface IProps {
  submit: () => void;
}

export default class RestartGame extends React.Component<IProps, IState> {
  public type = ModalTypes.RestartGame;

  public show = () => {
    this.setState({
      isOpen: true
    });
  };

  public close = () => {
    this.setState({
      isOpen: false
    });
  };

  public readonly state: IState = {
    isOpen: false
  };

  private handleSubmit = () => {
    this.props.submit;

    this.close();
  };

  public render() {
    return (
      <Modal isOpen={this.state.isOpen}>
        <ModalHeader>Restart Game</ModalHeader>

        <ModalBody>
          <h1 style={{ textAlign: "center" }}>Restart Game?</h1>
        </ModalBody>

        <ModalFooter>
          <Button autoFocus color="primary" onClick={this.handleSubmit}>
            Restart
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}
