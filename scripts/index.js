// Card array
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
// Edit Profile Popup
// const editProfilePopup = document.querySelector(
//     ".popup_type_popup-edit-profile"
// );
// const profileCloseButton = editProfilePopup.querySelector(
//     ".popup__close-button"
// );
// const editProfileForm = editProfilePopup.querySelector(
//     ".popup-form_type_edit-profile"
// );
// const nameInput = editProfileForm.querySelector(".popup__input_name");
// const jobInput = editProfileForm.querySelector(".popup__input_job");

// // Add Card Popup
// const addCardPopup = document.querySelector(".popup_type_popup-add-card");
// const cardCloseButton = addCardPopup.querySelector(".popup__close-button");
// const addCardForm = addCardPopup.querySelector(".popup-form_type_add-card");

// // Gallery Popup
// const galleryPopup = document.querySelector(".popup_type_popup-gallery");
// const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");

// // Open buttons
// const profileEditButton = document.querySelector(".profile__edit-button");
// const addCardButton = document.querySelector(".profile__add-button");

// const saveButton = document.querySelector(".popup__save-button");

// // Inputs
// const titleInput = document.querySelector(".popup__input_title");
// const linkInput = document.querySelector(".popup__input_link");

// // Areas
// const authorName = document.querySelector(".profile__author");
// const authorJob = document.querySelector(".profile__author-status");

// // Card
// const listCards = document.querySelector(".elements__list");

// // Template
// const templateCard = document.querySelector(".elements__items");

// // galleryPopups details
// const imagePopupGallery = document.querySelector(".popup__image");
// const titlePopupGallery = document.querySelector(".popup__title");

const CONTAINER = document.querySelector('.elements__list');
const CARD_ITEM_TEMPLATE_SELECTOR = '.elements__items';

// OOP
class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__item')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__figcaption').textContent = this._name;
        
        return this._element;
    }

    _handleCardClick() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleCardClick();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
    }
}

initialCards.forEach((item) => {
    const card = new Card(item, CARD_ITEM_TEMPLATE_SELECTOR);
    const cardElement = card.generateCard();

    CONTAINER.append(cardElement);
}); 





// const card = new Card();

// Render cards
// const renderCards = () => {
//     const cards = initialCards.map((element) => {
//         return createCard(element);
//     });
//     listCards.append(...cards);
// };

// Delete button
// const handleRemoveCardButton = (event) => {
//     event.target.closest(".elements__item").remove();
// };

// // Like button
// const handleLikeButton = (event) => {
//     event.target.classList.toggle("element__like-button_active");
// };

// // Render template
// const createCard = (data) => {
//     const card = templateCard.cloneNode(true).content;

//     const imageCard = card.querySelector(".element__image");
//     const captionCard = card.querySelector(".element__figcaption");
//     const deleteCardButton = card.querySelector(".element__delete-button");
//     const likeButton = card.querySelector(".element__like-button");

//     captionCard.textContent = data.name;
//     imageCard.src = data.link;
//     imageCard.alt = data.name;

//     imageCard.addEventListener("click", () => handleImagePreview(data));
//     deleteCardButton.addEventListener("click", handleRemoveCardButton);
//     likeButton.addEventListener("click", handleLikeButton);

//     return card;
// };

// const handleImagePreview = (details) => {
//     imagePopupGallery.src = details.link;
//     imagePopupGallery.alt = details.name;
//     titlePopupGallery.textContent = details.name;

//     openPopup(galleryPopup);
// };

// renderCards();

// // Open and close popup

// function openPopup(element) {
//     element.classList.add("popup_opened");
//     document.addEventListener("keydown", handleEscapeButton);
// }

// function closePopup(element) {
//     element.classList.remove("popup_opened");
//     document.removeEventListener("keydown", handleEscapeButton);
// }

// // Closing popup when clicked on the background and close button
// function handleClickOnOverlay(event) {
//     const popup = event.currentTarget;
//     if (event.target !== popup) {
//         return;
//     }

//     closePopup(popup);
// }

// function handleEscapeButton(evt) {
//     if (evt.key === "Escape") {
//         const popupOpened = document.querySelector(".popup_opened");
//         closePopup(popupOpened);
//     }
// }

// // Close popups
// editProfilePopup.addEventListener("click", handleClickOnOverlay);
// addCardPopup.addEventListener("click", handleClickOnOverlay);
// galleryPopup.addEventListener("click", handleClickOnOverlay);

// profileCloseButton.addEventListener("click", () =>
//     closePopup(editProfilePopup)
// );
// cardCloseButton.addEventListener("click", () => closePopup(addCardPopup));
// galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup));

// // Open popups
// profileEditButton.addEventListener("click", () => {
//     openPopup(editProfilePopup);
//     saveButton.classList.add("popup__save-button_invalid");
//     nameInput.value = authorName.textContent;
//     jobInput.value = authorJob.textContent;
// });

// addCardButton.addEventListener("click", () => {
//     openPopup(addCardPopup);
//     titleInput.value = "";
//     linkInput.value = "";
//     const formElement = document.querySelector(".popup__form");
//     const buttonElement = document.querySelector(".popup__save-button");
//     const inactiveButtonClass = ".popup__save-button";
//     toggleButtonState(formElement, buttonElement, inactiveButtonClass);
// });

// // Submit handlers
// editProfileForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     authorName.textContent = nameInput.value;
//     authorJob.textContent = jobInput.value;
//     closePopup(editProfilePopup);
// });
// addCardForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const cardItem = createCard({
//         name: titleInput.value,
//         link: linkInput.value,
//     });
//     listCards.prepend(cardItem);
//     closePopup(addCardPopup);
// });
