import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { SERVER_URL } from "../constants";
import { Icon } from "react-native-elements";

const win = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    cam_key: 0,
    cam_alias: "1",
    hide: true,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    cam_key: 1,
    cam_alias: "2",
    hide: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    cam_key: 2,
    cam_alias: "3",
    hide: true,
  },
];

export default class CalibrationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: DATA,
    };
  }

  updateHide(idx) {
    let data = this.state.data;
    data[idx].hide = !data[idx].hide;
    this.setState({ data: data });
  }

  renderRowItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Pressable onPress={() => this.updateHide(index)}>
          <View style={styles.rowHeader}>
            <Text style={styles.header4}>CAMERA {item.cam_alias}</Text>
            <Icon
              name="chevron-thin-down"
              type="entypo"
              size={24}
              color={colors.lightgray}
            />
          </View>
        </Pressable>
        {item.hide ? null : (
          <View style={styles.rowContent}>
            <View style={styles.contentItem}>
              <Text style={styles.header4}>LAST IMAGE:</Text>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={{
                    uri:
                      "http://192.168.0.10:3000/get-last-img/" + item.cam_key,
                  }}
                />
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.header4}>LAST CALIBRATION:</Text>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={{
                    uri: "http://192.168.0.10:3000/get-cal-img/" + item.cam_key,
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonView}>
              <Pressable style={styles.button}>
                <Text style={styles.text}>RUN CALIBRATION</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <FlatList
            numColumns={1}
            data={this.state.data}
            renderItem={this.renderRowItem}
            listKey={(item) => item.id}
          />
        </View>
      </ScrollView>
    );
  }
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
  row: {
    marginTop: 10,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  rowHeader: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContent: {
    backgroundColor: colors.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  contentItem: {
    marginVertical: 5,
  },
  imgView: {
    marginVertical: 10,
    alignItems: "center",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    height: "auto",
    resizeMode: "stretch",
    borderRadius: 10,
  },
  header4: {
    ...Typography.header4,
  },
  header3: {
    ...Typography.header3,
  },
  text: {
    ...Typography.text,
    color: colors.white,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  buttonView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
