import '../pages/index.css'
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

const editButton = document.getElementsByClassName("profile__edit-button")[0];  // Кнопка редактирования модального окна
const editDialog = document.getElementsByClassName("popup_type_edit")[0]; // Модальное окно редактирования
const createCardButton = document.getElementsByClassName("profile__add-button")[0]; // Кнопка добавления карточки
const createCardDialog = document.getElementsByClassName("popup_type_new-card")[0]; // Модальное окно добавления карточки

const profileTitle = document.getElementsByClassName("profile__title")[0];
const profileDescription = document.getElementsByClassName("profile__description")[0];



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

// Событие нажатия на кнопку открытия модального окна редактирования
editButton.addEventListener("click", function () {
  editDialog.classList.add('popup_is-opened'); // Добавляем класс

  const jobInput = editDialog.querySelector(".popup__input_type_description");
  const nameInput = editDialog.querySelector(".popup__input_type_name");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const closeButton = editDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", function () {
    editDialog.classList.remove('popup_is-opened');
  }); // Удаляем класс по нажаттию на крестик

  editDialog.addEventListener("click", function (evt) {
    if (event.target === editDialog) {
      editDialog.classList.remove('popup_is-opened');
    }
  }); // Удаляем класс по нажаттию оверлей

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      editDialog.classList.remove('popup_is-opened');
    }
    }); // Удаляем класс по нажаттию ESC
});

// Событие нажатия на кнопку открытия модального окна добавления карточки
createCardButton.addEventListener("click", function () {
  createCardDialog.classList.add('popup_is-opened'); // Добавляем класс
  const closeButton = createCardDialog.getElementsByClassName("popup__close")[0]; // Нашли класс кнопки крестика
  closeButton.addEventListener("click", function () {
    createCardDialog.classList.remove('popup_is-opened');
  }); // Удаляем класс по нажаттию на крестик
  createCardDialog.addEventListener("click", function () {
    createCardDialog.classList.remove('popup_is-opened');
  });  // Удаляем класс по нажаттию оверлей
  document.addEventListener('keydown', function (evt) {
    console.log(evt);
    if (evt.key === 'Escape') {
      createCardDialog.classList.remove('popup_is-opened');
    }
    });  // Удаляем класс по нажаттию ESC
});

  
// // Находим форму в DOM
// const formElement = editDialog.querySelector("popup__form");

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function handleFormSubmit(evt) {
//     evt.preventDefault();
//     const name = nameInput.value;
//     const job = jobInput.value;

//     profileTitle.textContent = name;
//     profileDescription.textContent = job;
  
//   }// Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent


// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit); 
