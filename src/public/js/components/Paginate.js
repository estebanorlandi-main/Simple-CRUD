import Button from "./Button.js";

const paginateButtons = (prev, actual, next, last, limit) => {
  return [
    // Primer pagina
    Button(0, "first", 0 === actual),
    // Pagina anterior
    Button(prev, "previous", 0 === actual),
    // Pagina actual
    Button(0, actual + 1, true),
    // Pagina siguiente
    Button(next, "next", limit - 1 === actual),
    // Ultima pagina
    Button(last, "last", actual === last),
  ];
};

const Paginate = ({ actualPage, totalProducts, limit }, perPage) => {
  let buttonLimit = Math.ceil(totalProducts / limit);
  let previousPage = actualPage > 1 ? actualPage - 1 : 0;
  let nextPage =
    actualPage * limit < totalProducts ? actualPage + 1 : buttonLimit - 1;
  let lastPage = buttonLimit - 1;

  let buttons = paginateButtons(
    previousPage,
    actualPage,
    nextPage,
    lastPage,
    buttonLimit
  );

  document.getElementById("numProducts").innerText = `${
    limit * (actualPage + 1) - (limit - perPage)
  } of ${totalProducts}`;

  document.getElementById("paginate").innerHTML = buttons.join("");
};

export default Paginate;
