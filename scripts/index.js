

let buttonOpenPopup = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

function popupToggle() {
    popup.classList.toggle("popup_opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);

function callback() {
    console.log({
    eventTarget: event.target,
    eventCurrent: event.currentTarget
    })
}



function onClicPopupBackgroundkListener(event) {
    if(event.target !== event.currentTarget) {
        return;
    }
    popupToggle()
}
popup.addEventListener("click", onClicPopupBackgroundkListener);

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector(".popup__name-input"); // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector(".popup__job-input"); // Воспользуйтесь инструментом .querySelector()
    // Получите значение полей из свойства value

    // nameInput.value = '';
    // jobInput.value = '';

    // Выберите элементы, куда должны быть вставлены значения полей

    let profileAuthor = document.querySelector(".profile__author");
    let profileAuthorStatus = document.querySelector(".profile__author-status");

    // Вставьте новые значения с помощью textContent
    profileAuthor.textContent = `${nameInput.value}`;
    profileAuthorStatus.textContent = `${jobInput.value}`;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
