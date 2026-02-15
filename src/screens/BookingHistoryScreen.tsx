import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUserBookings } from "../redux/bookingsSlice";

export default function BookingHistoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { history, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [user, dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking History 📜</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>No past bookings found</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const bus = item.bus;

            return (
              <View style={styles.card}>
                <Text style={styles.route}>
                  {bus?.from} → {bus?.to}
                </Text>

                <Text>
                  Time: {bus?.timeFrom} - {bus?.timeTo}
                </Text>

                <Text>Seats: {item.numberOfSeats}</Text>

                <Text style={styles.price}>
                  Total: ₹ {item.numberOfSeats * bus?.price}
                </Text>
              </View>
            );
          }}
        />
      )}

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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1976d2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  route: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
