class Player {
  constructor(name, id, startscore) {
    this.name = name;
    this.id = id;
    this.startscore = startscore;
    this.remaining = this.startscore;
    this.sets = 0;
    this.legs = 0;
    this.last_score = 0;
    this.darts_thrown_leg = 0;
    this.darts_thrown_total = 0;
    this.points_thrown_total = 0;
    this.avg = 0;
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
    this.thrown_in_turn = false;
    this.active = false;
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

  get_playerState() {
    return {
      name: this.name,
      id: this.id,
      remaining: this.remaining,
      active: this.active,
      scoreBoard: [
        { k: "Sets", v: this.sets },
        { k: "Legs", v: this.legs },
      ],
      stats: [
        { k: "Last score", v: this.last_score },
        { k: "Darts thrown", v: this.darts_thrown_leg },
        { k: "Average", v: this.avg },
      ],
    };
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
    //deactivate player
    this.active = false;

    this.legs++;
    this.darts_thrown_total++;
    this.points_thrown_total += this.remaining;
    this.avg = (this.points_thrown_total / this.darts_thrown_total) * 3;
  }

  onOverthrow() {
    // deactivate player (for potential frustration throw :) )
    this.active = false;

    // reset score
    var turn_scores = this.turn_scores;
    var total = 0;
    turn_scores.forEach(function (item, index) {
      total += item;
    });

    this.remaining += total;
    this.points_thrown_total -= total;
    this.darts_thrown_leg++;
    this.darts_thrown_total++;
    this.avg = (this.points_thrown_total / this.darts_thrown_total) * 3;
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
  }

  onNextLeg() {
    this.remaining = this.startscore;
    this.darts_thrown_leg = 0;
  }

  onTurnStart() {
    this.turn_scores = [false, false, false];
    this.turn_sections = [false, false, false];
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

  remove_throw(throw_idx) {
    this.remaining += this.turn_scores[throw_idx];
    this.points_thrown_total -= this.turn_scores[throw_idx];
    this.darts_thrown_leg--;
    this.darts_thrown_total--;
    this.turn_sections[throw_idx] = false;
    this.turn_scores[throw_idx] = false;

    console.log('Throw removed')
  }
}

export default class gameCls {
  constructor(playerArray, params) {
    // params = startscore, sets4win, legs4set, doubleOut
    var players = [];
    id = 0;
    playerArray.forEach(function (item, index) {
      let p = new Player(item.name, id, params.startscore);
      players.push(p);
      id += 1;
    });

    this.players = players;
    this.selPlayer = 0;
    this.players[this.selPlayer].active = true;
    this.lastLegStarter = 0;
    this.lastSetStarter = 0;
    this.throw_idx = 0;
    this.startscore = params.startscore;
    this.sets4win = params.sets4win;
    this.legs4set = params.legs4set;
    this.doubleOut = params.doubleOut;
    this.back_up = false; // in case of change operation
  }

  get_gameState() {
    var gameState = [];
    this.players.forEach(function (item) {
      gameState.push(item.get_playerState());
    });
    //console.log(gameState);
    return gameState;
  }

  get_throwState() {
    const scores = this.players[this.selPlayer].turn_scores;
    const sections = this.players[this.selPlayer].turn_sections;
    //console.log(throws);
    const lastThrowsObj = {
      first: { id: "1", throw: 1, score: scores[0], section: sections[0] },
      second: { id: "2", throw: 2, score: scores[1], section: sections[1] },
      third: { id: "3", throw: 3, score: scores[2], section: sections[2] },
    };
    return lastThrowsObj;
  }

  onThrow(field, multiplier) {
    this.players[this.selPlayer].thrown_in_turn = true;
    //testing
    var score = field * multiplier;
    var section =((multiplier == 1) ? 'S' : ((multiplier == 2) ? 'D' : 'T')) + String(field)

    if (this.players[this.selPlayer].active) {
      if (this.players[this.selPlayer].remaining - score > 1) {
        // normal throw
        this.players[this.selPlayer].onThrow(score, section, this.throw_idx);
      } else if (
        (this.players[this.selPlayer].remaining - score == 0) &
        (this.doubleOut & (multiplier == 2) || this.doubleOut != true)
      ) {
        //end of leg
        this.onLegEnd();
      } else {
        //overthrow
        this.onOverthrow();
      }
    }
    this.throw_idx += 1;
  }

  onNextPlayer() {
    console.log('onNextPlayer exec')
    // only if player has thrown yet
    //console.log(this.players[this.selPlayer].thrown_in_turn)
    if (this.players[this.selPlayer].thrown_in_turn) {
      this.nextPlayer();
      console.log('thrown_in_turn')
    }
  }

  correct_score(throw_idx, multiplier, field) {
    throw_idx--;
    console.log(throw_idx) //array starts at 0
    const turn_sections = { ...this.players[this.selPlayer].turn_sections };
    const darts_thrown_in_turn = this.throw_idx

    console.log(turn_sections)
    console.log(this.throw_idx)

    var i;
    for (i = 2; i >= throw_idx; i--) {
      console.log(i)
      if (turn_sections[i] != false) {
        this.players[this.selPlayer].remove_throw(i);
        this.throw_idx--;
      }
    }

    var kvArray = [['S', 1], ['D', 2], ['T', 3]];
    var MultiplierMap = new Map(kvArray);

    console.log(turn_sections)
    for (i = throw_idx; i < 3; i++) {
      if (i == throw_idx) {
        this.throw_idx = i;
        this.onThrow(field, multiplier)
      }
      else if (turn_sections[i] != false) {
        this.throw_idx = i;
        var field_temp = parseInt(turn_sections[i].substring(1))
        var multiplier_temp = MultiplierMap.get(turn_sections[i].substring(0,1));
        console.log('field: ' + field_temp)
        console.log('multiplier: ' + multiplier_temp)
        this.onThrow(field_temp, multiplier_temp)
      }
    }
    //console.log(turn_sections)
  }

  nextPlayer() {
    //deactivate old player
    this.players[this.selPlayer].onTurnEnd();

    //activate new player
    this.activatePlayer(
      this.selPlayer == this.players.length - 1 ? 0 : (this.selPlayer += 1)
    );
  }

  activatePlayer(id) {
    this.throw_idx = 0;
    this.selPlayer = id;
    this.players[this.selPlayer].onTurnStart();
  }

  onLegEnd() {
    console.log("Leg end");

    this.players[this.selPlayer].onLegWon();

    //change remaining of all players to startscore
    this.players.forEach(function (item, index) {
      item.onNextLeg();
    });

    if (this.players[this.selPlayer].legs == this.legs4set) {
      //set won
      this.onSetEnd();
    } else {
      //activate player to start next leg
      var id =
        this.lastLegStarter == this.players.length - 1
          ? 0
          : (this.lastLegStarter += 1);
      this.activatePlayer(id);
      this.lastLegStarter = id;
    }
  }

  onSetEnd() {
    console.log("Set end");
    // increase won sets of player
    this.players[this.selPlayer].sets++;

    // set legs of all players to 0
    this.players.forEach(function (item, index) {
      item.legs = 0;
    });

    // activate player to start next set
    var id =
      this.lastSetStarter == this.players.length - 1
        ? 0
        : (this.lastSetStarter += 1);
    this.activatePlayer(id);
    this.lastSetStarter = id;
  }

  onOverthrow() {
    console.log("Overthrown");
    this.players[this.selPlayer].onOverthrow();
  }
}

if (require.main === module) {
  const playerArray = [
    { id: "1", name: "Jonathan" },
    { id: "2", name: "Sophie" },
  ];

  var match = new Match(playerArray, 501, 1, 2, true);
  /*
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  var recursiveRead = function () {
    rl.question("Next Player? y/n ", function (next) {
      if (next == "y") {
        match.nextPlayer();
        recursiveRead();
      } else {
        rl.question("Score: ", function (score) {
          rl.question("Multiplier: ", function (multiplicator) {
            console.log("\n");
            console.log("Selected player: " + match.selPlayer);
            match.onThrow(parseInt(score), parseInt(multiplicator));
            match.players[match.selPlayer].represent();
            console.log("\n");
            recursiveRead();
          });
        });
      }
    });
  };

  recursiveRead();
  */
}
