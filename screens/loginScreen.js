import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Alert,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import login from "../api/login";

import Login from "../assets/login.svg";

const loginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //TODO: mot de passe oublié

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }
    if (!password) {
      Alert.alert("Password field is required.");
    }

    login({ email, password }).then((value) => {
      if (value) {
        navigation.replace("Dashboard");
      } else {
        Alert.alert(
          "Login error",
          "Email et/ou mot de passe incorrect",
          [
            {
              text: "Cancel",
              //   onPress: () => Alert.alert("Cancel Pressed"),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
      }
    });

    setEmail("");
    setPassword("");
  };

  const handleResetPassword = () => {};

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Login width={200} height={200} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='mot de passe'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Pressable style={styles.containerButton} onPress={handlePress}>
        <Text style={styles.containerButtonText}>Se connecter</Text>
      </Pressable>
      <Pressable style={[styles.containerButton, styles.containerButton2]}>
        <Text style={styles.containerButtonText}>Mot de passe oublié ?</Text>
      </Pressable>
    </View>
  );
};

export default loginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#222831",
  },
  inputContainer: {
    width: 300,
    padding: 20,
    //marginBottom: 20,
  },
  inputText: {
    borderRadius: 20,
    paddingStart: 20,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#d3d3d3",
    fontSize: 18,
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
