
export class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl

  }
  getAppInfo() {
    return Promise.all([this.getCards(), this.getInformation()])
  }
  getInformation(token) {
    return fetch(`${this.baseUrl}/users/me`, {
       headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  editInformation(item, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
       headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      body: JSON.stringify({name: item.name, about: item.about})
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  getCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
       headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  likeCard(cardId, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  dislikeCard(cardId, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
       headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  deleteCard( cardId, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  createCard(item, token) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  editAvatar(item, token) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
       headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      body: JSON.stringify({ avatar: item.avatar })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}
const api = new Api({
  baseUrl: 'https://api.capobvious.azik.students.nomoredomains.monster'
})
export default api
