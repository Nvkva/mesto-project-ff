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
const editDialogCloseButton = editDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
const editingForm = editDialog.querySelector(".popup__form");
const editJobInput = editDialog.querySelector(".popup__input_type_description");
const editNameInput = editDialog.querySelector(".popup__input_type_name");

const createCardButton = document.getElementsByClassName("profile__add-button")[0]; // Кнопка добавления карточки
const createCardDialog = document.getElementsByClassName("popup_type_new-card")[0]; // Модальное окно добавления карточки
const createCardCloseButton = createCardDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
const creationForm = createCardDialog.querySelector(".popup__form");

const profileTitle = document.getElementsByClassName("profile__title")[0];
const profileDescription = document.getElementsByClassName("profile__description")[0];

const imageDialog = document.getElementsByClassName("popup_type_image")[0];

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardTemplate, cardData, imageDialog, deleteCard, likeCard, previewImage);
  cardContent.append(cardElement);
});

const popups = document.getElementsByClassName("popup");
for (let item of popups) {
  item.classList.add("popup_is-animated");
}

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
  ), { once: true });

  document.addEventListener('keydown', (event) => closeDialogByEsc(event, editDialog), { once: true }); // Удаляем класс по нажаттию ESC
});
editDialogCloseButton.addEventListener("click", () => closeDialog(editDialog)); // Удаляем класс по нажаттию на крестик
editDialog.addEventListener("click", (event) => closeDialogByOverlay(event, editDialog)); // Удаляем класс по нажаттию оверлей

// Событие нажатия на кнопку открытия модального окна добавления карточки
createCardButton.addEventListener("click", function () {
  openDialog(createCardDialog);
  document.addEventListener('keydown', (event) => closeDialogByEsc(event, createCardDialog), { once: true });  // Удаляем класс по нажаттию ESC
  creationForm.addEventListener('submit', (evt) => handleCreation(evt, createCardDialog, cardContent, cardTemplate, imageDialog), { once: true });
});
createCardCloseButton.addEventListener("click", () => closeDialog(createCardDialog)); // Удаляем класс по нажаттию на крестик
createCardDialog.addEventListener("click", (event) => closeDialogByOverlay(event, createCardDialog));  // Удаляем класс по нажаттию оверлей

