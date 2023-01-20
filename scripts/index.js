let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__button-reset');
let buttonSubmit = document.querySelector('.popup__button-submit');
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');


buttonEdit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
}); //открытие попапа по клику кнопки buttonEdit

buttonClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__description');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}); // закрытие попапа по клику кнопки buttonClose

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

      // Получите значение полей jobInput и nameInput из свойства value                                         
      let name = document.querySelector('.profile__name');
      let job = document.querySelector('.profile__description');
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
buttonSubmit.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});
