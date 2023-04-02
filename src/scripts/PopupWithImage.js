import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);

    }

    open (name, link) {
      document.querySelector('.popup__photo-open').src = link;
      document.querySelector('.popup__photo-open').alt = name;
      document.querySelector('.popup__photo-title').textContent = name;


      super.open ();
    }
}