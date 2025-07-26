import { GameState } from "../model/state/game-state";
import { Mode } from "../model/value-objects/mode";
import { Move } from "../model/value-objects/move";
import { ViewObserver } from "./observer/view-observer";

export class GameView {
  private observer: ViewObserver | null = null;

  private readonly gameModeSelect: HTMLSelectElement;
  private readonly startGameBtn: HTMLButtonElement;
  private readonly resetBtn: HTMLButtonElement;

  private readonly player1Section: HTMLElement;
  private readonly player2Section: HTMLElement;
  private readonly result: HTMLElement;

  private readonly player1Moves: NodeListOf<HTMLButtonElement>;
  private readonly player2Moves: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.gameModeSelect = this.getElement("#game-mode") as HTMLSelectElement;
    this.startGameBtn = this.getElement("#start-btn") as HTMLButtonElement;
    this.player1Section = this.getElement("#player1-move");
    this.player2Section = this.getElement("#player2-move");
    this.player1Moves = this.player1Section.querySelectorAll(
      ".move-btn"
    ) as NodeListOf<HTMLButtonElement>;
    this.player2Moves = this.player2Section.querySelectorAll(".move-btn");
    this.result = this.getElement("#result");
    this.resetBtn = this.getElement("#reset-btn") as HTMLButtonElement;
    this.setupEventListeners();
  }

  setObserver(observer: ViewObserver): void {
    this.observer = observer;
  }

  updateView(state: GameState): void {
    this.handleControls(state);
    this.handlePlayerMove(state);
    this.handleRoundComplete(state);
  }

  private handleControls(state: GameState): void {
    if (state.roundStarted) {
      this.clearButtonState();
      this.gameModeSelect.disabled = true;
      this.startGameBtn.hidden = true;
      this.player1Section.hidden = false;
      this.player2Section.hidden = false;
    } else {
      this.gameModeSelect.disabled = false;
      this.player1Section.hidden = true;
      this.player2Section.hidden = true;
      this.startGameBtn.hidden = false;
    }
  }

  private handlePlayerMove(state: GameState): void {
    this.player1Moves.forEach((btn) => {
      const move = btn.dataset.choice as Move;
      if (state.roundStarted && !state.player1Move) {
        btn.disabled = false;
      } else btn.disabled = true;

      if (state.player1Move === move) {
        btn.classList.add("selected");
      }
    });
    this.player2Moves.forEach((btn) => {
      const move = btn.dataset.choice as Move;
      if (state.player2Move === move) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  private handleRoundComplete(state: GameState): void {
    if (state.result) {
      this.result.hidden = false;
      this.result.textContent = state.result;
      this.resetBtn.hidden = false;
    } else {
      this.result.hidden = true;
      this.resetBtn.hidden = true;
    }
  }

  private setupEventListeners(): void {
    this.gameModeSelect.addEventListener("change", () => {
      this.observer?.onGameModeChange(this.gameModeSelect.value as Mode);
    });
    this.startGameBtn.addEventListener("click", () => {
      this.observer?.onStartRound();
    });
    this.player1Moves.forEach((button) => {
      button.addEventListener("click", () => {
        const move = button.dataset.choice?.toUpperCase() as Move;
        if (move && this.observer) {
          this.observer.onPlayerMove(move);
        }
      });
    });
    this.resetBtn.addEventListener("click", () => {
      this.clearButtonState();
      this.observer?.onResetGame();
    });
  }

  private clearButtonState() {
    this.player1Moves.forEach((btn) => {
      btn.classList.remove("selected");
    });
    this.player2Moves.forEach((btn) => {
      btn.classList.remove("selected");
    });
  }

  private getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element)
      throw new Error(`Element with selector '${selector}' not found`);
    return element;
  }
}
