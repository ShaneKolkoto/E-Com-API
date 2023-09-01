const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser());

app.get("^/$|/node", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api", require("./controllers/routes"));

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
