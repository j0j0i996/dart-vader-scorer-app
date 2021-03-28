import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { onChange } from "react-native-reanimated";
import colors from "../config/colors";
import { Typography } from "../styles";

export default function MultiSelectorComponent(props) {
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
            selectedValue == props.value
              ? { color: colors.white }
              : { color: colors.primary }
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

const styles = StyleSheet.create({
  multiSelector: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectorElem: {
    flex: 1,
    padding: 10,
    margin: 0,
    borderWidth: 1,
    borderColor: colors.background2,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
});
