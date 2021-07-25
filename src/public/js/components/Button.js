const createButton = (pageNumber, text, isActive) => {
  if (isActive) {
    return `<button class="btn" disabled>${text}</button>`;
  }
  return `<button class="btn" onclick="api.getProducts(${pageNumber}, '#products')">${text}</button>`;
};

export default createButton;
