export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener(
            "keydown",
            this._handleEscClose.bind(this)
        );
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup
            .querySelector(".popup__close-button")
            .addEventListener("click", this.close.bind(this));
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }
}
