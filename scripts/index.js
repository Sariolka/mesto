let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_description');
let username = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closePopup();
    }
  };

buttonEdit.addEventListener('click', openPopup); //открытие попапа по клику кнопки buttonEdit

buttonClose.addEventListener('click', closePopup); // закрытие попапа по клику кнопки buttonClose

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popup.addEventListener("click", handleOverlayClick); // закрытие попапа по клику по оверлею