import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open = (card) => {
        this._popup.querySelector(".popup__image").src = card._link;
        this._popup.querySelector(".popup__image").alt = card._name;
        this._popup.querySelector(".popup__title").textContent = card._name;

        super.open();
    };
}
