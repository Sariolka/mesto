import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor ({popupSelector, handleSubmitDelete}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleSubmitDelete = handleSubmitDelete;
  }


  open(item) {
    this._item = item;
    super.open();
    console.log(item);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitDelete(this._item);
      });
  }   
}