import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";

function Registration({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = async () => {
    try {
      if (!username || !password || !confirmPassword) {
        setError("All fields are required");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
      });

      if (response.status === 201) {
        // Registration successful, navigate to the login screen
        navigation.navigate("Login");
      } else {
        setError(response.data.errorMessage || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/registration.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DummyLogin")}>
        <Text style={styles.loginText}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color
    marginBottom: 60,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007ACC", // Button color
    padding: 12,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    marginTop: 20,
    color: "#007bff",
    fontSize: 16,
  },
});

export default Registration;
