import { GameController } from "./controller/game-controller";
import { GameModel } from "./model/game-model";
import { GameView } from "./view/game-view";

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);
