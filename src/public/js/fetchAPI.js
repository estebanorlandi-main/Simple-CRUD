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

      // calculamos la cantidad de botones necesarios para paginar nuestra pagina
      // utilizamos Math.ceil para redondear el resultado hacia arriba 2.1 = 3
      let cantButtons = Math.ceil(totalProducts / limit);
      if (cantButtons > 5) cantButtons = 5;

      let startPoint = 0;
      if (actualPage > 0) startPoint = actualPage;

      let endPoint = startPoint + 5;
      //   if (startPoint + 5 - 2 > 0) startPoint = actualPage - 2;

      let buttons = [];
      // First Page
      buttons.push(createButton(0, "first", 0 === actualPage));
      for (let i = startPoint; i < endPoint; i++) {
        buttons.push(createButton(i, i + 1, i === actualPage));
      }
      // Last Page
      buttons.push(
        createButton(cantButtons - 1, "last", cantButtons - 1 === actualPage)
      );

      document.querySelector("#paginate").innerHTML = buttons.join("");
    });
};

// Se llama apenas carga la pagina
fetchAll();
