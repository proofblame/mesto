import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, cardDeleteHandler) {
        super(popupSelector);
        this._cardDeleteHandler = cardDeleteHandler;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._saveButton = this._popupForm.querySelector(".popup__save-button");
    }

    open(cardItem) {
        this._card = cardItem;
        super.open();
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._cardDeleteHandler(this._card);
            this.close();
        });
        super.setEventListeners();
    }

}