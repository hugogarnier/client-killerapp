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
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SocketContext } from "../context/socket";

import { deleteStoreData, getStoreData } from "../api/asyncStorage";
import setNewGame from "../api/setNewGame";
import setGameCode from "../api/setGameCode";
import setDeleteGame from "../api/setDeleteGame";

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

  useEffect(() => {
    async function getPreviousGame() {
      const token = await getStoreData();

      // if one game

      socket.emit("previousCode", token, (data) => {
        setPreviousGame(data.previousCode);
      });

      //if more than one game
      // socket.emit("previousCodes", token, (data) => {
      //   setPreviousGames(data.previousCodes);
      // });
    }
    if (isFocused) {
      getPreviousGame();
    }
  }, [previousGame, isFocused]);

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
          code: code,
        });
    });
  };

  const handleDeleteOwnGame = () => {
    setDeleteGame(previousGame).then(({ isGameExists }) => {
      isGameExists && setPreviousGame("");
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
          <Button onPress={handleEnterGame} title='Entrer' color='#841584' />
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
            <Text style={styles.previousGameText}>{previousGame}</Text>
          </Pressable>
          <Pressable onPress={handleDeleteOwnGame}>
            <Text>Supprimer</Text>
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
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
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
    left: 20,
    color: "red",
    borderBottomWidth: 0,
  },

  previousGameContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  previousGamePressable: {
    backgroundColor: "white",
    padding: 20,
  },
});
