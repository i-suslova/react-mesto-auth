class ApiAuth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // проверяем ответ сервера на корректность
  _correctServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  // запрос для регистрации
  async signup({ password, email }) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    return this._correctServerResponse(response);
  }

  //запрос для авторизации
  async signin({ password, email }) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    return this._correctServerResponse(response);
  }

  //запрос для проверки валидности токена и
  //получения email для вставки в шапку сайта
  async tokenCheck(token) {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return this._correctServerResponse(response);
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});


