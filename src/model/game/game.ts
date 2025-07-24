import { Player } from "../player/Player";

export class Game {
  constructor(private player1: Player, private player2: Player) {}

  play(): string {
    const move1 = this.player1.getMove();
    const move2 = this.player2.getMove();

    if (move1 === move2) return "Pareggio!";
    if (
      (move1 === "rock" && move2 === "scissors") ||
      (move1 === "scissors" && move2 === "paper") ||
      (move1 === "paper" && move2 === "rock")
    ) {
      return `Giocatore 1 vince! (${move1} vs ${move2})`;
    }

    return `Giocatore 2 vince! (${move2} vs ${move1})`;
  }
}
