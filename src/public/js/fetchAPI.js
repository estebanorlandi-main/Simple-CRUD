const createRow = ({ name, description, stock, price }) => {
  return `
    <tr>
        <td>    
            ${name}
        </td>
        <td>    
            ${description}
        </td>
        <td>    
            ${stock}
        </td>
        <td>    
            ${price}
        </td>
    </tr>    
    `;
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
    });
};

fetchAll();

document.querySelectorAll(".page-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fetchAll(e.target.innerHTML - 1);
  });
});
