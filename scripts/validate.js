export class FormValidator {
  constructor(formValidationConfig, formElement) {
      this._formValidationConfig = formValidationConfig;
      this._formElement = formElement;
  }

  _showInputError = (inputElement, validationMessage) => {// функция показывает сообщение об ошибке
      this._errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._formValidationConfig.inputErrorClass);
      errorElement.textContent = validationMessage;
      errorElement.classList.add(this._formValidationConfig.errorClass);
    }

  _hideInputError = (inputElement) => { //функция скрывает сообщение об ошибке
      this._errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._formValidationConfig.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._formValidationConfig.errorClass);
    }

  _checkInputValidity = (inputElement) => { // функция, которая проверяет инпут на валидность и, 
      if(!inputElement.validity.valid) {                                 //в зависимости от результата, запускает функцию показа/скрытия ошибки
        this._showInputError(inputElement, this._formValidationConfig.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
  _hasInvalidInput = (inputList) => { //функция, которая проверяет каждый инпут на валидность
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

  _disableButton = (buttonElement) => { //функция, блокирующая кнопку сабмит
      buttonElement.classList.add(this._formValidationConfig.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }


  _enableButton = (buttonElement) => { //функция, разблокирующая кнопку сабмит
      buttonElement.classList.remove(this._formValidationConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
  
  _toggleButtonState = (inputList, buttonElement) => { //функция, меняющая состояние кнопки сабмит
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }
  _setEventListeners = () => { //слушатель на инпуты для запуска функции проверки валидности
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formValidationConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
      });
    });
  } 
  
  resetForm = () => { //функция обновления формы при открытии попапа
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formValidationConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  
  _disableSubmit = (evt) => {// функция, отменяющая отправку формы и перезагрузку страницы
    evt.preventDefault();
  }

    enableValidation() {
      this._setEventListeners();
    }
}