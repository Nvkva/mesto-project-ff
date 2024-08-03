import '../pages/index.css'
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

const editButton = document.getElementsByClassName("profile__edit-button")[0];  // Кнопка редактирования модального окна
const editDialog = document.getElementsByClassName("popup_type_edit")[0]; // Модальное окно редактирования
const editingForm = editDialog.querySelector(".popup__form");
const editJobInput = editDialog.querySelector(".popup__input_type_description");
const editNameInput = editDialog.querySelector(".popup__input_type_name");

const createCardButton = document.getElementsByClassName("profile__add-button")[0]; // Кнопка добавления карточки
const createCardDialog = document.getElementsByClassName("popup_type_new-card")[0]; // Модальное окно добавления карточки
const creationForm = createCardDialog.querySelector(".popup__form");
const createUrlInput = createCardDialog.querySelector(".popup__input_type_url");
const createNameInput = createCardDialog.querySelector(".popup__input_type_card-name");

const profileTitle = document.getElementsByClassName("profile__title")[0];
const profileDescription = document.getElementsByClassName("profile__description")[0];

const imageDialog = document.getElementsByClassName("popup_type_image")[0];
const cardImageTemplate = imageDialog.getElementsByClassName("popup__image")[0];
const cardImageLabel = imageDialog.getElementsByClassName("popup__caption")[0];

const popups = document.getElementsByClassName("popup");
for (let item of popups) {
  item.classList.add("popup_is-animated");
}


// @todo: Функция создания карточки
function createCard(cardData, deleteCallback, likeCallback, previewCallback) {
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
    previewCallback(imageDialog, cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardTemplate) {
  cardTemplate.remove();
}

function likeCard(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

function previewImage(imageDialog, cardData) {
  imageDialog.classList.add('popup_is-opened');
  const closeButton = imageDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", closeImageDialog); // Удаляем класс по нажаттию на крестика
  cardImageTemplate.src = cardData.link;
  cardImageLabel.textContent = cardData.name
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, likeCard, previewImage);
  cardContent.append(cardElement);
});

// Событие нажатия на кнопку открытия модального окна редактирования
editButton.addEventListener("click", function () {
  editDialog.classList.add('popup_is-opened'); // Добавляем класс

  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;

  editingForm.addEventListener('submit', handleEditing);

  const closeButton = editDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", closeEditDialog); // Удаляем класс по нажаттию на крестик

  editDialog.addEventListener("click", closeEditDialogByOverlay); // Удаляем класс по нажаттию оверлей

  document.addEventListener('keydown', closeEditDialogByEsc); // Удаляем класс по нажаттию ESC
});

// Событие нажатия на кнопку открытия модального окна добавления карточки
createCardButton.addEventListener("click", function () {
  createCardDialog.classList.add('popup_is-opened'); // Добавляем класс

  creationForm.addEventListener('submit', handleCreation);

  const closeButton = createCardDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", closeCreateDialog); // Удаляем класс по нажаттию на крестик

  createCardDialog.addEventListener("click", closeCreateDialogByOverlay);  // Удаляем класс по нажаттию оверлей

  document.addEventListener('keydown', closeCreateDialogByEsc);  // Удаляем класс по нажаттию ESC
});

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
function handleEditing(evt) {
  evt.preventDefault();
  const name = editNameInput.value;
  const job = editJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  editDialog.classList.remove('popup_is-opened');
}

function handleCreation(evt) {
  evt.preventDefault();
  const name = createNameInput.value;
  const url = createUrlInput.value;

  const newCardData = {
    name: name,
    link: url,
  };

  const cardElement = createCard(newCardData, deleteCard, likeCard);
  cardContent.prepend(cardElement);

  createNameInput.value = "";
  createUrlInput.value = "";

  createCardDialog.classList.remove('popup_is-opened');
}

function closeEditDialog() {
  editDialog.classList.remove('popup_is-opened');
}

function closeEditDialogByOverlay(evt) {
  if (event.target === editDialog) {
    closeEditDialog();
  }
}

function closeEditDialogByEsc(evt) {
  if (evt.key === 'Escape') {
    closeEditDialog();
  }
}

function closeCreateDialog() {
  createCardDialog.classList.remove('popup_is-opened');
}; // Удаляем класс по нажаттию на крестик

function closeCreateDialogByOverlay() {
  if (event.target === createCardDialog) {
    closeCreateDialog();
  }
}

function closeCreateDialogByEsc(evt) {
  if (evt.key === 'Escape') {
    createCardDialog.classList.remove('popup_is-opened');
  }
}

function closeImageDialog() {
  imageDialog.classList.remove('popup_is-opened');
}; // Удаляем класс по нажаттию на крестик
