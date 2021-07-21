const Router = require("express").Router();
const Product = require("../Schemas/Product");

Router.post("/", async (req, res) => {
  const { name, description, price, stock } = req.body;

  const exist = await Product.findOne({ name });
  if (exist) return res.json({ status: "Project exist" });

  const newProduct = new Product({ name, description, price, stock });
  newProduct.save();

  return res.json({ status: "saved" });
});

Router.get("/list/:id?", async (req, res) => {
  const page = parseInt(req.params.id);

  const productLimit = 50;

  const products = await Product.find()
    .skip(page ? page * productLimit : 0)
    .limit(productLimit);

  // Paginate
  const countProducts = await Product.find();
  const paginate = {
    actualPage: page,
    totalProducts: countProducts.length,
    limit: productLimit,
  };

  return res.json({ products: products, paginate });
});

Router.get("/:id", async (req, res) => {
  const name = req.params.id;

  console.log(name);

  const product = await Product.findOne({ name });

  return res.json({ product });
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
