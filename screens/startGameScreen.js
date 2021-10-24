import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import setNewGame from "../api/setNewGame";

const startGameScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Création de la partie",
    });
  }, [navigation]);

  const handleCode = () => {
    let randomCode = Math.random().toString(36).substring(7);
    setCode(randomCode);
  };

  const handlePress = () => {
    setNewGame({ title, description, code }).then((value) => {
      if (value) {
        //   navigation.replace("Dashboard");
      } else {
        Alert.alert(
          "Page error",
          "blabla",
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
    // navigation.navigate("Admin", {
    //   code: code,
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <StatusBar style='light' />
        <Text h3 style={styles.text}>
          Entre un titre
        </Text>
        <TextInput
          placeholder='titre'
          type='text'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text h3 style={styles.text}>
          Sélectionne des dates
        </Text>

        <TextInput
          placeholder='description'
          type='text'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.containerBottom}>
        <Text style={{ color: "white", fontSize: 20 }}>{code}</Text>

        <Button onPress={handleCode} title='Générer un code' />
        {code !== "" ? (
          <Button onPress={handlePress} title='Démarrer la partie' />
        ) : null}
      </View>
    </View>
  );
};

export default startGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    backgroundColor: "#222831",
  },
  containerInput: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: 20,
    color: "white",
  },
  inputText: {
    color: "black",
    borderBottomWidth: 0,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    paddingStart: 20,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  innerDateContainer: {
    backgroundColor: "#393E46",
    marginHorizontal: 30,
    width: 150,
    height: 50,
    borderRadius: 20,
    padding: 10,
  },
  containerButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 20,
  },
});
