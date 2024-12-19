////////// Общие функции //////////

const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'c3e632d7-cff1-413c-a3e2-e7f59c6b5248',
        'Content-Type': 'application/json'
    }
}

const sendRequest = (method, endpoint, body) => {
  const options = {method, headers: config.headers};

  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
  }

  return fetch (`${config.baseUrl}/${endpoint}`, options)
    .then((res) => {
      if (res.ok) return res.json()
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

///////// Функции для профиля //////////

// Получение данных профиля
export const getProfile = () => {
  return sendRequest("GET", "users/me", {});
}

// Обновление данных профиля
export const updateProfile = (name, about) => {
  return sendRequest("PATCH", "users/me", {name, about});
}

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  return sendRequest("PATCH", "users/me/avatar", {avatar});
}

////////// Функции для карточек //////////

// Получение всех карточек
export const getInitialCards = () => {
 return sendRequest("GET", "cards", {});
}

// Создание карточки
export const postCard = (name, link) => {
  return sendRequest("POST", "cards", {name, link});
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return sendRequest("DELETE", `cards/${cardId}`, {});
}

////////// Функции для лайков карточек //////////

// Поставить лайк
export const putLike = (cardId) => {
  return sendRequest("PUT", `cards/likes/${cardId}`, {});
}

// Удалить лайк
export const deleteLike = (cardId) => {
  return sendRequest("DELETE", `cards/likes/${cardId}`, {});
}