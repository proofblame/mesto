export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._buttonElement = this._form.querySelector(
            this._submitButtonSelector
        );
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

    addInactiveButtonClass() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _toggleButtonState() {
        if (this._form.checkValidity()) {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        } else {
            this.addInactiveButtonClass(this._buttonElement);
        }
    }

    _setEventListener() {
        const inputElements = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );

        inputElements.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this._toggleButtonState(this._buttonElement);
                this._checkInputValidity(evt.target);
            });
        });
        this._toggleButtonState(this._buttonElement);
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListener();
    }
}
