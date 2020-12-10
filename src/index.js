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
    userId,
} from "./scripts/constants.js";

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";

import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";
import { resolve } from "core-js/fn/promise";
import { data } from "jquery";

// Получение данных с сервера
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
        "Content-Type": "application/json",
    },
});

// Получение карточек с сервера
api.getInitialCards()
    .then((cards) => {
        renderInitialCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });

// Рендер начальных карточек
const renderInitialCards = (cards) => {
    const cardList = new Section(
        {
            items: cards,
            renderer: (item) => {
                const newCard = instantiationCard(item);
                const cardElement = newCard.generateCard();
                cardList.addItem(cardElement);
            },
        },
        container
    );
    cardList.renderItems();
};

// Создание карточки
const instantiationCard = (item) => {
    const card = new Card(item, userId, CARD_ITEM_TEMPLATE_SELECTOR, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },
        handleLikeClick: () => {
            const likedCard = card.qualifierLikes();
            const resultApi = likedCard
                ? api.delLikes(card.getCardId())
                : api.setLikes(card.getCardId());

            resultApi.then((item) => {
                card.setLikes(item.likes);
                card.renderLikes();
            });
        },
        handleDeleteIconClick: () => {},
    });
    return card;
};

// Добавление новой карточки
const addNewCardHandler = () => {
    const inputTitle = document.querySelector(".popup__input_title").value;
    const inputLink = document.querySelector(".popup__input_link").value;
    api.addNewCard(inputTitle, inputLink).then((item) => {
        console.log(item);
        const newCard = instantiationCard(item);
        const cardElement = newCard.generateCard();
        container.prepend(cardElement);
    });
};

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
const addPopup = new PopupWithForm(
    {
        popupSelector: ".popup_type_popup-add-card",
    },
    addNewCardHandler
);
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
