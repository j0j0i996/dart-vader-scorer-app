import { v4 as uuidv4 } from "uuid";
class Player {
  constructor(name, startscore) {
    this.name = name;
    this.id = uuidv4();
    this.remaining = startscore;
    this.sets = 0;
    this.legs = 0;
    this.last_score = 0;
    this.darts_thrown_leg = 0;
    this.darts_thrown_total = 0;
    this.points_thrown_total = 0;
    this.avg = 0;
    // todo make 3 / 4 below into one turn object
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
    this.throw_valid = [true, true, true];
    this.thrown_in_turn = false;
    this.active = false;
  }

  get playerState() {
    return {
      name: this.name,
      id: this.id,
      remaining: this.remaining,
      active: this.active,
      scoreBoard: [
        { k: "Sets", v: this.sets, id: "81359722-a165-4ad7-b3c6-8c2f0f991dd2" },
        { k: "Legs", v: this.legs, id: "74beedc2-b6f3-49a6-b7c2-4fd75927d524" },
      ],
      stats: [
        {
          k: "Last score",
          v: this.last_score,
          id: "9de9280f-516e-48c6-a41a-33b4a1e64b75",
        },
        {
          k: "Darts thrown",
          v: this.darts_thrown_leg,
          id: "aab75b10-1a83-4a98-8fa5-aa2980e67c19",
        },
        {
          k: "Average",
          v: this.avg,
          id: "be720bb8-e90a-47e0-8434-57467090846e",
        },
      ],
    };
  }

  represent() {
    console.log(
      "Sets: " +
        this.sets +
        " Legs: " +
        this.legs +
        " Remaining: " +
        this.remaining
    );
    console.log("Player active? " + this.active);
    console.log("Darts thrown: " + this.darts_thrown_leg);
    console.log("Points total: " + this.points_thrown_total);
    console.log("Avg: " + this.avg);
  }

  onThrow(score, section, throw_idx) {
    this.remaining -= score;
    this.turn_scores[throw_idx] = score;
    this.turn_sections[throw_idx] = section;
    this.darts_thrown_leg++;
    this.darts_thrown_total++;
    this.points_thrown_total += score;
    this.avg = (this.points_thrown_total / this.darts_thrown_total) * 3;
  }

  onLegWon() {
    this.active = false;
    this.legs++;
    this.darts_thrown_total++;
    this.points_thrown_total += this.remaining;
    this.avg = (this.points_thrown_total / this.darts_thrown_total) * 3;
  }

  onOverthrow(score, section, throw_idx) {
    this.active = false;
    this.turn_scores[throw_idx] = score;
    this.turn_sections[throw_idx] = section;
    this.throw_valid[throw_idx] = false;
    this.darts_thrown_leg++;
    this.darts_thrown_total++;
  }

  resetOverthrow() {
    // reset score
    var turn_scores = this.turn_scores;
    var total = 0;
    var throw_valid = this.throw_valid;
    turn_scores.forEach(function (item, index) {
      if (throw_valid[index]) {
        total += item;
      }
    });

    this.remaining += total;
    this.points_thrown_total -= total;
    this.darts_thrown_leg++;
    this.darts_thrown_total++;
    this.avg = (this.points_thrown_total / this.darts_thrown_total) * 3;
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
    this.throw_valid = [true, true, true];

    console.log(total);
  }

  onNextLeg(startscore) {
    this.remaining = startscore;
    this.darts_thrown_leg = 0;
  }

  onTurnStart() {
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
    this.throw_valid = [true, true, true];
    this.active = true;
    this.thrown_in_turn = false;
  }

  onTurnEnd() {
    this.active = false;
    var score = 0;
    for (var i in this.turn_scores) {
      score += this.turn_scores[i];
    }
    this.last_score = score;
  }

  removeThrow(throw_idx) {
    if (this.throw_valid[throw_idx]) {
      this.remaining += this.turn_scores[throw_idx];
      this.points_thrown_total -= this.turn_scores[throw_idx];
    }
    this.darts_thrown_leg--;
    this.darts_thrown_total--;
    this.turn_sections[throw_idx] = false;
    this.turn_scores[throw_idx] = false;
    this.throw_valid[throw_idx] = true;
  }
}

export default class gameCls {
  constructor(playerArray, params) {
    // params = startscore, sets4win, legs4set, doubleOut
    var players = [];
    playerArray.forEach(function (item, index) {
      let p = new Player(item.name, params.startscore);
      players.push(p);
    });

    this.players = players;
    this.selPlayerIndex = 0;
    this.players[this.selPlayerIndex].active = true;
    this.lastLegStarter = 0;
    this.lastSetStarter = 0;
    this.throw_idx = 0;
    this.await_leg_end = false;
    this.await_reset_overthrow = false;
    this.startscore = params.startscore;

    if (params.win_crit == "Set") {
      this.legs4set = 3;
      this.sets4win = params.first_to;
    } else {
      this.legs4set = params.first_to;
      this.sets4win = 1;
    }

    this.doubleOut = params.doubleOut;
    this.back_up = false; // in case of change operation
  }

  get gameState() {
    var gameState = [];
    this.players.forEach(function (item) {
      gameState.push(item.playerState);
    });
    return gameState;
  }

  get throwState() {
    const scores = this.players[this.selPlayerIndex].turn_scores;
    const sections = this.players[this.selPlayerIndex].turn_sections;
    const throw_valid = this.players[this.selPlayerIndex].throw_valid;

    const throwState = {
      first: {
        id: "1",
        throw: 1,
        score: scores[0],
        section: sections[0],
        valid: throw_valid[0],
      },
      second: {
        id: "2",
        throw: 2,
        score: scores[1],
        section: sections[1],
        valid: throw_valid[1],
      },
      third: {
        id: "3",
        throw: 3,
        score: scores[2],
        section: sections[2],
        valid: throw_valid[2],
      },
    };
    return throwState;
  }

  onThrow(field, multiplier) {
    this.players[this.selPlayerIndex].thrown_in_turn = true;
    //testing
    var score = field * multiplier;
    var section =
      (multiplier == 1 ? "S" : multiplier == 2 ? "D" : "T") + String(field);

    if (this.players[this.selPlayerIndex].active) {
      if (this.players[this.selPlayerIndex].remaining - score > 1) {
        // normal throw
        this.players[this.selPlayerIndex].onThrow(
          score,
          section,
          this.throw_idx
        );
        this.throw_idx += 1;
      } else if (
        (this.players[this.selPlayerIndex].remaining - score == 0) &
        (this.doubleOut & (multiplier == 2) || this.doubleOut != true)
      ) {
        //end of leg
        this.players[this.selPlayerIndex].onThrow(
          score,
          section,
          this.throw_idx
        );
        this.throw_idx += 1;

        this.await_leg_end = true;

        this.players[this.selPlayerIndex].active = false;
      } else {
        //overthrow
        this.players[this.selPlayerIndex].onOverthrow(
          score,
          section,
          this.throw_idx
        );
        this.throw_idx += 1;
        this.await_reset_overthrow = true;
      }
    }
  }

  onNextPlayer() {
    if (this.await_leg_end) {
      this.await_leg_end = false;
      this.onLegEnd();
    } else if (this.await_reset_overthrow) {
      this.await_reset_overthrow = false;
      this.players[this.selPlayerIndex].resetOverthrow();
      this.nextPlayer();
    } else if (this.players[this.selPlayerIndex].thrown_in_turn) {
      this.nextPlayer();
    }
  }

  correctScore(throw_idx, multiplier, field) {
    this.await_leg_end = false;
    this.await_reset_overthrow = false;
    this.players[this.selPlayerIndex].active = true;

    throw_idx--;
    const turn_sections = {
      ...this.players[this.selPlayerIndex].turn_sections,
    };
    const darts_thrown_in_turn = this.throw_idx;

    var i;
    for (i = 2; i >= throw_idx; i--) {
      if (turn_sections[i] != false) {
        this.players[this.selPlayerIndex].removeThrow(i);
        this.throw_idx--;
      }
    }

    var kvArray = [
      ["S", 1],
      ["D", 2],
      ["T", 3],
    ];
    var MultiplierMap = new Map(kvArray);

    for (i = throw_idx; i < 3; i++) {
      if (i == throw_idx) {
        this.throw_idx = i;
        this.onThrow(field, multiplier);
      } else if (turn_sections[i] != false) {
        this.throw_idx = i;
        var field_temp = parseInt(turn_sections[i].substring(1));
        var multiplier_temp = MultiplierMap.get(
          turn_sections[i].substring(0, 1)
        );
        this.onThrow(field_temp, multiplier_temp);
      }
    }
  }

  nextPlayer() {
    //deactivate old player
    this.players[this.selPlayerIndex].onTurnEnd();

    //activate new player
    this.activatePlayer(
      this.selPlayerIndex == this.players.length - 1
        ? 0
        : (this.selPlayerIndex += 1)
    );
  }

  activatePlayer(index) {
    this.throw_idx = 0;
    this.selPlayerIndex = index;
    this.players[this.selPlayerIndex].onTurnStart();
  }

  onLegEnd() {
    this.players[this.selPlayerIndex].onTurnEnd();
    this.players[this.selPlayerIndex].onLegWon();

    if (this.players[this.selPlayerIndex].legs == this.legs4set) {
      //set won
      this.onSetEnd();
    } else {
      //change remaining of all players to startscore
      //change remaining of all players to startscore
      var startscore = this.startscore;
      this.players.forEach(function (item, index) {
        item.onNextLeg(startscore);
      });

      //activate player to start next leg
      var index =
        this.lastLegStarter == this.players.length - 1
          ? 0
          : (this.lastLegStarter += 1);
      this.activatePlayer(index);
      this.lastLegStarter = index;
    }
  }

  onSetEnd() {
    // increase won sets of player
    this.players[this.selPlayerIndex].sets++;

    // set legs of all players to 0
    this.players.forEach(function (item, index) {
      item.legs = 0;
    });

    //change remaining of all players to startscore
    var startscore = this.startscore;
    this.players.forEach(function (item, index) {
      item.onNextLeg(startscore);
    });

    // activate player to start next set
    var index =
      this.lastSetStarter == this.players.length - 1
        ? 0
        : (this.lastSetStarter += 1);
    this.activatePlayer(index);
    this.lastSetStarter = index;
  }
}
