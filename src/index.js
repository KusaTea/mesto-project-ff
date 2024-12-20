import './pages/index.css';
import { addCard, removeCard, initialCards } from './scripts/cards.js';
import { openModal, closeModal, addFunctionalToSubmitButton } from './scripts/modal.js';;

// Code for profile editing
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const currentName = document.querySelector(".profile__title")
const currentJob = document.querySelector(".profile__description")
const editProfileForm = document.forms['edit-profile'];


addFunctionalToSubmitButton(profilePopup, function () {
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


initialCards.forEach(function (item) {
    addCard(cardTemplate, cardsList, item.link, item.name, item.description);
});


const plusPopup = document.querySelector(".popup_type_new-card");
const plusCard = document.querySelector(".profile__add-button");
const cardForm = document.forms['new-place'];


addFunctionalToSubmitButton(plusPopup, function () {
    if (cardForm['link'].value && cardForm['place-name'].value) {
        addCard(cardTemplate, cardsList, cardForm['link'].value, cardForm['place-name'].value);
    };
});


plusCard.addEventListener('click', function (evt) {
    openModal(plusPopup);
});


// Open card
const cardPopup = document.querySelector(".popup_type_image");

cardsList.addEventListener("click", function (evt) {
    if (evt.target.classList.contains('card__image')) {
        cardPopup.querySelector(".popup__image").src = evt.target.src;
        cardPopup.querySelector(".popup__image").alt = evt.target.alt;
        cardPopup.querySelector(".popup__caption").textContent =
        evt.target.parentElement.querySelector('.card__title').textContent;
        openModal(cardPopup);
    };
})