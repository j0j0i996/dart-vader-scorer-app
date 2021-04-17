import gameCls from "./x01.js";

const params = {
  startscore: 501,
  first_to: "1",
  win_crit: "Leg",
  doubleOut: true,
};

const playerArray = [
  { name: "Max", key: 0 },
  { name: "Joni", key: 1 },
];

var gameInitObj = {
  gameType: "x01",
  playerArray: playerArray,
  params: params,
};

test("Initialize", () => {
  game = new gameCls(playerArray, params);
  expect(game.selPlayerIndex).toEqual(0);
});

test("3 trows", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(10, 1);
  game.onThrow(10, 1);
  game.onThrow(10, 1);
  expect(game.players[0].remaining).toEqual(471);
});

test("Next player", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(10, 1);
  game.onNextPlayer();
  expect(game.selPlayerIndex).toEqual(1);
});

test("Leg end", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(499, 1);
  game.onThrow(1, 2);
  expect(game.players[0].remaining).toEqual(0);
});

test("Leg start", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(499, 1);
  game.onThrow(1, 2);
  game.onNextPlayer();
  expect(game.players[0].remaining).toEqual(501);
  expect(game.selPlayerIndex).toEqual(1);
});

test("gameState", () => {
  game = new gameCls(playerArray, params);
  console.log(game.gameState);
});

test("throwState", () => {
  game = new gameCls(playerArray, params);
  console.log(game.throwState);
});
