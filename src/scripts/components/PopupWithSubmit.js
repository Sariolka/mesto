import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor ({popupSelector, submit}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submit = submit;
    this._handleSubmit =  this._handleSubmit.bind(this);
  }


  open(item) {
    this.item = item;
    super.open();
    console.log(this.item._id);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this.item);
  }

 // getCardId (item) {
   // this._item = item;
   // return this._item._id;
 // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit)
  }   
}