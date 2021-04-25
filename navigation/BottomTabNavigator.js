import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import InGameScreen from "../screens/InGameScreen";
import CalibrationScreen from "../screens/CalibrationScreen";
import GameSelectionScreen from "../screens/GameSelectionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import colors from "../config/colors";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.primary,
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name="Calibration"
        component={CalibrationTabNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              name="tune"
              type="materialicons"
              color={colors.primary}
              size={28}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Game"
        component={GameTabNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              name="play-circle-outline"
              type="materialicons"
              color={colors.primary}
              size={28}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsTabNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              name="setting"
              type="antdesign"
              color={colors.primary}
              size={28}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const GameTabStack = createStackNavigator();

function GameTabNavigator() {
  return (
    <GameTabStack.Navigator>
      <GameTabStack.Screen
        name="GameSelectionScreen"
        component={GameSelectionScreen}
        options={{ headerTitle: "Game Selection" }}
      />
      <GameTabStack.Screen
        name="InGameScreen"
        component={InGameScreen}
        options={{ headerTitle: "Game" }}
      />
    </GameTabStack.Navigator>
  );
}

const CalibrationTabStack = createStackNavigator();

function CalibrationTabNavigator() {
  return (
    <CalibrationTabStack.Navigator>
      <CalibrationTabStack.Screen
        name="CalibrationTabScreen"
        component={CalibrationScreen}
        options={{ headerTitle: "Calibration" }}
      />
    </CalibrationTabStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen
        name="SettingsTabScreen"
        component={SettingsScreen}
        options={{ headerTitle: "Settings" }}
      />
    </SettingsTabStack.Navigator>
  );
}
