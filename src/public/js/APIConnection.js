import "./productElement.js";
import createCard from "./productElement.js";

const createButton = (pageNumber, text, isActive) => {
  if (isActive) {
    return `<button class="btn" disabled>${text}</button>`;
  }
  return `<button class="btn" onclick="API.getProducts(${pageNumber}, createCard, '#products')">${text}</button>`;
};

const paginateButtons = (prev, actual, next, last, limit) => {
  return [
    // Primer pagina
    createButton(0, "first", 0 === actual),
    // Pagina anterior
    createButton(prev, "previous", 0 === actual),
    // Pagina actual
    createButton(0, actual + 1, true),
    // Pagina siguiente
    createButton(next, "next", limit - 1 === actual),
    // Ultima pagina
    createButton(last, "last", actual === last),
  ];
};

const paginate = ({ actualPage, totalProducts, limit }) => {
  let numerOfButtons = Math.ceil(totalProducts / limit);
  let previousPage = actualPage > 1 ? actualPage - 1 : 0;
  let nextPage =
    actualPage * limit < totalProducts ? actualPage + 1 : numerOfButtons - 1;
  let lastPage = numerOfButtons - 1;

  let buttons = paginateButtons(
    previousPage,
    actualPage,
    nextPage,
    lastPage,
    numerOfButtons
  );

  $("#numProducts").text(
    `${
      limit * (actualPage + 1) - (limit - products.length)
    } of ${totalProducts}`
  );

  $("#paginate").html(buttons.join(""));
};

class API {
  constructor(URL) {
    this.URL = URL;
  }

  async getProducts(page = 0, inID) {
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + "list/" + page)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => createCard(prod)).join("");
    $(inID).html(cards);

    paginate(fetch_data.paginate);
  }

  asdf() {
    console.log("API");
  }
}

export default API;
