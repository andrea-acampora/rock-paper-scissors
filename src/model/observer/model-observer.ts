import { GameState } from "../state/game-state";

export interface ModelObserver {
  update(state: GameState): void;
}
