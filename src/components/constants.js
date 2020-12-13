// Edit Profile Popup
export const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
export const editProfileForm = editProfilePopup.querySelector(
    ".popup-form_type_edit-profile"
);
export const nameInput = editProfileForm.querySelector(".popup__input_name");
export const jobInput = editProfileForm.querySelector(".popup__input_job");

// Add Card Popup
export const addCardPopup = document.querySelector(".popup_type_popup-add-card");
export const addCardForm = addCardPopup.querySelector(".popup-form_type_add-card");

// Open buttons
export const profileEditButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

// Template
export const CARD_ITEM_TEMPLATE_SELECTOR = ".elements__items";
export const container = document.querySelector(".elements__list");

// Settings
export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__input_state_invalid",
    errorClass: "error",
};

export const profileSelector = {
    nameSelector: ".profile__author",
    jobSelector: ".profile__author-status"
}

export const profileAuthor = document.querySelector(profileSelector.nameSelector);
export const profileJob = document.querySelector(profileSelector.jobSelector);
export const avatarAuthor = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup_type_popup-update-avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup-form_type_update-avatar');

export const inputLinkAvatar = popupAvatar.querySelector('.popup__input_link');
export const openAvatarButton = document.querySelector('.profile__wrap');

