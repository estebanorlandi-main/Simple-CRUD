const createRow = ({ name, description, stock, price }) => {
  return `<tr>
        <td>${name}</td>
        <td>${description}</td>
        <td>${stock}</td>
        <td>${price}</td>
    </tr>`;
};

const createButton = (pageNumber, isActive) => {
  if (isActive) {
    return `<button class="btn" disabled>${pageNumber + 1}</button>`;
  }

  return `<button class="btn" onclick="fetchAll(${pageNumber})">
  ${pageNumber + 1}
  </button>`;
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

      const { actualPage, numOfProducts } = data.paginate;

      // calculamos la cantidad de botones necesarios para paginar nuestra pagina
      // utilizamos Math.ceil para redondear el resultado hacia arriba 2.1 = 3
      const cantButtons = Math.ceil(numOfProducts / 5);

      let buttons = [];
      for (let i = 0; i < cantButtons; i++) {
        buttons.push(createButton(i, i === actualPage));
      }
      document.querySelector("#paginate").innerHTML = buttons.join("");
    });
};

// Se llama apenas carga la pagina
fetchAll();
