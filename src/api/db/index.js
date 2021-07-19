const mongodb = require("mongodb");
const mongoose = require("mongoose");

const db = mongoose.connection;

const config = require("./config");

mongoose.connect(config.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log(`DB connection started on ${config.URI}`);
});
