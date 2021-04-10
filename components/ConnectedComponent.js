import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";

export default ConnectedComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: props.connected ? colors.lightgreen : colors.red },
        ]}
      >
        {props.connected ? "CONNECTED TO BOARD" : "NOT CONNECTED TO BOARD"}
      </Text>
    </View>
  );
};

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
