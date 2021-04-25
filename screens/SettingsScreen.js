import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { findServer } from "../interfaces/findBoardServer";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Pressable } from "react-native";
import ConnectedComponent from "../components/ConnectedComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [findingBoard, setFindingBoard] = useState(false);

  async function onFindBoard() {
    setFindingBoard(true);
    var res = await findServer(3000, "192.168.0.", 15);

    setFindingBoard(false);
    if (res.success) {
      alert("Found board! \nIP: " + res.address);

      console.log();

      try {
        await AsyncStorage.setItem("@server_address", res.address);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No board found");
    }
  }

  return (
    <View style={styles.container}>
      {findingBoard ? (
        <Pressable style={styles.buttonInactive}>
          <Text style={styles.small_text}>Finding board...</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={onFindBoard}>
          <Text style={styles.small_text}>Find board in local network</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  buttonInactive: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.gray,
    alignItems: "center",
  },
  small_text: {
    ...Typography.small_text,
    color: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
