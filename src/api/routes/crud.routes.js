const Router = require("express").Router();

Router.get("/all", (req, res) => {
  const hola = "asdf";
  res.json({ hola });
});

module.exports = Router;
