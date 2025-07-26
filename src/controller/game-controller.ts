import { GameModel } from "../model/game-model";
import { ModelObserver } from "../model/observer/model-observer";
import { GameState } from "../model/state/game-state";
import { Mode } from "../model/value-objects/mode";
import { Move } from "../model/value-objects/move";
import { GameView } from "../view/game-view";
import { ViewObserver } from "../view/observer/view-observer";

export class GameController implements ModelObserver, ViewObserver {
  constructor(
    private readonly model: GameModel,
    private readonly view: GameView
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.model.addObserver(this);
    this.view.setObserver(this);
    this.view.updateView(this.model.getState());
  }

  update(state: GameState): void {
    this.view.updateView(state);
  }

  onGameModeChange(mode: Mode): void {
    this.model.setGameMode(mode);
  }

  onPlayerMove(move: Move): void {
    this.model.setPlayerMove(move);
  }

  onStartRound(): void {
    this.model.startRound();
  }

  onResetGame(): void {
    this.model.resetGame();
  }
}
