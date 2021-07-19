"use strict";

const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();

const PUBLIC = path.join(__dirname, "../public");
const PORT = 8080;

// Middlewares
app.use(morgan("dev"));

// Routes
app.use("/", express.static(PUBLIC));
app.use("/api", require("./routes/crud.routes"));

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
