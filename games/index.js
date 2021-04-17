import axios from "axios";
import gameCls from "./x01.js";
import { EventRegister } from "react-native-event-listeners";

export default class gameHandler {
  constructor(gameInitObj) {
    this.gameObj = new gameCls(gameInitObj.playerArray, gameInitObj.params);
    console.log("game handler initialized");
  }

  onGameEvent(nextPlayer, field, multiplier) {
    if (nextPlayer) {
      this.gameObj.onNextPlayer();
    } else {
      this.gameObj.onThrow(field, multiplier);
    }
  }

  correctScore(throw_idx, multiplier, field) {
    this.gameObj.correctScore(throw_idx, multiplier, field);
  }

  get gameState() {
    return this.gameObj.gameState;
  }

  get throwState() {
    return this.gameObj.throwState;
  }
}
