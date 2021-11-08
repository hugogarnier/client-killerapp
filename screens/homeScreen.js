import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Text,
  Button,
} from "react-native";
import * as Svg from "react-native-svg";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SocketContext } from "../context/socket";

import { deleteStoreData, getStoreData } from "../api/asyncStorage";
import setNewGame from "../api/setNewGame";
import setGameCode from "../api/setGameCode";
import setDeleteGame from "../api/setDeleteGame";
import Player from "../assets/player.svg";

const homeScreen = ({ navigation }) => {
  const socket = useContext(SocketContext);
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [previousCode, setPreviousCode] = useState("");
  const [error, setError] = useState(false);
  // const [previousGames, setPreviousGames] = useState([]);
  const [previousGame, setPreviousGame] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getPreviousGame() {
      const token = await getStoreData();

      // if one game

      socket.on("previousCode", (data) => {
        setPreviousGame(data.previousCode);
      });
      socket.emit("previousCode", token, code);

      //if more than one game
      // socket.emit("previousCodes", token, (data) => {
      //   setPreviousGames(data.previousCodes);
      // });
    }
    if (isFocused) {
      getPreviousGame();
    }
  }, [previousGame, isFocused, update]);

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
    setGameCode(code).then(({ isGameExists }) => {
      isGameExists
        ? navigation.navigate("PlayerScreen", {
            code: code,
          })
        : setError(true);
    });
  };

  const handleEnterPreviousGame = () => {
    setGameCode(previousGame).then(({ isGameExists }) => {
      isGameExists &&
        navigation.navigate("PlayerScreen", {
          code: previousGame,
        });
    });
  };

  const handleDeleteOwnGame = () => {
    setDeleteGame(previousGame).then(() => {
      setUpdate(!update);
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

  // const Item = ({ code, alive, admin, onPress }) => (
  //   <>
  //     <Pressable
  //       style={{
  //         flexDirection: "row",
  //         backgroundColor: "#FFF",
  //         margin: 20,
  //         paddingVertical: 20,
  //         paddingHorizontal: 40,
  //         borderRadius: 20,
  //       }}
  //       onPress={onPress}
  //     >
  //       {/* <View style={styles.listContainer}>
  //         <View style={styles.textList}> */}
  //       <Text style={{ marginRight: 20 }}>{code}</Text>

  //       {/* {alive ? <Text>Vivant</Text> : <Text>Mort</Text>}
  //       {admin ? <Text>Admin</Text> : null} */}
  //       {/* </View>
  //       </View> */}
  //     </Pressable>
  //   </>
  // );

  // const renderItem = ({ item }) => (
  //   <Item
  //     onPress={() => handleEnterPreviousGame(item.code, item.admin)}
  //     code={item.code}
  //     alive={item.alive}
  //     admin={item.admin}
  //   />
  // );

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <Player width={350} height={400} />
      {previousGame ? null : (
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
      )}

      <View style={styles.enterGameContainer}>
        <View style={styles.inputCodeContainer}>
          <TextInput
            placeholder='Code de la partie'
            autoCapitalize='none'
            type='text'
            value={code}
            onChangeText={(text) => {
              setCode(text), setError(false);
            }}
            style={styles.input}
          />
          <Button onPress={handleEnterGame} title='Entrer' color='black' />
        </View>
        <View>
          {error && <Text style={styles.inputCodeError}>Code invalide</Text>}
        </View>
      </View>

      {previousGame ? (
        <View style={styles.previousGameContainer}>
          <Pressable
            style={styles.previousGamePressable}
            onPress={handleEnterPreviousGame}
          >
            <Text style={styles.previousGameText}>
              Rejoindre la partie en cours - {previousGame}
            </Text>
          </Pressable>

          <Pressable
            style={styles.previousGameDelete}
            onPress={handleDeleteOwnGame}
          >
            <Feather name='trash' size={30} color='black' />
          </Pressable>
        </View>
      ) : null}

      {/* {previousGames ? (
        <View style={styles.previousGameContainer}>

          <FlatList
            data={previousGames}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <ActivityIndicator size='large' color='#222831' />
      )} */}
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
    height: 100,
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
    width: "100%",
    height: 60,
  },

  inputCodeContainer: {
    // width: "88%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#c8cdef",
    borderRadius: 20,
  },
  input: {
    width: 200,
    marginRight: 20,
    position: "relative",
  },
  inputCodeError: {
    position: "absolute",
    bottom: 20,
    right: 150,
    color: "red",
    borderBottomWidth: 0,
  },

  previousGameContainer: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    height: 60,
    backgroundColor: "#8292a8",
    borderRadius: 20,
  },
  previousGamePressable: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
  previousGameDelete: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 30,
  },
});
