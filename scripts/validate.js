
const showInputError = (formElement, inputElement, validationMessage, config) => {// функция показывает сообщение об ошибке
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.errorClass);
}
  
const hideInputError = (formElement, inputElement, config) => { //функция скрывает сообщение об ошибке
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}
  
const checkInputValidity = (formElement, inputElement, config) => { // функция, которая проверяет инпут на валидность и 
  if(!inputElement.validity.valid) {                                 //в зависимости от результата, запускает функцию показа/скрытия ошибки
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}
  
const hasInvalidInput = (inputList) => { //функция, которая проверяет каждый инпут на валидность
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const disableButton = (buttonElement, config) => { //функция, блокирующая кнопку сабмит
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const enableButton = (buttonElement, config) => { //функция, разблокирующая кнопку сабмит
  buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, config) => { //функция, меняющая состояние кнопки сабмит
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}
const setEventListeners = (formElement, config) => { //слушатель на инпуты для запуска функции проверки валидности 
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
} 

const resetForm = (formElement, config) => { //функция начальной загрузки формы 
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
  hideInputError(formElement, inputElement, config);
  });
}

const disableSubmit = (evt) => {// функция, отменяющая отправку формы и перезагрузку страницы
  evt.preventDefault();
}

const enableValidation = (config) => { // функция валидации формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disableSubmit);
    setEventListeners(formElement, config);
  });
}
  
enableValidation(formValidationConfig);


