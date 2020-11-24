// Edit Profile Popup
export const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
export const profileCloseButton = editProfilePopup.querySelector(
    ".popup__close-button"
);
export const editProfileForm = editProfilePopup.querySelector(
    ".popup-form_type_edit-profile"
);
export const nameInput = editProfileForm.querySelector(".popup__input_name");
export const jobInput = editProfileForm.querySelector(".popup__input_job");

// Add Card Popup
export const addCardPopup = document.querySelector(".popup_type_popup-add-card");
export const cardCloseButton = addCardPopup.querySelector(".popup__close-button");
export const addCardForm = addCardPopup.querySelector(".popup-form_type_add-card");

// Open buttons
export const profileEditButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");
export const saveButton = document.querySelector(".popup__save-button");

// Inputs
export const titleInput = document.querySelector(".popup__input_title");
export const linkInput = document.querySelector(".popup__input_link");

// Areas
export const authorName = document.querySelector(".profile__author");
export const authorJob = document.querySelector(".profile__author-status");

// Template
export const CARD_ITEM_TEMPLATE_SELECTOR = ".elements__items";
export const container = document.querySelector(".elements__list");

// Gallery Popup
export const galleryPopup = document.querySelector(".popup_type_popup-gallery");
export const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");
export const imagePopupGallery = document.querySelector(".popup__image");
export const titlePopupGallery = document.querySelector(".popup__title");

// Settings
export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__input_state_invalid",
    errorClass: "error",
};

export const initialCards = [
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