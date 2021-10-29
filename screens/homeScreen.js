import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  ActivityIndicator,
  TextInput,
  Text,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SocketContext } from "../context/socket";

import { deleteStoreData, getStoreData } from "../api/asyncStorage";
import setNewGame from "../api/setNewGame";
import setGameCode from "../api/setGameCode";

const homeScreen = ({ navigation }) => {
  const socket = useContext(SocketContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [previousGames, setPreviousGames] = useState([]);

  useEffect(() => {
    async function getPreviousGame() {
      const token = await getStoreData();

      // socket.emit("addUser", token);
      socket.emit("previousCodes", token, (data) => {
        setPreviousGames(data.previousCodes);
      });
    }
    getPreviousGame();
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

  const handleCreateGame = () => {
    setNewGame().then(({ randomCode }) => {
      randomCode &&
        navigation.navigate("PlayerScreen", {
          code: randomCode,
        });
    });
  };

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

  // const handleClickPreviousGame = async () => {
  //   await setGameCode(previousGames);
  //   navigation.navigate("PlayerScreen", {
  //     code: previousGames,
  //   });
  // };

  const Item = ({ code }) => (
    <View>
      <Text>{code}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item code={item} />;

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <View style={styles.startNewGameContainer}>
        <Pressable
          style={styles.startNewGamePressable}
          onPress={handleCreateGame}
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
        {previousGames ? (
          <View style={styles.previousGameContainer}>
            <Pressable
              style={styles.inputPreviousCodePressable}
              // onPress={handleClickPreviousGame}
            >
              <Text style={styles.inputPreviousCodeText}>Partie en cours</Text>
              {/* <Text style={styles.inputPreviousCodeText}>{previousGames}</Text> */}
              <FlatList
                data={previousGames}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
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
    // width: "100%",
    flex: 1,
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
    width: "100%",
    flex: 1,
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
