class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  /** Формирую запрос на сервер */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  };

  /**  Метод загрузки информации о пользователе с сервера */
  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  /** Метод редактирование профиля */
  async changeUserInfo(items) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: items.name,
				about: items.about,
			}),
		}).then(this._checkResponse);
	};

  /** Метод редактирования аватара */
	async changeUserAvatar(items) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar: items.avatar, }),
		}).then(this._checkResponse);
	};

  /** Метод загрузки карточек с сервера */
  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  };

  /** Метод добавления новой карточки */
  async addCard(items) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: items.name,
				link: items.link,
			}),
		}).then(this._checkResponse);
	};

  /** Метод удаления карточки */
  async deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  /** Метод постановки лайка карточки */
  async addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  /** Метод удаления лайка карточки */
  async deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };
};

/** Подключить API */
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "8da28c3b-8ab9-43a4-aea6-1a07338d7f8b",
    "Content-Type": "application/json",
  }
});

export default api; 