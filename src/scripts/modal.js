export function openModal (popup, additionalCallback = undefined) {

    if (additionalCallback) {
        additionalCallback();
    };

    popup.classList.add('popup_is-opened');

    popup.querySelector('.popup__close').addEventListener('click', function (evt) {
        closeModal(popup);
    });
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closeModal(popup);
        };
    });
    popup.addEventListener('click', function (evt) {
        closeModal(popup);
    });
    popup.querySelector('.popup__content').addEventListener('click', function (evt) {
        evt.stopImmediatePropagation();
    });
};


export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    
    if (popup.querySelector("form")) {
        popup.querySelector("form").reset();
    };
    document.removeEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        };
    });
    document.removeEventListener('click', function (evt) {
        closeModal(popup);
    });
    popup.removeEventListener('click', function (evt) {
        closeModal(popup);
    });
    popup.querySelector('.popup__content').removeEventListener('click', function (evt) {
        evt.stopImmediatePropagation();
    });
    popup.querySelector('.popup__close').removeEventListener('click', function (evt) {
        closeModal(popup);
    });
};


export function addFunctionalToSubmitButton (popup, additionalCallback = undefined) {
    popup.querySelector('.popup__button').addEventListener('click', function (evt) {
        evt.preventDefault();
        if (additionalCallback) {
            additionalCallback();
        };
        closeModal(popup);
    });
};
