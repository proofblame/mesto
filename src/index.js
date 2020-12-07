import "./pages/index.css";
import {
    editProfileForm,
    nameInput,
    jobInput,
    addCardForm,
    profileEditButton,
    addCardButton,
    CARD_ITEM_TEMPLATE_SELECTOR,
    container,
    settings,
    initialCards,
    profileSelector,
} from "./scripts/constants.js";

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";

import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import { resolve } from "core-js/fn/promise";

// const start = () => {
//     fetch("https://mesto.nomoreparties.co/v1/cohort-18/cards", {
//         headers: {
//             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
//         },
//     })
//         .then((res) => res.json())
//         .then((result) => {
//             console.log(result);сщву

//         });
// }
// start();

// const apiUserInfo = () => {
//     fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
//         headers: {
//             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
//         },
//     })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result)
//     })
// }
// apiUserInfo();

// const patchApiRequest = () => {
//     fetch("https://mesto.nomoreparties.co/v1/cohort-18/users/me", {
//         method: "PATCH",
//         headers: {
//             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: "Marie Skłodowska Curie",
//             about: "Physicist and Chemist",
//         }),
//     })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result)
//     });
// };
// patchApiRequest();

// const postApiRequest = () => {
//     fetch("https://mesto.nomoreparties.co/v1/cohort-18/cards", {
//         method: "POST",
//         headers: {
//             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "likes": [],
//             "_id": "5d1f0611d321eb4bdcd707dd",
//             "name": "Торжок",
//             "link": "https://cdn.pixabay.com/photo/2018/08/23/10/48/torzhok-3625636_960_720.jpg",
//             "owner": {
//                 "name": "Jacques Cousteau",
//                 "about": "Sailor, researcher",
//                 "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
//                 "_id": "ef5f7423f7f5e22bef4ad607",
//                 "cohort": "local"
//             },
//             "createdAt": "2019-07-05T08:10:57.741Z"

//         })
//         })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result)
//     });
// };
// postApiRequest();





// Создание экземпляра класса (карточки)
const instantiationCard = (item) => {
    const card = new Card(item, CARD_ITEM_TEMPLATE_SELECTOR, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },
    });
    return card;
};

// Рендер карточек из массива

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const newCard = instantiationCard(item);
            const cardElement = newCard.generateCard();
            cardList.addItem(cardElement);
        },
    },
    container
);
cardList.renderItems();

// Создание экземпляров классов

// Включение валидации в попапе редактирования профиля
const editUserForm = new FormValidator(settings, editProfileForm);
editUserForm.enableValidation();

// Включение валидации в попапе добавления карточки
const newCardForm = new FormValidator(settings, addCardForm);
newCardForm.enableValidation();

// Создание экземпляра класса попапа редактирования формы профиля
const editPopup = new PopupWithForm({
    popupSelector: ".popup_type_popup-edit-profile",
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
    },
});
editPopup.setEventListeners();

// Создание экземпляра класса попапа редактирования профиля
const userInfo = new UserInfo(profileSelector);

// Создание экземпляра класса попапа добавления карточки
const addPopup = new PopupWithForm({
    popupSelector: ".popup_type_popup-add-card",
    handleFormSubmit: (item) => {
        const newCard = instantiationCard(item);
        const cardElement = newCard.generateCard();
        cardList.addItem(cardElement);
    },
});
addPopup.setEventListeners();

// Создание экземпляра класса попапа открытия галереи
const imagePopup = new PopupWithImage(".popup_type_popup-gallery");
imagePopup.setEventListeners();

// Слушатели
// Слушатель открытия попапа профиля

profileEditButton.addEventListener("click", () => {
    editPopup.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
});

// Слушатель открытия попапа добавления карточки
addCardButton.addEventListener("click", () => {
    addPopup.open();
    newCardForm.addInactiveButtonClass();
});
