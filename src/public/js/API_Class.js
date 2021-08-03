import Card from "./components/Card.js";

class API {
  constructor(URL, ID, actualButton) {
    this.URL = URL;
    this.container = ID;
    this.buttons = actualButton;
    this.searchValue = "";

    this.page = 0;
    this.totalPages = 0;

    this.products = [];

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

    const products = fetch_data.products.map((prod) => Card(prod));

    document.getElementById(this.container).innerHTML = products.join("");

    const { actualPage, totalProducts, perPage } = fetch_data.paginate;

    this.totalPages = Math.floor(totalProducts / perPage);

    const showedProducts =
      totalProducts - (totalProducts - actualPage * perPage - products.length);

    document.getElementById(
      "numProducts"
    ).innerHTML = `${showedProducts} of ${totalProducts}`;
  }

  search(value) {
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

  getPages() {
    return { actual: this.page, total: this.totalPages };
  }

  create() {}
}

export default API;
