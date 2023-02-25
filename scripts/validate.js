const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


const showInputError = (formElement, inputElement, validationMessage, config) => {// функция показывает сообщение об ошибке
    const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, config) => { //функция скрывает сообщение об ошибке
    const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  };
  
  const checkInputValidity = (formElement, inputElement, config) => { // функция, которая проверяет все инпуты формы и скрывает/показывает ошибку
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const hasInvalidInput = (inputList) => { //функция, которая проверяет массив инпутов на валидность
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };


  const setEventListeners = (formElement, config) => { //слушатель на инпуты для запуска функции проверки валидности
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonSubmit, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        toggleButtonState(inputList, buttonSubmit, config);
        checkInputValidity(formElement, inputElement, config);
      });
    });
  };
  
  const disableSubmit = (evt) => {
    evt.preventDefault();
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', disableSubmit);
      setEventListeners(formElement, config);
    });
  };
  
  enableValidation(formValidationConfig);
  
  //сделать, чтобы кнопка сохранить стала опять неактивной при загрузке карточки
  // скрыть ошибки при загрузке попапа