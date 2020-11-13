import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Edit Profile Popup
const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
const profileCloseButton = editProfilePopup.querySelector(
    ".popup__close-button"
);
const editProfileForm = editProfilePopup.querySelector(
    ".popup-form_type_edit-profile"
);
const nameInput = editProfileForm.querySelector(".popup__input_name");
const jobInput = editProfileForm.querySelector(".popup__input_job");

// Add Card Popup
const addCardPopup = document.querySelector(".popup_type_popup-add-card");
const cardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardForm = addCardPopup.querySelector(".popup-form_type_add-card");

// Open buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".popup__save-button");

// Inputs
const titleInput = document.querySelector(".popup__input_title");
const linkInput = document.querySelector(".popup__input_link");

// Areas
const authorName = document.querySelector(".profile__author");
const authorJob = document.querySelector(".profile__author-status");

// Template
const CARD_ITEM_TEMPLATE_SELECTOR = ".elements__items";
const container = document.querySelector(".elements__list");

// Gallery Popup
const galleryPopup = document.querySelector(".popup_type_popup-gallery");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");
const imagePopupGallery = document.querySelector(".popup__image");
const titlePopupGallery = document.querySelector(".popup__title");

// Settings
const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__input_state_invalid",
    errorClass: "error",
};

const editUserForm = new FormValidator(settings, editProfileForm);
editUserForm.enableValidation();

const newCardForm = new FormValidator(settings, addCardForm);
newCardForm.enableValidation();

const handleImagePreview = (card) => {
    imagePopupGallery.src = card._link;
    imagePopupGallery.alt = card._name;
    titlePopupGallery.textContent = card._name;

    openPopup(galleryPopup);
};

// OOP
initialCards.forEach((item) => {
    const card = new Card(
        item,
        CARD_ITEM_TEMPLATE_SELECTOR,
        handleImagePreview
    );
    const cardElement = card.generateCard();

    container.append(cardElement);
});

// Open and close popup
function openPopup(element) {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeButton);
}

function closePopup(element) {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeButton);
}

// Closing popup when clicked on the background and close button
function handleClickOnOverlay(event) {
    const popup = event.currentTarget;
    if (event.target !== popup) {
        return;
    }

    closePopup(popup);
}

function handleEscapeButton(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}

// Close popups
editProfilePopup.addEventListener("click", handleClickOnOverlay);
addCardPopup.addEventListener("click", handleClickOnOverlay);
galleryPopup.addEventListener("click", handleClickOnOverlay);

profileCloseButton.addEventListener("click", () =>
    closePopup(editProfilePopup)
);
cardCloseButton.addEventListener("click", () => closePopup(addCardPopup));
galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup));

// Open popups
profileEditButton.addEventListener("click", () => {
    openPopup(editProfilePopup);
    const buttonElement = 
    editUserForm.addInactiveButtonClass(saveButton);
    nameInput.value = authorName.textContent;
    jobInput.value = authorJob.textContent;
});

addCardButton.addEventListener("click", () => {
    openPopup(addCardPopup);
    titleInput.value = "";
    linkInput.value = "";
    newCardForm.addInactiveButtonClass(saveButton);
});

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    closePopup(editProfilePopup);
});
addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = new Card(
        {
            name: titleInput.value,
            link: linkInput.value,
        },
        CARD_ITEM_TEMPLATE_SELECTOR,
        handleImagePreview
    );
    const cardElement = newCard.generateCard();
    container.prepend(cardElement);
    closePopup(addCardPopup);
});
