const cards = initialCards;
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
  let cardToDelete = cards.find(card => card.name === cardData.name);
  
  cardTemplate.remove();
  
}


// @todo: Вывести карточки на страницу
cards.forEach(cardData => {
  createCard(cardData, deleteCard);
});
