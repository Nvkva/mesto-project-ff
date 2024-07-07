// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardTemplate) {
  cardTemplate.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard);
  cardContent.append(cardElement);
});
