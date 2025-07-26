import { GameController } from "../../src/controller/game-controller";
import { GameModel } from "../../src/model/game-model";
import { Mode } from "../../src/model/value-objects/mode";
import { Move } from "../../src/model/value-objects/move";
import { GameView } from "../../src/view/game-view";

jest.mock("../../src/view/game-view");

describe("GameController", () => {
  let model: GameModel;
  let view: GameView;
  let controller: GameController;

  beforeEach(() => {
    model = new GameModel();
    view = new GameView();
    controller = new GameController(model, view);
  });

  it("should update model on game mode change", () => {
    controller.onGameModeChange(Mode.COMPUTER_VS_COMPUTER);
    expect(model.getState().mode).toBe(Mode.COMPUTER_VS_COMPUTER);
  });

  it("should start a new round correctly", () => {
    controller.onStartRound();
    expect(model.getState().roundStarted).toBe(true);
  });

  it("should reset the game", () => {
    model.startRound();
    controller.onResetGame();
    expect(model.getState().roundStarted).toBe(false);
    expect(model.getState().player1Move).toBeNull();
    expect(model.getState().player2Move).toBeNull();
  });

  it("should set player move and update model", () => {
    controller.onStartRound();
    controller.onPlayerMove(Move.PAPER);
    expect(model.getState().player1Move).toBe(Move.PAPER);
  });
});
