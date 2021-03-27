import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";

export default function PlayerScoreComponent(props) {
  return (
    <View style={styles.container}>
      <NameView name={props.name} active={props.active} />
      <ScoreBoardView scoreBoard={props.scoreBoard} />
      <RemainingView remaining={props.remaining} />
      <StatsView stats={props.stats} id={props.id} />
    </View>
  );
}

function NameView(props) {
  if (props.active) {
    return (
      <View style={styles.nameBox}>
        <View style={styles.turnMarker}>
          <Icon name="arrow-right" color={colors.secondary} size={48} />
        </View>
        <View flex={0.8} paddingLeft={"10%"}>
          <Text style={styles.header3} numberOfLines={1}>
            {props.name}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.nameBox}>
      <View flex={0.8} paddingLeft={"10%"}>
        <Text style={styles.header3} numberOfLines={1}>
          {props.name}
        </Text>
      </View>
    </View>
  );
}

function ScoreBoardView(props) {
  const renderItem = ({ item }) => (
    <View style={styles.scoreBoardItem}>
      <Text style={styles.scoreBoardText}>
        {item.k}: {item.v}{" "}
      </Text>
    </View>
  );

  return (
    <View style={styles.scoreBoardList}>
      <FlatList
        horizontal={true}
        data={props.scoreBoard}
        renderItem={renderItem}
        listKey={item => item.k}
      />
    </View>
  );
}

function RemainingView(props) {
  return (
    <View style={styles.remainingBox}>
      <Text style={styles.header1}>{props.remaining}</Text>
    </View>
  );
}

function StatsView(props) {
  const renderItem = ({ item }) => (
    <View style={styles.statsItem}>
      <Text style={styles.statsText}>
        {item.k}: {parseFloat(item.v.toFixed(2))}{" "}
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        horizontal={false}
        data={props.stats}
        listKey={item => item.k}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  nameBox: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: colors.gray,
    borderBottomWidth: 0.5,
  },
  remainingBox: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
    borderColor: colors.gray,
  },
  scoreBoardList: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    //justifyContent: 'space-around',
  },
  scoreBoardItem: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: colors.primary,
  },
  scoreBoardText: {
    ...Typography.text,
    color: colors.white,
  },
  statsItem: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderTopWidth: 0.5,
    borderColor: colors.gray,
  },
  statsText: {
    ...Typography.text,
    color: colors.gray,
  },
  header1: {
    ...Typography.header1,
    color: colors.gray,
  },
  header3: {
    ...Typography.header3,
    color: colors.gray,
  },
  turnMarker: {
    left: "0%",
    position: "absolute",
  },
});
