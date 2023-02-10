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
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_description');
const placeInput = document.querySelector('.popup__input_form_place');
const linkInput = document.querySelector('.popup__input_form_link');
const username = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupArray = Array.from(document.querySelectorAll('.popup')); //создаю массив попапов

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
    if (event.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}; 


//открытие попапа по клику кнопки buttonEdit
buttonEdit.addEventListener('click', () => {
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
});


//открытие попапа для добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});



// Обработчик «отправки» формы
const handleFormSubmit = (event) => {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popup.addEventListener("click", handleOverlayClick); // закрытие попапа по клику по оверлею