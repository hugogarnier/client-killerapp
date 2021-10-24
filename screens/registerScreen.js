import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import register from "../api/register";

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

      <Text h3 style={{ color: "white", marginBottom: 50 }}>
        Créer un compte
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          placeholder='prénom *'
          value={firstname}
          onChangeText={(name) => setFirstname(name)}
        />
        <TextInput
          autoCapitalize='none'
          placeholder='nom *'
          value={lastname}
          onChangeText={(name) => setLastname(name)}
        />

        <TextInput
          placeholder='email *'
          autoCapitalize='none'
          value={email}
          onChangeText={(email) => setEmail(email)}
          type='email'
          autoCapitalize='none'
        />

        <TextInput
          placeholder='mot de passe *'
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
        />
      </View>
      <Button onPress={handlePress} title='Créer le compte' />
      <View style={styles.signInContainer}>
        <Text style={{ color: "white" }}>Déjà un compte ?</Text>
        <Button
          title='Se connecter'
          onPress={() => navigation.navigate("Login")}
        />
      </View>
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
    // backgroundColor: "#222831",
  },
  signInContainer: {
    padding: 20,
  },
  inputContainer: {
    width: 300,
  },
  containerButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  inputText: {
    color: "black",
    borderBottomWidth: 0,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    paddingStart: 20,
  },
});
