import { deleteCardRequest, dislikeCard, dislikeCardRequest, likeCardRequest } from "./api";
import { openConfirmationDialog } from "./modal";

// @todo: Функция создания карточки
export function createCard(createData) {
  const cardElement = createData.cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  cardImage.setAttribute('src', createData.cardData.link);
  cardImage.setAttribute('alt', createData.cardData.name);
  cardElement.querySelector('.card__title').textContent = createData.cardData.name;
  likeCountElement.textContent = createData.cardData.likes.length;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    const deleteRequest = () => createData.deleteCard(cardElement, createData.cardData._id);
    openConfirmationDialog(createData.confirmationDialog, deleteRequest);
  });

  if (createData.cardData.owner._id === createData.userId) {
    deleteButton.classList.remove("card__delete-button-hidden");
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  if (createData.cardData.likes.some(like => like._id === createData.userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener('click', () => {
    createData.likeCard(likeButton, likeCountElement, createData.cardData._id);
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
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(likeButton, likeCountElement, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCardRequest(cardId)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardRequest(cardId)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}