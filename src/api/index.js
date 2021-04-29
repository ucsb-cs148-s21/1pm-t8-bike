const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");

const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../build")));

app.get("/api", cors(corsOptions), (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
