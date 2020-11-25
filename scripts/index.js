import {
    editProfilePopup,
    profileCloseButton,
    editProfileForm,
    nameInput,
    jobInput,
    addCardPopup,
    cardCloseButton,
    addCardForm,
    profileEditButton,
    addCardButton,
    saveButton,
    titleInput,
    linkInput,
    authorName,
    authorJob,
    CARD_ITEM_TEMPLATE_SELECTOR,
    container,
    galleryPopup,
    galleryCloseButton,
    imagePopupGallery,
    titlePopupGallery,
    settings,
    initialCards,
} from "./constants.js";

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
// import { openPopup, closePopup, handleClickOnOverlay } from "./utils.js";

import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from './PopupWithImage.js';

const editPopup = new Popup(".popup_type_popup-edit-profile");
editPopup.setEventListeners();
const addPopup = new Popup(".popup_type_popup-add-card");
addPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_popup-gallery');

// function handleImagePreview(card) {
//     imagePopupGallery.src = card._link;
//     imagePopupGallery.alt = card._name;
//     titlePopupGallery.textContent = card._name;

//     // openPopup(galleryPopup);
// }

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item,
                CARD_ITEM_TEMPLATE_SELECTOR,
                imagePopup.open
            );
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    container
);
cardList.renderItems();

const editUserForm = new FormValidator(settings, editProfileForm);
editUserForm.enableValidation();
const newCardForm = new FormValidator(settings, addCardForm);
newCardForm.enableValidation();


// export const handleClickOnOverlay = (event) => {
//     const popup = event.currentTarget;
//     if (event.target !== popup) {
//         return;
//     }

//     closePopup(popup);
// };


// Close popups

// editProfilePopup.addEventListener("click", handleClickOnOverlay);
// addCardPopup.addEventListener("click", handleClickOnOverlay);
// galleryPopup.addEventListener("click", handleClickOnOverlay);


// profileCloseButton.addEventListener("click", () => {
//     // editPopup.close();
// });
// cardCloseButton.addEventListener("click", () => {
//     // addPopup.close();
// });
galleryCloseButton.addEventListener("click", () => imagePopup.close());

// Open popups

profileEditButton.addEventListener("click", () => {
    editPopup.open();
    nameInput.value = authorName.textContent;
    jobInput.value = authorJob.textContent;
});

addCardButton.addEventListener("click", () => {
    addPopup.open();
    titleInput.value = "";
    linkInput.value = "";
    newCardForm.addInactiveButtonClass(saveButton);
});

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    editPopup.close();
});
addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = new Card(
        {
            name: titleInput.value,
            link: linkInput.value,
        },
        CARD_ITEM_TEMPLATE_SELECTOR,
        imagePopup.open
    );
    const cardElement = newCard.generateCard();
    container.prepend(cardElement);
    addPopup.close();
});
