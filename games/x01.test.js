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

test("initialize", () => {
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

test("next player", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(10, 1);
  game.onNextPlayer();
  expect(game.selPlayerIndex).toEqual(1);
});

test("leg end", () => {
  game = new gameCls(playerArray, params);
  game.onThrow(501, 1);
  expect(game.throw_idx).toEqual(0);
});
