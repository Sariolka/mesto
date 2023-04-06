import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);

    this._popupPhoto = document.querySelector('.popup__photo-open');
    this._popupPhotoTitle = document.querySelector('.popup__photo-title');
  }

  open (name, link) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoTitle.textContent = name;

    super.open ();
  }
}