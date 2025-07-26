import { Mode } from "../value-objects/mode";
import { Move } from "../value-objects/move";
import { Result } from "../value-objects/result";

export interface GameState {
  mode: Mode;
  roundStarted: boolean;
  player1Move: Move | null;
  player2Move: Move | null;
  result: Result | null;
}
