import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Modal,
  ActivityIndicator,
  Button,
  Input,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import login from "../api/login";

const loginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

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
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          autoCapitalize='none'
          placeholder='mot de passe'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button onPress={handlePress} title='Se connecter' />
      <Button
        // onPress={() => setVisibleModal(!visibleModal)}
        title='Mot de passe oublié ?'
      />
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
    // backgroundColor: "#222831",
  },
  inputContainer: {
    width: 300,
  },
  inputText: {
    borderRadius: 20,
    paddingStart: 20,
  },

  containerButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    backgroundColor: "#222831",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressableContainer: {
    // alignItems: 'center',
  },
  textModal: {
    fontSize: 30,
  },
  inputText: {
    color: "black",
    borderBottomWidth: 0,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    paddingStart: 20,
  },
});
