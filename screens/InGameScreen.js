import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList, Platform,} from "react-native";
import colors from "../config/colors";
import PlayerScoreComponent from "../components/PlayerScoreComponent";
import LiveDartsComponent from "../components/LiveDartsComponent";
import gameHandler  from "../games/index.js";
import ConnectedComponent from "../components/ConnectedComponent";
import { Socket } from "../interfaces/socket"

const playerArray = [
  {
    name: "Jonathan",
  },
  {
    name: "Sophie",
  },
];

const params = { startscore: 501, sets4win: 1, legs4set: 3, doubleOut: true };

const gameInitObj = {
  gameType: "x01",
  playerArray: playerArray,
  params: params,
};

let game_handler = new gameHandler(gameInitObj);
export default class InGameScreen extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      gameState: game_handler.get_gameState(),
      throwState: game_handler.get_throwState(),
      connected: false,
     };
  }

  componentDidMount() {
    //this.socket = new SocketGame(game_handler)
    this.socket = new Socket()

    this.socket.sio.on('connect', () => {
      console.log('Outside')
      this.connected = true
      this.setState({connected: true});
      this.socket.sio.emit('start_dect','')
    })
    this.socket.sio.on('disconnect', () => {
        //this.socket.emit('echo', 'hello')
        this.connected = false
        this.setState({connected: false});
        alert('Connection to board lost')
    })
    this.socket.sio.on('dart', (res) => {
      console.log('received');
      var data = JSON.parse(res);
      game_handler.onGameEvent(data.nextPlayer, data.field, data.multiplier);
      this.setState({gameState: game_handler.get_gameState()});
      this.setState({throwState: game_handler.get_throwState()});
    })
  }

  //componentWillUnmount() {
    //this.socket.removeAllListeners("dart");
    //console.log('dart listener unregistered');
  //}

  corr_handler(throw_idx, multiplier, field) {
    console.log('Field: ' + field)
    throw_idx = parseInt(throw_idx)
    multiplier = parseInt(multiplier)
    field = parseInt(field)
  
    var score = multiplier * field
    if (score > 60) {
      alert("Nice try :) \nScore over 60 not possible.")
      return false
    };
    
    game_handler.correct_score(throw_idx, multiplier, field)
    this.setState({gameState: game_handler.get_gameState()})
    this.setState({throwState: game_handler.get_throwState()})

    return true
  }

  renderPlayerItem = ({ item }) => (
    <View
      style={[styles.item, item.id % 2 == 0 ? {} : { borderRightWidth: 2 }]}
    >
      <PlayerScoreComponent
        name={item.name}
        id={item.id}
        remaining={item.remaining}
        active={item.active}
        scoreBoard={item.scoreBoard}
        stats={item.stats}
        active={item.active}
      />
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            numColumns={2}
            data={this.state.gameState}
            renderItem={this.renderPlayerItem}
            listKey={"1"}
          />
        </View>
        <LiveDartsComponent throwObject={this.state.throwState} corr_handler={this.corr_handler.bind(this)} />
        <View style={styles.bottomBar}>
          <ConnectedComponent connected={this.state.connected}/>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.gray,
  },
  horizontal_box: {
    flexDirection: "row",
    width: "100%",
  },
  item: {
    flex: 0.5,
    borderColor: colors.gray,
    borderBottomWidth: 2,
  },
  list: {
    flexDirection: "row",
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
