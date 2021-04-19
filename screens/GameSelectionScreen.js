import React, { useState } from "react";
import { Pressable } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Switch,
  LogBox,
} from "react-native";

import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import MultiSelectorComponent from "../components/MultiSelectorComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Socket } from "../interfaces/socket";
import ConnectedComponent from "../components/ConnectedComponent";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

export default class GameSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    this.state = {
      players: [{ name: "", key: uuidv4() }],
      startscore: 501,
      first_to: "1",
      win_crit: "Leg",
      doubleOut: true,
    };
  }

  componentDidMount() {
    this.socket = new Socket();
    this.socket.sio.on("connect", () => {
      this.setState({ connected: true });
    });
    this.socket.sio.on("disconnect", () => {
      this.setState({ connected: false });
    });
  }

  componentWillUnmount() {
    this.socket.sio.disconnect();
    delete this.socket;
  }

  renderPlayerItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <TextInput
          style={{ flex: 0.9 }}
          onChangeText={(text) => this.changePlayerName(text, item.key)}
          value={this.state.players[index].names}
          placeholder="Choose name"
          maxLength={24}
        />
        <Pressable
          style={{ flex: 0.1 }}
          onPress={() => this.deletePlayer(item.key)}
        >
          <Icon name="delete-forever" color={colors.secondary} size={26} />
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
    if (players.length == 0) {
      players.push({ key: uuidv4() });
    } else {
      players.push({ key: uuidv4() });
    }
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
    const params = {
      startscore: this.state.startscore,
      first_to: this.state.first_to,
      win_crit: this.state.win_crit,
      doubleOut: this.state.doubleOut,
    };
    var gameInitObj = {
      gameType: "x01",
      playerArray: this.state.players,
      params: params,
    };
    return gameInitObj;
  }

  handleStartscoreChange(val) {
    this.setState({ startscore: val });
  }

  handleFirstToChange(val) {
    this.setState({ first_to: val });
  }

  handleWinCritChange(win_crit) {
    this.setState({ win_crit: win_crit });
  }

  handleDoubleOutChange(val) {
    this.setState({ doubleOut: val });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
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
              listKey={(item) => String(item.key)}
            />
          </View>
          <View style={styles.selectionGroup}>
            <View style={styles.horizontal_box}>
              <View style={styles.text_box}>
                <Text style={styles.header4}>STARTSCORE</Text>
              </View>
            </View>
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
            <View style={styles.horizontal_box}>
              <View style={styles.text_box}>
                <Text style={styles.header4}>FIRST TO</Text>
              </View>
            </View>
            <View style={styles.horizontal_box}>
              <View style={{ flex: 0.5 }}>
                <TextInput
                  style={styles.numberInput}
                  onChangeText={(text) => this.handleFirstToChange(text)}
                  value={this.state.first_to}
                  maxLength={2}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>
              <View style={{ flex: 0.5 }}>
                <MultiSelectorComponent
                  data={[
                    { label: "Sets", value: "Set" },
                    { label: "Legs", value: "Leg" },
                  ]}
                  onChange={this.handleWinCritChange.bind(this)}
                  default={this.state.win_crit}
                />
              </View>
            </View>
            <View style={styles.horizontal_box}>
              <View style={styles.text_box}>
                <Text style={styles.header4}>DOUBLE OUT</Text>
              </View>
              <Switch
                trackColor={{ false: colors.lightgray, true: colors.primary }}
                thumbColor={this.state.doubleOut ? colors.white : colors.white}
                onValueChange={this.handleDoubleOutChange.bind(this)}
                value={this.state.doubleOut}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              />
            </View>
          </View>
          <View style={styles.final_button}>
            <Pressable
              style={styles.button}
              onPress={() =>
                this.navigation.navigate("InGameScreen", {
                  gameInitObj: this.getGameInitObj(),
                  connected: this.socket.sio.connected,
                })
              }
            >
              <Text style={styles.text}>CONTINUE</Text>
            </Pressable>
          </View>
        </ScrollView>
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
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  scrollView: {
    backgroundColor: colors.background1,
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
    justifyContent: "flex-start",
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
  final_button: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  small_text: {
    ...Typography.small_text,
    color: colors.white,
  },
  text: {
    ...Typography.text,
    color: colors.white,
  },
  text_box: {
    justifyContent: "space-around",
  },
  header4: {
    ...Typography.header4,
    color: colors.gray,
  },
  numberInput: {
    backgroundColor: colors.white,
    padding: 5,
    margin: 11,
    borderWidth: 1,
  },
  bottomBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
  },
});
