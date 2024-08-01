import '../pages/index.css'
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

// устанавливаем триггер для модального окна (название можно изменить)
const editButton = document.getElementsByClassName("profile__edit-button")[0];
const editDialog = document.getElementsByClassName("popup_type_edit")[0];
const createCardButton = document.getElementsByClassName("profile__add-button")[0];
const createCardDialog = document.getElementsByClassName("popup_type_new-card")[0];
// const createCardButton = document.getElementsByClassName("profile__add-button")[0];
// const createCardDialog = document.getElementsByClassName("popup_type_image")[0];



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

// событие нажатия на триггер открытия модального окна
editButton.addEventListener("click", function () {
  // делаем модальное окно видимым
  editDialog.classList.add('popup_is-opened');
  const closeButton = editDialog.getElementsByClassName("popup__close")[0];
  closeButton.addEventListener("click", function () {
    editDialog.classList.remove('popup_is-opened');
  });

  editDialog.addEventListener("click", function () {
    editDialog.classList.remove('popup_is-opened');
  });
});

// событие нажатия на триггер открытия модального окна
createCardButton.addEventListener("click", function () {
  // делаем модальное окно видимым
  createCardDialog.classList.add('popup_is-opened');
  const closeButton = createCardDialog.getElementsByClassName("popup__close")[0];
  closeButton.addEventListener("click", function () {
    createCardDialog.classList.remove('popup_is-opened');
  });

  createCardDialog.addEventListener("click", function () {
    createCardDialog.classList.remove('popup_is-opened');
  });  
});
