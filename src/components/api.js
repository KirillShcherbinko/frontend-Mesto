////////// Общие функции //////////

const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'c3e632d7-cff1-413c-a3e2-e7f59c6b5248',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
  if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`);
}

///////// Функции для профиля //////////

// Получение данных профиля
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// Обновление данных профиля
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name, about
    })
  })
    .then(checkResponse)
}

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH", 
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(checkResponse)
  }

////////// Функции для карточек //////////

// Получение всех карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
} 

// Создание карточки
export const createCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name, link
    })
  })
    .then(checkResponse)
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
}

////////// Функции для лайков карточек //////////

// Поставить лайк
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
    .then(checkResponse)
}

// Удалить лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(checkResponse)
  }

