import React, { useState } from "react";
import { Pressable } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";

import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import MultiSelectorComponent from "../components/MultiSelectorComponent";

const params = { startscore: 501, sets4win: 1, legs4set: 3, doubleOut: true };

export default class GameSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    this.state = {
      players: [{ name: "", key: 0 }],
      startscore: 501,
    };
  }

  renderPlayerItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <TextInput
          //style={styles.input}
          onChangeText={(text) => this.changePlayerName(text, item.key)}
          value={this.state.players[index].names}
          placeholder="Choose name"
          maxLength={24}
        />
        <Pressable
          //style={styles.button}
          onPress={() => this.deletePlayer(item.key)}
        >
          <Icon name="delete-forever" color={colors.secondary} size={24} />
        </Pressable>
      </View>
    );
  };

  changePlayerName(new_name, key) {
    let players = this.state.players;
    players[players.findIndex((x) => x.key === key)].name = new_name;
    this.setState({ players: players });
  }

  addPlayer() {
    let players = this.state.players;
    players.push({ key: players[players.length - 1].key + 1 });
    this.setState({ players });
  }

  deletePlayer(key) {
    let players = this.state.players;
    const index = players.findIndex((x) => x.key === key);
    if (index > -1) {
      players.splice(index, 1);
    }
    this.setState({ players: players });
  }

  getGameInitObj() {
    var gameInitObj = {
      gameType: "x01",
      playerArray: this.state.players,
      params: params,
    };
    return gameInitObj;
  }

  handleStartscoreChange(new_startscore) {
    console.log(new_startscore);
    this.setState({ startscore: new_startscore });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectionGroup}>
          <View style={styles.horizontal_box}>
            <View style={styles.text_box}>
              <Text style={styles.header4}>PLAYERS</Text>
            </View>

            <Pressable style={styles.button} onPress={() => this.addPlayer()}>
              <Text style={styles.small_text}>ADD PLAYER</Text>
            </Pressable>
          </View>
          <FlatList
            numColumns={1}
            data={this.state.players}
            renderItem={this.renderPlayerItem}
            listKey={(item) => item.key}
          />
        </View>
        <View style={styles.selectionGroup}>
          <View style={styles.horizontal_box}>
            <View style={styles.text_box}>
              <Text style={styles.header4}>STARTSCORE</Text>
              <MultiSelectorComponent
                data={[
                  { label: "101", value: 101 },
                  { label: "301", value: 301 },
                  { label: "501", value: 501 },
                  { label: "701", value: 701 },
                ]}
                onChange={this.handleStartscoreChange.bind(this)}
                default={this.state.startscore}
              />
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() =>
            this.navigation.navigate("InGameScreen", {
              gameInitObj: this.getGameInitObj(),
            })
          }
        >
          <Text style={styles.small_text}>CONTINUE</Text>
        </Pressable>
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
  selectionGroup: {
    borderRadius: 10,
    margin: 15,
    padding: 10,
    backgroundColor: colors.background2,
  },
  listItem: {
    borderRadius: 10,
    margin: 5,
    padding: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  horizontal_box: {
    margin: 0,
    padding: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  small_text: {
    ...Typography.small_text,
    color: colors.white,
  },
  text_box: {
    justifyContent: "space-around",
  },
  header4: {
    ...Typography.header4,
    color: colors.gray,
  },
});
