require("dotenv").config();
require("./startup/db")();

const express = require("express");
const app = express();
var cors = require("cors");
const users = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/user", users);

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});