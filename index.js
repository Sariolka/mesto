let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonSubmit = document.querySelector('.popup__button-submit');
let buttonClose = document.querySelector('.popup__button-reset');
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');

buttonEdit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
}); //открытие попаgа по клику кнопки buttonEdit
