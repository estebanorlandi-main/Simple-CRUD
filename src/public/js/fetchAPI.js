const API = "http://localhost:8080/api/product/";

const createCard = ({ name, description, stock, price }, i) => {
  return `<div class="card bg-white p-4" onclick="show('${name}')">
  <div class="card__image">
    <img src="https://picsum.photos/200/200?random=${i}">
  </div>
  <div class="card__body">
    <div class="card__text">
      <h5 class="f-size-2 c-grey">${name}</h5>
      <p class="description f-size-2 c-grey">${description}</p>
    </div>
    <div class="card__data mt-4">
      <div class="f-size-4 f-bold c-dark">
      $ ${price}
      </div>
      <div class="stock f-size-2 c-grey">
        <i class="fas fa-box-open"></i><span>${stock}</span>
      </div>
    </div>
  </div>
  </div>`;
};

const createButton = (pageNumber, text, isActive) => {
  if (isActive) {
    return `<button class="btn" disabled>${text}</button>`;
  }

  return `<button class="btn" onclick="getProducts(${pageNumber})">
  ${text}
  </button>`;
};

const Paginate = (first, prev, actual, next, last, limit) => {
  return [
    // Primer pagina
    createButton(first, "first", 0 === actual),
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

const getProducts = (page = 0) => {
  fetch(`${API}list/${page}`)
    .then((res) => res.json())
    .then((data) => {
      // la informacion recivida se guarda en un estilo {indice: objeto producto}
      // se transforma esta informacion para que quede del estilo [objeto producto]
      const products = Object.values(data.products).map((val) => val);

      // se recorre cada producto y se devuelve un string que contiene la fila
      // luego se usa join para transformar todo en texto y eliminar el array
      let i = 0;
      const rows = products
        .map((prod) => {
          i++;
          return createCard(prod, i);
        })
        .join("");

      // se busca el id products para imprimir las columnas
      document.querySelector("#products").innerHTML = rows;

      const { actualPage, totalProducts, limit } = data.paginate;

      let buttonLimit = Math.ceil(totalProducts / limit);

      let firstPage = 0;
      let previousPage = actualPage > 1 ? actualPage - 1 : 0;

      let nextPage =
        actualPage * limit < totalProducts ? actualPage + 1 : buttonLimit - 1;
      let lastPage = buttonLimit - 1;

      let buttons = Paginate(
        firstPage,
        previousPage,
        actualPage,
        nextPage,
        lastPage,
        buttonLimit
      );

      document.getElementById("numProducts").innerHTML = `Products ${
        limit * (actualPage + 1) - (limit - products.length)
      } of ${totalProducts}`;

      document.querySelector("#paginate").innerHTML = buttons.join("");
    });
};

const show = (productName) => {
  fetch(`${API}/${productName.replace(" ", "%20")}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// Se llama apenas carga la pagina
getProducts();

// Listeners

const formProduct = document.getElementById("newProduct");

formProduct.addEventListener("submit", (e) => {
  const data = new FormData(formProduct);

  const req = {
    name: data.get("Name"),
    description: data.get("Description"),
    stock: data.get("Stock"),
    price: data.get("Price"),
  };

  fetch(`${API}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => alert(data.status));

  e.preventDefault();
  e.stopPropagation();
});

document.getElementById("openForm").addEventListener("click", () => {
  document.body.style.maxHeight = "100vh";
  document.body.style.overflow = "hidden";

  document.getElementById("newFormProduct").style.display = "flex";
});

document.getElementById("closeForm").addEventListener("click", () => {
  document.body.style.maxHeight = "100%";
  document.body.style.overflow = "auto";

  document.getElementById("newFormProduct").style.display = "none";
});
