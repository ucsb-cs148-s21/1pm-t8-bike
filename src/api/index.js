const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// adding routes to schema
const postsRouter = require('./routes/posts');
const markersRouter = require('./routes/markers');
const buildingsRouter = require('./routes/buildings');

// connect db
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//so it can read the .env from root dir
require('dotenv').config({ path: '.env'});

// create express server
const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// gets port
const port = process.env.PORT || 3001;

// middleware, allow parse json
app.use(cors());
app.use(express.json());

//will load everything in postsRouter if on /posts directory
app.use('/posts',postsRouter);
app.use('/markers',markersRouter);
app.use('/buildings',buildingsRouter);

// for google cloud storage
app.disable('x-powered-by');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// connect uri db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true});
const connection = mongoose.connection;

// once the connection is open, db connection was established successfully
connection.once('open',() => {
  console.log("MongoDB database connection established successfully");
});

// listening to set port
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../build")));

app.get("/api", cors(corsOptions), (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});

