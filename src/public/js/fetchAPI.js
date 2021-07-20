const createRow = ({ name, description, stock, price }) => {
  return `<tr>
        <td>${name}</td>
        <td>${description}</td>
        <td>${stock}</td>
        <td>${price}</td>
    </tr>`;
};

const createButton = (pageNumber, text, isActive) => {
  if (isActive) {
    return `<button class="btn" disabled>${text}</button>`;
  }

  return `<button class="btn" onclick="fetchAll(${pageNumber})">
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

const fetchAll = (page = 0) => {
  fetch(`http://localhost:8080/api/product/list/${page}`)
    .then((res) => res.json())
    .then((data) => {
      // la informacion recivida se guarda en un estilo {indice: objeto producto}
      // se transforma esta informacion para que quede del estilo [objeto producto]
      const products = Object.values(data.products).map((val) => val);

      // se recorre cada producto y se devuelve un string que contiene la fila
      // luego se usa join para transformar todo en texto y eliminar el array
      const rows = products
        .map((prod) => {
          return createRow(prod);
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

      document.querySelector("#paginate").innerHTML = buttons.join("");
    });
};

// Se llama apenas carga la pagina
fetchAll();
