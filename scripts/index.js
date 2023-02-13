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

const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
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
const cardTemplate = document.querySelector('.card-template').content;  




//функция открытия попапа 
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
};


//функция закрытия попапа
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closePopupEsc);
    }; 

// слушатель на каждый попап на закрытие
popupArray.forEach((popup) => {
    popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_opened')) {
     closePopup(popup);
    }
    if (event.target.classList.contains('popup__button-close')) {
    closePopup(popup);
    };
  });
});

//закрытие по клику на оверлей
const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
  };


//закрытие по нажатию на клавишу Esc
  const closePopupEsc = (event) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (event.key === "Escape") {
      closePopup(popupOpened);
    };
}; 

//слушатель на открытие попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
});


//слушатель на открытие попапа добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});


// функция удаления карточки
const cardDelete = (event) => {
  event.target.closest('.card').remove();
};

//функция поставить лайк на фотографию
const cardLike = (event) => {
  event.target.classList.toggle('card__like_active');
};

// функция открытия фотографии
const openPhoto = (event) => {
 openPopup(popupPhoto);
}

// создание карточки
const createCard = (item) => {
  const cardItem = cardTemplate.content.cloneNode(true); //клонирую элементы с их содержимым из массива карточек
  const buttonLike = cardItem.querySelector('.card__like'); 
  const buttonDelete = cardItem.querySelector('.card__delete');
  cardItem.querySelector('.card__photo').src = item.link;
  cardItem.querySelector('.card__title').textContent = item.name;
  buttonDelete.addEventListener('click', cardDelete);
  buttonLike.addEventListener('click', cardLike);
  return cardItem;
  };


//отрисовка карточки
const renderCard = (cardsList,item) => {
  cardsList.prepend(createCard(item));
}


// Обработчик «отправки» формы данных профиля
const handleFormSubmit = (event) => {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
};

// обработчик отправки формы добавления карточки
const addCardSubmit = (event) => {
    event.preventDefault();
    const cardPhoto = {};
      cardPhoto.name = placeInput.value;
      cardPhoto.link = linkInput.value;
      renderCard(cardPhoto);
      closePopup(popupAddCard);
      placeInput.value = '';
      linkInput.value = '';
};

initialCards.forEach (cardPhoto => {
  renderCard(cardPhoto);
});

formPlace.addEventListener('submit', addCardSubmit);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleFormSubmit);
popup.addEventListener("click", handleOverlayClick); // закрытие попапа по клику по оверлею
