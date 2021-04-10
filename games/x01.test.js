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

game = new gameCls(playerArray, params);

test("uuid", () => {
  len = game.players[0].key.length;
  console.log(len);
  expect(len).toEqual(36);
});
