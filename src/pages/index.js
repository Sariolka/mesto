import './index.css'
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {initialCards, formValidationConfig} from '../scripts/utils/constants.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';



const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const formPlace = document.querySelector('.popup__form-place');
const formProfile = document.querySelector('.popup__form-profile');
const nameInput = formProfile.querySelector('.popup__input_form_name');
const jobInput = formProfile.querySelector('.popup__input_form_description');
//const placeInput = formPlace.querySelector('.popup__input_form_place');
//const linkInput = formPlace.querySelector('.popup__input_form_link');
//const username = document.querySelector('.profile__name');
//const job = document.querySelector('.profile__description');
//const popupArray = Array.from(document.querySelectorAll('.popup')); //создаю массив попапов 


const popupOpenPhoto = new PopupWithImage('.popup_type_photo-full'); //попап открытия фотографии
popupOpenPhoto.setEventListeners();

const popupProfileFormValidator = new FormValidator(formValidationConfig, formProfile);
popupProfileFormValidator.enableValidation();
const popupAddCardFormValidator = new FormValidator(formValidationConfig, formPlace);
popupAddCardFormValidator.enableValidation();


const userInfo = new UserInfo({  //данные пользователя
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
})

const createCard = (data) => { //создание экземпляра карточки
  const card = new Card({
    data, 
    handleCardClick: (place, link) => {
      popupOpenPhoto.open(place, link);
    }
  }, '.card-template'); 
  const cardItem = card.generateCard();
  
  return cardItem;
};

const cardList = new Section ({  // создание 6 карточек при загрузке страницы
  items: initialCards,
  renderer: (card) => {
    cardList.addItem(createCard(card));
  }
}, '.cards');  
cardList.renderItems();


const popupProfile = new PopupWithForm({ //попап редактирования профиля
  popupSelector:'.popup_type_profile-edit',
  handleFormSubmit: (element) => { //добавление новых данных пользователя на страницу при сабмите формы
    userInfo.setUserInfo(element);
    
  }
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm({ // создание попапа добавления карточки
  popupSelector:'.popup_type_card-create',
  handleFormSubmit: (element) => {  // добавление карточки на страницу при сабмите формы
    cardList.addItem(createCard({
      name: element.place,
      link: element.link,
      alt: element.place
    }));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();


buttonEdit.addEventListener('click', openProfilePopup); //слушатель на открытие попапа редактирования профиля);

function openProfilePopup() {
  popupProfileFormValidator.resetForm();
  popupProfileFormValidator.enableButton();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}


buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки 
  popupAddCardFormValidator.disableButton();
  popupAddCardFormValidator.resetForm();
  popupAddCard.open();
});
