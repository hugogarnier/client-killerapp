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
  Button,
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
  const [previousCode, setPreviousCode] = useState("");
  const [error, setError] = useState("");
  const [previousGames, setPreviousGames] = useState([]);

  useEffect(() => {
    async function getPreviousGame() {
      const token = await getStoreData();
      socket.emit("previousCodes", token, (data) => {
        setPreviousGames(data.previousCodes);
      });
    }
    getPreviousGame();
  }, [previousGames]);

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

  const handleEnterGame = () => {
    setGameCode(code);
    navigation.navigate("PlayerScreen", {
      code: code,
    });
  };

  const handleEnterPreviousGame = () => {
    console.log("code");
    // setGameCode(code);
    // navigation.navigate("PlayerScreen", {
    //   code: code,
    // });
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

  const Item = ({ code, alive, admin }) => (
    <Pressable onPress={handleEnterPreviousGame}>
      <View style={styles.listContainer}>
        <View style={styles.textList}>
          <Text style={{ marginRight: 20 }}>{code}</Text>

          {alive ? <Text>Vivant</Text> : <Text>Mort</Text>}
          {admin ? <Text>Admin</Text> : null}
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item code={item.code} alive={item.alive} admin={item.admin} />
  );

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

      {/* <View style={styles.enterGameContainer}> */}
      <View style={styles.inputCodeContainer}>
        <TextInput
          placeholder='Code de la partie'
          autoCapitalize='none'
          type='text'
          value={code}
          onChangeText={(text) => setCode(text)}
          errorMessage={error}
        />
        <Button
          onPress={handleEnterGame}
          title='Entrer'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
      {/* </View> */}

      {previousGames ? (
        <View style={styles.previousGameContainer}>
          {/* <Text style={styles.previousCodeText}>Partie en cours</Text> */}

          <FlatList
            data={previousGames}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <ActivityIndicator size='large' color='#222831' />
      )}
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#c8cfd9",
    borderRadius: 20,
  },

  inputCodeContainer: {
    // width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c8cfd9",
  },
  inputCode: {
    color: "black",
    borderBottomWidth: 0,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    paddingStart: 20,
  },

  previousGameContainer: {
    flex: 2,
    width: "100%",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#8292a8",
    borderRadius: 20,
    marginBottom: 10,
  },
  inputPreviousCodePressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previousCodeText: {
    fontSize: 16,
  },

  listContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    margin: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
  },

  textList: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
