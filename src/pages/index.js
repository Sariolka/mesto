import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { formValidationConfig } from "../scripts/utils/constants.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { api } from "../scripts/components/Api.js";
import { PopupWithSubmit } from "../scripts/components/PopupWithSubmit.js";

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAvatarChange = document.querySelector(".profile__avatar-button");

const userInfo = new UserInfo({
  //данные пользователя
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      userId: data._id,
    });
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const createCard = (item) => {
  //создание экземпляра карточки
  const card = new Card(
    {
      item,
      userId: userInfo.returnUserId(),
      handleCardClick: (place, link) => {
        popupOpenPhoto.open(place, link);
      },
      handleClickIconDelete: () => {
        popupCardDelete.open();
        popupCardDelete.handleSubmit(() => {
          api
            .deleteCard(item)
            .then(() => {
              popupCardDelete.close();
              card.handleDeleteCard();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      handleLike: () => {
        api
          .getLikeCard(item)
          .then((item) => {
            card.handleLikeCard(item);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDislike: () => {
        api
          .deleteLikeCard(item)
          .then((item) => {
            card.handleLikeCard(item);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    ".card-template"
  );
  const cardItem = card.generateCard();

  return cardItem;
};

const cardList = new Section( // создание 6 карточек при загрузке страницы
  {
    renderer: (item) => {
      cardList.addItems(createCard(item));
    },
  },
  ".cards"
);

const popupCardDelete = new PopupWithSubmit({
  //создание попапа подтверждения удаления карточки
  popupSelector: ".popup_type_card-delete",
});
popupCardDelete.setEventListeners();

const popupOpenPhoto = new PopupWithImage(".popup_type_photo-full"); //попап открытия фотографии
popupOpenPhoto.setEventListeners();

function handleSubmitForm(request, popup, loadingText = "Сохранение...") {
  // изменяем текст кнопки до вызова запроса
  popup.renderLoading(true, loadingText);
  request()
    .then(() => {
      // закрывать попап нужно только в `then`
      popup.close();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      popup.renderLoading(false);
    });
}

function handleFormSubmitAddCard(item) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.addNewCard(item).then((item) => {
      cardList.addItem(createCard(item));
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmitForm(makeRequest, popupAddCard);
}

const popupAddCard = new PopupWithForm(
  {
    // создание попапа добавления карточки
    popupSelector: ".popup_type_card-create",
  },
  handleFormSubmitAddCard
);
popupAddCard.setEventListeners();

function handleFormSubmitProfile(data) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.editUserProfile(data).then((res) => {
      userInfo.setUserInfo(res);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmitForm(makeRequest, popupProfile);
}

const popupProfile = new PopupWithForm(
  {
    //попап редактирования профиля
    popupSelector: ".popup_type_profile-edit",
  },
  handleFormSubmitProfile
);
popupProfile.setEventListeners();

function handleFormSubmitAvatar(data) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.changeAvatar(data).then((res) => {
      userInfo.setUserInfo(res);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmitForm(makeRequest, popapChangeAvatar);
}

const popapChangeAvatar = new PopupWithForm(
  {
    //попап изменения аватара
    popupSelector: ".popup_type_avatar-change",
  },
  handleFormSubmitAvatar
);
popapChangeAvatar.setEventListeners();

buttonAvatarChange.addEventListener("click", () => {
  //слушатель на открытие попапа редактирования аватара
  formValidators["form-avatar"].resetForm();
  popapChangeAvatar.open();
});

buttonEdit.addEventListener("click", () => {
  //слушатель на открытие попапа редактирования профиля;
  formValidators["form-profile"].resetForm();
  formValidators["form-profile"].enableButton();
  popupProfile.setInputValues(userInfo.getUserInfo());

  popupProfile.open();
});

buttonAddCard.addEventListener("click", () => {
  //слушатель на открытие попапа добавления карточки
  formValidators["form-place"].resetForm();
  popupAddCard.open();
});

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationConfig);
