import "./index.css";
import {
    editProfileForm,
    nameInput,
    jobInput,
    addCardForm,
    profileEditButton,
    addCardButton,
    CARD_ITEM_TEMPLATE_SELECTOR,
    container,
    settings,
    profileSelector,
    profileAuthor,
    profileJob,
    avatarAuthor,
    inputLinkAvatar,
    openAvatarButton,
    popupAvatarForm,
} from "../components/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Получение данных с сервера
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
        "Content-Type": "application/json",
    },
});

let userId = null;

// Получение данных пользователя
api.getUserInfo().then((data) => {
    profileAuthor.textContent = data.name;
    profileJob.textContent = data.about;
    avatarAuthor.src = data.avatar;
    userId = data._id;
})
.catch((err) => {
    console.log(err);
});

// Получение карточек с сервера
api.getInitialCards()
    .then((cards) => {
        renderInitialCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });

// Рендер начальных карточек
const renderInitialCards = (cards) => {
    const cardList = new Section(
        {
            items: cards,
            renderer: (item) => {
                const newCard = instantiationCard(item);
                const cardElement = newCard.generateCard();
                cardList.addItem(cardElement);
            },
        },
        container
    );
    cardList.renderItems();
};

// Создание карточки
const instantiationCard = (item) => {
    const card = new Card(item, userId, CARD_ITEM_TEMPLATE_SELECTOR, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },
        handleLikeClick: () => {
            const likedCard = card.qualifierLikes();
            const resultApi = likedCard
                ? api.delLikes(card.getCardId())
                : api.setLikes(card.getCardId());
            resultApi.then((item) => {
                card.setLikes(item.likes);
                card.renderLikes();
            })
            .catch((err) => {
                console.log(err);
            });
        },
        handleDeleteIconClick: () => {
            popupWithSubmit.open(card);
        },
    });
    return card;
};

// Добавление новой карточки
const addNewCardHandler = (card) => {
    addPopup.savingButton("Сохранение...");
    api.addNewCard(card.name, card.link).then((item) => {
        const newCard = instantiationCard(item);
        const cardElement = newCard.generateCard();
        container.prepend(cardElement);
    })
    .then(() => {
        addPopup.close();
        addPopup.savingButton("Сохранить")
    })
    .catch((err) => {
        console.log(err);
    });
};

// Удаление карточки
const cardDeleteHandler = (card) => {
    api.deleteCard(card.getCardId())
        .then(() => {
            popupWithSubmit.close();
            card.deleteCard();
        })
        .catch((err) => {
            console.log(err);
        })
};

// Редактирование данных пользователя
const editProfileHandler = (item) => {
    editPopup.savingButton("Сохранение...");
    api.editUserInfo(item.name, item.job)
    .then(() => {
        userInfo.setUserInfo(item);
        editPopup.close();
        editPopup.savingButton("Сохранить");
    })
    .catch((err) => {
        console.log(err);
    });
};

// Редактирование аватара пользователя
const editAvatarHandler = () => {
    editAvatarPopup.savingButton("Сохранение...");
    api.editUserAvatar(inputLinkAvatar.value)
    .then(() => {
        avatarAuthor.src = inputLinkAvatar.value;
        editAvatarPopup.close();
        editAvatarPopup.savingButton("Сохранить");
    })
    .catch((err) => {
        console.log(err);
    });
};

// Создание экземпляра класса попапа редактирования аватара
const editAvatarPopup = new PopupWithForm(
    ".popup_type_popup-update-avatar",
    editAvatarHandler
);
editAvatarPopup.setEventListeners();

// Создание экземпляра класса попапа редактирования профиля
const userInfo = new UserInfo(profileSelector);

// Создание экземпляра класса попапа редактирования формы профиля
const editPopup = new PopupWithForm(
    ".popup_type_popup-edit-profile",
    editProfileHandler
);
editPopup.setEventListeners();

// Попап подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit(
    ".popup_type_popup-confirm",
    (card) => cardDeleteHandler(card)
);
popupWithSubmit.setEventListeners();

// Включение валидации в попапе редактирования аватара
const editavatarForm = new FormValidator(settings, editProfileForm);
editavatarForm.enableValidation();

// Включение валидации в попапе редактирования профиля
const editUserForm = new FormValidator(settings, popupAvatarForm);
editUserForm.enableValidation();

// Включение валидации в попапе добавления карточки
const newCardForm = new FormValidator(settings, addCardForm);
newCardForm.enableValidation();

// Создание экземпляра класса попапа добавления карточки
const addPopup = new PopupWithForm(
    ".popup_type_popup-add-card",
    addNewCardHandler
);
addPopup.setEventListeners();

// Создание экземпляра класса попапа открытия галереи
const imagePopup = new PopupWithImage(".popup_type_popup-gallery");
imagePopup.setEventListeners();

// Слушатели
// Слушатель открытия попапа профиля

profileEditButton.addEventListener("click", () => {
    editPopup.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
});

// Слушатель открытия попапа добавления карточки
addCardButton.addEventListener("click", () => {
    addPopup.open();
    newCardForm.addInactiveButtonClass();
});
// Слушатель открытия попапа  редактирования аватара
openAvatarButton.addEventListener("click", () => {
    editAvatarPopup.open();
});
