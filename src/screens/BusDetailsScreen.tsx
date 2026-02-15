import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import API from "../api/axiosConfig";

export default function BusDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { bus } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);

  const [tickets, setTickets] = useState("1");

  const ticketCount = Number(tickets);
  const total = ticketCount * bus.price;

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
        userId: user?.id,
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
              navigation.reset({
                index: 0,
                routes: [{ name: "Trips" }],

              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Booking Failed", "Something went wrong");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7",
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Bus Details 🚍</Text>

        <View style={styles.card}>
          <Text style={styles.route}>
            {bus.from} → {bus.to}
          </Text>

          <Text>
            {bus.timeFrom} - {bus.timeTo}
          </Text>

          <Text style={styles.price}>₹ {bus.price}</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tickets}
            onChangeText={setTickets}
          />

          <Text style={styles.total}>Total: ₹ {total}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleBooking}
          >
            <Text style={styles.buttonText}>Book Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1976d2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  route: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    color: "#2e7d32",
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
