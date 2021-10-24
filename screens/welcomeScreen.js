import React from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function welcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text style={{ color: "white", marginBottom: 30, fontSize: 20 }}>
        Bienvenue sur le jeu du Killer
      </Text>

      <Button
        containerStyle={styles.containerButton}
        onPress={() => navigation.navigate("Login")}
        title='Se connecter'
      />
      <Button
        containerStyle={styles.containerButton}
        onPress={() => navigation.navigate("Register")}
        title='Créer un compte'
      />
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
    marginTop: 10,
    borderRadius: 20,
  },
});
