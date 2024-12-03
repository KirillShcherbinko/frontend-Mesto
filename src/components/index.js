import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content; 
const placesList = document.querySelector(".places__list");


// @todo: DOM узлы

const cardElement = cardTemplate.querySelector(".card").cloneNode(true);


// @todo: Функция создания карточки

function createCard(cardDataName, cardDataLink) {

    const newCardElement = cardElement.cloneNode(true);

    const newCardImageElement = newCardElement.querySelector(".card__image");
    const newCardTitleElement = newCardElement.querySelector(".card__title"); 
    const newCardLikeButtonElement = newCardElement.querySelector(".card__like-button");
    const newDeleteButtonElement = newCardElement.querySelector(".card__delete-button");
    const imagePopup = document.querySelector(".popup_type_image");

    newCardImageElement.src = cardDataLink;
    newCardImageElement.alt = cardDataName;
    newCardTitleElement.textContent = cardDataName;

    newCardLikeButtonElement.addEventListener("click", (evt) => {
        evt.target.classList.toggle('card__like-button_is-active')
    })

    newDeleteButtonElement.addEventListener("click", evt => deleteCard(newDeleteButtonElement));

    newCardImageElement.addEventListener("click", (evt) => {
        imagePopup.querySelector(".popup__image").src = cardDataLink;
        imagePopup.querySelector(".popup__caption").textContent = cardDataName;
        openModal(imagePopup);
    })

    return newCardElement;
}


// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");

// Кнопки
const profilePopupButton = document.querySelector(".profile__edit-button");
const cardPopupButton = document.querySelector(".profile__add-button");


// Обработчики событий
profilePopupButton.addEventListener("click", (evt) => {openModal(profilePopup)});
cardPopupButton.addEventListener("click", (evt) => {openModal(cardPopup)});

// Находим форму в DOM
const profileFormElement = profilePopup.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profilePopup.querySelector(".popup__input_type_name");// Воспользуйтесь инструментом .querySelector()
const jobInput = profilePopup.querySelector(".popup__input_type_description");// Воспользуйтесь инструментом .querySelector()

nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

const cardFromElement = cardPopup.querySelector(".popup__form");

const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");
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

    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInputValue = cardNameInput.value;
    const cardLinkInputValue = cardLinkInput.value;


    placesList.prepend(createCard(cardNameInputValue, cardLinkInputValue));

    console.log(placesList);

    closeModal(cardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFromElement.addEventListener("submit", handleCardFormSubmit)




// @todo: Функция удаления карточки

function deleteCard(deleteButton) {
    deleteButton.closest(".card").remove();
}

// @todo: Вывести карточки на страницу

function printCard() {
    initialCards.forEach(cardData => {
        placesList.append(createCard(cardData["name"], cardData["link"]));
    })
}

printCard();
