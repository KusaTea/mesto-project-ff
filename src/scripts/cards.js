// Функция создания карточки
function createCard (cardInfo = {
  cardTemplate,
  imgSrc,
  title,
  description,
  },
  cardFunctions = {
  removeFunction,
  likeFunction,
  openFunction
}) {
    const card = cardInfo.cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.src = cardInfo.imgSrc;
    cardImage.alt = cardInfo.description | cardInfo.title;
    card.querySelector(".card__title").textContent = cardInfo.title;
    card.querySelector(".card__delete-button").addEventListener("click", cardFunctions.removeFunction);
    card.querySelector(".card__like-button").addEventListener("click", cardFunctions.likeFunction);
    card.querySelector(".card").addEventListener("click", cardFunctions.openFunction);
    return card;
};

// Функция удаления карточки
function removeCard (event) {
    event.target.closest(".card").remove();
};

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCardWrapper (popup, openFunction) {
  return (evt) => {
    if (evt.target.classList.contains('card__image')) {
      const popupImage = popup.querySelector(".popup__image");
    
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popup.querySelector(".popup__caption").textContent =
      evt.currentTarget.querySelector('.card__title').textContent;
      openFunction(popup);
    };
  }
}

export { createCard, removeCard, likeCard, openCardWrapper };