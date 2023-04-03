
import {Card} from './scripts/Card.js';
import {FormValidator} from './scripts/FormValidator.js';
import {initialCards, formValidationConfig} from './scripts/constants.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

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


const newUserInfo = new UserInfo({  //данные пользователя
      nameSelector: '.profile__name',
      infoSelector: '.profile__description'
    })

const popupOpenPhoto = new PopupWithImage('.popup_type_photo-full'); //попап открытия фотографии
popupOpenPhoto.setEventListeners();

const popupProfile = new PopupWithForm({ //попап редактирования профиля
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (user) => { //добавление новых данных пользователя на страницу
    newUserInfo.setUserInfo(user);
    popupProfile.close();
  }
});
popupProfile.setEventListeners();


const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_card-create',
  handleFormSubmit: (data) => {
    cardsList.prepend(createCard(data));
  }
});
popupAddCard.setEventListeners();



const createCard = (data) => {
  const card = new Card({
    data, 
    handleCardClick: (name, link) => {
      popupOpenPhoto.open(name, link);
    }
   }, '.card-template'); //создание экземпляра карточки
  const cardItem = card.generateCard();
  
  return cardItem;
};

const cardList = new Section ({  // создание начальных 6 карточек
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

/*const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  const cardItem = createCard({name: placeInput.value, link: linkInput.value});
  renderCard(cardItem);
  
  closePopup(popupAddCard);
};*/

buttonEdit.addEventListener('click', () => { //слушатель на открытие попапа редактирования профиля
  
  newUserInfo.getUserInfo();
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



//formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
//formProfile.addEventListener('submit', editProfileSubmit); // слушатель на форму редактирования профиля


