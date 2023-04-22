export class Card {
  constructor({item, userId, handleCardClick, handleClickIconDelete, handleLike, handleDislike}, cardTemplateSelector ) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._alt = item.name;
    this._likes = item.likes;
    this._cardId = item._id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleClickIconDelete = handleClickIconDelete;
    this._userId = userId;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
  }

  _getTemplate() { //получение содержимого template из документа
    const cardItem = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardItem;
  }

  handleDeleteCard() { // функция удаления карточки
    this._card.remove();
    this._card = null;
  }

  handleLikeCard(item) { //функция поставить лайк на фотографию
    this._likes = item.likes;
    this._likeButton.classList.toggle('card__like_active');
    this._likesCount.textContent = this._likes.length;
  }

  _checkLike() {
    this._likes.forEach((user) => {
     if(user._id === this._userId) {
        this._likeButton.classList.add('card__like_active');
      }
    })
  }

  _setEventListeners() {   // слушатели
    
    this._likeButton.addEventListener ('click', () => { // на лайк
      this._likeButton.classList.contains('card__like_active') ? this._handleDislike() : this._handleLike()
    });

    this._deleteButton.addEventListener ('click', () => { // на удаление
      this._handleClickIconDelete(); 
    });

    this._cardPhoto.addEventListener ('click', () => { // на открытие
      this._handleCardClick(this._name, this._link); 
    });
  }

  _removeDeleteButton() {
    if(this._item.owner._id !== this._userId) {
      this._deleteButton.remove();
    }
  }

  generateCard() { //подготовка карточки к публикации, наполнение данными
    this._card = this._getTemplate();  
    this._likeButton = this._card.querySelector('.card__like');
    this._deleteButton = this._card.querySelector('.card__delete');
    this._cardPhoto = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__title');
    this._likesCount = this._card.querySelector('.card__like-count');
    
    this._cardTitle.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    this._removeDeleteButton();
    this._checkLike();
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();

    return this._card;
  } 
}

