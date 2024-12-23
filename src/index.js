import './pages/index.css';
import { createCard, likeCard, removeCard } from './scripts/cards.js';
import { openModal, closeModal, addFunctionalToSubmit } from './scripts/modal.js';;
import { initialCards } from './scripts/initialCards.js'


document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup__close') | evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup);
        }
    });
});

// Code for profile editing
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const currentName = document.querySelector(".profile__title")
const currentJob = document.querySelector(".profile__description")
const editProfileForm = document.forms['edit-profile'];

addFunctionalToSubmit(profilePopup, editProfileForm, function () {
    if (editProfileForm.name.value && editProfileForm.description.value) {
        currentName.textContent = editProfileForm.name.value;
        currentJob.textContent = editProfileForm.description.value;
    };
});


profileButton.addEventListener('click', function (evt) {
    openModal(profilePopup, function () {
        editProfileForm.name.value = currentName.textContent;
        editProfileForm.description.value = currentJob.textContent;
    });
});


// Code for interaction with cards
// Add new card functional
const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
const cardsList = document.querySelector(".places__list");
const cardPopup = document.querySelector(".popup_type_image");
const popupImage = cardPopup.querySelector(".popup__image");
const popupCaprion = cardPopup.querySelector(".popup__caption");

function openCard (imgSrc, title) {
    popupImage.src = imgSrc;
    popupImage.alt = title;
    popupCaprion.textContent = title;
    openModal(cardPopup);
  }


initialCards.forEach(function (item) {
    cardsList.prepend(
        createCard({
            cardTemplate: cardTemplate,
            imgSrc: item.link,
            title: item.name,
            description: item.description
        },
        {
            removeFunction: removeCard,
            likeFunction: likeCard,
            openFunction: openCard
        })
    );
});


const plusPopup = document.querySelector(".popup_type_new-card");
const plusCard = document.querySelector(".profile__add-button");
const cardForm = document.forms['new-place'];


addFunctionalToSubmit(plusPopup, cardForm, function () {
    if (cardForm['link'].value && cardForm['place-name'].value) {
        cardsList.prepend(
            createCard({
                cardTemplate: cardTemplate,
                imgSrc: cardForm['link'].value,
                title: cardForm['place-name'].value
            },
            {
                removeFunction: removeCard,
                likeFunction: likeCard,
                openFunction: openCard
            }),
        );
    };
});


plusCard.addEventListener('click', function (evt) {
    openModal(plusPopup);
});