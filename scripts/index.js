// Находим форму в DOM

// Popups
const popup = document.querySelector(".popup");
const editProfilePopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);

// Open buttons
const profileEditButtons = document.querySelector(".profile__edit-button");

// Close buttons

const profileCloseButton = editProfilePopup.querySelector(
    ".popup__close-button"
);

// Submit buttons
const editProfileForm = editProfilePopup.querySelector(".popup-form_type_edit-profile");

// Inputs
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");

// Areas
const authorName = document.querySelector(".profile__author");
const authorJob = document.querySelector(".profile__author-status");












// Popup toggle
function popupToggle(element) {
    element.classList.toggle("popup_opened");
}

// Closing all popups when clicked on the background
function backgroundListener(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle(popup);
}

// Close popups
popup.addEventListener("click", backgroundListener);
profileCloseButton.addEventListener("click", () =>
    popupToggle(editProfilePopup)
);

// Open popups
profileEditButtons.addEventListener("click", () => {
    popupToggle(editProfilePopup);
    if (editProfilePopup.classList.contains("popup_opened")) {
        nameInput.value = authorName.textContent;
        jobInput.value = authorJob.textContent;
    }
});

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault()
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    popupToggle(popup);
});
