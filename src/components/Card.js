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
        this._likeButton = this._element.querySelector(".element__like-button");
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
    // Удаление карточки
    deleteCard() {
        this._element.remove();
    }

    // Рендерит количество лайки
    renderLikes() {
        this._countLikes.textContent = this._cardLikes.length;
        this.switchLikes(this._userId);
    }

    // Определяет наличие своего лайка
    qualifierLikes() {
        return this._cardLikes.some((like) => {
            return like._id === this._userId;
        });
    }
    // Установить лайки
    setLikes(likesList) {
        this._cardLikes = likesList;
    }
    // Получить ID  карточки
    getCardId() {
        return this._cardId;
    }

    // Закрашивает и снимает метку лайка
    switchLikes() {
        if (this.qualifierLikes(this._userId)) {
            this._likeButton.classList.add("element__like-button_active");
        } else {
            this._likeButton.classList.remove("element__like-button_active");
        }
    }

    // _handleLikeCard() {
    //     this._element
    //         .querySelector(".element__like-button")
    //         .classList.toggle("element__like-button_active");
    // }

    // _handleDeleteCard() {
    //     this._element.remove();
    //     this._element = null;
    // }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick();
        });

        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteIconClick();
        });

        this._image.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
