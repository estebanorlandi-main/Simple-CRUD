import API from "./API_Class.js";

window.api = new API("http://localhost:8080/api/product/");

api.getProducts(0, "#products");

$("#search").keyup((e) => {
  console.log();
  api.search(0, e.target.value, "#products");
});
