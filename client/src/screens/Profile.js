import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Divider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

function Profile() {
  const [bio, setBio] = useState("Your Bio or Description");
  const [previousTodos, setPreviousTodos] = useState([]);
  const navigation = useNavigation(); // Access navigation object

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear token, navigate to login)
    console.log("Logout button pressed");
    navigation.navigate("DummyLogin");
  };

  // Sample previous todos data
  useEffect(() => {
    // Replace with your logic to fetch previous todos from your data source
    const samplePreviousTodos = [
      { id: 1, text: "Completed task 1" },
      { id: 2, text: "Completed task 2" },
      { id: 3, text: "Completed task 3" },
    ];
    setPreviousTodos(samplePreviousTodos);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Avatar.Image
        size={150}
        source={{
          uri: "https://e7.pngegg.com/pngimages/122/453/png-clipart-computer-icons-user-profile-avatar-female-profile-heroes-head.png", // Replace with your profile image URL
        }}
        style={styles.avatar}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Your Name</Title>
          <Paragraph>{bio}</Paragraph>
          <Divider style={styles.divider} />
          <Title>Previous Todos</Title>
          <List.Section>
            {previousTodos.map((todo) => (
              <List.Item
                key={todo.id}
                title={todo.text}
                left={() => <List.Icon icon="check" />}
              />
            ))}
          </List.Section>
          <Divider style={styles.divider} />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              icon="account-edit"
              style={styles.editButton}
              onPress={() => {
                // Handle edit profile action
              }}
            >
              Edit Profile
            </Button>
            <Button
              mode="outlined"
              icon="logout"
              style={styles.logoutButton}
              onPress={() => {
                handleLogout(); // Call the handleLogout function
              }}
            >
              Logout
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  avatar: {
    backgroundColor: "white",
    marginVertical: 20,
    alignSelf: "center",
  },
  card: {
    flex: 1,
  },
  divider: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#4caf50",
  },
  logoutButton: {
    flex: 1,
    marginLeft: 10,
    borderColor: "#4caf50",
  },
});

export default Profile;
