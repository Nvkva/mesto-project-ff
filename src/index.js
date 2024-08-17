import './pages/index.css'
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeDialog, openDialog, closeDialogByOverlay } from './components/modal.js';

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

const createCardButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const createCardDialog = document.querySelector(".popup_type_new-card"); // Модальное окно добавления карточки
const createCardCloseButton = createCardDialog.querySelector(".popup__close"); // Нашли класс кнопки крестика
const creationForm = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const imageDialog = document.querySelector(".popup_type_image");
const imageTemplate = imageDialog.querySelector(".popup__image");
const labelTemplate = imageDialog.querySelector(".popup__caption");
const imageCloseButton = imageDialog.querySelector(".popup__close");

const popups = document.getElementsByClassName("popup");

export function previewImage(cardData) {
  openDialog(imageDialog);

  imageTemplate.src = cardData.link;
  imageTemplate.alt = cardData.name;
  labelTemplate.textContent = cardData.name
}

function handleEditing(evt) {
  evt.preventDefault();

  const name = editNameInput.value;
  const job = editJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeDialog(editDialog);
}

function handleCreation(evt) {
  evt.preventDefault();
  const createUrlInput = createCardDialog.querySelector(".popup__input_type_url");
  const createNameInput = createCardDialog.querySelector(".popup__input_type_card-name");
  const name = createNameInput.value;
  const url = createUrlInput.value;

  const cardData = {
    name: name,
    link: url,
  };

  const cardElement = createCard({ cardTemplate, cardData, deleteCard, likeCard, previewImage });
  cardContent.prepend(cardElement);

  evt.target.reset();

  closeDialog(createCardDialog);
}


// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard({ cardTemplate, cardData, deleteCard, likeCard, previewImage });
  cardContent.append(cardElement);
});

for (let item of popups) {
  item.classList.add("popup_is-animated");
}

imageCloseButton.addEventListener("click", () => closeDialog(imageDialog)); // Удаляем класс по нажатию на крестика
imageDialog.addEventListener("click", (event) => closeDialogByOverlay(event, imageDialog)); // Удаляем класс по нажатию оверлей


// Событие нажатия на кнопку открытия модального окна редактирования
editButton.addEventListener("click", function () {
  openDialog(editDialog);

  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;

});
editingForm.addEventListener('submit', handleEditing);
editDialogCloseButton.addEventListener("click", () => closeDialog(editDialog)); // Удаляем класс по нажатию на крестик
editDialog.addEventListener("click", (event) => closeDialogByOverlay(event, editDialog)); // Удаляем класс по нажатию оверлей

// Событие нажатия на кнопку открытия модального окна добавления карточки
createCardButton.addEventListener("click", function () {
  openDialog(createCardDialog);
});
creationForm.addEventListener('submit', handleCreation);
createCardCloseButton.addEventListener("click", () => closeDialog(createCardDialog)); // Удаляем класс по нажатию на крестик
createCardDialog.addEventListener("click", (event) => closeDialogByOverlay(event, createCardDialog));  // Удаляем класс по нажатию оверлей

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
// Выбираем элемент ошибки на основе уникального класса 
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity("Разрешены только латинские буквы.");
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector(".popup__button");

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();


const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};

// const popupFormElement = document.querySelector(".popup__form");
// const popupInput = popupFormElement.querySelector(".popup__input");


// // Функция, которая добавляет класс с ошибкой
// const showInputError = (formElement, popupInput, errorMessage) => {
//   const formError = formElement.querySelector(`.${popupInput.id}-error`);
//   popupInput.classList.add('form__input_type_error');
//   formError.textContent = errorMessage;
//   formError.classList.add('form__input-error_active');
//   };

//   // Функция, которая удаляет класс с ошибкой
// const hideInputError = (formElement, popupInput) => {
//   const formError = formElement.querySelector(`.${popupInput.id}-error`); 
//   popupInput.classList.remove('form__input_type_error');
// formError.classList.remove('form__input-error_active');
// formError.textContent = '';
// };

// // Функция, которая проверяет валидность поля
// export const isValid = (formElement, popupInput) => {
//   if (!popupInput.validity.valid) {
//   // Если поле не проходит валидацию, покажем ошибку
//   showInputError(formElement, popupInput, popupInput.validationMessage);
//   } else {
//   // Если проходит, скроем
//   hideInputError(formElement, popupInput);
//   }
// };

// export const setEventListeners = (popupFormElement) => {
//   const inputlist = Array.from(popupFormElement.querySelectorAll('.form__input'));
//   inputList.forEach((popupInput) => {
//   popupInput.addEventListener('input', () => {
//   isValid (popupFormElement, popupInput);
//   })
// })
// }

// export const enableValidation = () => {
//   const formlist = Array.from(document.querySelectorAll('.popup__form'));
//   formlist.forEach((popupFormElement) => {
//     setEventListeners(popupFormElement)
//   });
// };

//   enableValidation();