const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const router = require("./router/router");

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

//enviroment
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

//connection
mongoose.connect(URL, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("db connnected");
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}....`);
});
