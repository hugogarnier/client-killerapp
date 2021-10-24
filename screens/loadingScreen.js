import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getStoreData } from "../api/asyncStorage";

export default function loadingScreen({ navigation }) {
  useEffect(() => {
    async function tokenStored() {
      const token = await getStoreData();
      if (token) {
        navigation.replace("Dashboard");
      } else {
        navigation.replace("Home");
      }
    }
    tokenStored();
  });

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#222831' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'blue',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
