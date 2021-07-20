const Router = require("express").Router();
const Product = require("../Schemas/Product");

Router.post("/", (req, res) => {
  const { name, description, price, stock } = req.body;

  const newProduct = new Product({ name, description, price, stock });

  newProduct.save();

  return res.json({ status: "saved" });
});

Router.get("/list/:id?", async (req, res) => {
  const page = req.params.id;

  const products = await Product.find()
    .skip(page ? parseInt(page) * 5 : 0)
    .limit(5);

  return res.json({ products: products });
});

Router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  const products = await Product.find({ _id });

  return res.json({ products: products });
});

Router.put("/update", (req, res) => {
  const data = "Update";
  res.json({ data });
});

Router.delete("/delete", (req, res) => {
  const data = "Delete";
  res.json({ data });
});

module.exports = Router;
