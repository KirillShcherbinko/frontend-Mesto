import '../pages/index.css';

import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validate.js"
import { 
    getInitialCards, 
    getProfile, 
    updateProfile, 
    updateAvatar,
    postCard,
} from "./api.js";

////////// DOM узлы //////////

// Список карточек
const placesList = document.querySelector(".places__list");

// Ававтар
const avatarElement = document.querySelector(".profile__overlay");

// Данные пользователя
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// Элементы форм
const profileFormElement = profilePopup.querySelector(".popup__form");
const cardFormElement = cardPopup.querySelector(".popup__form");
const avatarFormElement = avatarPopup.querySelector(".popup__form");

// Элементы попапа для карточки
// Элементы поп-апа картинки
const imageElement = imagePopup.querySelector('.popup__image')
const captionElement = imagePopup.querySelector('.popup__caption')

// Поля форм

// Для профиля
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");

// Для карточек
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

// Для аватара
const avatarLinkInput = avatarPopup.querySelector(".popup__input_type_url");

// Кнопки
// Кнопки для открытия модальных окон
const profilePopupButton = document.querySelector(".profile__edit-button");
const cardPopupButton = document.querySelector(".profile__add-button");

// Кнопки для отправки
const profileSubmitButton = profilePopup.querySelector(".popup__button");
const cardSubmitButton = cardPopup.querySelector(".popup__button");
const avatarSubmitButton = avatarPopup.querySelector(".popup__button");

// Добавление анимации попапам
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

////////// Получение данных с сервера //////////

export let userId;

getProfile()
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        profileImage.style.backgroundImage = `url("${res.avatar}")`;
        nameInput.value = res.name;
        jobInput.value = res.about;
        avatarLinkInput.value = res.avatar;
        userId = res._id;
    })
    .catch((err) => {
        console.log(err)
    })

getInitialCards()
    .then((res) => {
        res.forEach(cardData => {
            const wasLiked = cardData["likes"].some(user => user["_id"] === userId);
            placesList.append(createCard(
                cardData["name"], 
                cardData["link"], 
                cardData["likes"].length, 
                cardData["_id"], 
                cardData["owner"]["_id"], 
                wasLiked
            ));
        })
    })
    .catch((err) => {
        console.log(err);
    });

////////// Дополнительные переменные //////////

// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

////////// Обработка попапов //////////

// Получение значений полей для попапа профиля


// Функция для обработки попапа профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    const body = {
        name: nameInput.value,
        about: jobInput.value
    }

    profileSubmitButton.textContent = "Сохранение...";

    updateProfile(body)
        .then((res) => {
            const nameInputValue = res.name;
            const jobInputValue = res.about;

            profileTitle.textContent = nameInputValue;
            profileDescription.textContent = jobInputValue;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closeModal(profilePopup);
            profileSubmitButton.classList.add("popup__button_disabled");
            profileSubmitButton.textContent = "Сохранить";
        });
}

// Функция для обработки попапа добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInputValue = cardNameInput.value;
    const cardLinkInputValue = cardLinkInput.value;

    const body = {
        name: cardNameInputValue,
        link: cardLinkInputValue
    }

    cardSubmitButton.textContent = "Создание...";

    postCard(body)
        .then(res => {
            const cardLikeCount = res.likes.length;
            const cardId = res._id;
            const ownerId = res.owner._id;
            const wasLiked = false;
            const newCard = createCard(
                cardNameInputValue, 
                cardLinkInputValue, 
                cardLikeCount, 
                cardId, 
                ownerId, 
                wasLiked
            );
            placesList.prepend(newCard);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeModal(cardPopup);
            cardSubmitButton.classList.add("popup__button_disabled");
            cardSubmitButton.textContent = "Создать";
        });
}


// Функция для обработки попапа аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const avatarLinkInputValue = avatarLinkInput.value;

    avatarSubmitButton.textContent = "Сохранение...";

    updateAvatar(avatarLinkInputValue)
        .then(res => {
            avatarLinkInput.textContent = res.avatar;
            profileImage.style.backgroundImage = `url("${res.avatar}")`;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeModal(avatarPopup);
            avatarSubmitButton.classList.add("popup__button_disabled");
            avatarSubmitButton.textContent = "Сохранить";
        });
}


////////// Обработчкики событий //////////

// Обработчики событий для попапов
profilePopupButton.addEventListener("click", (evt) => {openModal(profilePopup)});
cardPopupButton.addEventListener("click", (evt) => {openModal(cardPopup)});
avatarElement.addEventListener("click", (evt) => {openModal(avatarPopup)});


// Обработчики события для форм
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleCardFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// Обработчик открытия карточки 
placesList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('card__image')) {
      imageElement.src = ""
      imageElement.src = evt.target.src
      captionElement.textContent = evt.target.alt
      openModal(imagePopup)
    }
})


// Включение валидации
enableValidation(validationSettings);
