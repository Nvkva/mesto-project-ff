import { disableButton, enableButton } from "../utils/disable-button";

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
          inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
          showInputError({
            formElement,
            inputElement,
            inputErrorClass: config.inputErrorClass,
            errorClass: config.errorClass,
          });
        } else {
          hideInputError({
            formElement,
            inputElement,
            inputErrorClass: config.inputErrorClass,
            errorClass: config.errorClass,
          });
        }

        toggleButtonState({
          buttonElement,
          inputList,
          inactiveButtonClass: config.inactiveButtonClass,
        })
      });
    });
  });
};

export const clearValidationForForm = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  disableButton(buttonElement, config.inactiveButtonClass);

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass: config.inputErrorClass,
      errorClass: config.errorClass,
    });
  });
};

const showInputError = (inputErrorConfig) => {
  const errorElement = inputErrorConfig.formElement.querySelector(`.${inputErrorConfig.inputElement.id}-error`);
  inputErrorConfig.inputElement.classList.add(inputErrorConfig.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = inputErrorConfig.inputElement.validationMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(inputErrorConfig.errorClass);
};

const hideInputError = (inputErrorConfig) => {
  const errorElement = inputErrorConfig.formElement.querySelector(`.${inputErrorConfig.inputElement.id}-error`);
  inputErrorConfig.inputElement.classList.remove(inputErrorConfig.inputErrorClass);
  errorElement.classList.remove(inputErrorConfig.errorClass);
  errorElement.textContent = '';
};

const toggleButtonState = (buttonStateConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(buttonStateConfig.inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonStateConfig.buttonElement, buttonStateConfig.inactiveButtonClass)
  } else {
    // иначе сделай кнопку активной
    enableButton(buttonStateConfig.buttonElement, buttonStateConfig.inactiveButtonClass)
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};