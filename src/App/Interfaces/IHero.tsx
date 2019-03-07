import { IPosition } from "./IPosition";
import { Direction } from "../Enums/Direction";

export interface IHero extends IPosition {
  Id: string;
  movingDirection: Direction;
  isFiring?: boolean;
}
