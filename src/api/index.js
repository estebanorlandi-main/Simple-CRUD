"use strict";

// Imports
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

// Utilities
const PUBLIC = path.join(__dirname, "../public");
const PORT = 8080;

// DB connection
require("./db/index");

// App creation
const app = express();

// Middlewares
app.use(cors({ origin: "*", credentials: true }));

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", express.static(PUBLIC));
app.use("/api/product", require("./routes/crud.routes"));

// Server start
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
