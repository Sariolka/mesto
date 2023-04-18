export class FormValidator {
  constructor(formValidationConfig, formElement) {
    this._formValidationConfig = formValidationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formValidationConfig.submitButtonSelector);
  }

  
  _setEventListeners = () => { //слушатель на инпуты для запуска функции проверки валидности
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('submit', this._disableSubmit);
  }
  
  _disableSubmit = (evt) => {// функция, отменяющая отправку формы и перезагрузку страницы
    evt.preventDefault();
  }


  _showInputError = (inputElement, validationMessage) => {// функция показывает сообщение об ошибке
    const errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formValidationConfig.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._formValidationConfig.errorClass);
  }
    
  _hideInputError = (inputElement) => { //функция скрывает сообщение об ошибке
    const errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formValidationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._formValidationConfig.errorClass);
  }

  _checkInputValidity = (inputElement) => { // функция, которая проверяет инпут на валидность и, 
    if(!inputElement.validity.valid) {                                 //в зависимости от результата, запускает функцию показа/скрытия ошибки
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
    
  _hasInvalidInput = () => { //функция, которая проверяет каждый инпут на валидность
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton = () => { //функция, блокирующая кнопку сабмит
    this._buttonElement.classList.add(this._formValidationConfig.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  enableButton = () => { //функция, разблокирующая кнопку сабмит
    this._buttonElement.classList.remove(this._formValidationConfig.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
    
  _toggleButtonState = () => { //функция, меняющая состояние кнопки сабмит
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }
  

  resetForm = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}