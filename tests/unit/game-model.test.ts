import { GameModel } from "../../src/model/game-model";
import { Mode } from "../../src/model/value-objects/mode";
import { Move } from "../../src/model/value-objects/move";

describe("GameModel", () => {
  let model: GameModel;

  beforeEach(() => {
    model = new GameModel();
  });

  it("should start with default state", () => {
    const state = model.getState();
    expect(state.mode).toBe(Mode.HUMAN_VS_COMPUTER);
    expect(state.roundStarted).toBe(false);
    expect(state.player1Move).toBeNull();
    expect(state.player2Move).toBeNull();
    expect(state.result).toBeNull();
  });

  it("should be possible to set the game mode correctly", () => {
    model.setGameMode(Mode.COMPUTER_VS_COMPUTER);
    expect(model.getState().mode).toBe(Mode.COMPUTER_VS_COMPUTER);
  });

  it("should be possible to start a human vs computer round correctly", () => {
    model.setGameMode(Mode.HUMAN_VS_COMPUTER);
    model.startRound();
    const state = model.getState();
    expect(state.roundStarted).toBe(true);
    expect(state.player1Move).toBeNull();
    expect(state.player2Move).toBeNull();
    expect(state.result).toBeNull();
  });

  it("should be possible to start a computer vs computer round correctly", () => {
    model.setGameMode(Mode.COMPUTER_VS_COMPUTER);
    model.startRound();
    const state = model.getState();
    expect(state.player1Move).not.toBeNull();
    expect(state.player2Move).not.toBeNull();
    expect(state.result).not.toBeNull();
  });

  it("should be possible to set a player move correctly", () => {
    model.startRound();
    model.setPlayerMove(Move.ROCK);
    const state = model.getState();
    expect(state.player1Move).toBe(Move.ROCK);
    expect(state.player2Move).not.toBeNull();
    expect(state.result).not.toBeNull();
    expect(state.roundStarted).toBe(true);
  });

  it("should reset game state", () => {
    model.startRound();
    model.setPlayerMove(Move.PAPER);
    model.resetGame();
    const state = model.getState();
    expect(state.player1Move).toBeNull();
    expect(state.player2Move).toBeNull();
    expect(state.result).toBeNull();
    expect(state.roundStarted).toBe(false);
  });
});
