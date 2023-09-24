import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image, // Import the Image component
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Successful login, navigate to the home screen or perform other actions
        navigation.navigate("Home");
      } else {
        // Handle authentication errors here
        alert("Authentication failed");
      }
    } catch (error) {
      // This block is executed when an error occurs
      console.error("Login Error:", error); // Log the error to the console for debugging
      alert("Login failed. Please try again."); // Show an alert to the user
    }
  };

  const loginWithGoogle = () => {
    // Implement Google login logic here
    // For example, you can use Firebase Authentication for Google login
  };

  const loginWithFacebook = () => {
    // Implement Facebook login logic here
    // For example, you can use Firebase Authentication for Facebook login
  };

  const loginWithOTP = () => {
    // Implement OTP login logic here
    // For example, you can navigate to an OTP verification screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/3D-Clipboard.png")} // Replace 'your-image.png' with the actual path to your PNG image
          style={styles.logoImage}
        />
        {/* <Text style={styles.logoText}>MyApp</Text> */}
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.loginOptionsContainer}>
          <Button
            mode="contained"
            icon={({ color }) => (
              <Icon name="google" type="font-awesome" size={20} color={color} />
            )}
            color="#EA4335"
            onPress={loginWithGoogle}
            style={styles.circularButton}
            labelStyle={styles.buttonLabel}
          >
            Google
          </Button>
          <Button
            mode="contained"
            icon={({ color }) => (
              <Icon name="facebook" size={20} color={color} />
            )}
            color="#1877F2"
            onPress={loginWithFacebook}
            style={styles.circularButton}
            labelStyle={styles.buttonLabel}
          >
            Facebook
          </Button>
          <Button
            mode="contained"
            icon="message-text"
            color="#007ACC"
            onPress={loginWithOTP}
            style={styles.circularButton}
            labelStyle={styles.buttonLabel}
          >
            OTP
          </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.loginText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Adjust horizontal padding as needed
    margin: 20, // Add margin to create space around the image
    marginBottom: 60,
  },
  logoImage: {
    width: 300, // Adjust the width and height to match your desired dimensions
    height: 300, // Adjust the width and height to match your desired dimensions
    resizeMode: "contain", // Ensure the entire image is visible without cropping
  },

  // logoText: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginTop: 10,
  //   color: "#007ACC",
  // },
  formContainer: {
    flex: 1, // Take up the remaining space
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: "#007ACC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  circularButton: {
    borderRadius: 50,
    margin: 5,
  },
  loginText: {
    marginTop: 20,
    color: "blue",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginPage;
