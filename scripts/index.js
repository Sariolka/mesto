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

buttonEdit.addEventListener('click', openPopup); //открытие попапа по клику кнопки buttonEdit

buttonClose.addEventListener('click', closePopup); // закрытие попапа по клику кнопки buttonClose

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value                                         
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
