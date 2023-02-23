const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_card');
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
const template = document.querySelector('.card-template').content;
const popupOpenPhoto = document.querySelector('.popup_photo');
const popupPhoto =popupOpenPhoto.querySelector('.popup__photo-open');
const popupPhotoTitle = popupOpenPhoto.querySelector('.popup__photo-title');

const openPopup = (popup) => { //функция открытия попапа 
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => { //функция закрытия попапа
  popup.classList.remove('popup_opened');
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
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => { //слушатель на открытие попапа добавления карточки
  openPopup(popupAddCard);
});

const deleteCard = (event) => { // функция удаления карточки
  event.target.closest('.card').remove();
};

const likeCard = (event) => { //функция поставить лайк на фотографию
  event.target.classList.toggle('card__like_active');
};

const createCard = (item) => { // создание карточки
  const cardItem = template.querySelector('.card').cloneNode(true);
  const buttonLike = cardItem.querySelector('.card__like'); 
  const buttonDelete = cardItem.querySelector('.card__delete');
  const cardItemTitle = cardItem.querySelector('.card__title');
  const cardItemPhoto = cardItem.querySelector('.card__photo');
  cardItemPhoto.src = item.link;
  cardItemPhoto.alt = item.name;
  cardItemTitle.textContent = item.name;
  cardItemPhoto.addEventListener('click',() => {
    popupPhotoTitle.textContent = item.name;
    popupPhoto.src = item.link;
    popupPhoto.alt = item.name;
    openPopup(popupOpenPhoto);
  });
  buttonDelete.addEventListener('click', deleteCard);
  buttonLike.addEventListener('click', likeCard);
  return cardItem;
};

const renderCard = (cardsList,item) => { //отрисовка карточки
  cardsList.prepend(createCard(item));
};

initialCards.forEach (item => {
  renderCard(cardsList,item);
});
   
const addCardSubmit = (event) => { // обработчик отправки формы добавления карточки
  event.preventDefault();
  cardItem = {
    name: placeInput.value,
    link: linkInput.value
  };
  renderCard(cardsList,cardItem);
  closePopup(popupAddCard);
  formPlace.reset();
};

const editProfileSubmit = (event) => { // Обработчик «отправки» формы данных профиля
  event.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
};

formPlace.addEventListener('submit', addCardSubmit); // слушатель на форму добавления карточки
formProfile.addEventListener('submit', editProfileSubmit); // слушатель на форму редактирования профиля


const showInputError = (formElement, inputElement, errorMessage) => {// функция показывает сообщение об ошибке
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error-type');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
};

const hideInputError = (formElement) => { //функция скрывает сообщение об ошибке
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error-type');
  errorElement.classList.remove('popup__input-error');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
};

const enableValidation = () => { //функция, которая находит все формы на странице и перебирает их
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
