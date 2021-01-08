import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../config/colors';
import { Typography } from '../styles';
import { Icon } from 'react-native-elements';


export default function PlayerScoreComponent(props) {
  return (
    <View style={styles.container}>
      <NameView name={props.name} isSelected={props.isSelected}/>
      <ScoreBoardView scoreBoard={props.scoreBoard} />
      <RemainingView remaining={props.remaining} />
      <StatsView stats={props.stats} />
    </View>
  );
}

function NameView(props) {
  if (props.isSelected) {
    return (
      <View style={styles.nameBox}>
        <View style={styles.turnMarker}>
          <Icon name='arrow-right' color={colors.secondary} size={48} />
        </View>
        <View flex={0.8} paddingLeft={'10%'}>
          <Text style={styles.header3} numberOfLines={1}>{props.name}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.nameBox}>
        <View flex={0.8} paddingLeft={'10%'}>
          <Text style={styles.header3} numberOfLines={1}>{props.name}</Text>
        </View>
    </View>
  )
}

function ScoreBoardView(props) {

  const renderItem = ({ item }) => (
    <View style={styles.scoreBoardItem}>
        <Text style={styles.scoreBoardText}>{item.k}: {item.v} </Text>
    </View>
  );

  return (
    <View style={styles.scoreBoardList}>
      <FlatList
        horizontal={true}
        data={props.scoreBoard}
        renderItem={renderItem}
        />
    </View>
  )
}

function RemainingView(props) {
  return (
    <View style={styles.remainingBox}>
          <Text style={styles.header1}>{props.remaining}</Text>
    </View>
  )
}

function StatsView(props) {

  const renderItem = ({ item }) => (
    <View style={styles.scoreBoardItem}>
        <Text style={styles.scoreBoardText}>{item.k}: {item.v} </Text>
    </View>
  );

  return (
    <View style={styles.scoreBoardList}>
      <FlatList
        horizontal={true}s
        data={props.stats}
        renderItem={renderItem}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  nameBox: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: colors.gray,
    borderBottomWidth: 0.5,
  },
  remainingBox: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',
    borderColor: colors.gray,
  },
  scoreBoardItem: {
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  scoreBoardList: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: '',
  },
  scoreBoardText: {
    flex: 1,
    ...Typography.text,
    color: colors.white,
  },
  header1: {
    flex: 1,
    ...Typography.header1,
    color: colors.text1,
  },
  header3: {
    flex: 1,
    ...Typography.header3,
    color: colors.text1,
    //flexWrap: 'wrap',
  },
  turnMarker: {
    left: '0%',
    position: 'absolute',
  },
});