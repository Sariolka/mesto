import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
      
        this._handleFormSubmit(this._getInputValues());
          
        this.close();
      });
  }
     
    

}