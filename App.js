import React from 'react';
import { View, SafeAreaView, Platform, StyleSheet, StatusBar} from 'react-native';
import { Typography} from './styles';
import  colors from  './config/colors'
import InGameScreen from './screens/InGameScreen';

export default function App() {
  console.log("App executed")

  return (
    <SafeAreaView style={styles.container}>
      <InGameScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});

