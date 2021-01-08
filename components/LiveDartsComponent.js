import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import { Typography } from '../styles';
import { Icon } from 'react-native-elements';


export default function LiveDartsComponent(props) {
  return (
    <View style={styles.container}>
        <SingleDartView scoreObject={props.scoreObject.first}/>
        <SingleDartView scoreObject={props.scoreObject.second}/>
        <SingleDartView scoreObject={props.scoreObject.third}/>
    </View>
  );
}

function SingleDartView(props) {
  
    return (
      <View style={[styles.singleDartBox, (props.scoreObject.score) ? {backgroundColor: colors.primary} : {backgroundColor: colors.lightgray, } ]}>
          <Text style={styles.text}>Dart {props.scoreObject.throw}</Text>
          <Text style={styles.header1} >{(props.scoreObject.score) ? props.scoreObject.score : ' '}</Text>
          <Text style={styles.header3} >{(props.scoreObject.field) ? props.scoreObject.field : ' '}</Text>
      </View>
    )
 }

const styles = StyleSheet.create({
    container: {
        //flex:0.4,
        margin:10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 5,

    },
    singleDartBox: {
        flex:1,
        padding:10,
        margin:10,
        alignItems:'center',
        borderRadius: 15,
        backgroundColor: colors.lightgray,
    },
    header1: {
        ...Typography.header1,
        color: colors.white,
    },
    header3: {
        ...Typography.header3,
        color: colors.white,
    },
    text: {
        ...Typography.text,
        color: colors.white,
    }
});