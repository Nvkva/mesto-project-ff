import './pages/index.css'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeDialog, openDialog, closeDialogByOverlay } from './components/modal.js';
import { clearValidationForForm, enableValidation } from './components/validation.js';
import { addNewCard, editAvatar, editUser, getCards, getCurrentUser } from './components/api.js';

const DEFAULT_SUBMIT_PROGRESS_LABEL = "Сохранение...";
const DEFAULT_SUBMIT_LABEL = "Сохранить";

let currentUserData;

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

const editButton = document.querySelector(".profile__edit-button");  // Кнопка редактирования модального окна
const editDialog = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
const editDialogCloseButton = editDialog.querySelector(".popup__close"); // Нашли класс кнопки крестика
const editingForm = document.forms["edit-profile"];
const editJobInput = editDialog.querySelector(".popup__input_type_description");
const editNameInput = editDialog.querySelector(".popup__input_type_name");
const editSubmitButton = editDialog.querySelector(".popup__button");

const createCardButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const createCardDialog = document.querySelector(".popup_type_new-card"); // Модальное окно добавления карточки
const createCardCloseButton = createCardDialog.querySelector(".popup__close"); // Нашли класс кнопки крестика
const creationForm = document.forms["new-place"];
const createSubmitButton = createCardDialog.querySelector(".popup__button");
const createUrlInput = createCardDialog.querySelector(".popup__input_type_url");
const createNameInput = createCardDialog.querySelector(".popup__input_type_card-name");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAvatar = document.querySelector(".profile__image");
const editAvatarDialog = document.querySelector(".popup_type_edit-avatar"); // Модальное окно добавления карточки
const editAvatarCloseButton = editAvatarDialog.querySelector(".popup__close"); // Нашли класс кнопки крестика
const avatarForm = document.forms["edit-avatar"];
const editAvatarSubmitButton = editAvatarDialog.querySelector(".popup__button");
const editAvatarUrlInput = editAvatarDialog.querySelector(".popup__input_type_url");

const imageDialog = document.querySelector(".popup_type_image");
const imageTemplate = imageDialog.querySelector(".popup__image");
const labelTemplate = imageDialog.querySelector(".popup__caption");
const imageCloseButton = imageDialog.querySelector(".popup__close");

const confirmationDialog = document.querySelector(".popup_confirmation");
const confirmationCloseButton = confirmationDialog.querySelector(".popup__close");

const popups = document.getElementsByClassName("popup");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export function openConfirmationDialog(callBackToExecute) {
  openDialog(confirmationDialog);
  const confirmationRequest = (evt) => handleConfirmationRequest(evt, callBackToExecute);
  confirmationDialog.addEventListener('submit', confirmationRequest);
}

function handleConfirmationRequest(evt, callBackToExecute) {
  evt.preventDefault();

  closeDialog(confirmationDialog);
  callBackToExecute();
}

export function previewImage(cardData) {
  openDialog(imageDialog);

  imageTemplate.src = cardData.link;
  imageTemplate.alt = cardData.name;
  labelTemplate.textContent = cardData.name
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = editNameInput.value;
  const job = editJobInput.value;

  editSubmitButton.textContent = DEFAULT_SUBMIT_PROGRESS_LABEL;

  editUser(name, job)
    .then(res => {
      initUser(res);
      profileTitle.textContent = name;
      profileDescription.textContent = job;

      closeDialog(editDialog);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editSubmitButton.textContent = DEFAULT_SUBMIT_LABEL;
    });
}

function handleCreationCard(evt) {
  evt.preventDefault();
  const name = createNameInput.value;
  const url = createUrlInput.value;

  createSubmitButton.textContent = DEFAULT_SUBMIT_PROGRESS_LABEL;

  addNewCard(name, url)
    .then(res => {
      const cardElement = createCard({ userId: currentUserData._id, confirmationDialog, cardTemplate, cardData: res, deleteCard, likeCard, previewImage });
      cardContent.prepend(cardElement);

      evt.target.reset();

      closeDialog(createCardDialog);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      createSubmitButton.textContent = DEFAULT_SUBMIT_LABEL;
    });
}

function handleAvatarEdit(evt) {
  evt.preventDefault();

  const urlValue = editAvatarUrlInput.value;

  editAvatarSubmitButton.textContent = DEFAULT_SUBMIT_PROGRESS_LABEL;

  editAvatar(urlValue)
    .then(res => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;

      evt.target.reset();

      closeDialog(editAvatarDialog);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarSubmitButton.textContent = DEFAULT_SUBMIT_LABEL;
    });
}

function initCards(cardsData) {
  cardsData.forEach(cardData => {
    const cardElement = createCard({ confirmationDialog, userId: currentUserData._id, cardTemplate, cardData, deleteCard, likeCard, previewImage });
    cardContent.append(cardElement);
  });
}

function initUser(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  currentUserData = userData;
}

Promise.all([getCurrentUser(), getCards()])
  .then(([userData, cardsData]) => {
    initUser(userData);
    initCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

for (let item of popups) {
  item.classList.add("popup_is-animated");
}

imageCloseButton.addEventListener("click", () => closeDialog(imageDialog));
imageDialog.addEventListener("click", (event) => closeDialogByOverlay(event, imageDialog));

confirmationCloseButton.addEventListener("click", () => closeDialog(confirmationDialog));
confirmationDialog.addEventListener("click", (event) => closeDialogByOverlay(event, confirmationDialog));


editButton.addEventListener("click", function () {
  clearValidationForForm(editingForm, validationConfig);
  openDialog(editDialog);

  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;
});
editingForm.addEventListener('submit', handleProfileFormSubmit);
editDialogCloseButton.addEventListener("click", () => closeDialog(editDialog));
editDialog.addEventListener("click", (event) => closeDialogByOverlay(event, editDialog));

createCardButton.addEventListener("click", function () {
  creationForm.reset();

  clearValidationForForm(creationForm, validationConfig);
  openDialog(createCardDialog);
});
creationForm.addEventListener('submit', handleCreationCard);
createCardCloseButton.addEventListener("click", () => closeDialog(createCardDialog));
createCardDialog.addEventListener("click", (event) => closeDialogByOverlay(event, createCardDialog));

profileAvatar.addEventListener("click", function () {
  avatarForm.reset();

  clearValidationForForm(editAvatarDialog, validationConfig);
  openDialog(editAvatarDialog);
});
avatarForm.addEventListener('submit', handleAvatarEdit);
editAvatarCloseButton.addEventListener("click", () => closeDialog(editAvatarDialog));
editAvatarDialog.addEventListener("click", (event) => closeDialogByOverlay(event, editAvatarDialog));

enableValidation(validationConfig);
