import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
      // достаём все элементы полей
    this._formValues = {};  // создаём пустой объект
    this._inputList.forEach((input) => { // добавляем в этот объект значения всех полей
      this._formValues[input.name] = input.value;
    });

    return this._formValues; // возвращаем объект значений
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {  // вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
    input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
     // добавим вызов функции _handleFormSubmit
     // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
        
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }  
}