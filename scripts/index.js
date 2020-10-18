// Кнопки редактирования профиля
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");

const profileAuthor = document.querySelector(".profile__author");
const profileAuthorStatus = document.querySelector(".profile__author-status");
const cardsList = document.querySelector(".elements__list");
const template = document.querySelector('.elements__item');


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
const addCardForm = document.querySelector(".popup-form_type_add-card");

const addCardButton = сardPopup.querySelector(".popup__save-button");

// Кнопки добавления карточки
const сardPopupInputTitle = document.querySelector('.popup__input_title');
const сardPopupInputLink = document.querySelector('.popup__input_link');

// Кнопка удаления карточки
const cardRemoveButton = document.querySelector('.element__delete-button');

// Кнопка лайка
const likeButton = document.querySelector('.element__like-button');




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
    const cards = initialCards.map(element => getItems(element));
    cardsList.append(...cards);

};

const handlerRemove = (event) => {
    event.target.closest('.elements__item').remove();
};

const handlerLike = (event) => {
    event.target.classList.toggle('element__like-button_active');
};

const getItems = (data) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.section__subtitle').innerText = data.name;
    card.querySelector('.element__image').setAttribute('src', data.link);
    card.querySelector('.element__image').setAttribute('alt', data.name);
    
    // Кнопка удаления карточки
    const cardRemoveButton = card.querySelector('.element__delete-button');
    // Кнопка лайка
    const likeButton = card.querySelector('.element__like-button');

    cardRemoveButton.addEventListener('click', handlerRemove);
    likeButton.addEventListener('click', handlerLike);

    return card;
};

const bindHandler = () => {
    addCardButton.addEventListener('click', () => {
        const card = getItems({
            name: сardPopupInputTitle.value,
            link: сardPopupInputLink.value
        })
        cardsList.prepend(card);

        сardPopupInputTitle.value = '';
        сardPopupInputLink.value = '';
    });
};

renderCards();
bindHandler();



// Скрываем или добавляем модальное окно на странице
// через модификатор popup_opened

// Функция добавления модификатора к попапу
function popupToggle(popup) {
    popup.classList.toggle("popup_opened");
};





function checkFormValidation() {
    if (editPopup.classList.contains("popup_opened")) {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileAuthorStatus.textContent;
    };
};

// Функция закрытия попапа на фоне
function onClicPopupBackgroundkListener(event, popup) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle(popup);
}

// Закрытие попапа на фоне
editPopup.addEventListener("click", () => onClicPopupBackgroundkListener(event, editPopup));
сardPopup.addEventListener("click", () => onClicPopupBackgroundkListener(event, сardPopup));





// Отмена действия браузера
// Передача значений в модальное окно
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileAuthorStatus.textContent = jobInput.value;
    popupToggle(editPopup);
};

function formSubmitHandler2(evt) {
    evt.preventDefault();
    popupToggle(сardPopup);
};

// Слушатель событий для формы
editProfileForm.addEventListener("submit", formSubmitHandler);
addCardForm.addEventListener("submit", formSubmitHandler2);

// Открытие попапа
editPopupOpenButton.addEventListener('click', () => {
    popupToggle(editPopup); 
    checkFormValidation();
});
сardPopupOpenButton.addEventListener('click', () => popupToggle(сardPopup));

// Закрытие попапа
editPopupCloseButton.addEventListener('click', () => popupToggle(editPopup));
сardPopupCloseButton.addEventListener('click', () => popupToggle(сardPopup));




