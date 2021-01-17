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
import {
  initialization,
  gameHandler,
  get_gameState,
  get_throwState,
} from "../games/index.js";
import { EventRegister } from "react-native-event-listeners";
import { DeviceEventEmitter } from "react-native";

export default function InGameScreen({ navigation }) {
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

  initialization(gameInitObj);
  const [gameState, setgameState] = useState(get_gameState());
  const [throwState, setthrowState] = useState(get_throwState());

  gameHandler();

  const listener = DeviceEventEmitter.addListener("DartEvent", (data) => {
    console.log(data);
    setgameState(get_gameState());
    setthrowState(get_throwState());
  });

  /*
  gameExec = () => {
    gameHandler();
    gameState = get_gameState();
    //setgameState(new_gameState);
    //const new_throwState = get_throwState();
    //setthrowState(new_throwState);
    console.log(gameState);
    //gameExec();
  };
  */

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
