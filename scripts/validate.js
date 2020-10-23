
function showError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add("popup__input_state_invalid");
}

function hideError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove("popup__input_state_invalid");
}

function checkInputValidity(formElement, input) {
    if (input.checkValidity()) {
        hideError(formElement, input);
    } else {
        showError(formElement, input);
    }
}
function toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove("popup__button_invalid");
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add("popup__button_invalid");
        buttonElement.disabled = true;
    }
}

function setEventListener(formElement) {
    const inputElements = Array.from(
      formElement.querySelectorAll(".popup__input")
    );
    const buttonElement = formElement.querySelector(".popup__save-button");

    inputElements.forEach((input) => {
        input.addEventListener("input", (evt) => {
            checkInputValidity(formElement, evt.target);
            toggleButtonState(formElement, buttonElement);
        });
    });
    toggleButtonState(formElement, buttonElement);
}

function enableValidation() {
    const formElements = Array.from(
        document.querySelectorAll(".popup__form")
    );
    formElements.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListener(form);
    });
}

enableValidation();

// const forms = document.forms;
// console.log(forms)
