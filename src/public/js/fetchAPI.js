import API from "./API_Class.js";

const buttons = {
  first: $("#first"),
  prev: $("#prev"),
  actual: $("#actual"),
  next: $("#next"),
  last: $("#last"),
};
window.api = new API(
  "http://localhost:8080/api/product/",
  "products",
  buttons.actual[0]
);

$("#search").keyup((e) => {
  api.firstPage();
  api.search(e.target.value);
});

buttons.first.click((e) => {
  api.firstPage();
});
buttons.prev.click((e) => {
  api.prevPage();
});
buttons.next.click((e) => {
  api.nextPage();
});
buttons.last.click((e) => {
  api.lastPage();
});
