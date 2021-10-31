import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Modal,
  Text,
  Button,
  Card,
  Image,
} from "react-native";
import { SocketContext } from "../context/socket";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { getStoreData } from "../api/asyncStorage";
import { ScreenStackHeaderLeftView } from "react-native-screens";

// import ViewPlayer from "../Components/ViewPlayer";
// import WaitingStartingGame from "../Components/WaitingStartingGame";

const PlayerStartScreen = ({ route, navigation }) => {
  const socket = useContext(SocketContext);
  const { code } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pickedFirstDate, setpickedFirstDate] = useState("");
  const [pickedSecondDate, setpickedSecondDate] = useState("");
  const [howToKill, setHowToKill] = useState("");
  const [nameToKill, setNameToKill] = useState("");
  const [userNumber, setUserNumber] = useState(0);
  const [numberToKill, setNumberToKill] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [alive, setAlive] = useState(false);
  const [started, setStarted] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    async function getUser() {
      const token = await getStoreData();
      // socket.emit("addUser", token);
      socket.emit("userInfo", token, code, (data) => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAlive(data.alive);
        setStarted(data.started);
        setClose(data.close);
      });
    }
    getUser();
    // return () => {
    //   socket.emit("disconnect");
    // };
  }, [close, started, alive, lastname, firstname]);

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

  const handleKillAction = () => {
    validateKill(code);
    setVisibleModal(true);
  };

  const handleConfirmationKill = () => {
    confirmationKill(code);
    setVisibleModal(!visibleModal);
  };

  const handleEndGame = () => {
    endGame(code);
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAction}>
        <Text>{code}</Text>
        {alive ? <Text>Alive</Text> : <Text>Dead</Text>}
        {started ? <Text>Started</Text> : <Text>No Started</Text>}
        {close ? <Text>Close</Text> : <Text>Not Close</Text>}
        <Text>{firstname}</Text>
        <Text>{lastname}</Text>

        {/* {!isGameStarted ? (
          <View>
            <WaitingStartingGame />
            <Pressable style={styles.containerTextPressable}>
              <Text style={styles.textPressable}>Cliquer pour rafraichir</Text>
            </Pressable>
          </View>
        ) : numberToKill === userNumber ? (
          <View>
            <Text style={styles.text}>Félicitations !</Text>
            <Text style={styles.text}>Tu as gagné(e) le Killer !</Text>
            <Pressable
              style={styles.containerTextPressable}
              onPress={handleEndGame}
            >
              <Text style={styles.textPressable}>Retour à l'accueil</Text>
            </Pressable>
          </View>
        ) : (
          <ViewPlayer
            numberToKill={numberToKill}
            userNumber={userNumber}
            handleKillAction={handleKillAction}
            nameToKill={nameToKill}
            howToKill={howToKill}
          />
        )} */}

        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={true}
            visible={visibleModal}
            onRequestClose={() => {
              setVisibleModal(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={styles.pressableContainer}
                  onPress={handleConfirmationKill}
                >
                  {/* <Image
                    source={require("../assets/ok.png")}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  /> */}
                  <Text style={styles.textModal}>Confirmer le Kill</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
  containerCard: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#f6f7f8",
    borderRadius: 20,
  },
  infoCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerDate: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f8",
    borderRadius: 20,
  },
  textCard: {
    fontSize: 20,
    marginBottom: 10,
  },
  textCardRight: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  containerAction: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
    // opacity: 0.8,
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
    alignItems: "center",
  },
  textModal: {
    fontSize: 50,
  },
  containerText: {
    marginBottom: 20,
  },

  textContent: {
    color: "white",
    fontSize: 30,
    paddingHorizontal: 50,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    paddingHorizontal: 50,
    textAlign: "center",
    marginBottom: 20,
  },
  containerTextPressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  textPressable: {
    textAlign: "center",
    fontSize: 30,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#c8cfd9",
  },

  innerContainerButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 20,
  },
});
