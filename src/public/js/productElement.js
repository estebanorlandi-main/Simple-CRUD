const createCard = ({ name, description, stock, price }) => {
  return `<div class="card bg-white p-4" onclick="seeProduct('${name}')">
      <div class="card__image">
        <img src="https://picsum.photos/200/200">
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

export default createCard;
