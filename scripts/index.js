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
    profileSelector,
} from "./constants.js";

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Попап редактирования профиля
const userInfo = new UserInfo(profileSelector);

const editPopup = new PopupWithForm({
    popupSelector: ".popup_type_popup-edit-profile",
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
    },
});
editPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
    editPopup.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
});

// Попап добавления новой карточки

const addPopup = new PopupWithForm({
    popupSelector: ".popup_type_popup-add-card",
    handleFormSubmit: (formData) => {
        const newCard = new Card(
            {
                name: formData.name,
                link: formData.link,
            },
            CARD_ITEM_TEMPLATE_SELECTOR,
            imagePopup.open
        );
        const cardElement = newCard.generateCard();
        container.prepend(cardElement);
    },
});
addPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
    addPopup.open();
    titleInput.value = "";
    linkInput.value = "";
    newCardForm.addInactiveButtonClass(saveButton);
});

const imagePopup = new PopupWithImage(".popup_type_popup-gallery");


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


galleryCloseButton.addEventListener("click", () => imagePopup.close());


