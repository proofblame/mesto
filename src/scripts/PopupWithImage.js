import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open (name, link) {
        this._image = this._popup.querySelector(".popup__image");
        this._image.src = link;
        this._image.alt = name;
        this._popup.querySelector(".popup__title").textContent = name;

        super.open();
    };
}
