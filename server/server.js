var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var mongoose = require("mongoose");

// Hardcoded MongoDB URI
const MONGODB_URI = "mongodb+srv://abinashsarania:SARania69-@cluster0.pmgzh5d.mongodb.net/?retryWrites=true&w=majority";
// Hardcoded JWT secret key
const JWT_SECRET = "secretkey";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var user = require("./model/user.js");

var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Use extended: true to parse URL-encoded form data

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "APIs",
  });
});

/* login api */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        errorMessage: "Please provide both username and password.",
        status: false,
      });
    }

    const userData = await user.findOne({ username });

    if (!userData) {
      return res.status(400).json({
        errorMessage: "Username or password is incorrect!",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        errorMessage: "Username or password is incorrect!",
        status: false,
      });
    }

    const token = jwt.sign(
      { user: userData.username, id: userData._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successfully.",
      token: token,
      status: true,
    });
  } catch (e) {
    res.status(500).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* register api */
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Print the received request body for debugging
    console.log("Received Request Body:", req.body);

    if (!username || !password) {
      return res.status(400).json({
        errorMessage: "Please provide both username and password.",
        status: false,
      });
    }

    const existingUser = await user.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: `Username ${username} already exists.`,
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      title: "Registered Successfully.",
    });
  } catch (e) {
    res.status(500).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

const serverIP = "192.168.1.8"; // Replace with your actual IP address
const serverPort = 3000; // Specify the port you want to run the server on

app.listen(serverPort, serverIP, () => {
  console.log(`Server is Running On ${serverIP}:${serverPort}`);
});

// app.listen(3000, () => {
//   console.log("Server is Running On port 3000");
// });
