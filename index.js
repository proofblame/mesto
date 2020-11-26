import {
    editProfileForm,
    nameInput,
    jobInput,
    addCardForm,
    profileEditButton,
    addCardButton,
    saveButton,
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

// Рендер карточек из массива
// Создание экземпляра класса отображения карточек на странице
const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, CARD_ITEM_TEMPLATE_SELECTOR, {
                handleCardClick: (name, link) => {
                    imagePopup.open(name, link);
                },
            });
            const cardElement = card.generateCard();
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
    handleFormSubmit: (formData) => {
        const newCard = new Card(
            {
                name: formData.name,
                link: formData.link,
            },
            CARD_ITEM_TEMPLATE_SELECTOR,
            {
                handleCardClick: (name, link) => {
                    imagePopup.open(name, link);
                },
            }
        );
        const cardElement = newCard.generateCard();
        container.prepend(cardElement);
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
    newCardForm.addInactiveButtonClass(saveButton);
});
