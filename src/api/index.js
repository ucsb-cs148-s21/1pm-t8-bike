const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", cors(corsOptions), (req, res) => {
    res.json({ message: "Hello from server!" });
});
  