import APIClass from "./APIConnection.js";

var API = new APIClass("http://localhost:8080/api/product/");

API.getProducts(0, "#products");

/*
const seeProduct = (productName) => {
  fetch(`${API}/${productName.replace(" ", "%20")}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// Se llama apenas carga la pagina
// getProducts();

const unlockHeight = (element) => {
  element.style.maxHeight = "auto";
  element.style.overflowY = "scroll";
};
const blockHeight = (element) => {
  element.style.maxHeight = "auto";
  element.style.overflowY = "hidden";
};

window.addEventListener("mouseup", (e) => {
  if (
    !$("#newProduct").is(e.target) &&
    !$("#newProduct").has(e.target).length
  ) {
    unlockHeight(document.body);
    $("#newProductContainer").css("display", "none");
  }
});

$("#openForm").click(() => {
  blockHeight(document.body);
  $("#newProductContainer").css("display", "flex");
});

$("#search").keyup((e) => {
  let key = e.keyCode || e.which;
  if (key === 13) {
    fetch(API + "search/" + $("#search").val() + `0`)
      .then((res) => res.json())
      .then((data) => {
        const products = Object.values(data.products).map((val) => val);
        const cards = products.map((prod) => createCard(prod)).join("");
        $("#products").html(cards);
      });
  }
});
*/
