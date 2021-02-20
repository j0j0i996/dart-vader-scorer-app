import axios from "axios";
import gameCls from "./x01.js";
import { EventRegister } from "react-native-event-listeners";
import { NativeEventEmitter } from "react-native";
//import { w3cwebsocket as W3CWebSocket } from "websocket";

var gameObj;
//192.168.0.96

export function initialization(gameInitObj) {
  if (gameInitObj.gameType == "x01") {
    gameObj = new gameCls(gameInitObj.playerArray, gameInitObj.params);
  }
}

export function onGameEvent(nextPlayer, field, multiplier) {

  if (nextPlayer) {
    gameObj.onNextPlayer();
    //DeviceEventEmitter.emit("DartEvent", "Next player");
  } else {
    gameObj.onThrow(field, multiplier);
    //DeviceEventEmitter.emit("DartEvent", "Throw");
  }
};

export function get_gameState() {
  return gameObj.get_gameState();
}

export function get_throwState() {
  return gameObj.get_throwState();
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
