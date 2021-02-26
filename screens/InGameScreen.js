import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Platform,
} from "react-native";
import colors from "../config/colors";
import PlayerScoreComponent from "../components/PlayerScoreComponent";
import { render } from "react-dom";
import LiveDartsComponent from "../components/LiveDartsComponent";
import gameHandler  from "../games/index.js";
import { EventRegister } from "react-native-event-listeners";
import { NativeEventEmitter, NativeModules } from "react-native";

const playerArray = [
  {
    name: "Jonathan",
  },
  {
    name: "Sophie",
  },
];

const params = { startscore: 501, sets4win: 1, legs4set: 4, doubleOut: true };

const gameInitObj = {
  gameType: "x01",
  playerArray: playerArray,
  params: params,
};

const game_handler = new gameHandler(gameInitObj);
console.log('game handler initialized')


export default function InGameScreen({ navigation }) {
  
  const [gameState, set_gameState] = useState(game_handler.get_gameState());
  const [throwState, set_throwState] = useState(game_handler.get_throwState());
  
  var ws = new WebSocket('ws://192.168.0.10:8765');

  ws.onopen = () => {
    // connection opened
    ws.send('greetings'); // send a message
  };

  ws.onmessage = (e) => {
    // a message was received
    console.log('message received')
    var res = e.data
    var obj = JSON.parse(res)
    console.log(res);

    game_handler.onGameEvent(obj.nextPlayer, obj.field, obj.multiplier)
    set_gameState(game_handler.get_gameState())
    set_throwState(game_handler.get_throwState())
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log('error')
    console.log(e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log('conn closed')
    console.log(e.code, e.reason);
  };

  const renderPlayerItem = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          numColumns={2}
          data={gameState}
          renderItem={renderPlayerItem}
          listKey={"1"}
        />
      </View>
      <LiveDartsComponent throwObject={throwState} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    flexDirection: "column",
    alignItems: "center",
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
});
