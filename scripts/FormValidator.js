export class FormValidator {
    сonstructor(obj, form) {
        this._form = document.querySelector(form);
        this._formSelector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.nactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        console.log(this._form)
    }

    enableValidation() {
        const formElements = Array.from(
            document.querySelectorAll(".popup__form")
        );
        formElements.forEach(() => {
            this._formSelector.addEventListener("submit", (evt) => {
                evt.preventDefault();
            });
            setEventListener(this._formSelector);
        });
    }
    
}