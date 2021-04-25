import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ImageBackground,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import colors from "../config/colors";
import { Typography } from "../styles";
import { Icon } from "react-native-elements";
import { API } from "../interfaces/api";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CAMS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    cam_key: 0,
    cam_alias: "1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    cam_key: 1,
    cam_alias: "2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    cam_key: 2,
    cam_alias: "3",
  },
];

export default class CalibrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.api = new API();

    let cams = CAMS;
    cams.forEach(function (item, index) {
      item.hide = true;
      item.closest_field = "10";
      item.img_hash = Date.now();
      item.img_errored = false;
      item.loading = false;
    });

    this.state = {
      data: cams,
    };
  }

  async componentDidMount() {
    let data = this.state.data;
    let address = await this.api.get_address();
    data.forEach(function (item, index) {
      item.img_src = address + "/get-cal-img/" + item.cam_key;
    });
    this.setState({ data: data });
  }

  updateHide(idx) {
    let data = this.state.data;
    data[idx].hide = !data[idx].hide;
    data[idx].img_errored = false;
    data[idx].img_hash = Date.now();
    this.setState({ data: data });
  }

  handleClosestFieldChange(val, idx) {
    let data = this.state.data;
    data[idx].closest_field = val;
    this.setState({ data: data });
  }

  handleImgError(idx) {
    let data = this.state.data;
    data[idx].img_errored = true;
    this.setState({ data: data });
  }

  async runCalibration(idx) {
    // set state to loading
    let data = this.state.data;
    data[idx].loading = true;
    this.setState({ data: data });

    let closest_field = this.state.data[idx].closest_field;
    var success = await this.api.calibration(idx, closest_field);

    if (!success.connection) {
      alert("Not connected to board");
    } else if (!success.calibration) {
      alert(
        "Calibration has failed. Make sure to: \n - Remove all darts from the board \n - Have a good lighting of the board"
      );
    } else {
      data[idx].img_errored = false;
      data[idx].img_hash = Date.now();
    }

    data[idx].loading = false;
    this.setState({ data: data });
  }

  renderRowItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Pressable onPress={() => this.updateHide(index)}>
          <View style={styles.rowHeader}>
            <Text style={styles.header4}>CAMERA {item.cam_alias}</Text>
            <Icon
              name={item.hide ? "chevron-thin-down" : "chevron-thin-up"}
              type="entypo"
              size={24}
              color={colors.lightgray}
            />
          </View>
        </Pressable>
        {item.hide ? null : item.img_errored ? (
          <View style={styles.rowContent}>
            <Text style={styles.text}>FAIL: No connection to board</Text>
          </View>
        ) : (
          <View style={styles.rowContent}>
            <Text style={styles.header4}>LAST CALIBRATION:</Text>
            <View style={styles.imgView}>
              <ImageBackground
                style={styles.img}
                source={{
                  uri: item.img_src + "?" + item.img_hash,
                }}
                onError={(error) => {
                  this.handleImgError(index);
                }}
              >
                {item.loading ? (
                  <ActivityIndicator size={"large"} color={colors.primary} />
                ) : null}
              </ImageBackground>
            </View>
            <View style={styles.contentItem}>
              <View style={styles.horizontal_box}>
                <View style={styles.text_box}>
                  <Text style={styles.header4}>CLOSEST FIELD:</Text>
                </View>
                <View style={{ flex: 0.7 }}>
                  <TextInput
                    style={styles.numberInput}
                    onChangeText={(val) =>
                      this.handleClosestFieldChange(val, index)
                    }
                    value={item.closest_field}
                    maxLength={2}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                </View>
              </View>
              <View style={styles.buttonView}>
                {item.loading ? (
                  <Pressable style={styles.buttonInactive}>
                    <Text style={styles.textWhite}>CALIBRATING...</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.button}
                    onPress={() => this.runCalibration(index)}
                  >
                    <Text style={styles.textWhite}>RUN CALIBRATION</Text>
                  </Pressable>
                )}
              </View>
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
            listKey={(item) => String(item.id)}
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
    padding: 10,
    backgroundColor: colors.background1,
    borderRadius: 10,
  },
  imgView: {
    marginVertical: 10,
    alignItems: "center",
  },
  img: {
    width: "100%",
    aspectRatio: 1.2,
    height: "auto",
    resizeMode: "contain",
    borderRadius: 10,
    justifyContent: "center",
  },
  header4: {
    ...Typography.header4,
  },
  textWhite: {
    ...Typography.text,
    color: colors.white,
  },
  text: {
    ...Typography.text,
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
  buttonView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  horizontal_box: {
    marginVertical: 10,
    padding: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  numberInput: {
    backgroundColor: colors.white,
    padding: 5,
    margin: 0,
    borderWidth: 1,
  },
});
