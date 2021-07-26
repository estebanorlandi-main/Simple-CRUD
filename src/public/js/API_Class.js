import Card from "./components/Card.js";
import Paginate from "./components/Paginate.js";

class API {
  constructor(URL, ID) {
    this.URL = URL;
    this.container = ID;
  }

  async getAll(page = 0) {
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + "list/" + page)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    document.getElementById(this.container).innerHTML = cards;
  }

  async search(page = 0, value, inID) {
    if (!value) return this.getAll();
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + `search/${value}/${page}`)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    document.getElementById(inID).innerHTML = cards;
  }
}

export default API;
