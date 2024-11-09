import { initialCards } from "./cards.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content; 
const placesList = document.querySelector(".places__list");


// @todo: DOM узлы

const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
const cardImgElement = cardElement.querySelector(".card__image");
const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button");
const cardDescriptionElement = cardElement.querySelector(".card__description");
const cardTitleElement = cardDescriptionElement.querySelector(".card__title");
const cardLikeButtonElement = cardDescriptionElement.querySelector(".card__like-button");

cardElement.append(cardImgElement);
cardElement.append(cardDeleteButtonElement);
cardElement.append(cardDescriptionElement);
cardDescriptionElement.append(cardTitleElement);
cardDescriptionElement.append(cardLikeButtonElement);

// @todo: Функция создания карточки

function createCard(cardData) {
    const newCardElement = cardElement.cloneNode(true);

    newCardElement.querySelector(".card__image").src = cardData["link"];
    newCardElement.querySelector(".card__image").alt = cardData["name"];
    newCardElement.querySelector(".card__title").textContent = cardData["name"]; 
    
    return newCardElement;
}

initialCards.forEach(cardData => {
    placesList.append(createCard(cardData));
})

console.log(placesList);


// @todo: Функция удаления карточки

function deleteCard() {

}

// @todo: Вывести карточки на страницу

function printCard() {

}
