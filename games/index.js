var GameCls = require("./x01");

var gameObj;

function gameHandler(gameInitObj) {
  initialization(gameInitObj);
  gameExec();
}

function initialization(gameInitObj) {
  if (gameInitObj.gameType == "x01") {
    var GameCls = require("./x01");
    gameObj = new GameCls(gameInitObj.playerArray, gameInitObj.params);
  }
}

function gameExec() {
  // API interface
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  var score;
  rl.question("Score: ", function (score) {
    score = parseInt(score);
    var multiplicator = 2;
    var nextPlayer = false;

    // handle response
    if (nextPlayer) {
      gameObj.onNextPlayer();
    } else {
      gameObj.onThrow(score, multiplicator);
    }

    console.log(gameObj.players[gameObj.selPlayer]);

    //return result to app

    //run again
    gameExec();
  });
}

if (require.main === module) {
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
}
