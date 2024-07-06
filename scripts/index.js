// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, cb) {
  const content = document.querySelector('.content');
  const cardContent = content.querySelector('.places__list');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').setAttribute('src', cardData.link);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    cb(cardElement, cardData);
  });

  cardContent.append(cardElement);
}


// @todo: Функция удаления карточки
function deleteCard(cardTemplate, cardData) {
  let cardToDelete = initialCards.find(card => card.name === cardData.name);
  let index = initialCards.indexOf(cardToDelete);
  initialCards.splice(index, 1);
  cardTemplate.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  createCard(cardData, deleteCard);
});
