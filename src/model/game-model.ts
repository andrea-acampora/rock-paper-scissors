import { ModelObserver } from "./observer/model-observer";
import { GameState } from "./state/game-state";
import { Mode } from "./value-objects/mode";
import { Move } from "./value-objects/move";
import { Result } from "./value-objects/result";

export class GameModel {
  private state: GameState;
  private observers: ModelObserver[] = [];

  private readonly rules: Map<Move, Move[]> = new Map([
    [Move.ROCK, [Move.SCISSORS]],
    [Move.PAPER, [Move.ROCK]],
    [Move.SCISSORS, [Move.PAPER]],
  ]);

  constructor() {
    this.state = this.getInitialState();
  }

  getState(): GameState {
    return Object.freeze(this.state);
  }

  setGameMode(mode: Mode): void {
    this.state = {
      ...this.getState(),
      mode,
    };
    this.notifyObservers();
  }

  resetGame(): void {
    this.state = {
      ...this.getInitialState(),
      mode: this.state.mode,
    };
    this.notifyObservers();
  }

  startRound() {
    const mode = this.state.mode;
    if (mode === Mode.COMPUTER_VS_COMPUTER) {
      const player1Move = this.generateRandomMove();
      const player2Move = this.generateRandomMove();
      const result = this.calculateResult(player1Move, player2Move);
      this.state = {
        ...this.getState(),
        roundStarted: true,
        player1Move,
        player2Move,
        result,
      };
    } else {
      this.state = {
        ...this.getState(),
        roundStarted: true,
        player1Move: null,
        player2Move: null,
        result: null,
      };
    }
    this.notifyObservers();
  }

  setPlayerMove(move: Move): void {
    if (!this.state.roundStarted) return;
    const player2Move =
      this.state.mode === Mode.HUMAN_VS_COMPUTER
        ? this.generateRandomMove()
        : null;
    const result = player2Move ? this.calculateResult(move, player2Move) : null;
    this.state = {
      ...this.getState(),
      player1Move: move,
      player2Move,
      result,
    };
    this.notifyObservers();
  }

  addObserver(observer: ModelObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: ModelObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  private generateRandomMove(): Move {
    const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  private calculateResult(player1Move: Move, player2Move: Move) {
    if (player1Move === player2Move) return Result.DRAW;
    if (this.rules.get(player1Move)?.includes(player2Move))
      return Result.PLAYER_1;
    return Result.PLAYER_2;
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this.getState()));
  }

  private getInitialState(): GameState {
    return {
      mode: Mode.HUMAN_VS_COMPUTER,
      roundStarted: false,
      player1Move: null,
      player2Move: null,
      result: null,
    };
  }
}
