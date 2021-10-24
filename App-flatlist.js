import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const newData = await axios.get("http://localhost:3000/users");
      setData(newData.data);
    }
    getData();
  }, []);

  const Item = ({ email }) => (
    <View>
      <Text>{email}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item email={item.email} />;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>test</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
