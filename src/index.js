import "./pages/index.css";
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
    userId,
    profileAuthor,
    profileJob,
    avatarAuthor,
    inputLinkAvatar,
    openAvatarButton,
    popupAvatarForm,
} from "./scripts/constants.js";

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";

import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithSubmit from "./scripts/PopupWithSubmit.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";

// Получение данных с сервера
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
        "Content-Type": "application/json",
    },
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
const addNewCardHandler = () => {
    const inputTitle = document.querySelector(".popup__input_title").value;
    const inputLink = document.querySelector(".popup__input_link").value;
    addPopup.savingButton("Сохранение...");
    api.addNewCard(inputTitle, inputLink).then((item) => {
        const newCard = instantiationCard(item);
        const cardElement = newCard.generateCard();
        container.prepend(cardElement);
    })
    .then(() => {
        addPopup.close();
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

// Получение данных пользователя
api.getUserInfo().then((data) => {
    profileAuthor.textContent = data.name;
    profileJob.textContent = data.about;
    avatarAuthor.src = data.avatar;
})
.catch((err) => {
    console.log(err);
});

// Редактирование данных пользователя
const editProfileHandler = () => {
    const profile = {
        name: nameInput.value,
        job: jobInput.value,
    };
    editPopup.savingButton("Сохранение...");
    api.editUserInfo(profile.name, profile.job)
    .then(() => {
        userInfo.setUserInfo(profile);
        editPopup.close();
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
