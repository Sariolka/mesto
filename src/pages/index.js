import './index.css'
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import { formValidationConfig } from '../scripts/utils/constants.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';






const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const formPlace = document.querySelector('.popup__form-place');
const formProfile = document.querySelector('.popup__form-profile');
const nameInput = formProfile.querySelector('.popup__input_form_name');
const jobInput = formProfile.querySelector('.popup__input_form_description');
const placeInput = formPlace.querySelector('.popup__input_form_place');
const linkInput = formPlace.querySelector('.popup__input_form_link');
//const username = document.querySelector('.profile__name');
//const job = document.querySelector('.profile__description');
//const popupArray = Array.from(document.querySelectorAll('.popup')); //создаю массив попапов 

const userInfo = new UserInfo({  //данные пользователя
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
}) 


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo(data);
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  function getUserId() {
    console.log(userInfo.getUserId());
    return userInfo.getUserId();
  }

const popupCardDelete = new PopupWithSubmit({   //создание попапа подтверждения удаления карточки
  popupSelector:'.popup_type_card-delete',
  handleSubmitDelete: ({item}) => {
    api.deleteCard(item._id)
    .then(() => {     //???????????????
      item.handleDeleteCard();
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
}
});
popupCardDelete.setEventListeners();

const createCard = (item) => { //создание экземпляра карточки
  const card = new Card({
    item, 
    handleCardClick: (place, link) => {
      popupOpenPhoto.open(place, link);
    },
    handleClickIconDelete: (item) => {
      popupCardDelete.open(item);
    }, 
    getUserId
  }, '.card-template'); 
  const cardItem = card.generateCard();
  
  return cardItem;
};

const cardList = new Section ({  // создание 6 карточек при загрузке страницы
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');  


/*api.getInitialCards()
  .then((items) => {
    console.log('items ', items)
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


api.getUserInfo()  //загрузить информацию о пользователе
  .then((res) => {
    userInfo.setUserInfo(res);
    console.log('res', res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
*/


const popupOpenPhoto = new PopupWithImage('.popup_type_photo-full'); //попап открытия фотографии
popupOpenPhoto.setEventListeners();

const popupProfileFormValidator = new FormValidator(formValidationConfig, formProfile);
popupProfileFormValidator.enableValidation();
const popupAddCardFormValidator = new FormValidator(formValidationConfig, formPlace);
popupAddCardFormValidator.enableValidation();



const popupProfile = new PopupWithForm({ //попап редактирования профиля
  popupSelector:'.popup_type_profile-edit',
  handleFormSubmit: (data) => { //добавление новых данных пользователя на страницу при сабмите формы
    api.editUserProfile(data)
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  }
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm({ // создание попапа добавления карточки
  popupSelector:'.popup_type_card-create',
  handleFormSubmit: (item) => {  // добавление карточки на страницу при сабмите формы
    api.addNewCard(item) 
      .then((item)=> {
        cardList.addItem(createCard(item));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  });
popupAddCard.setEventListeners();






buttonEdit.addEventListener('click', () => {
  
  popupProfileFormValidator.enableButton();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  
  popupProfile.open();
}); //слушатель на открытие попапа редактирования профиля);



buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки 
  popupAddCardFormValidator.disableButton();
  popupAddCardFormValidator.resetForm();
  popupAddCard.open();
});
