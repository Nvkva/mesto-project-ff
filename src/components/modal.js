// // Обработчик «отправки» формы, хотя пока

import { createCard, deleteCard, likeCard, previewImage } from "./card";

// // она никуда отправляться не будет
export function handleEditing(
  evt,
  editDialog,
  profileTitle,
  profileDescription,
) {
  evt.preventDefault();
  const editJobInput = editDialog.querySelector(".popup__input_type_description");
  const editNameInput = editDialog.querySelector(".popup__input_type_name");

  const name = editNameInput.value;
  const job = editJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeDialog(editDialog);
}

export function handleCreation(
  evt,
  createCardDialog,
  cardContent,
  cardTemplate,
  imageDialog,
) {
  evt.preventDefault();
  const createUrlInput = createCardDialog.querySelector(".popup__input_type_url");
  const createNameInput = createCardDialog.querySelector(".popup__input_type_card-name");
  const name = createNameInput.value;
  const url = createUrlInput.value;

  const newCardData = {
    name: name,
    link: url,
  };

  const cardElement = createCard(cardTemplate, newCardData, imageDialog, deleteCard, likeCard, previewImage);
  cardContent.prepend(cardElement);

  createNameInput.value = "";
  createUrlInput.value = "";

  closeDialog(createCardDialog);
}

export function openDialog(dialog) {
  dialog.classList.add('popup_is-opened');
}

export function closeDialog(dialog) {
  dialog.classList.remove('popup_is-opened');
}

export function closeDialogByOverlay(event, dialog) {
  if (event.target === dialog) {
    closeDialog(dialog);
  }
}

export function closeDialogByEsc(event, dialog) {
  if (event.key === 'Escape') {
    closeDialog(dialog);
  }
}
