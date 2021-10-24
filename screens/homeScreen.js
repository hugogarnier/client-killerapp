import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  ActivityIndicator,
  TextInput,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { deleteStoreData } from "../api/asyncStorage";

const homeScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [previousGame, setPreviousGame] = useState("");
  //TODO: review previousgame not updating

  useEffect(() => {
    async function getUserInfo() {}
    getUserInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Accueil",
      headerLeft: () => null,
      headerRight: () => (
        <Pressable
          onPress={handleLogOut}
          style={{
            marginRight: 15,
          }}
        >
          <Ionicons name='log-out-outline' size={24} color='#fff' />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleLogOut = () => {
    deleteStoreData();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Home",
        },
      ],
    });
  };

  const enterGameFunction = (code, firstName, lastName) => {
    // enterGame(code, firstName, lastName).then(
    //   ({ started, closed, noDoc, admin }) => {
    //     if (noDoc) {
    //       setError("Code invalide");
    //     } else {
    //       if (closed) {
    //         // Alert.alert(`La partie est terminée ! Le gagnant est ${winner}`);
    //         Alert.alert(`La partie est terminée !`);
    //         setError("Partie terminée");
    //       } else {
    //         if (admin === currentUserUID && started === false) {
    //           navigation.navigate("Admin", {
    //             code: code,
    //           });
    //         } else {
    //           navigation.navigate("StartPlayer", {
    //             code: code,
    //           });
    //         }
    //         setError("");
    //       }
    //     }
    //   }
    // );
  };

  const handleEnter = () => {
    enterGameFunction(code, firstName, lastName);
  };

  const handleClickPreviousGame = () => {
    let code = previousGame;
    enterGameFunction(code, firstName, lastName);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <View style={styles.startNewGameContainer}>
        <Pressable
          style={styles.startNewGamePressable}
          onPress={() => navigation.navigate("StartGame")}
        >
          <Text style={styles.startNewGameText}>
            Démarrer une nouvelle partie
          </Text>
        </Pressable>
      </View>

      <View style={styles.enterGameContainer}>
        <View style={styles.inputCodeContainer}>
          <TextInput
            placeholder='Code de la partie'
            autoCapitalize='none'
            type='text'
            value={code}
            onChangeText={(text) => setCode(text)}
            errorMessage={error}
          />
        </View>
        {previousGame ? (
          <View style={styles.previousGameContainer}>
            <Pressable
              style={styles.inputPreviousCodePressable}
              onPress={handleClickPreviousGame}
            >
              <Text style={styles.inputPreviousCodeText}>
                Partie précédente
              </Text>
              <Text style={styles.inputPreviousCodeText}>{previousGame}</Text>
            </Pressable>
          </View>
        ) : (
          <ActivityIndicator size='large' color='#222831' />
        )}
      </View>
    </View>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#222831",
  },

  startNewGameContainer: {
    // width: '100%',
    flex: 2,
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#8292a8",
    borderRadius: 20,
  },
  startNewGamePressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startNewGameText: {
    fontSize: 25,
  },

  enterGameContainer: {
    flex: 2,
    justifyContent: "space-around",
    backgroundColor: "#c8cfd9",
    borderRadius: 20,
  },

  inputCodeContainer: {
    // width: '100%',
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputCode: {
    color: "black",
    borderBottomWidth: 0,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    paddingStart: 20,
  },

  previousGameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8292a8",
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  inputPreviousCodePressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputPreviousCodeText: {
    fontSize: 16,
  },
  button: {
    // width: 200,
    marginTop: 10,
    marginBottom: 30,
  },
});
