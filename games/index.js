import axios from "axios";
import gameCls from "./x01.js";
import { EventRegister } from "react-native-event-listeners";

export default class gameHandler {
  constructor(gameInitObj) {
    this.gameObj = new gameCls(gameInitObj.playerArray, gameInitObj.params)
    console.log('game handler initialized') 
  }

  onGameEvent(nextPlayer, field, multiplier) {

    if (nextPlayer) {
      this.gameObj.onNextPlayer();
      //DeviceEventEmitter.emit("DartEvent", "Next player");
    } else {
      this.gameObj.onThrow(field, multiplier);
      //DeviceEventEmitter.emit("DartEvent", "Throw");
    }
  };

  correct_score(throw_idx, multiplier, field) {
    this.gameObj.correct_score(throw_idx, multiplier, field)
  }

  get_gameState() {
    return this.gameObj.get_gameState();
  }

  get_throwState() {
    return this.gameObj.get_throwState();
  }
}

if (require.main === module) {
  var test = waitThrow();
  console.log(test);

  /*
  const playerArray = [
    { id: "1", name: "Jonathan" },
    { id: "2", name: "Sophie" },
  ];

  const params = { startscore: 501, sets4win: 2, legs4set: 3, doubleOut: true };
  const gameInitObj = {
    gameType: "x01",
    playerArray: playerArray,
    params: params,
  };
  gameHandler(gameInitObj);
  */
}
