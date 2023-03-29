import './styles/index.css';
import {Card} from './scripts/Card.js';
import {FormValidator} from './scripts/FormValidator.js';
import {initialCards, formValidationConfig} from './scripts/constants.js';

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
};

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
  popupProfileFormValidator.resetForm();

  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки 
  formPlace.reset();
  popupAddCardFormValidator.resetForm();

  openPopup(popupAddCard);
});

const editProfileSubmit = (event) => { // Обработчик «отправки» формы данных профиля
  event.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(popupProfile);
};

function handleCardClick (name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupPhotoTitle.textContent = name;

  openPopup(popupOpenPhoto);
};

//const renderCard = (item) => {
  //cardsList.prepend(item);
//}

const createCard = (item) => {
  const card = new Card(item, '.card-template', handleCardClick); //создание экзампляра карточки
  const cardItem = card.generateCard();
  
  return cardItem;
};

//initialCards.forEach((item) => {
  //const cardItem = createCard(item);
 // renderCard(cardItem);
//});

//const cardList = new Section ({
//  items: cardsList,
//  renderer: (item) => {
//    const card = new Card(item, '.card-template', handleCardClick); //создание экзампляра карточки
//    const cardItem = card.generateCard();

//cardList.addItem(cardItem);
//  }
//}, '.cards'
//)    ?????????????????????????????????????????????????????????????



const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  const cardItem = createCard({name: placeInput.value, link: linkInput.value});
  renderCard(cardItem);
  
  closePopup(popupAddCard);
};

formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
formProfile.addEventListener('submit', editProfileSubmit); // слушатель на форму редактирования профиля


const popupProfileFormValidator = new FormValidator(formValidationConfig, formProfile);
popupProfileFormValidator.enableValidation();
const popupAddCardFormValidator = new FormValidator(formValidationConfig, formPlace);
popupAddCardFormValidator.enableValidation();
