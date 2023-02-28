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
const template = document.querySelector('.card-template').content;
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
  resetForm(formProfile, formValidationConfig); //заменить функцию
  
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки
  formPlace.reset();
  resetForm(formPlace, formValidationConfig);  // заменить функцию
  openPopup(popupAddCard);
});

const deleteCard = (event) => { // функция удаления карточки
  event.target.closest('.card').remove();
};

const likeCard = (event) => { //функция поставить лайк на фотографию
  event.target.classList.toggle('card__like_active');
};

const createCard = (item) => { // создание карточки
  const cardItem = template.querySelector('.card').cloneNode(true);
  const buttonLike = cardItem.querySelector('.card__like'); 
  const buttonDelete = cardItem.querySelector('.card__delete');
  const cardItemTitle = cardItem.querySelector('.card__title');
  const cardItemPhoto = cardItem.querySelector('.card__photo');
  cardItemPhoto.src = item.link;
  cardItemPhoto.alt = item.name;
  cardItemTitle.textContent = item.name;
  cardItemPhoto.addEventListener('click', () => {
    popupPhotoTitle.textContent = item.name;
    popupPhoto.src = item.link;
    popupPhoto.alt = item.name;
    openPopup(popupOpenPhoto);
  });
  buttonDelete.addEventListener('click', deleteCard);
  buttonLike.addEventListener('click', likeCard);
  return cardItem;
};

const renderCard = (cardsList,item) => { //отрисовка карточки
  cardsList.prepend(createCard(item));
};

initialCards.forEach (item => {
  renderCard(cardsList, item);
});
   
const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  cardItem = {
    name: placeInput.value,
    link: linkInput.value
  };
  renderCard(cardsList,cardItem);
  event.target.reset();
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

