
import {Card} from './scripts/Card.js';
import {FormValidator} from './scripts/FormValidator.js';
import {initialCards, formValidationConfig} from './scripts/constants.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';

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

const popupOpenPhoto = new PopupWithImage('.popup_type_photo-full');
popupOpenPhoto.setEventListeners();

const createCard = (data) => {
  const card = new Card({
    data, 
    handleCardClick: (name, link) => {
      popupOpenPhoto.open(name, link);
    }
   }, '.card-template'); //создание экзампляра карточки
  const cardItem = card.generateCard();
  
  return cardItem;
};

const cardList = new Section ({ 
  items: initialCards,
  renderer: (card) => {
    cardList.addItem(createCard(card));
}
}, '.cards'
);  
cardList.renderItems();

const popupProfileFormValidator = new FormValidator(formValidationConfig, formProfile);
popupProfileFormValidator.enableValidation();
const popupAddCardFormValidator = new FormValidator(formValidationConfig, formPlace);
popupAddCardFormValidator.enableValidation();

const newUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
})






buttonEdit.addEventListener('click', () => { //слушатель на открытие попапа редактирования профиля
  popupProfileFormValidator.resetForm();
  popupProfile.open();
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки 
  popupAddCardFormValidator.disableButton();
  popupAddCardFormValidator.resetForm();

  popupAddCard.open();
});

const editProfileSubmit = (event) => { // Обработчик «отправки» формы данных профиля
  event.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(popupProfile);
};






const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  const cardItem = createCard({name: placeInput.value, link: linkInput.value});
  renderCard(cardItem);
  
  closePopup(popupAddCard);
};

formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
formProfile.addEventListener('submit', editProfileSubmit); // слушатель на форму редактирования профиля


