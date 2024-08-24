const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'bfb77d2f-7ea3-4d52-b0e6-482c1b38b579',
    'Content-Type': 'application/json'
  }
}

export function getCurrentUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => res.json())
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => res.json())
}

export function editUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
    .then(res => res.json())
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
    .then(res => res.json())
}

export function deleteCardRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then(res => res.json())
}

export function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then(res => res.json())
}

export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(res => res.json())
}