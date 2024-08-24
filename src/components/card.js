import { deleteCardRequest } from "./api";
import { openConfirmationDialog } from "./modal";

// @todo: Функция создания карточки
export function createCard(createData) {
  const cardElement = createData.cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', createData.cardData.link);
  cardImage.setAttribute('alt', createData.cardData.name);
  cardElement.querySelector('.card__title').textContent = createData.cardData.name;
  cardElement.querySelector('.card__like-count').textContent = createData.cardData.likes.length;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    const deleteRequest = () => createData.deleteCard(cardElement, createData.cardData._id);
    openConfirmationDialog(createData.confirmationDialog, deleteRequest);
  });

  if (createData.cardData.owner._id === createData.userId) {
    deleteButton.classList.remove("card__delete-button-hidden");
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    createData.likeCard(likeButton);
  });

  cardImage.addEventListener('click', () => {
    createData.previewImage(createData.cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardTemplate, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      cardTemplate.remove();
    })
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}