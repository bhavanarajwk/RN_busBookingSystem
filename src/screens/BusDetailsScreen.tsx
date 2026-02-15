import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { RootStackParamList } from "../navigation/AppNavigator";
import { RootState } from "../redux/store";
import API from "../api/axiosConfig";

type BusDetailsRouteProp = RouteProp<
  RootStackParamList,
  "BusDetails"
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusDetails"
>;

export default function BusDetailsScreen() {
  const route = useRoute<BusDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { bus } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);

  const [tickets, setTickets] = useState("1");

  const ticketCount = Number(tickets);
  const totalPrice = ticketCount * bus.price;

  const handleBooking = async () => {
    if (!ticketCount || ticketCount <= 0) {
      Alert.alert("Error", "Please enter valid number of tickets");
      return;
    }

    if (ticketCount > bus.seatsAvailable) {
      Alert.alert("Error", "Not enough seats available");
      return;
    }

    try {
      await API.post("/api/bookings/book", {
        userId: user.id,
        busId: bus.id,
        numberOfSeats: ticketCount,
      });

      Alert.alert(
        "Booking Successful 🎉",
        "Your ticket has been booked.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("UpcomingTrips");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Booking Failed", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.busName}>{bus.busName}</Text>

      <Text style={styles.route}>
        {bus.from} → {bus.to}
      </Text>

      <Text style={styles.time}>
        Departure: {bus.timeFrom} - {bus.timeTo}
      </Text>

      <Text style={styles.price}>₹ {bus.price} per seat</Text>

      <Text style={styles.available}>
        Seats Available: {bus.seatsAvailable}
      </Text>

      <Text style={styles.label}>Number of Tickets</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={tickets}
        onChangeText={setTickets}
      />

      <Text style={styles.total}>
        Total Price: ₹ {isNaN(totalPrice) ? 0 : totalPrice}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Tickets</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  busName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 10,
  },
  route: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 8,
  },
  available: {
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
