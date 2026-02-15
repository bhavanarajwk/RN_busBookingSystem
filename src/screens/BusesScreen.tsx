import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../redux/busesSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function BusesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { buses, loading, error } = useSelector(
    (state: RootState) => state.buses
  );

  useEffect(() => {
    dispatch(fetchBuses());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={buses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Bus Name */}
            <Text style={styles.busName}>{item.busName}</Text>

            {/* Route */}
            <Text style={styles.route}>
              {item.from} → {item.to}
            </Text>

            {/* Departure Time */}
            <Text style={styles.departure}>
              Departure: {item.timeFrom} - {item.timeTo}
            </Text>

            {/* Bottom Row */}
            <View style={styles.row}>
              <Text style={styles.price}>₹ {item.price} / seat</Text>

              <View
                style={[
                  styles.seatBadge,
                  item.seatsAvailable < 5 && styles.lowSeats,
                ]}
              >
                <Text style={styles.seatText}>
                  {item.seatsAvailable} seats left
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
  },
  busName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 6,
  },
  route: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  departure: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
  },
  seatBadge: {
    backgroundColor: "#e0f2f1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  lowSeats: {
    backgroundColor: "#ffcdd2",
  },
  seatText: {
    fontSize: 12,
    fontWeight: "500",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
