import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootState, AppDispatch } from "../redux/store";
import { fetchUserBookings, clearBookings } from "../redux/bookingsSlice";
import { logout } from "../redux/authSlice";
import { RootStackParamList } from "../navigation/AppNavigator";
import API from "../api/axiosConfig";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UpcomingTripsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { upcoming, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [user, dispatch]);

  const onRefresh = async () => {
    if (!user?.id) return;
    setRefreshing(true);
    await dispatch(fetchUserBookings(user.id));
    setRefreshing(false);
  };

  const handleCancel = (bookingId: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this trip?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await API.post(`/api/bookings/cancel/${bookingId}`);
              if (user?.id) {
                dispatch(fetchUserBookings(user.id));
              }
            } catch (error) {
              Alert.alert("Error", "Failed to cancel booking");
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: () => {
          dispatch(logout());
          dispatch(clearBookings());

          navigation.reset({
            index: 0,
            routes: [{ name: "Intro" }],
          });
        },
      },
    ]);
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {upcoming.length === 0 ? (
        <Text style={styles.empty}>No upcoming trips found 🚍</Text>
      ) : (
        <FlatList
          data={upcoming}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            const bus = item.bus;

            return (
              <View style={styles.card}>
                <Text style={styles.route}>
                  {bus?.from} → {bus?.to}
                </Text>

                <Text style={styles.time}>
                  {bus?.timeFrom} - {bus?.timeTo}
                </Text>

                <Text>Seats: {item.numberOfSeats}</Text>

                <Text style={styles.price}>
                  Total: ₹ {item.numberOfSeats * (bus?.price || 0)}
                </Text>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => handleCancel(item.id)}
                >
                  <Text style={styles.cancelText}>Cancel Trip</Text>
                </TouchableOpacity>
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
  logoutBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
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
  time: {
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    color: "#2e7d32",
    marginTop: 5,
  },
  cancelBtn: {
    backgroundColor: "#e53935",
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
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
