import { IPosition } from "./IPosition";
import { Direction } from "../Enums/Direction";

export interface IVillian extends IPosition {
  Id: string;
  movingDirection: Direction;
}
