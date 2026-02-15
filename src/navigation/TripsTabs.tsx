import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UpcomingTripsScreen from "../screens/UpcomingTripsScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";

export type TripsTabParamList = {
  Upcoming: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<TripsTabParamList>();

export default function TripsTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Upcoming"
        component={UpcomingTripsScreen}
        options={{ title: "Upcoming 🚍" }}
      />
      <Tab.Screen
        name="History"
        component={BookingHistoryScreen}
        options={{ title: "History 📜" }}
      />
    </Tab.Navigator>
  );
}
