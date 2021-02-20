import axios from "axios";
import gameCls from "./x01.js";
import { EventRegister } from "react-native-event-listeners";
import { DeviceEventEmitter } from "react-native";
//import { w3cwebsocket as W3CWebSocket } from "websocket";

var gameObj;
//192.168.0.96
var ws = new WebSocket('ws://192.168.0.96:8765');

ws.onopen = () => {
  // connection opened
  ws.send('greetings'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log('message received')
  var res = e.data
  var obj = JSON.parse(res)
  console.log(res);

  onGameEvent(obj.nextPlayer, obj.field, obj.multiplier)
};

ws.onerror = (e) => {
  // an error occurred
  console.log('error')
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log('conn closed')
  console.log(e.code, e.reason);
};

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
  //return result to app
  DeviceEventEmitter.emit("DartEvent", "event");
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
