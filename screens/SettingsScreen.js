import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { findServer } from "../interfaces/findBoardServer";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Pressable } from "react-native";
import ConnectedComponent from "../components/ConnectedComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [findingBoard, setFindingBoard] = useState(false);
  const [boardIP, setBoardIP] = useState("Loading...");
  const [boardName, setBoardName] = useState("Loading...");

  useEffect(() => {
    fetchIP();
    fetchName();
  });

  const fetchIP = async () => {
    const fetchedIP = await AsyncStorage.getItem("@server_address");
    setBoardIP(fetchedIP);
  };

  const fetchName = async () => {
    const fetchedName = await AsyncStorage.getItem("@name");
    setBoardName(fetchedName);
  };

  async function onFindBoard() {
    setFindingBoard(true);
    try {
      var res = await findServer(3000, "192.168.0.", 70);
    } catch (e) {
      console.log(e);
    }

    setFindingBoard(false);
    if (res.success) {
      alert("Found board! \nIP: " + res.address);

      try {
        await AsyncStorage.setItem("@server_address", res.address);
        setBoardIP(res.address);
        await AsyncStorage.setItem("@name", res.name);
        setBoardName(res.name);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No board found");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.selectionGroup}>
          {findingBoard ? (
            <Pressable style={styles.buttonInactive}>
              <Text style={styles.small_text}>Finding board...</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={onFindBoard}>
              <Text style={styles.small_text}>Find board in local network</Text>
            </Pressable>
          )}
          <View style={styles.horizontal_box}>
            <Text style={styles.header4}>Last run: </Text>
          </View>
          <View style={styles.horizontal_box}>
            <Text style={styles.text}> Board name: </Text>
            <Text style={styles.text}> {boardName} </Text>
          </View>
          <View style={styles.horizontal_box}>
            <Text style={styles.text}> Board IP: </Text>
            <Text style={styles.text}> {boardIP} </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  buttonInactive: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 10,
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
  selectionGroup: {
    borderRadius: 10,
    margin: 15,
    padding: 10,
    backgroundColor: colors.background2,
  },
  horizontal_box: {
    margin: 0,
    padding: 5,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  header4: {
    ...Typography.header4,
    color: colors.gray,
  },
  text: {
    ...Typography.text,
    color: colors.gray,
  },
});
