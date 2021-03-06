import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, editProfileHandler) {
        super(popupSelector);
        this._editProfileHandler = editProfileHandler;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._saveButton = this._popupForm.querySelector('.popup__save-button')
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._editProfileHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    savingButton(text) {
        this._saveButton.value = text;
    }
}
