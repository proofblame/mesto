import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({popupSelector}, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(".popup__form");
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
            this._handleFormSubmit();
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}
