// Open and close popup
export const openPopup = (element) => {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeButton);
};

export const closePopup = (element) => {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeButton);
};

export const handleEscapeButton = (evt) => {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
};

// Closing popup when clicked on the background and close button
export const handleClickOnOverlay = (event) => {
    const popup = event.currentTarget;
    if (event.target !== popup) {
        return;
    }

    closePopup(popup);
};
