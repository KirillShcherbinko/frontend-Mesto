// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; 

export function createCard(cardDataName, cardDataLink) {

    const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);

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