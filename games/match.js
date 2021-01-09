class Player {
    constructor(name, startscore) {
        this.name = name;
        this.remaining = startscore;
        this.sets = 0;
        this.legs = 0;
        this.last_score = 0;
        this.darts_thrown_leg = 0;
        this.darts_thrown_total = 0;
        this.avg = 0;
        this.last_throws = [0, 0, 0];
        this.selected = false;
    }

    onThrow(score, num_throw) {
        if (this.selected) {
            this.remaining -= score;
            this.last_throws[num_throw] = score;
            this.darts_thrown;
        }
    }
}

class Match {
    constructor(playerArray, startscore, sets4win, legs4set, doubleOut) {
            
        var players = []
        playerArray.forEach(function (item, index) {
            let p = new Player(item.name, startscore)
            players.push(p)
        });

        this.players = players
        this.selPlayer = 0;
        this.players[this.selPlayer].selected = true;
        this.lastLegStarter = 0;
        this.lastSetStarter = 0;
        this.num_throw = 0;
        this.startscore = startscore;
        this.sets4win = sets4win;
        this.legs4set = legs4set;
        this.doubleOut = doubleOut;
    }

    onThrow(score, multiplicator) {
        this.num_throw += 1;

        if (this.players[this.selPlayer].remaining - score > 0) {
            // normal throw
            this.players[this.selPlayer].onThrow(score, this.num_throw);
        } 
        else if (this.players[this.selPlayer].remaining - score == 0 &
            ((this.doubleOut & multiplicator ==2) || this.doubleOut!= true)) {
           // end of leg
        }
        else if (this.players[this.selPlayer].remaining - score < 0 ||
            ((this.players[this.selPlayer].remaining - score < 0 && this.doubleOut & multiplicator == 2) && this.doubleOut != true)) {
            // overthrown
            //deactivate player (for potential frustration throw :) )
            this.players[this.selPlayer].selected = false;
        }
        console.log('#' + this.num_throw)
        
        //testing
        if (this.num_throw > 2) {
            this.nextPlayer();
        }
    }

    nextPlayer() {
        //deactivate old player
        this.players[this.selPlayer].selected = false;
        
        //activate new player
        this.num_throw = 0;
        this.selPlayer = (this.selPlayer == this.players.length-1) ? 0 : this.selPlayer += 1;
        this.players[this.selPlayer].last_throws = [0, 0, 0];
        this.players[this.selPlayer].selected = true;
    }
}

const playerArray = [
    { id: '1', name: 'Jonathan'},
    { id: '2', name: 'Sophie' },
];

var match = new Match(playerArray, 501, 3, 3, true)

var i;
for (i = 0; i < 9; i++) {
    console.log('Selected player: ' + match.selPlayer)
    console.log('is 0 selected ' + match.players[0].selected)
    match.onThrow(300,2)
    console.log('\n')
}

//match.onThrow(26,2)
//console.log(match.players[0].remaining)