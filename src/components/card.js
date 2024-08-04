import { closeDialog, openDialog } from "./modal";

// @todo: Функция создания карточки
export function createCard(cardTemplate, cardData, imageDialog, deleteCallback, likeCallback, previewCallback) {
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
export function deleteCard(cardTemplate) {
  cardTemplate.remove();
}

export function likeCard(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

export function previewImage(imageDialog, cardData) {
  openDialog(imageDialog);

  const closeButton = imageDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", () => closeDialog(imageDialog)); // Удаляем класс по нажаттию на крестика

  const imageTemplate = imageDialog.getElementsByClassName("popup__image")[0];
  const labelTemplate = imageDialog.getElementsByClassName("popup__caption")[0];
  imageTemplate.src = cardData.link;
  labelTemplate.textContent = cardData.name
}