const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const formElement = document.querySelector('.popup__container');
const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__button-close');
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
const template = document.querySelector('.card-template');
const popupOpenPhoto = document.querySelector('.popup__photo');
const popupPhoto =popupOpenPhoto.querySelector('.popup__photo-open');
const popupPhotoTitle = popupOpenPhoto.querySelector('.popup__photo-title');


const openPopup = (popup) => { //функция открытия попапа 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const closePopup = (popup) => { //функция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}; 

const handleOverlayClick = (event) => { //закрытие попапа по клику на оверлей
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}; 

const closePopupEsc = (event) => { //закрытие попапа по нажатию на клавишу Esc
  const popupOpened = document.querySelector('.popup_opened');
    if (event.key === "Escape") {
    closePopup(popupOpened);
  };
}; 

popupArray.forEach((popup) => { // слушатель на каждый попап на закрытие по 
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
    closePopup(popup);
    } else if (event.target.classList.contains('popup__button-close')) {
    closePopup(popup);
    };
  });
  popup.addEventListener('click', handleOverlayClick);
});


buttonEdit.addEventListener('click', () => { //слушатель на открытие попапа редактирования профиля
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile)
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки
  openPopup(popupAddCard);
});

const cardDelete = (event) => { // функция удаления карточки
  event.target.closest('.card').remove();
};

const cardLike = (event) => { //функция поставить лайк на фотографию
  event.target.classList.toggle('card__like_active');
};

const createCard = (item) => { // создание карточки
  const cardItem = template.content.cloneNode(true); //клонирую элементы с их содержимым из массива карточек
  const buttonLike = cardItem.querySelector('.card__like'); 
  const buttonDelete = cardItem.querySelector('.card__delete');
  const cardItemTitle = cardItem.querySelector('.card__title');
  const cardItemPhoto = cardItem.querySelector('.card__photo');
  cardItemPhoto.src = item.link;
  cardItemTitle.textContent = item.name;
  cardItemPhoto.addEventListener('click',() => {
    popupPhotoTitle.textContent = item.name;
    popupPhoto.src = item.link;
    popupPhoto.alt = item.name;
    openPopup(popupOpenPhoto);
  });
  buttonDelete.addEventListener('click', cardDelete);
  buttonLike.addEventListener('click', cardLike);
  return cardItem;
  };

const renderCard = (cardsList,item) => { //отрисовка карточки
  cardsList.prepend(createCard(item));
};

initialCards.forEach (item => {
  renderCard(cardsList,item);
});

const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  const cardItem = {
    name: placeInput.value,
    link: linkInput.value
  };
  renderCard(cardsList,cardItem);
  closePopup(popupAddCard);
  placeInput.value = '';
  linkInput.value = '';
};

const handleFormSubmit = (event) => { // Обработчик «отправки» формы данных профиля
  event.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
};

formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
formProfile.addEventListener('submit', handleFormSubmit); // слушатель на форму редактирования профиля

