function makePopupVisible (popup) {
    popup.setAttribute('style', "display: flex");
};

function closePopup (popup) {
    popup.setAttribute('style', "display: none");
    if (popup.querySelector("form")) {
        popup.querySelector("form").reset();
    };
};

function closeByButton (popup) {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener("click", function (evt) {
        closePopup(popup);
    });
};

function saveButtonFunctional (popup, callbackToListener) {
    const saveButton = popup.querySelector(".popup__button");

    saveButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        callbackToListener();
        closePopup(popup)
    });
};

export { makePopupVisible, closePopup, closeByButton, saveButtonFunctional }