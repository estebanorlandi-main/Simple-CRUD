const mongoose = require("mongoose");
const config = require("./config");

const db = mongoose.connection;

mongoose.connect(config.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log(`DB open on ${config.URI}`);
});
