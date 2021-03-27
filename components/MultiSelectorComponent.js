import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { onChange } from "react-native-reanimated";
import colors from "../config/colors";

export default function MultiSelectorComponent2(props) {
  const [selectedValue, setSelectedValue] = useState(props.default);

  const handleChange = (value) => {
    setSelectedValue(value);
    props.onChange(value);
  };

  function MultiSelectorItem(props) {
    return (
      <Pressable
        style={[
          styles.selectorElem,
          selectedValue == props.value
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.white },
        ]}
        onPress={() => handleChange(props.value)}
      >
        <Text
          style={
            (styles.text,
            selectedValue == props.value
              ? { color: colors.white }
              : { color: colors.primary })
          }
        >
          {props.label}
        </Text>
      </Pressable>
    );
  }

  var multi_selector = [];
  props.data.forEach((item, index) => {
    multi_selector.push(
      <MultiSelectorItem label={item.label} value={item.value} key={index} />
    );
  });

  return <View style={styles.multiSelector}>{multi_selector}</View>;
}

export function MultiSelectorComponent(props) {
  const [selectedValue, setSelectedValue] = useState(0);

  function MultiSelectorItem(props) {
    return (
      <Text
        style={
          (styles.text,
          selectedValue == props.value
            ? { color: colors.white }
            : { color: colors.primary })
        }
      >
        {props.label}
      </Text>
    );
  }

  var multi_selector = [];
  props.data.forEach((item, index) => {
    console.log("HALO");
    console.log(item.value);
  });

  return (
    <View style={styles.multiSelector}>
      <Text>Hallo</Text>
      <MultiSelectorItem label={"Hi"} value={3} key={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  multiSelector: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectorElem: {
    padding: 10,
    elevation: 1,
    margin: 0,
    backgroundColor: colors.primary,
  },
});
