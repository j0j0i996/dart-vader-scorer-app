import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable, Button, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from "react-native";
import {Picker} from '@react-native-picker/picker';
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import SwipePicker from 'react-native-swipe-picker'
import RNPickerSelect from 'react-native-picker-select';

//import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
//import {LinearGradient} from 'expo-linear-gradient'

export default function LiveDartsComponent(props) {
  return (
    <View style={styles.container}>
      <SingleDartView throwObject={props.throwObject.first} corr_handler={props.corr_handler}/>
      <SingleDartView throwObject={props.throwObject.second} corr_handler={props.corr_handler}/>
      <SingleDartView throwObject={props.throwObject.third} corr_handler={props.corr_handler}/>
    </View>
  );
}

function SingleDartView(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState('1');
  const [selectedField, setSelectedField] = useState('10');

  function MultiSelector(props) {
    return (
      <Pressable
                style={[styles.selectorElem, selectedMultiplier == props.value ? {backgroundColor: colors.primary} : {backgroundColor: colors.white}]}
                onPress={() => {setSelectedMultiplier(props.value);}}>
        <Text style={styles.text, selectedMultiplier == props.value ? {color: colors.white} : {color: colors.primary}}>{props.label}</Text>
      </Pressable>
    );
  }

  var multipliers = [["Single","1"],["Double","2"],["Triple","3"]];
  var elements=[];

  for(var i=0;i<multipliers.length;i++){
    elements.push(<MultiSelector label={multipliers[i][0]} value={multipliers[i][1]}/>);
  }

  return (
    <View
      style={[
        styles.singleDartBox,
        props.throwObject.score === parseInt(props.throwObject.score, 10)
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
          setSelectedField('10')
          setSelectedMultiplier("1")
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header4}>Dart {props.throwObject.throw}</Text>
            <View style={styles.multiSelector}>
              {elements}
            </View>
            <View style={styles.picker}>
              <SwipePicker
                items={get_fields()}
                initialSelectedIndex={10}
                onChange={({ item }) => {
                  var value = item.value
                  setSelectedField(value)
                }}
                height={ 80 }
                width={ 150 }
              />
            </View>

            <View style={styles.buttonList}>
              <Pressable
                style={[styles.button, styles.buttonDiscard]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSelectedField('10');
                  setSelectedMultiplier("1");
                }}
              >
                <Text style={styles.text}>Discard</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => {
                  var success = props.corr_handler(props.throwObject.throw,selectedMultiplier,selectedField);
                  setModalVisible(!success);
                  if (success) {
                    setSelectedField('10');
                    setSelectedMultiplier("1");
                  }
                }}
              >
                <Text style={styles.text}>Save</Text>
              </Pressable>
            </View>
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

function get_fields() {
  var i;
  var fields = [];
  for (i = 0; i <= 20; i++) {
  	fields.push({value:i, label: String(i)});
  }
  fields.push({value:25, label: String(25)})
  return fields
}

const styles = StyleSheet.create({
  container: {
    //flex:0.4,
    margin: 10,
    justifyContent: "space-around",
    flexDirection: "row",
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
  header4: {
    ...Typography.header4,
    color: colors.gray,
  },
  text_large: {
    ...Typography.text_large,
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
    margin: 0,
    backgroundColor: colors.background1,
    borderRadius: 20,
    padding: 10,
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
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 1,
    margin: 10,
  },
  buttonSave: {
    backgroundColor: colors.primary,
  },
  buttonDiscard: {
    backgroundColor: colors.lightgray,
  },
  buttonList: {
    margin: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  multiSelector: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectorElem: {
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.primary,
  },
});