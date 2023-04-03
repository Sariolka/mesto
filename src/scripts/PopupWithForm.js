import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    
    this._popupForm = document.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.popup__input');  // достаём все элементы полей
    this._formValues = {};  // создаём пустой объект
    this._inputList.forEach((input) => { // добавляем в этот объект значения всех полей
      this._formValues[input.name] = input.value;
    })

    return this._formValues; // возвращаем объект значений
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListeners('submit', (event) => {
        event.preventDefault();
         // добавим вызов функции _handleFormSubmit
    // передадим ей объект — результат работы _getInputValues
        this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }  
}