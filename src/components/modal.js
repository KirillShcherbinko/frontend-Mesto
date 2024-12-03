// Функция для закрятия с помощью клавиши Escape
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModal(openedPopup);
    }
}

// Функция для закрытия с помощью нажатия вне попапа
function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModal(openedPopup);
    }
}


// Функция для изменения курсора при выходе за попап
function handleCursorType(evt) {
    if (evt.target === evt.currentTarget) {
        evt.target.style.cursor = "pointer";
    } else {
        evt.target.style.cursor = "default";
    }
}

// Функция для открытия модального окна
export function openModal(popup) { 
    // Добавляем класс открытия попапу    
    popup.classList.add('popup_is-opened');

    // Добавляем обработчики событий
    popup.querySelector(".popup__close").addEventListener("click", evt => closeModal(popup));
    popup.addEventListener("click", closeByOverlay);
    popup.addEventListener("mouseout", handleCursorType);
    document.addEventListener("keydown", closeByEsc);
}

// Функция для закрытия модального окна
export function closeModal(popup) {
    // Удаляем обработчики событий
    popup.querySelector(".popup__close").removeEventListener("click", evt => closeModal(popup));
    popup.removeEventListener("click", closeByOverlay);
    popup.removeEventListener("mouseout", handleCursorType);
    document.removeEventListener("keydown", closeByEsc);

    // Удаляем класс открытия попапа
    popup.classList.remove('popup_is-opened');
}

