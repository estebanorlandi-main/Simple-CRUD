import Card from "./components/Card.js";

class API {
  constructor(URL, ID, actualButton) {
    this.URL = URL;
    this.container = ID;
    this.buttons = actualButton;
    this.searchValue = "";

    this.page = 0;
    this.totalPages = 0;

    this.getProducts(this.page);
  }

  async getProducts() {
    let fetch_data;
    if (this.searchValue.length === 0) {
      fetch_data = JSON.parse(
        await (await fetch(this.URL + "list/" + this.page)).text()
      );
    } else {
      fetch_data = JSON.parse(
        await (
          await fetch(this.URL + `search/${this.searchValue}/${this.page}`)
        ).text()
      );
    }

    const products = fetch_data.products;
    const cards = products.map((prod) => Card(prod)).join("");

    document.getElementById(this.container).innerHTML = cards;

    const { actualPage, totalProducts, perPage } = fetch_data.paginate;

    this.totalPages = Math.floor(totalProducts / perPage);

    const showedProducts =
      totalProducts - (totalProducts - actualPage * perPage - products.length);

    document.getElementById(
      "numProducts"
    ).innerHTML = `${showedProducts} of ${totalProducts}`;

    // Paginate Buttons
    this.buttons.prev[0].disabled = this.page === 0;
    this.buttons.first[0].disabled = this.page === 0;

    this.buttons.actual[0].innerHTML = this.page + 1;

    this.buttons.next[0].disabled = this.page === this.totalPages;
    this.buttons.last[0].disabled = this.page === this.totalPages;
  }

  async search(value) {
    if (value.length !== 0) this.searchValue = value;
    else this.searchValue = "";
    this.getProducts();
  }

  firstPage() {
    if (this.page !== 0) {
      this.page = 0;
      this.getProducts();
    }
  }
  prevPage() {
    if (this.page > 0) {
      this.page -= 1;
      this.getProducts();
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.getProducts();
    }
  }
  lastPage() {
    if (this.page !== this.totalPages) {
      this.page = this.totalPages;
      this.getProducts();
    }
  }
}

export default API;
