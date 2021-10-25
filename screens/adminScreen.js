import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Alert, Pressable, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const adminScreen = ({ route, navigation }) => {
  const { code } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modify, setModify] = useState(false);
  const [players, setPlayers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [participate, setParticipate] = useState(false);

  useEffect(() => {
    async function getGameInfo() {
      // Make the initial query
    }
    getGameInfo();
  }, [update]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Admin",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate("Dashboard")}
          style={{
            marginLeft: 20,
          }}
        >
          <Ionicons name='home' size={24} color='#fff' />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleParticipate = () => {
    enterGame(code, firstName, lastName);
    setUpdate(!update);
    setParticipate(!participate);
  };

  const handleStartGame = () => {
    startGame(code).then(({ gameStarted }) => {
      gameStarted &&
        navigation.navigate("StartPlayer", {
          code: code,
        });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <View style={styles.containerInfo}>
        {participate ? (
          <Text style={styles.text}>Participation enregistrée</Text>
        ) : (
          <Button title='Participer au jeu' onPress={handleParticipate} />
        )}

        <Button
          title='Démarrer la partie'
          onPress={handleStartGame}
          //   disabled={players.length < 2}
        />
        <Text style={styles.title}>Liste des joueurs</Text>
      </View>
    </View>
  );
};

export default adminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },

  containerCard: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    borderRadius: 20,
    paddingBottom: 20,
  },

  containerInfo: {
    flex: 2,
    alignItems: "center",
    marginTop: 20,
    // justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    color: "white",
    fontSize: 30,
  },
  text: {
    marginVertical: 5,
    color: "white",
    fontSize: 20,
  },
  containerButton: {
    width: 200,
    marginTop: 10,
    borderRadius: 20,
  },
});
