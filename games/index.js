import axios from "axios";
import gameCls from "./x01.js";
import { EventRegister } from "react-native-event-listeners";

var gameObj;
/*
function gameHandler(gameInitObj) {
  initialization(gameInitObj);
  gameExec();
}
*/

export function initialization(gameInitObj) {
  if (gameInitObj.gameType == "x01") {
    gameObj = new gameCls(gameInitObj.playerArray, gameInitObj.params);
  }
}

export const gameHandler = async () => {
  //BUILD API INTERFACE
  var data = await waitThrow();
  //var nextPlayer = false;
  //var score = 20;
  //var multiplicator = 1;

  if (nextPlayer) {
    gameObj.onNextPlayer();
    DeviceEventEmitter.emit("DartEvent", "Next player");
  } else {
    gameObj.onThrow(score, multiplicator);
    DeviceEventEmitter.emit("DartEvent", "Throw");
  }
  //return result to app
};

export const waitThrow = async () => {
  const url = `http://0.0.0.0:8090/`;
  var response = await axios.get(url).then((response) => {
    return response;
  });
  console.log(response.data);
  return response.data;
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
