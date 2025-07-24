import { Move } from "../move/move";

export interface Player {
  getMove(): Move;
}
