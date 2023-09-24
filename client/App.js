import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Login from "./src/screens/Login";
import DummyLogin from "./src/screens/DummyLogin";
import Registration from "./src/screens/Registration";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DummyLogin">
        <Stack.Screen name="DummyLogin" component={DummyLogin} />
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
