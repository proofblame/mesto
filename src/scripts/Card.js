export class Card {
    constructor(data, cardSelector, { handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".elements__item")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector(".element__image");
        this._setEventListeners();
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector(
            ".element__figcaption"
        ).textContent = this._name;

        return this._element;
    }

    _handleLikeCard() {
        this._element
            .querySelector(".element__like-button")
            .classList.toggle("element__like-button_active");
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element
            .querySelector(".element__like-button")
            .addEventListener("click", () => {
                this._handleLikeCard();
            });

        this._element
            .querySelector(".element__delete-button")
            .addEventListener("click", () => {
                this._handleDeleteCard();
            });

        this._element
            .querySelector(".element__image")
            .addEventListener("click", () => {
                this._handleCardClick(this._name, this._link);
            });
    }
}
