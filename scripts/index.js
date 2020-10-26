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

// Popups
// const popupOpened = document.querySelector(".popup_opened");

const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
const addCardPopup = document.querySelector(".popup_type_popup-add-card");
const galleryPopup = document.querySelector(".popup_type_popup-gallery");

// Open buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Close buttons
const profileCloseButton = editProfilePopup.querySelector(
    ".popup__close-button"
);
const cardCloseButton = addCardPopup.querySelector(".popup__close-button");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");

// Submit buttons
const editProfileForm = document.querySelector(".popup-form_type_edit-profile");
const addCardForm = document.querySelector(".popup-form_type_add-card");
const saveButton = document.querySelector(".popup__save-button");

// Inputs
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const titleInput = document.querySelector(".popup__input_title");
const linkInput = document.querySelector(".popup__input_link");

// Areas
const authorName = document.querySelector(".profile__author");
const authorJob = document.querySelector(".profile__author-status");

// Card
const listCards = document.querySelector(".elements__list");

// Template
const templateCard = document.querySelector(".elements__items");

// galleryPopups details
const imagePopupGallery = document.querySelector(".popup__image");
const titlePopupGallery = document.querySelector(".popup__title");


// Render cards
const renderCards = () => {
    const cards = initialCards.map((element) => {
        return createCard(element);
    });
    listCards.append(...cards);
};

// Delete button
const handlerRemove = (event) => {
    event.target.closest(".elements__item").remove();
};

// Like button
const handlerLike = (event) => {
    event.target.classList.toggle('element__like-button_active');
};

// Render template
const createCard = (data) => {
    const card = templateCard.cloneNode(true).content;

    const imageCard = card.querySelector(".element__image");
    const captionCard = card.querySelector(".element__figcaption");
    const deleteCardButton = card.querySelector(".element__delete-button");
    const likeButton = card.querySelector(".element__like-button");

    
    captionCard.textContent = data.name;
    imageCard.src = data.link;
    imageCard.alt = data.name;
    
    imageCard.addEventListener("click", () => handleImagePreview(data));
    deleteCardButton.addEventListener("click", handlerRemove);
    likeButton.addEventListener("click", handlerLike);

    return card;
};

const handleImagePreview = (details) => {
    imagePopupGallery.src = details.link;
    imagePopupGallery.alt = details.name;
    titlePopupGallery.textContent = details.name;

    popupToggle(galleryPopup);
    document.addEventListener('keydown', keyHandler);
};

renderCards();

// Popup toggle
function popupToggle(element) {
    element.classList.toggle("popup_opened");

}

// Closing popup when clicked on the background and close button
function backgroundListener(event) { 
    const popup = event.currentTarget;
    if (event.target !== popup) { 
        return; 
    };

    popupToggle(popup); 
};

function keyHandler(evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {  
        popupOpened.classList.remove('popup_opened');
    }
    document.removeEventListener('keydown', keyHandler);  
};

// Close popups
editProfilePopup.addEventListener("click", backgroundListener);
addCardPopup.addEventListener("click", backgroundListener);
galleryPopup.addEventListener("click", backgroundListener);


profileCloseButton.addEventListener("click", () => popupToggle(editProfilePopup));
cardCloseButton.addEventListener("click", () => popupToggle(addCardPopup));
galleryCloseButton.addEventListener("click", () => popupToggle(galleryPopup))

// Open popups
profileEditButton.addEventListener("click", () => {
    popupToggle(editProfilePopup);
    document.addEventListener('keydown', keyHandler);
    if (editProfilePopup.classList.contains("popup_opened")) {  
        saveButton.classList.add('popup__save-button_invalid');
        nameInput.value = authorName.textContent;
        jobInput.value = authorJob.textContent;

    }
});

addCardButton.addEventListener("click", () => {
    popupToggle(addCardPopup);
    document.addEventListener('keydown', keyHandler);
    titleInput.value = "";
    linkInput.value = "";
    document.querySelector('.popup__save-button').setAttribute('disabled', 'disabled');
    saveButton.classList.add('popup__save-button_invalid')
});

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    popupToggle(editProfilePopup);
});
addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardItem = createCard({
        name: titleInput.value,
        link: linkInput.value,
    });
    listCards.prepend(cardItem);
    popupToggle(addCardPopup);
});
