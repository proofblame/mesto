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
import { openPopup, closePopup, handleClickOnOverlay } from "./utils.js";

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
    // const buttonElement = editUserForm.addInactiveButtonClass(saveButton);
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
