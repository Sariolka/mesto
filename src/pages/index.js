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
const buttonAvatarChange = document.querySelector('.profile__avatar-button');
const formProfile = document.querySelector('.popup__form-profile');
const formPlace = document.querySelector('.popup__form-place');
const formAvatar = document.querySelector('.popup__form-avatar');



const userInfo = new UserInfo({  //данные пользователя
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
}) 

let userId = "";



Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([data, items]) => {
userInfo.setUserInfo(data);
userId = data._id;
cardList.renderItems(items);
console.log('items', items);
})
.catch((err) => {
console.log(err); // выведем ошибку в консоль
});


const createCard = (item) => { //создание экземпляра карточки
  const card = new Card({
    item,
    userId,
    handleCardClick: (place, link) => {
      popupOpenPhoto.open(place, link);
    },
    handleClickIconDelete: () => {
      popupCardDelete.open();
      popupCardDelete.handleSubmit(() => {
        api.deleteCard(item)
          .then(() => {
            popupCardDelete.close();
            card.handleDeleteCard();
          })
          .catch((err) => {
             console.log(err);
          })
    })},
    handleLike: () => {
      api.getLikeCard(item)
      .then((item) => {
        card.handleLikeCard(item);
    })
    .catch((err) => {
      console.log(err);
   })},
   handleDislike: () => {
    api.deleteLikeCard(item)
    .then((item) => {
      card.handleLikeCard(item);
    })
    .catch((err) => {
      console.log(err);
   })}
  }, '.card-template'); 
  const cardItem = card.generateCard();
  
  return cardItem;
};


const cardList = new Section ({  // создание 6 карточек при загрузке страницы
  renderer: (item) => {
    cardList.addItems(createCard(item));
  }
}, '.cards');  


const popupCardDelete = new PopupWithSubmit({   //создание попапа подтверждения удаления карточки
  popupSelector:'.popup_type_card-delete'});
popupCardDelete.setEventListeners();

const popupOpenPhoto = new PopupWithImage('.popup_type_photo-full'); //попап открытия фотографии
popupOpenPhoto.setEventListeners();


const popupProfile = new PopupWithForm({ //попап редактирования профиля
  popupSelector:'.popup_type_profile-edit',
  handleFormSubmit: (data) => { //добавление новых данных пользователя на страницу при сабмите формы
    popupProfile.renderLoading(true);
    api.editUserProfile(data)
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupProfile.renderLoading(false);
  })
  }
});
popupProfile.setEventListeners();


const popupAddCard = new PopupWithForm({ // создание попапа добавления карточки
  popupSelector:'.popup_type_card-create',
  handleFormSubmit: (item) => {  // добавление карточки на страницу при сабмите формы
    popupAddCard.renderLoading(true);
    api.addNewCard(item) 
      .then((item)=> {
        cardList.addItem(createCard(item));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      })
    }
  });
popupAddCard.setEventListeners();


const popapChangeAvatar = new PopupWithForm({  //попап изменения аватара
  popupSelector: '.popup_type_avatar-change',
  handleFormSubmit: (data) => {
    popapChangeAvatar.renderLoading(true);
    api.changeAvatar(data)
    .then((res)=> {
      userInfo.setUserInfo(res);
      popapChangeAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popapChangeAvatar.renderLoading(false);
    })
  }
})
popapChangeAvatar.setEventListeners();

const popupProfileFormValidator = new FormValidator(formValidationConfig, formProfile);
popupProfileFormValidator.enableValidation();
const popupAddCardFormValidator = new FormValidator(formValidationConfig, formPlace);
popupAddCardFormValidator.enableValidation();
const popupAvatarFormValidator = new FormValidator(formValidationConfig, formAvatar);
popupAvatarFormValidator.enableValidation();


buttonAvatarChange.addEventListener('click', () => {  //слушатель на открытие попапа редактирования аватара
  popupAvatarFormValidator.disableButton();
  popupAvatarFormValidator.resetForm();
  popapChangeAvatar.open();
})



buttonEdit.addEventListener('click', () => { //слушатель на открытие попапа редактирования профиля;
  popupProfileFormValidator.resetForm();
  popupProfileFormValidator.enableButton();
  popupProfile.setInputValues(userInfo.getUserInfo());
 
  popupProfile.open();
}); 


buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки 
  popupAddCardFormValidator.disableButton();
  popupAddCardFormValidator.resetForm();
  popupAddCard.open();
});
