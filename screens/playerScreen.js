import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Pressable, Text, Share } from "react-native";
import { SocketContext } from "../context/socket";
import { getStoreData } from "../api/asyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Old from "../assets/old.svg";
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

      // socket.on("kill", (data) => {
      //   setAlive(data.alive);
      //   setWinner(data.winner);
      // });
      // socket.emit("kill", token);

      // socket.on("startGame", (data) => {
      //   setStarted(data.started);
      //   setAction(data.action);
      //   setPlayerToKill(data.playerToKill);
      // });
      // socket.emit("startGame", token, code);
    }
    getUser();
    return () => {
      socket.off("userInfo");
      // socket.off("kill");
      // socket.off("startGame");
    };
  }, [close /*, started, alive, lastname, firstname ,winner, update*/]);

  useEffect(() => {
    const startGame = async () => {
      try {
        const token = await getStoreData();
        if (started) {
          socket.on("startGame", async (data) => {
            if (data !== undefined) {
              // console.log(data.users);
              const user = await data.users.filter(
                (elem) => elem.token === token
              );
              const action = user[0].status.action;
              const playerToKill = user[0].status.playerToKill;
              const winner = user[0].status.winner;
              // console.log(user);
              setStarted(data.started);
              setAction(action);
              setPlayerToKill(playerToKill);
              setWinner(winner);
            }
          });
          socket.emit("startGame", token, code);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    startGame();
    return () => {
      socket.off("startGame");
    };
  }, [started]);

  useEffect(() => {
    const kill = async () => {
      const token = await getStoreData();
      try {
        socket.on("kill", (data) => {
          setAlive(data.alive);
          setWinner(data.winner);
        });
        socket.emit("kill", token);
      } catch (error) {
        console.log(error.message);
      }
    };
    kill();
    return () => {
      socket.off("kill");
    };
  }, [winner, update]);

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEndGame = () => {
    endGame(code);
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Old width={300} height={300} />
        <Pressable style={styles.code}>
          <Text style={{ fontSize: 30 }}>
            {code}{" "}
            <AntDesign
              name='sharealt'
              size={30}
              color='black'
              onPress={onShare}
            />
          </Text>
        </Pressable>
      </View>
      <View style={styles.containerAction}>
        {admin && !started ? (
          <Pressable style={styles.containerButton} onPress={handleStartGame}>
            <Text style={styles.containerButtonText}>Lancer la partie</Text>
          </Pressable>
        ) : null}

        {started && alive && (
          <View style={styles.containerCard}>
            {winner ? (
              <Text>GAGNANT</Text>
            ) : (
              <>
                <Text style={styles.text}>Qui tuer: {playerToKill}</Text>
                <Text style={styles.text}>Action: {action}</Text>
                <Pressable style={styles.containerButton} onPress={handleKill}>
                  <Text style={styles.containerButtonText}>TUER</Text>
                </Pressable>
              </>
            )}
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
  },
  code: {
    fontSize: 30,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#8292a8",
  },
  containerAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    width: 200,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#8292a8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton2: {
    backgroundColor: "#8292a8",
  },
  containerButtonText: {
    fontSize: 18,
  },

  containerCard: {
    flex: 1,
    width: "100%",
    // height: 300,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c8cdef",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
