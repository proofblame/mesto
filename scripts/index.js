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
const popup = document.querySelectorAll(".popup");
const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
const addCardPopup = document.querySelector(".popup_type_popup-add-card");

// Open buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Close buttons
const profileCloseButton = editProfilePopup.querySelector(
    ".popup__close-button"
);
const cardCloseButton = addCardPopup.querySelector(".popup__close-button");

// Submit buttons
const editProfileForm = editProfilePopup.querySelector(
    ".popup-form_type_edit-profile"
);

// Inputs
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");

// Areas
const authorName = document.querySelector(".profile__author");
const authorJob = document.querySelector(".profile__author-status");

// Card
const listCards = document.querySelector(".elements__list");

// Render cards
const renderCards = () => {
    const cards = initialCards
        .map((element) => {
            return `<li class="elements__item"> 
                        <figure class="element element__figure"> 
                            <img src="${element.link}" alt="${element.name}" class="element__image"> 
                            <div class="element__body"> 
                                <p class="element__figcaption section__subtitle">${element.name}</p> 
                                <button class="element__like-button buttons" type="button"></button> 
                            </div> 
                            <button class="element__delete-button buttons" type="button"></button>
                        </figure> 
                        </li>`;
        })
        .join("");

    listCards.insertAdjacentHTML("afterbegin", cards);
};

renderCards();

// Popup toggle
function popupToggle(element) {
    element.classList.toggle("popup_opened");
}

// Closing popup when clicked on the background
function backgroundListener(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle(element);
}

// Close popups
editProfilePopup.addEventListener("click", backgroundListener);
profileCloseButton.addEventListener("click", () =>
    popupToggle(editProfilePopup)
);
cardCloseButton.addEventListener("click", () => popupToggle(addCardPopup));

// Open popups
profileEditButton.addEventListener("click", () => {
    popupToggle(editProfilePopup);
    if (editProfilePopup.classList.contains("popup_opened")) {
        nameInput.value = authorName.textContent;
        jobInput.value = authorJob.textContent;
    }
});
addCardButton.addEventListener("click", () => popupToggle(addCardPopup));

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    popupToggle(editProfilePopup);
});
