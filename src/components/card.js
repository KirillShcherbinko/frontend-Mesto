import { deleteCard, putLike, deleteLike } from "./api.js";
import { userId } from "./index.js"

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; 

// Функция для создания карточки
export function createCard(
    cardDataName, 
    cardDataLink, 
    cardLikeCount, 
    cardId, 
    ownerId, 
    wasLiked
) {
    const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const newCardImageElement = newCardElement.querySelector(".card__image");
    const newCardTitleElement = newCardElement.querySelector(".card__title"); 
    const newCardLikeCount = newCardElement.querySelector(".card__like-count");
    const newDeleteButtonElement = newCardElement.querySelector(".card__delete-button");

    const newCardLikeButtonElement = newCardElement.querySelector(".card__like-button");

    newCardImageElement.src = cardDataLink;
    newCardImageElement.alt = cardDataName;
    newCardTitleElement.textContent = cardDataName;
    newCardLikeCount.textContent = cardLikeCount;

    newCardElement._id = cardId;

    if (wasLiked) {
        newCardLikeButtonElement.classList.add("card__like-button_is-active");
    } else {
        newCardLikeButtonElement.classList.remove("card__like-button_is-active");
    }

    console.log(wasLiked);

    newCardLikeButtonElement.addEventListener("click", (evt) => {
        const likeButton = evt.target;
    
        // Проверяем, активна ли кнопка лайка
        const isLiked = likeButton.classList.contains("card__like-button_is-active");
    
        if (!isLiked) {
            // Ставим лайк
            putLike(cardId)
                .then((res) => {
                    likeButton.classList.add("card__like-button_is-active");
                    newCardLikeCount.textContent = res.likes.length; // Обновляем количество лайков
                })
                .catch((err) => console.log(err));
        } else {
            // Убираем лайк
            deleteLike(cardId)
                .then((res) => {
                    likeButton.classList.remove("card__like-button_is-active");
                    newCardLikeCount.textContent = res.likes.length; // Обновляем количество лайков
                })
                .catch((err) => console.log(err));
        }
    });
    

    // Добавляем возможность удаления карточки только для данного пользователя
    if (userId === ownerId) {
        newDeleteButtonElement.addEventListener("click", evt => {handleDeleteCard(newDeleteButtonElement, cardId)});
    } else {
        newDeleteButtonElement.remove();
    }
    
    return newCardElement;
}

// Функция для удаления карточки
function handleDeleteCard(deleteButton, cardId) {
    deleteCard(cardId)
        .then(() => {
            deleteButton.closest(".card").remove()
        })
        .catch(err => {
            console.log(err)
        });
}