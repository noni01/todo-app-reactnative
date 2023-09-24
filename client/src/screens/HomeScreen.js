// HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  const handleLogout = () => {
    // Implement logout logic here (e.g., clear token, navigate to login)
    console.log("Logout button pressed"); // Check if this is logged
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
