export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }
    // Получить начальные карточки
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    // Добавить новую карточку
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    // Поставить лайки
    setLikes(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    // Удалить лайки
    delLikes(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    //     // Получить данные пользователя
    //     getUserInfo() {
    //         fetch(`${this._url}/users/me`, {
    //             headers: this._headers,
    //         })
    //             .then((res) => res.json())
    //             .catch((err) => console.log(err));
    //     }
    // // Отредактировать данные пользователя
    //     editUserInfo() {
    //         fetch(`${this._url}/users/me`, {
    //             method: "PATH",
    //             headers: this._headers,
    //             body: JSON.stringify({
    //                 name: 'name',
    //                 about: 'job'
    //             })
    //         })
    //             .then((res) => res.json())
    //             .catch((err) => console.log(err));
    //     }

    // apiUserInfo();

    // const patchApiRequest = () => {
    //     fetch("https://mesto.nomoreparties.co/v1/cohort-18/users/me", {
    //         method: "PATCH",
    //         headers: {
    //             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: "Marie Skłodowska Curie",
    //             about: "Physicist and Chemist",
    //         }),
    //     })
    //     .then(res => res.json())
    //     .then((result) => {
    //         console.log(result)
    //     });
    // };
    // patchApiRequest();

    // const postApiRequest = () => {
    //     fetch("https://mesto.nomoreparties.co/v1/cohort-18/cards", {
    //         method: "POST",
    //         headers: {
    //             authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             "likes": [],
    //             "_id": "5d1f0611d321eb4bdcd707dd",
    //             "name": "Торжок",
    //             "link": "https://cdn.pixabay.com/photo/2018/08/23/10/48/torzhok-3625636_960_720.jpg",
    //             "owner": {
    //                 "name": "Jacques Cousteau",
    //                 "about": "Sailor, researcher",
    //                 "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
    //                 "_id": "ef5f7423f7f5e22bef4ad607",
    //                 "cohort": "local"
    //             },
    //             "createdAt": "2019-07-05T08:10:57.741Z"

    //         })
    //         })
    //     .then(res => res.json())
    //     .then((result) => {
    //         console.log(result)
    //     });
    // };
    // postApiRequest();
}
