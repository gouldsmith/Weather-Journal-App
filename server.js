// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();

// Dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);

function listening() {
  console.log("Server is running");
  console.log(`localhost: ${port}`);
}

// GET
app.get("/all", sendData);

function sendData(req, res) {
  console.log(projectData);
  res.send(projectData);
}

app.post("/add", addWeather);

function addWeather(req, res) {
  console.log(req.body);

  newEntry = {
    temp: req.body.temp,
    feelings: req.body.feelings,
    date: req.body.date,
  };

  projectData = newEntry;
  res.send(projectData);
}