import { openModal, closeModal } from './modal.js';

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    description: "Горы, покрытые зеленью, и в некоторых местах лежит снег"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    description: "Река в заснеженном лесу"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    description: "Несколько монолитных зданий"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    description: "Карликовые растения на фоне горы"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    description: "Железная дорога, уходящая в даль, в лесу"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    description: "Холм у замёрзжего озера Байкал"
  }
];

// Функция создания карточки
function addCard (cardTemplate, cardsList, imgSrc, title,
  description = undefined, removeFunction = removeCard, likeFunction = likeCard) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(".card__image").src = imgSrc;
    card.querySelector(".card__image").alt = description ? description : title;
    card.querySelector(".card__title").textContent = title;
    card.querySelector(".card__delete-button").addEventListener("click", removeFunction);
    card.querySelector(".card__like-button").addEventListener("click", likeFunction);
    cardsList.append(card);
    return card;
};

// Функция удаления карточки
function removeCard (event) {
    event.target.closest(".card").remove();
};


function likeCard (evt) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
  } else {
    evt.target.classList.add('card__like-button_is-active');
  };
}

export { addCard, removeCard, likeCard, initialCards };