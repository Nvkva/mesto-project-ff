import { request } from "../utils/request";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'bfb77d2f-7ea3-4d52-b0e6-482c1b38b579',
    'Content-Type': 'application/json'
  }
}

export const getCurrentUser = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

export const getCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}

export const editUser = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  });
}

export const addNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  });
}

export const deleteCardRequest = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  });
}

export const likeCardRequest = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  });
}

export const dislikeCardRequest = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  });
}

export const editAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  });
}