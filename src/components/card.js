// @todo: Функция создания карточки
export function createCard(cardTemplate, cardData, deleteCallback, likeCallback, previewCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCallback(likeButton);
  });

  cardImage.addEventListener('click', () => {
    previewCallback(cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardTemplate) {
  cardTemplate.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}