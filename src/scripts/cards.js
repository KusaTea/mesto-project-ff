// Функция создания карточки
function createCard (cardInfo, cardFunctions, usersInfo) {
    const card = cardInfo.cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button")
    cardImage.src = cardInfo.imgSrc;
    cardImage.alt = cardInfo.description | cardInfo.title;
    card.querySelector(".card__title").textContent = cardInfo.title;
    if (usersInfo.currentUser === usersInfo.cardOwner) {
      card.querySelector(".card__delete-button").addEventListener("click", cardFunctions.removeFunction);
    } else {
      card.querySelector(".card__delete-button").remove();
    };
    if (Object.values(cardInfo.likes).some((likeOwner) => {
      return likeOwner._id === usersInfo.currentUser;
    })) {
      likeButton.classList.add('card__like-button_is-active');
    };
    likeButton.addEventListener("click", cardFunctions.likeFunction);
    card.querySelector('.card__like-number').textContent = cardInfo.likes.length;
    card.querySelector('.card').setAttribute('data-id', cardInfo.id);
    cardImage.addEventListener("click", () =>
      cardFunctions.openFunction(cardInfo.imgSrc, cardInfo.title));
    return card;
};

// Функция удаления карточки
function removeCard (event) {
    event.target.closest(".card").remove();
};


export { createCard };