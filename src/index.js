import '../pages/index.css'
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard, previewImage } from './components/card.js';
import { handleEditing, handleCreation, closeDialog, closeDialogByEsc, openDialog, closeDialogByOverlay } from './components/modal.js';

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

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardTemplate, cardData, imageDialog, deleteCard, likeCard, previewImage);
  cardContent.append(cardElement);
});

// Событие нажатия на кнопку открытия модального окна редактирования
editButton.addEventListener("click", function () {
  openDialog(editDialog);

  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;

  editingForm.addEventListener('submit', (evt) => handleEditing(
    evt,
    editDialog,
    profileTitle,
    profileDescription,
  ));

  const closeButton = editDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", () => closeDialog(editDialog)); // Удаляем класс по нажаттию на крестик

  editDialog.addEventListener("click", (event) => {
    closeDialogByOverlay(event, editDialog);
  }); // Удаляем класс по нажаттию оверлей

  document.addEventListener('keydown', (event) => closeDialogByEsc(event, editDialog)); // Удаляем класс по нажаттию ESC
});

// Событие нажатия на кнопку открытия модального окна добавления карточки
createCardButton.addEventListener("click", function () {
  createCardDialog.classList.add('popup_is-opened'); // Добавляем класс

  creationForm.addEventListener('submit', (evt) => handleCreation(evt, createCardDialog, cardContent, cardTemplate, imageDialog));

  const closeButton = createCardDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", () => closeDialog(createCardDialog)); // Удаляем класс по нажаттию на крестик

  createCardDialog.addEventListener("click", (event) => closeDialogByOverlay(event, createCardDialog));  // Удаляем класс по нажаттию оверлей

  document.addEventListener('keydown', (event) => closeDialogByEsc(event, createCardDialog));  // Удаляем класс по нажаттию ESC
});

