export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { //получение содержимого template из документа
    const cardItem = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardItem;
  }

  _handleDeleteCard = (event) => { // функция удаления карточки
    this._deleteButton.closest('.card').remove();
  }

  _handleLikeCard = (event) => { //функция поставить лайк на фотографию
    this._likeButton.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    
    // слушатели
    this._likeButton.addEventListener ('click', () => { // на лайк
      this._handleLikeCard();
    });

    this._deleteButton.addEventListener ('click', () => { // на удаление
      this._handleDeleteCard();
    });

    this._cardPhoto.addEventListener ('click', () => { // на открытие
      this._handleCardClick(this._name, this._link); 
    });
  }

  generateCard() { //подготовка карточки к публикации, наполнение данными
    this._card = this._getTemplate();  
    this._likeButton = this._card.querySelector('.card__like');
    this._deleteButton = this._card.querySelector('.card__delete');
    this._cardPhoto = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    this._setEventListeners();
    return this._card;
  }
}

