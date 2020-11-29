
export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }
  getAppInfo() {
    return Promise.all([this.getCards(), this.getInformation()])
  }
  getInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  editInformation(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name: item.name, about: item.about})
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  createCard(item) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
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
  editAvatar(item) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
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
  baseUrl: 'http://api.capobvious.azik.students.nomoreparties.xyz',
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMxNzVkZDAwYmY0ODRmOTAyMTgxNTIiLCJpYXQiOjE2MDY2MDYzMDAsImV4cCI6MTYwNzIxMTEwMH0.WHwfJVlufdOSGdzkv5Ks2j7Zl2CmxQm4NxMSSfpRRTY',
    'Content-Type': 'application/json'
  }
})
export default api
// https://yandex.ru/images/search?p=1&text=%D1%8F+%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB+%D0%BC%D0%B5%D0%BC+%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%81%D1%82&pos=79&rpt=simage&img_url=https%3A%2F%2Fcs6.pikabu.ru%2Fpost_img%2Fbig%2F2014%2F10%2F13%2F11%2F1413219813_1340057670.png&from=tabbar
//   https://yandex.ru/images/search?p=2&text=%D1%8F+%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB+%D0%BC%D0%B5%D0%BC+%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%81%D1%82&pos=86&rpt=simage&img_url=https%3A%2F%2Fcs8.pikabu.ru%2Fpost_img%2F2016%2F06%2F02%2F7%2Fog_og_1464867407239442559.jpg&from=tabbar