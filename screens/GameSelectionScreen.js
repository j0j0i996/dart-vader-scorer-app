import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../config/colors";

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

export default function GameSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Game Selection</Text>
      <Button
      title="Go to game"
      onPress={() =>
        navigation.navigate('InGameScreen', { gameInitObj: gameInitObj })
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});