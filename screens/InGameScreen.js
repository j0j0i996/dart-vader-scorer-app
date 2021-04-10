import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../config/colors";
import PlayerScoreComponent from "../components/PlayerScoreComponent";
import LiveDartsComponent from "../components/LiveDartsComponent";
import gameHandler from "../games/index.js";
import ConnectedComponent from "../components/ConnectedComponent";
import { Socket } from "../interfaces/socket";
export default class InGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.gameInitObj = props.route.params.gameInitObj;
    this.navigation = props.navigation;

    this.game_handler = new gameHandler(this.gameInitObj);

    this.state = {
      gameState: this.game_handler.get_gameState(),
      throwState: this.game_handler.get_throwState(),
      connected: false,
    };
  }

  componentDidMount() {
    //this.socket = new SocketGame(game_handler)

    this.navigation.setOptions({
      headerTitle:
        "First to " +
        this.gameInitObj.params.first_to +
        " " +
        this.gameInitObj.params.win_crit +
        (this.gameInitObj.params.first_to > 1 ? "s" : ""),
    });

    this.socket = new Socket();

    this.socket.sio.on("connect", () => {
      this.connected = true;
      this.setState({ connected: true });
      this.socket.sio.emit("start_dect", "");
    });
    this.socket.sio.on("disconnect", () => {
      //this.socket.emit('echo', 'hello')
      this.connected = false;
      this.setState({ connected: false });
      alert("Connection to board lost");
    });
    this.socket.sio.on("dart", (res) => {
      var data = JSON.parse(res);
      this.game_handler.onGameEvent(
        data.nextPlayer,
        data.field,
        data.multiplier
      );
      this.setState({ gameState: this.game_handler.get_gameState() });
      this.setState({ throwState: this.game_handler.get_throwState() });
    });
  }

  //componentWillUnmount() {
  //this.socket.removeAllListeners("dart");
  //console.log('dart listener unregistered');
  //}

  corr_handler(throw_idx, multiplier, field) {
    console.log("Field: " + field);
    throw_idx = parseInt(throw_idx);
    multiplier = parseInt(multiplier);
    field = parseInt(field);

    var score = multiplier * field;
    if (score > 60) {
      alert("Nice try :) \nScore over 60 not possible.");
      return false;
    }

    this.game_handler.correct_score(throw_idx, multiplier, field);
    this.setState({ gameState: this.game_handler.get_gameState() });
    this.setState({ throwState: this.game_handler.get_throwState() });

    return true;
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
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            numColumns={2}
            data={this.state.gameState}
            renderItem={this.renderPlayerItem}
            listKey={(item) => item.id}
          />
        </View>
        <LiveDartsComponent
          throwObject={this.state.throwState}
          corr_handler={this.corr_handler.bind(this)}
        />
        <View style={styles.bottomBar}>
          <ConnectedComponent connected={this.state.connected} />
        </View>
      </View>
    );
  }
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
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
  },
});
