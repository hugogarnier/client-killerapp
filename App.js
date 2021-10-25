import { LogBox } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import loginScreen from "./screens/loginScreen";
import registerScreen from "./screens/registerScreen";
import loadingScreen from "./screens/loadingScreen";
import welcomeScreen from "./screens/welcomeScreen";
import homeScreen from "./screens/homeScreen";
import startGameScreen from "./screens/startGameScreen";
import adminScreen from "./screens/adminScreen";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#222831" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name={"Loading"}
            component={loadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Home"}
            component={welcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={"Login"} component={loginScreen} />
          <Stack.Screen name={"Register"} component={registerScreen} />
          <Stack.Screen name={"Dashboard"} component={homeScreen} />
          <Stack.Screen name={"StartGame"} component={startGameScreen} />
          <Stack.Screen name={"Admin"} component={adminScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
