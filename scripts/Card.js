class Card {
    constructor(data, handleCardClick, cardTemplateSelector) {
      this._title = data.name;
      this._image = data.link;
      this._alt = data.name;
      this._cardTemplateSelector = cardTemplateSelector;
      // this._handleCardClick = handleCardClick;
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
      event.target.closest('.card').remove();
    }

    _likeCard = (event) => { //функция поставить лайк на фотографию
      event.target.classList.toggle('card__like_active');
    }
    
    _setEventListeners() {
      this._card.querySelector('.card__like').addEventListener ('click', () => {
        this._likeCard();
      });

      this._card.querySelector('.card__delete').addEventListener ('click', () => {
        this._deleteCard();
      });

      this._card.querySelector('.card__photo').addEventListener ('click', () => {
        this._(); // добавить функцию открытия попапа full image????
      });
    }

    generateCard() { //подготовка карточки к публикации, наполнение данными
      this._card = this._getTemplate();  
      this._setEventListeners();

      this._card.querySelector('.card__title').textContent = this._title;
      this._card.querySelector('.card__photo').src = this._image;
      this._card.querySelector('.card__photo').alt = this._title;


      return this._card;
    }
}

