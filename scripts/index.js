const popupProfile = document.querySelector('.popup_type_profile-edit');
const popupAddCard = document.querySelector('.popup_type_card-create');
const buttonEdit = document.querySelector('.profile__edit-button');
const formPlace = document.querySelector('.popup__form-place');
const formProfile = document.querySelector('.popup__form-profile');
const nameInput = formProfile.querySelector('.popup__input_form_name');
const jobInput = formProfile.querySelector('.popup__input_form_description');
const placeInput = formPlace.querySelector('.popup__input_form_place');
const linkInput = formPlace.querySelector('.popup__input_form_link');
const username = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupArray = Array.from(document.querySelectorAll('.popup')); //создаю массив попапов
const cardsList = document.querySelector('.cards');
const popupOpenPhoto = document.querySelector('.popup_type_photo-full');
const popupPhoto =popupOpenPhoto.querySelector('.popup__photo-open');
const popupPhotoTitle = popupOpenPhoto.querySelector('.popup__photo-title');

const openPopup = (popup) => { //функция открытия попапа 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => { //функция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}; 

const closePopupByEsc = (evt) => { //Закрытие Popup кнопкой Escape
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

popupArray.forEach((popup) => { // слушатель на каждый попап на закрытие по оверлей и кнопке закрытия попапа
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener('click', () => { //слушатель на открытие попапа редактирования профиля
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
  resetForm(formProfile, formValidationConfig);  
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки
  formPlace.reset();
  resetForm(formPlace, formValidationConfig);  
  openPopup(popupAddCard);
});
   
const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  cardItem = {
    name: placeInput.value,
    link: linkInput.value
  };
  renderCard(cardsList,cardItem); 
  closePopup(popupAddCard);
};

const editProfileSubmit = (event) => { // Обработчик «отправки» формы данных профиля
  event.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
};

formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
formProfile.addEventListener('submit', editProfileSubmit); // слушатель на форму редактирования профиля

class Card {
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
    openPopup(popupOpenPhoto);
    popupPhoto.src = this._image;
    popupPhoto.alt = this._title;
    data.textContent = this._title; 
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

initialCards.forEach ((item) => {
  const card = new Card(item, '.card-template'); //создание экзампляра карточки
  const cardItem = card.generateCard(); //создание карточки и возвращение ее наружу

  cardsList.prepend(cardItem);
});