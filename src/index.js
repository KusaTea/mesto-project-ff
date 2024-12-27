import './pages/index.css';
import { createCard, removeCardWrapper, likeCardWrapper } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';;
import { enableValidation, clearValidation } from './scripts/validation.js'
import { getInitialInformation, changeProfileInfo, sendNewCard, removeCardRequest, likeCardRequest, changeAvatar, renderLoading } from './scripts/api.js';


const formInfoObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


const removeCard = removeCardWrapper(removeCardRequest, '.card');
const likeCard = likeCardWrapper(likeCardRequest, '.card', 'card__like-button_is-active');

document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup__close') | evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup);
            clearValidation(popup.querySelector(formInfoObj.formSelector), formInfoObj);
        }
    });
});


enableValidation(formInfoObj); 

// Code for profile editing
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const currentName = document.querySelector(".profile__title")
const currentJob = document.querySelector(".profile__description")
const editProfileForm = document.forms['edit-profile'];
const profilePopupButton = profilePopup.querySelector(".popup__button");

editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderLoading(true, profilePopupButton);
    changeProfileInfo(editProfileForm.name.value, editProfileForm.description.value)
        .then((data) => {
            if (data) {
                currentName.textContent = data.name;
                currentJob.textContent = data.about;
            } else {
                Promise.reject('Ошибка')
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, profilePopupButton)
            closeModal(profilePopup);
            editProfileForm.reset();
        });
});


profileButton.addEventListener('click', function (evt) {
    openModal(profilePopup, function () {
        editProfileForm.name.value = currentName.textContent;
        editProfileForm.description.value = currentJob.textContent;
        clearValidation(editProfileForm, formInfoObj);
    });
});


// Code for interaction with cards
// Add new card functional
const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
const cardsList = document.querySelector(".places__list");
const cardPopup = document.querySelector(".popup_type_image");
const popupImage = cardPopup.querySelector(".popup__image");
const popupCaption = cardPopup.querySelector(".popup__caption");

function openCard (imgSrc, title) {
    popupImage.src = imgSrc;
    popupImage.alt = title;
    popupCaption.textContent = title;
    openModal(cardPopup);
  }


const plusPopup = document.querySelector(".popup_type_new-card");
const plusCard = document.querySelector(".profile__add-button");
const cardForm = document.forms['new-place'];
const plusPopupButton = plusPopup.querySelector(".popup__button");

cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    renderLoading(true, plusPopupButton);
    sendNewCard(cardForm['place-name'].value, cardForm['link'].value)
        .then((data) => {
            if (data) {
                cardsList.prepend(
                    createCard({
                        cardTemplate: cardTemplate,
                        imgSrc: data.link,
                        title: data.name,
                        likes: data.likes,
                        id: data._id
                    },
                    {
                        removeFunction: removeCard,
                        likeFunction: likeCard,
                        openFunction: openCard
                    },
                    {
                        cardOwner: data.owner._id,
                        currentUser: data.owner._id
                    }),
                );
                } else {
                    Promise.reject('Ошибка');
                };
            })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, plusPopupButton)
            closeModal(plusPopup);
            cardForm.reset()
        });
});


plusCard.addEventListener('click', function (evt) {
    clearValidation(cardForm, formInfoObj);
    openModal(plusPopup);
});


// Avatar
const avatarPopup = document.querySelector(".popup_edit_avatar");
const avatarIcon = document.querySelector(".profile__image");
const avatarForm = document.forms['edit-avatar'];
const avatarPopupButton = avatarPopup.querySelector('.popup__button');

avatarIcon.addEventListener('click', function (evt) {
    openModal(avatarPopup, function () {
        clearValidation(avatarForm, formInfoObj);
    });
});

avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderLoading(true, avatarPopupButton);
    changeAvatar(avatarForm.avatar.value)
        .then((data) => {
            if (data) {
                avatarIcon.setAttribute('style', `background-image: url(${data.avatar});`);
            } else {
                Promise.reject('Ошибка');
            };
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(false, avatarPopupButton);
            closeModal(avatarPopup);
            avatarForm.reset();
        });
    });


// Initial information
getInitialInformation()
    .then((res) => {
        return {userInfo: res[0].json(), cardsInfo: res[1].json()};
    })
    .then((resObj) => {
        resObj.userInfo.then((user) => {
            currentName.textContent = user.name;
            currentJob.textContent = user.about;
            avatarIcon.setAttribute('style', `background-image: url(${user.avatar});`);
            resObj.cardsInfo.then((cards) => {
                cards.forEach((item) => {
                    cardsList.append(
                        createCard({
                            cardTemplate: cardTemplate,
                            imgSrc: item.link,
                            title: item.name,
                            description: item.description,
                            likes: item.likes,
                            id: item._id
                        },
                        {
                            removeFunction: removeCard,
                            likeFunction: likeCard,
                            openFunction: openCard
                        },
                        {
                            cardOwner: item.owner._id,
                            currentUser: user._id
                        })
                    )
                });
            });
        });
    })