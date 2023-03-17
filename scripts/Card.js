export class Card {
  constructor(data, cardTemplateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() { //получение содержимого template из документа
    const cardItem = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardItem;
  }

  _deleteCard = (event) => { // функция удаления карточки
    this._deleteButton.closest('.card').remove();
  }

  _likeCard = (event) => { //функция поставить лайк на фотографию
    this._likeButton.classList.toggle('card__like_active');
  }
    
  _openFullPhoto() { //что-то импортировать-экспортировать!!! функция открытия фотографии
    openPopup(data.popupOpenPhoto);
    cardItemPhoto.src = data.link;
    cardItemPhoto.alt = data.name;
    cardItemTitle.textContent = data.name; 
  }


  _setEventListeners() {
    
    // слушатели
    this._likeButton.addEventListener ('click', () => { // на лайк
      this._likeCard();
    });

    this._deleteButton.addEventListener ('click', () => { // на удаление
      this._deleteCard();
    });

    this._cardPhoto.addEventListener ('click', () => { // на открытие
      this._openFullPhoto(); 
    });
  }

  generateCard() { //подготовка карточки к публикации, наполнение данными
    this._card = this._getTemplate();  
    this._likeButton = this._card.querySelector('.card__like');
    this._deleteButton = this._card.querySelector('.card__delete');
    this._cardPhoto = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._title;
    this._cardPhoto.src = this._image;
    this._cardPhoto.alt = this._title;

    this._setEventListeners();
    return this._card;
  }
}

