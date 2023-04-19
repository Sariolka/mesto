import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor ({popupSelector, submit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submit = submit;
  }


  open(item) {
    this._item = item;
    super.open();
    console.log(this._item._id);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this._item);
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit)
  }   
}