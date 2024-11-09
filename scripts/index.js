import { initialCards } from "./cards.js";

// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Кнопки
const popupCloseButton = document.querySelector(".popup__close");
const profilePopupButton = document.querySelector(".profile__edit-button");


// Обработчики событий
popupCloseButton.addEventListener("click", () => {
    
});
profilePopupButton.addEventListener("click", openModal(profilePopup));

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

// Находим форму в DOM
const profileFormElement = profilePopup.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profilePopup.querySelector(".popup__input_type_name");// Воспользуйтесь инструментом .querySelector()
const jobInput = profilePopup.querySelector(".popup__input_type_description");// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

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
