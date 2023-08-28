const express = require("express");
const fs = require("fs");
const { connection } = require("./db");
const { userRoutes } = require("./routes/userRoutes");
const { auth } = require("./middleware/auth");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", auth, (req, res) => {
  res.send("Home");
});







app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB connected");
    console.log("Server is running on port 8080");
  } catch (error) {
    console.log(error);
  }
});
