// Кнопки редактирования профиля
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");

const profileAuthor = document.querySelector(".profile__author");
const profileAuthorStatus = document.querySelector(".profile__author-status");
const cardsList = document.querySelector(".elements__list");

// popups
const editPopup = document.querySelector(".popup_type_popup-edit-profile");
const сardPopup = document.querySelector(".popup_type_popup-add-card");

// popups open buttons
const editPopupOpenButton = document.querySelector(".profile__edit-button");
const сardPopupOpenButton = document.querySelector(".profile__add-button");

// popups close buttons
const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const сardPopupCloseButton = сardPopup.querySelector(".popup__close-button");

// Кнопка сохранения форм
const editProfileForm = document.querySelector(".popup-form_type_edit-profile");

const addCardButton = сardPopup.querySelector(".popup__save-button");

// Кнопки добавления карточки
const сardPopupInputTitle = document.querySelector('.popup__input_title');
const сardPopupInputLink = document.querySelector('.popup__input_link');




// Массив с карточками
const initialCards = [
    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const renderCards = () => {
    const cards = initialCards.map(element => getItems(element)).join('');

    cardsList.insertAdjacentHTML('afterbegin', cards);
}

const getItems = (data) => {
    return `<li class="elements__item">
        <figure class="element">
            <img src="${data.link}" alt="${data.name}" class="element__image">
            <div class="element__body">
                <p class="element__figcaption section__subtitle">${data.name}</p>
                <button class="element__like-button buttons" type="button"></button>
            </div>
            <button class="element__delete-button buttons" type="button"></button>
        </figure>
    </li>`
}


const bindHandler = () => {
    addCardButton.addEventListener('click', () => {
        const card = getItems({
            name: сardPopupInputTitle.value,
            link: сardPopupInputLink.value
        })
        cardsList.insertAdjacentHTML('afterbegin', card);
        сardPopupInputTitle.value = '';
        сardPopupInputLink.value = '';
    });
}

renderCards();
bindHandler();



// Скрываем или добавляем модальное окно на странице
// через модификатор popup_opened

// Функция добавления модификатора к попапу
function popupToggle(element) {
    element.classList.toggle("popup_opened");
}

function checkFormValidation() {
    if (editPopup.classList.contains("popup_opened")) {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileAuthorStatus.textContent;
    };
}

// Функция закрытия попапа на фоне
function onClicPopupBackgroundkListener(event, popup) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle(popup);

}

// Отмена действия браузера
// Передача значений в модальное окно
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileAuthorStatus.textContent = jobInput.value;
    popupToggle(editPopup);
}

// Слушатель событий для формы
editProfileForm.addEventListener("submit", formSubmitHandler);
addCardButton.addEventListener("submit", () => {
    evt.preventDefault();
});

// Открытие попапа
editPopupOpenButton.addEventListener('click', () => {
    popupToggle(editPopup); 
    checkFormValidation();
});
сardPopupOpenButton.addEventListener('click', () => popupToggle(сardPopup));

// Закрытие попапа
editPopupCloseButton.addEventListener('click', () => popupToggle(editPopup));
сardPopupCloseButton.addEventListener('click', () => popupToggle(сardPopup));

// Закрытие попапа на фоне
editPopup.addEventListener("click", () => onClicPopupBackgroundkListener(event, editPopup));
сardPopup.addEventListener("click", () => onClicPopupBackgroundkListener(event, сardPopup));



