// Функция создания карточки
function createCard (cardInfo, cardFunctions, usersInfo) {
    const card = cardInfo.cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(cardInfo.classes.image);
    const likeButton = card.querySelector(cardInfo.classes.likeButton)
    cardImage.src = cardInfo.imgSrc;
    cardImage.alt = cardInfo.description | cardInfo.title;
    card.querySelector(cardInfo.classes.title).textContent = cardInfo.title;
    if (usersInfo.currentUser === usersInfo.cardOwner) {
      card.querySelector(cardInfo.classes.deleteButton).addEventListener("click", cardFunctions.removeFunction);
    } else {
      card.querySelector(cardInfo.classes.deleteButton).remove();
    };
    if (Object.values(cardInfo.likes).some((likeOwner) => {
      return likeOwner._id === usersInfo.currentUser;
    })) {
      likeButton.classList.add(cardInfo.classes.likeButtonActive);
    };
    likeButton.addEventListener("click", cardFunctions.likeFunction);
    card.querySelector(cardInfo.classes.likeCounter).textContent = cardInfo.likes.length;
    card.querySelector(cardInfo.classes.card).setAttribute('data-id', cardInfo.id);
    cardImage.addEventListener("click", () =>
      cardFunctions.openFunction(cardInfo.imgSrc, cardInfo.title));
    return card;
};


function removeCardWrapper (request, cardClass) {
  return (evt) => {
  const card = evt.target.closest(cardClass);
  request(card)
      .then((data) => {
          if (data) {
              card.remove();
          } else {
              Promise.reject('Ошибка')
          }
      })
      .catch(err => console.log(err));
    };
}


function likeCardWrapper (request, classes) {
  return (evt) => {
    const card = evt.target.closest(classes.card);
    request(card, evt.target.classList.contains(classes.likeButtonActive) ? 'DELETE' : 'PUT')
      .then((data) => {
        evt.target.classList.toggle(classes.likeButtonActive);
        card.querySelector(classes.likeCounter).textContent = data.likes.length})
      .catch(err => console.log(err));
  }
}


export { createCard, removeCardWrapper, likeCardWrapper };