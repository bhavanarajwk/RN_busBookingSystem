import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import BusesScreen from "../screens/BusesScreen";

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Buses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Buses" component={BusesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
