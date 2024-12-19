import { addCard } from './cards.js';
import { makePopupVisible, closePopup, closeByButton, saveButtonFunctional } from './popup_functions.js'

export function launchEditPopup () {
    const editButton = document.querySelector(".profile__edit-button");
    const currentName = document.querySelector(".profile__title")
    const currentJob = document.querySelector(".profile__description")
    
    const editPopup = document.querySelector(".popup_type_edit");
    const editForm = document.forms['edit-profile'];

    closeByButton(editPopup);

    editButton.addEventListener("click", function (evt) {
        makePopupVisible(editPopup);
        editForm.name.value = currentName.textContent;
        editForm.description.value = currentJob.textContent;
    });

    saveButtonFunctional(editPopup, function () {
        currentName.textContent = editForm.name.value;
        currentJob.textContent = editForm.description.value;
    });
}

export function launchAddCardPopup () {
    const addCardPopup = document.querySelector(".popup_type_new-card");
    const plusButton = document.querySelector(".profile__add-button");

    closeByButton(addCardPopup);

    plusButton.addEventListener("click", function (evt) {
        makePopupVisible(addCardPopup);
    });

    const cardForm = document.forms['new-place'];

    saveButtonFunctional(addCardPopup, function () {
        addCard(cardForm.link.value, cardForm["place-name"].value);
    });
}