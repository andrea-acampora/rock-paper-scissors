import { Mode } from "../../model/value-objects/mode";
import { Move } from "../../model/value-objects/move";

export interface ViewObserver {
  onGameModeChange(mode: Mode): void;
  onPlayerMove(move: Move): void;
  onStartRound(): void;
  onResetGame(): void;
}
