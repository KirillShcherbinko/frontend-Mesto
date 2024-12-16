import '../pages/index.css';

import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validate.js"
import { getInitialCards, getProfile } from "./api.js";

////////// Данные с сервера //////////

const initialCards = await getInitialCards();

const profileData = await getProfile();
const profileName = profileData.name;
const profileJob = profileData.about;
const profileAvatar = profileData.avatar;

////////// DOM узлы //////////

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");


profileTitle.textContent = profileName;
profileDescription.textContent = profileJob;
profileImage.style.backgroundImage = `url("${profileAvatar}")`;

// Список карточек
const placesList = document.querySelector(".places__list");

initialCards.forEach(cardData => {
    placesList.append(createCard(cardData["name"], cardData["link"]));
})


// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector('.popup_type_image');

// Элементы форм
const profileFormElement = profilePopup.querySelector(".popup__form");
const cardFromElement = cardPopup.querySelector(".popup__form");

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

// Кнопки
const profilePopupButton = document.querySelector(".profile__edit-button");
const cardPopupButton = document.querySelector(".profile__add-button");

// Добавление анимации попапам
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

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
nameInput.value = profileName;
jobInput.value = profileJob;

// Функция для обработки попапа профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;

    closeModal(profilePopup);
}

// Функция для обработки попапа добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInputValue = cardNameInput.value;
    const cardLinkInputValue = cardLinkInput.value;

    placesList.prepend(createCard(cardNameInputValue, cardLinkInputValue));

    closeModal(cardPopup);
}


////////// Обработчкики событий //////////

// Обработчики событий для попапов
profilePopupButton.addEventListener("click", (evt) => {openModal(profilePopup)});
cardPopupButton.addEventListener("click", (evt) => {openModal(cardPopup)});


// Обработчики события для форм
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFromElement.addEventListener("submit", handleCardFormSubmit)

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
