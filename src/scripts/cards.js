// Функция создания карточки
function createCard (cardInfo, cardFunctions) {
    const card = cardInfo.cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.src = cardInfo.imgSrc;
    cardImage.alt = cardInfo.description | cardInfo.title;
    card.querySelector(".card__title").textContent = cardInfo.title;
    card.querySelector(".card__delete-button").addEventListener("click", cardFunctions.removeFunction);
    card.querySelector(".card__like-button").addEventListener("click", cardFunctions.likeFunction);
    cardImage.addEventListener("click", () =>
      cardFunctions.openFunction(cardInfo.imgSrc, cardInfo.title));
    return card;
};

// Функция удаления карточки
function removeCard (event) {
    event.target.closest(".card").remove();
};

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}


export { createCard, removeCard, likeCard };