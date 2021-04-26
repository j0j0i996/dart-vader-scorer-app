import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import { Socket } from "../interfaces/socket";

export default class ConnectedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
  }

  componentDidMount() {
    this.socket = new Socket();
    this.socket.start_socket().then(() => {
      this.socket.sio.on("connect", () => {
        this.setState({ connected: true });
        console.log("connected");
      });
      this.socket.sio.on("disconnect", () => {
        this.setState({ connected: false });
      });
    });
  }

  componentWillUnmount() {
    this.socket.sio.disconnect();
    delete this.socket;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            { color: this.state.connected ? colors.lightgreen : colors.red },
          ]}
        >
          {this.state.connected
            ? "CONNECTED TO BOARD"
            : "NOT CONNECTED TO BOARD"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.white,
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: colors.lightgray,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  text: {
    ...Typography.small_text,
    color: colors.white,
  },
});
