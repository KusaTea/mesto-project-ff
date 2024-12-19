import { closeByButton, makePopupVisible } from "./popup_functions";

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

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsList = document.querySelector(".places__list");

function openCard (card) {
    const cardPopup = document.querySelector(".popup_type_image");

    closeByButton(cardPopup);

    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    cardImage.addEventListener("click", function (evt) {
      cardPopup.querySelector(".popup__caption").textContent = cardTitle.textContent;
      cardPopup.querySelector(".popup__image").src = cardImage.src;
      cardPopup.querySelector(".popup__image").alt = cardImage.alt;
      makePopupVisible(cardPopup);
    });
}

// Функция создания карточки
function addCard (imgSrc, title, description = undefined, removeFunction = removeCard) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(".card__image").src = imgSrc;
    card.querySelector(".card__image").alt = description ? description : title;
    card.querySelector(".card__title").textContent = title;
    card.querySelector(".card__delete-button").addEventListener("click", removeFunction);
    openCard(card);
    cardsList.append(card);
    return card;
};

// Функция удаления карточки
function removeCard (event) {
    event.target.closest(".card").remove();
};

function addInitialCards (cardsList) {
  // Вывести карточки на страницу
  cardsList.forEach(function (item) {
    addCard(item.link, item.name, item.description);
  });
};

export { addCard, removeCard, addInitialCards, initialCards };