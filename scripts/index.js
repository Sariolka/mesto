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
const username = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const buttonAddCard = document.querySelector('.profile__add-button');


//функция открытия окна 
function openPopup() {
    popup.classList.add('popup_opened');
};

//функция закрытия окна
function closePopup() {
    popup.classList.remove('popup_opened');
    }; 

const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closePopup();
    }
  }; //закрытие по клику на оверлей

  const closePopupByEscape = (event) => {
    if (event.key === "Escape" &&  popup.classList.contains('popup_opened')) {
        closePopup();
    }
}; //закрытие по нажатию на клавишу Esc

buttonEdit.addEventListener('click', () => {
    nameInput.value = username.textContent;
    jobInput.value = job.textContent;
    openPopup(popupProfile);
}); //открытие попапа по клику кнопки buttonEdit

buttonClose.addEventListener('click', closePopup); // закрытие попапа по клику кнопки buttonClose

buttonAddCard.addEventListener('click', openPopup(popupAddCard));

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popup.addEventListener("click", handleOverlayClick); // закрытие попапа по клику по оверлею
document.addEventListener("keydown", closePopupByEscape); 