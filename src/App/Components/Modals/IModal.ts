import { ModalTypes } from "./ModalTypes";

export interface IModal<T extends object> {
  show: (props: T) => void;
  type: ModalTypes;
}
