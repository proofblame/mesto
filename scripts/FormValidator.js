export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showError(input) {
        const errorElement = this._form.querySelector(
            `#${input.id}-${this._errorClass}`
        );
        errorElement.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
    }

    _hideError(input) {
        const errorElement = this._form.querySelector(
            `#${input.id}-${this._errorClass}`
        );
        errorElement.textContent = "";
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input) {
        if (input.checkValidity()) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }
    _toggleButtonState(buttonElement) {
        if (this._form.checkValidity()) {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        } else {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
    }

    _setEventListener() {
        const inputElements = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );
        const buttonElement = this._form.querySelector(
            this._submitButtonSelector
        );

        inputElements.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this._toggleButtonState(buttonElement);
                this._checkInputValidity(evt.target);
            });
        });
        this._toggleButtonState(buttonElement);
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListener();
    }
}
