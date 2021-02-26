import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker';
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import { color } from "react-native-reanimated";

export default function LiveDartsComponent(props) {
  return (
    <View style={styles.container}>
      <SingleDartView throwObject={props.throwObject.first} />
      <SingleDartView throwObject={props.throwObject.second} />
      <SingleDartView throwObject={props.throwObject.third} />
    </View>
  );
}

function SingleDartView(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Single");
  return (
    <View
      style={[
        styles.singleDartBox,
        props.throwObject.score
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.lightgray },
      ]}
      onPress={() => setModalVisible(true)}
    > 
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header3_gray}>Correct score</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              mode='dropdown'
              //onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Double" value="double" />
              <Picker.Item label="Triple" value="triple" />
            </Picker>
            <TextInput 
              style={styles.textInput}
              keyboardType='numeric'
              //onChangeText={(text)=> this.onChanged(text)}
              //value={this.state.myNumber}
              maxLength={2}  //setting limit of input
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <Pressable
        alignItems = "center"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>Dart {props.throwObject.throw}</Text>
        <Text style={styles.header1}>
          {props.throwObject.score === parseInt(props.throwObject.score, 10) ? props.throwObject.score : " "}
        </Text>
        <Text style={styles.header3}>
          {props.throwObject.section ? props.throwObject.section : " "}
        </Text>
        <View alignSelf = "flex-start">
          <Icon name="edit" color={colors.white} size={20} />
        </View>
      </Pressable>
    </View>
  );
}

// create a flat list picker function

const styles = StyleSheet.create({
  container: {
    //flex:0.4,
    margin: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 5,
  },
  singleDartBox: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: "stretch",
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
  header3_gray: {
    ...Typography.header3,
    color: colors.gray,
  },
  text: {
    ...Typography.text,
    color: colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.background1,
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
