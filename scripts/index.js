let buttonOpenPopup = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_job");
let profileAuthor = document.querySelector(".profile__author");
let profileAuthorStatus = document.querySelector(".profile__author-status");

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

const elementsList = document.querySelector('.elements__list')

const renderCards = () => {
    const card = initialCards.map(element => {
        return `<li class="elements__item">
                    <figure class="element">
                        <img src="${element.link}" alt="${element.name}" class="element__image">
                        <div class="element__body">
                            <p class="element__figcaption section__subtitle">${element.name}</p>
                            <button class="element__like-button buttons" type="button"></button>
                        </div>
                        <button class="element__delete-button buttons" type="button"></button>
                    </figure>
                </li>`;
    }).join('');

    elementsList.insertAdjacentHTML('afterbegin', card);
    console.log(card);
}
renderCards();


function popupToggle() {
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileAuthorStatus.textContent;
    }
}

function onClicPopupBackgroundkListener(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileAuthorStatus.textContent = jobInput.value;
    popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle); 
popup.addEventListener("click", onClicPopupBackgroundkListener);

