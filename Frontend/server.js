require("dotenv").config({ path: "/frontend/.env" });
console.log(process.env.FRONTEND_PORT);
const express = require("express");
const cors = require("cors");
const app = express();
const backendPort = process.env.BACKEND_PORT || 4000;
const frontendPort = process.env.FRONTEND_PORT || 3000;

// Enable CORS for all origins
app.use(cors()); // This will allow all origins

// Setting the view engine to ejs so that we can send backendPort as a parameter to the index.ejs file
// This will allow the frontent to know on which port the backend is running.
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Making /web folder as static to serve files to the clients.
app.use(express.static(__dirname + "/Web"));

app.get("/", (req, res) => {
  res.render("index", { backendPort });
});

// This frontend will listen on all network interfaces.
app.listen(frontendPort, "0.0.0.0", () => {
  console.log(`Server is listening on ${frontendPort}`);
});
