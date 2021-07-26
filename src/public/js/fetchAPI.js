import API from "./API_Class.js";

window.api = new API("http://localhost:8080/api/product/", "products");

api.getAll(0);

$("#search").keyup((e) => {
  api.search(0, e.target.value, "products");
});
