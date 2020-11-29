export const BASE_URL = 'http://api.capobvious.azik.students.nomoreparties.xyz'
function getRegister(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            return res;
        })
        .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(res)
          })
}
function getLogin(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(data  => {
        return data
     })
     .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res)
      })
}
function checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(data => data)
        .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(res)
          })
}
export default { checkToken, getRegister, getLogin }