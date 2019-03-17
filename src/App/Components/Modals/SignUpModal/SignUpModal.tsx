import * as React from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { IModal } from "App/Components/Modals/IModal";
import { ModalTypes } from "App/Components/Modals/ModalTypes";

interface IState {
  isOpen: boolean;
  name: string;
}

interface IProps {
  submit: (name: string) => void;
}

interface ICallbackProps {
  name?: string;
}

export default class SignUpModal extends React.Component<IProps, IState>
  implements IModal<ICallbackProps> {
  public type = ModalTypes.SignUp;

  public show = (params: { name?: string }) => {
    this.setState({
      isOpen: true
    });

    if (params && params.name) {
      this.setState({
        name: params.name
      });
    }
  };

  public close = () => {
    this.setState({
      isOpen: false
    });
  };

  public readonly state: IState = {
    isOpen: false,
    name: "Sabina"
  };

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    this.setState({
      name
    });
  };

  private handleSubmitForm = () => {
    this.props.submit(this.state.name);

    this.close();
  };

  public render() {
    const { isOpen, name } = this.state;

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Enter Name</ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="name" sm={4} md={4} lg={4}>
                Enter Player Name
              </Label>
              <Col sm={8} md={8} lg={8}>
                <Input
                  onChange={this.handleNameChange}
                  type="text"
                  name="description"
                  id="name"
                  value={name ? name : ""}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmitForm}>
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}
