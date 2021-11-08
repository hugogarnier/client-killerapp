import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Pressable, Text, Button } from "react-native";
import { SocketContext } from "../context/socket";
import { Ionicons } from "@expo/vector-icons";
import { getStoreData } from "../api/asyncStorage";

import setStartGame from "../api/setStartGame";
import setKill from "../api/setKill";

const PlayerStartScreen = ({ route, navigation }) => {
  const socket = useContext(SocketContext);
  const { code } = route.params;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [alive, setAlive] = useState(false);
  const [started, setStarted] = useState(false);
  const [close, setClose] = useState(false);
  const [admin, setAdmin] = useState("");
  const [playerToKill, setPlayerToKill] = useState("");
  const [action, setAction] = useState("");
  const [winner, setWinner] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getUser() {
      const token = await getStoreData();
      socket.on("userInfo", (data) => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAlive(data.alive);
        setStarted(data.started);
        setClose(data.close);
        setAdmin(data.admin);
      });
      socket.emit("userInfo", token, code);

      socket.on("kill", (data) => {
        setAlive(data.alive);
        setWinner(data.winner);
      });
      socket.emit("kill", token);

      socket.on("startGame", (data) => {
        setStarted(data.started);
        setAction(data.action);
        setPlayerToKill(data.playerToKill);
      });
      socket.emit("startGame", token, code);
    }
    getUser();
    return () => {
      socket.off("userInfo");
    };
  }, [close, started, alive, lastname, firstname, winner, update]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Partie en cours",
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
          style={{
            marginLeft: 15,
          }}
        >
          <Ionicons name='home' size={24} color='#fff' />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleStartGame = async () => {
    setStartGame(code).then(() => {
      setStarted(true);
    });
  };

  const handleKill = () => {
    setKill(code).then(() => {
      setUpdate(!update);
    });
  };

  const handleEndGame = () => {
    endGame(code);
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{code}</Text>
        {alive ? <Text>Alive</Text> : <Text>Dead</Text>}
        {started ? <Text>Started</Text> : <Text>No Started</Text>}
        {close ? <Text>Close</Text> : <Text>Not Close</Text>}
        {admin ? <Text>Admin yes</Text> : <Text>Not admin</Text>}
        <Text>{firstname}</Text>
        <Text>{lastname}</Text>
      </View>
      <View style={styles.containerAction}>
        {admin && !started ? (
          <Button
            onPress={handleStartGame}
            title='Lancer la partie'
            color='#841584'
          />
        ) : null}
        {winner && <Text>GAGNANT</Text>}
        {started && alive && (
          <View>
            <Text>Qui tuer: {playerToKill}</Text>
            <Text>Action: {action}</Text>
            <Button onPress={handleKill} title='Tuer' color='#841584' />
          </View>
        )}
      </View>
    </View>
  );
};

export default PlayerStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },

  containerInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  containerAction: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
});
