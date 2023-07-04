class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // проверяем ответ сервера на корректность
  _correctServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка информации о пользователе с сервера
  async _getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._correctServerResponse(response);
  }

  // получаем список всех карточек в виде массива (GET)
  async _getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._correctServerResponse(response);
  }

  // объединяем 2 функцииа
  async getAllNeedData() {
    try {
      const [userData, cardData] = await Promise.all([
        this._getUserInfo(),
        this._getInitialCards(),
      ]);

      return { userData, cardData };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // отправка данных для профиля (PATCH)
  async getUserId(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._correctServerResponse(response);
  }

  // отправка данных для изменения аватара (PATCH)
  async editAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._correctServerResponse(response);
  }

  // отправка данных по удалению своей карточки (DELETE)
  async deletePersonalCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._correctServerResponse(response);
  }

  // добавить на сервер новую карточку(POST)
  async addCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._correctServerResponse(response);
  }

  // поставить лайк (PUT)
  async addLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._correctServerResponse(response);
  }

  // удалить лайк (DELETE)
  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._correctServerResponse(response);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "a6201408-149a-4017-8f2e-d2f94e8d9514",
    "Content-Type": "application/json",
  },
});

export default api;
