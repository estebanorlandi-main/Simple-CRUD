import Card from "./components/Card.js";
import Paginate from "./components/Paginate.js";

class API {
  static obj;

  constructor(URL) {
    this.URL = URL;
    if (!this.obj) this.obj = this;
  }

  async getProducts(page = 0, inID) {
    const fetch_data = JSON.parse(
      await (await fetch(this.URL + "list/" + page)).text()
    );

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    $(inID).html(cards);

    Paginate(fetch_data.paginate, products.length);
  }
}

export default API;
