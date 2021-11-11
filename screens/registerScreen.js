import React, { useState } from "react";
import { StyleSheet, View, Pressable, TextInput, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import register from "../api/register";

import Control from "../assets/control.svg";

const registerScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const emptyState = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  const handlePress = () => {
    if (!firstname) {
      Alert.alert("First name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
      setPassword("");
    } else {
      register({ firstname, lastname, email, password }).then((value) => {
        setIsRegistered(value);
      });
      navigation.navigate("Loading");
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Control width={200} height={100} />

      <Text h3 style={{ color: "white", marginVertical: 20, fontSize: 18 }}>
        Créer un compte
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='prénom *'
          value={firstname}
          onChangeText={(name) => setFirstname(name)}
        />
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          placeholder='nom *'
          value={lastname}
          onChangeText={(name) => setLastname(name)}
        />

        <TextInput
          style={styles.inputText}
          placeholder='email *'
          autoCapitalize='none'
          value={email}
          onChangeText={(email) => setEmail(email)}
          type='email'
          autoCapitalize='none'
        />

        <TextInput
          style={styles.inputText}
          placeholder='mot de passe *'
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>
      <Pressable style={styles.containerButton2} onPress={handlePress}>
        <Text style={styles.containerButtonText}>Créer le compte</Text>
      </Pressable>
      <Pressable
        style={[styles.containerButton2, styles.containerButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.containerButtonText}>Déjà un compte ?</Text>
      </Pressable>
    </View>
  );
};

export default registerScreen;

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
  },
  inputText: {
    borderRadius: 20,
    paddingStart: 20,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#d3d3d3",
    fontSize: 16,
  },
  containerButton2: {
    width: 200,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#8292a8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    backgroundColor: "#c8cdef",
  },
  containerButtonText: {
    fontSize: 18,
  },
});
