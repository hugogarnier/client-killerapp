import React from "react";
import { StyleSheet, View, Button, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

import Chilling from "../assets/chilling.svg";

export default function welcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text style={{ color: "white", marginBottom: 30, fontSize: 20 }}>
        Bienvenue sur le jeu du Killer
      </Text>
      <Chilling width={350} height={400} />
      <Pressable
        style={styles.containerButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.containerButtonText}>Se connecter</Text>
      </Pressable>
      <Pressable
        style={[styles.containerButton, styles.containerButton2]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.containerButtonText}>Créer un compte</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#222831",
  },

  containerButton: {
    width: 200,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#8292a8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton2: {
    backgroundColor: "#c8cdef",
  },
  containerButtonText: {
    fontSize: 18,
  },
});
