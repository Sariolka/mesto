export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
    this._popup.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__button-close')) {
        this._popup.close();
      }
    });
  }
}