import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BusesScreen from "../screens/BusesScreen";
import BusDetailsScreen from "../screens/BusDetailsScreen";
import TripsTabs from "../navigation/TripsTabs";

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Signup: undefined;
  Buses: undefined;
  BusDetails: { bus: any };
  Trips: undefined;
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
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Buses" component={BusesScreen} />
        <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
        <Stack.Screen name="Trips" component={TripsTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
