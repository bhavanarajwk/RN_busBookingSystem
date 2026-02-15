import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../redux/busesSlice";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

export default function BusesScreen() {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const { buses } = useSelector((state: RootState) => state.buses);

  useEffect(() => {
    dispatch(fetchBuses());
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Available Buses 🚍</Text>

        <FlatList
          data={buses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("BusDetails", { bus: item })
              }
            >
              <Text style={styles.route}>
                {item.from} → {item.to}
              </Text>
              <Text style={styles.time}>
                {item.timeFrom} - {item.timeTo}
              </Text>
              <Text style={styles.price}>
                ₹ {item.price} / seat
              </Text>
            </TouchableOpacity>
          )}
        />
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
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 5,
  },
  route: {
    fontSize: 20,
    fontWeight: "bold",
  },
  time: {
    color: "#666",
    marginVertical: 5,
  },
  price: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
});
