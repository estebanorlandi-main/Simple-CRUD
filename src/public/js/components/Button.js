const createButton = (isActive, text) => {
  if (isActive) {
    return `<button class="btn" disabled>${text}</button>`;
  }
  return `<button class="btn" onclick="">${text}</button>`;
};

export default createButton;
