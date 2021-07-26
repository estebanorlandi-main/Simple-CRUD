import Card from "./components/Card.js";
import Paginate from "./components/Paginate.js";

class API {
  constructor(URL) {
    this.URL = URL;
  }

  async getProducts(page = 0, inID) {
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + "list/" + page)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    document.getElementById(inID).innerHTML = cards;

    Paginate(fetch_data.paginate, products.length);
  }

  async search(page = 0, value, inID) {
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + `search/${value}/${page}`)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    document.getElementById(inID).innerHTML = cards;
  }
}

export default API;
