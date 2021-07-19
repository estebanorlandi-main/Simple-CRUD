"use strict";

// Imports
const path = require("path");
const morgan = require("morgan");
const express = require("express");

// Utilities
const PUBLIC = path.join(__dirname, "../public");
const PORT = 8080;

// App creation
const app = express();

// Middlewares
app.use(morgan("dev"));

// Routes
app.use("/", express.static(PUBLIC));
app.use("/api", require("./routes/crud.routes"));

// Server start
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
