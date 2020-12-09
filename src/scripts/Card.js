export class Card {
    constructor(
        data,
        userId,
        cardSelector,
        { handleCardClick, handleLikeClick, handleDeleteIconClick }
    ) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._cardLikes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
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
        this._deleteButton = this._element.querySelector(
            ".element__delete-button"
        );
        if (this._ownerId !== this._userId) {
            this._deleteButton.remove();
        }
        this._countLikes = this._element.querySelector(".element__like-count");
        this.renderLikes();
        this._setEventListeners();
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector(
            ".element__figcaption"
        ).textContent = this._name;

        return this._element;
    }

    getIdCard() {
        return this._cardId;
    }

    renderLikes() {
        this._countLikes.textContent = this._cardLikes.length;
        // this.showLikes(this._userId);
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

        // this._element
        //     .querySelector(".element__delete-button")
        //     .addEventListener("click", () => {
        //         this._handleDeleteCard();
        //     });

        this._element
            .querySelector(".element__image")
            .addEventListener("click", () => {
                this._handleCardClick(this._name, this._link);
            });
    }
}
