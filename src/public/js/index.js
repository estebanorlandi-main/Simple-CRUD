import API from "./API_Class.js";

const buttons = {
  first: $("#first"),
  prev: $("#prev"),
  actual: $("#actual"),
  next: $("#next"),
  last: $("#last"),
};

window.api = new API("http://localhost:8080/api/product/", "products", buttons);

function changeButtons() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const { actual, total } = api.getPages();
  buttons.prev[0].disabled = actual === 0;
  buttons.first[0].disabled = actual === 0;
  buttons.actual[0].innerHTML = actual + 1;
  buttons.next[0].disabled = actual === total;
  buttons.last[0].disabled = actual === total;
}

$("#search").keyup((e) => {
  api.firstPage();
  api.search(e.target.value);
  changeButtons();
});

$("#openForm").click((e) => {
  $("#newProductContainer").show();
});
$("#newProduct").submit((e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log(new FormData($("#newProduct").target).getAll("name"));
});

buttons.first.click((e) => {
  api.firstPage();
  changeButtons();
});
buttons.prev.click((e) => {
  api.prevPage();
  changeButtons();
});
buttons.next.click((e) => {
  api.nextPage();
  changeButtons();
});
buttons.last.click((e) => {
  api.lastPage();
  changeButtons();
});
