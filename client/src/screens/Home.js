import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Checkbox,
  List,
  TextInput,
  IconButton,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from @react-native-picker/picker

function Home({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [editSubtaskIndex, setEditSubtaskIndex] = useState(null);
  const [sortOption, setSortOption] = useState("default"); // default, ascending, descending
  const [filteredTasks, setFilteredTasks] = useState(todos);

  // Function to add a new task
  const handleAddTodo = () => {
    if (newTodo.title.trim() !== "") {
      const task = {
        title: newTodo.title,
        description: newTodo.description,
        done: false,
        subtasks: [],
      };
      setTodos([...todos, task]);
      setNewTodo({ title: "", description: "" });
    }
  };

  // Function to delete a subtask
  const handleDeleteSubtask = (taskIndex, subtaskIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[taskIndex].subtasks.splice(subtaskIndex, 1);
    setTodos(updatedTodos);
  };

  // Function to toggle the completion status of a task
  const handleToggleTask = (taskIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[taskIndex].done = !updatedTodos[taskIndex].done;
    setTodos(updatedTodos);
  };

  // Function to delete a task
  const handleDeleteTask = (taskIndex) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(taskIndex, 1);
    setTodos(updatedTodos);
  };

  // Function to toggle a subtask's status
  const handleToggleSubtask = (taskIndex, subtaskIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[taskIndex].subtasks[subtaskIndex].done =
      !updatedTodos[taskIndex].subtasks[subtaskIndex].done;
    setTodos(updatedTodos);
  };

  // Function to save edited subtask text
  const handleSaveSubtaskEdit = (taskIndex, subtaskIndex, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[taskIndex].subtasks[subtaskIndex].text = newText;
    setTodos(updatedTodos);
    setEditSubtaskIndex(null);
  };

  // Function to add a new subtask
  const handleAddSubtask = (taskIndex) => {
    if (newSubtask.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[taskIndex].subtasks.push({
        text: newSubtask,
        done: false,
      });
      setTodos(updatedTodos);
      setNewSubtask("");
    }
  };

  // Function to sort tasks based on the selected option
  const sortTasks = () => {
    let sortedTasks = [...todos];
    if (sortOption === "ascending") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "descending") {
      sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredTasks(sortedTasks);
  };

  // Effect to update filtered tasks when todos change
  useEffect(() => {
    sortTasks();
  }, [todos, sortOption]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        {/* Profile Button */}
        <Appbar.Action
          icon="account"
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileIcon}
        />
        <Appbar.Content title="Task List" titleStyle={styles.title} />
      </Appbar.Header>

      <View style={styles.sortContainer}>
        <Text>Sort by: </Text>
        <Picker
          selectedValue={sortOption}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSortOption(itemValue)}
        >
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Ascending" value="ascending" />
          <Picker.Item label="Descending" value="descending" />
        </Picker>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          label="Task Title"
          value={newTodo.title}
          onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
          style={styles.input}
        />
        <TextInput
          label="Task Description"
          value={newTodo.description}
          onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleAddTodo}
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}
        >
          Add Task
        </Button>

        <List.Section>
          {todos.map((task, taskIndex) => (
            <Card
              key={taskIndex}
              style={[
                styles.card,
                task.done
                  ? { backgroundColor: "#4caf50" }
                  : { backgroundColor: "#f0f0f0" },
              ]}
            >
              <Card.Title
                title={task.title}
                subtitle={task.description}
                titleStyle={styles.taskTitle}
                right={(props) => (
                  <IconButton
                    icon="delete"
                    color="#f44336"
                    onPress={() => handleDeleteTask(taskIndex)}
                  />
                )}
              />
              <Card.Content>
                <TouchableOpacity
                  onPress={() => handleToggleTask(taskIndex)}
                  style={styles.toggleTaskButton}
                >
                  <Checkbox
                    status={task.done ? "checked" : "unchecked"}
                    onPress={() => handleToggleTask(taskIndex)}
                  />
                  <Text style={styles.taskText}>{task.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSubtasks((prevState) =>
                      prevState.includes(taskIndex)
                        ? prevState.filter((index) => index !== taskIndex)
                        : [...prevState, taskIndex]
                    )
                  }
                >
                  <IconButton
                    icon={
                      subtasks.includes(taskIndex)
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    color="blue"
                    size={20}
                  />
                </TouchableOpacity>
                {subtasks.includes(taskIndex) && (
                  <View>
                    {task.subtasks.map((subtask, subtaskIndex) => (
                      <List.Item
                        key={subtaskIndex}
                        title={
                          editSubtaskIndex?.taskIndex === taskIndex &&
                          editSubtaskIndex?.subtaskIndex === subtaskIndex ? (
                            <TextInput
                              value={subtask.text}
                              onChangeText={(text) =>
                                handleSaveSubtaskEdit(
                                  taskIndex,
                                  subtaskIndex,
                                  text
                                )
                              }
                              autoFocus
                              onBlur={() => setEditSubtaskIndex(null)}
                              style={styles.editTextInput}
                              onSubmitEditing={() => setEditSubtaskIndex(null)}
                              multiline
                            />
                          ) : (
                            <Text style={styles.subtaskText}>
                              {subtask.text}
                            </Text>
                          )
                        }
                        onPress={() =>
                          handleToggleSubtask(taskIndex, subtaskIndex)
                        }
                        left={() => (
                          <Checkbox
                            status={subtask.done ? "checked" : "unchecked"}
                            onPress={() =>
                              handleToggleSubtask(taskIndex, subtaskIndex)
                            }
                          />
                        )}
                        right={() => (
                          <IconButton
                            icon="delete"
                            color="#f44336"
                            onPress={() =>
                              handleDeleteSubtask(taskIndex, subtaskIndex)
                            }
                          />
                        )}
                        style={{ paddingLeft: 8 }}
                      />
                    ))}
                    <View style={styles.subtaskInputContainer}>
                      <TextInput
                        label="Add a subtask"
                        value={newSubtask}
                        onChangeText={(text) => setNewSubtask(text)}
                        style={styles.subtaskInput}
                        onSubmitEditing={() => handleAddSubtask(taskIndex)}
                      />
                      <IconButton
                        icon="content-save"
                        onPress={() => handleAddSubtask(taskIndex)}
                      />
                    </View>
                  </View>
                )}
              </Card.Content>
            </Card>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
  },
  appBar: {
    backgroundColor: "#9449f5",
    padding: 10,
    height: "10px"
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  profileIcon: {
    backgroundColor: "white"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
    color: "white"
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
  },
  input: {
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  subtaskInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  addButtonLabel: {
    color: "#ffffff",
  },
  editTextInput: {
    flex: 1,
  },
  subtaskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 16,
    marginTop: 10,
  },
});

export default Home;
