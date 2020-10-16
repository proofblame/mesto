const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const profileAuthor = document.querySelector('.profile__author');
const profileAuthorStatus = document.querySelector('.profile__author-status');
const elementsList = document.querySelector('.elements__list');
const editPopup = document.querySelector('.popup_type_popup-edit-profile');
const addCard = document.querySelector('.popup_type_popup-add-card');

// Массив с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 


// Добавляем карточки на страницу
const renderCards = () => {
    const card = initialCards.map(element => {
        return `<li class="elements__item">
                    <figure class="element">
                        <img src="${element.link}" alt="${element.name}" class="element__image">
                        <div class="element__body">
                            <p class="element__figcaption section__subtitle">${element.name}</p>
                            <button class="element__like-button buttons" type="button"></button>
                        </div>
                        <button class="element__delete-button buttons" type="button"></button>
                    </figure>
                </li>`;
    }).join('');

    elementsList.insertAdjacentHTML('afterbegin', card);
};
renderCards();

// Скрываем или добавляем модальное окно на странице
// через модификатор popup_opened

function popupToggle() {
    editPopup.classList.toggle('popup_opened');
    if (editPopup.classList.contains("popup_opened")) {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileAuthorStatus.textContent;
    }
}

// Создаем событие указателя
function onClicPopupBackgroundkListener(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle();
}

// Отмена действия браузера
// Передача значений в модальное окно
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileAuthorStatus.textContent = jobInput.value;
    popupToggle();
}

// Слушатель событий для формы
formElement.addEventListener("submit", formSubmitHandler);

// Слушатель событий для кнопки редактирования профиля
profileEditButton.addEventListener("click", popupToggle);

// Слушатель событий для кнопки закрытия попапа
popupCloseButton.addEventListener("click", popupToggle); 

// Слушатель событий попапа (его закрытие) при клике на фоне
editPopup.addEventListener("click", onClicPopupBackgroundkListener);
