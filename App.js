import React from "react";
import { SafeAreaView, Platform, StyleSheet, StatusBar } from "react-native";
import colors from "./config/colors";
import Navigation from "./navigation";


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
