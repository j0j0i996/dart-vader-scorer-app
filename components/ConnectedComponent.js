import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";

export default ConnectedComponent = (props) => {
    //render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Board connection
                </Text>
                <Icon name={props.connected ? "check" : "close"} color={props.connected ? colors.green : colors.red} size={28} />
            </View>
        );
    //}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
},
text: {
    ...Typography.text,
    color: colors.gray,
    alignSelf: 'stretch',
},
});