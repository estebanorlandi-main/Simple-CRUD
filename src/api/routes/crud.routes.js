const Router = require("express").Router();

Router.get("/create", (req, res) => {
  const data = "Create";
  res.json({ data });
});

Router.get("/all", (req, res) => {
  const data = "All";
  res.json({ data });
});

Router.get("/one", (req, res) => {
  const data = "One";
  res.json({ data });
});

Router.get("/update", (req, res) => {
  const data = "Update";
  res.json({ data });
});

Router.get("/delete", (req, res) => {
  const data = "Delete";
  res.json({ data });
});

module.exports = Router;
