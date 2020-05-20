const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//bodyparser middleware
app.use(bodyParser.json());

//routes
const users = require("./routes/api/Users");

//db config
//connecting to db
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Could not connect to db err: " + err);
  });

//use ports
app.use("/api/users", users);
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port : ${port}`));
