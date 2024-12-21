function openModal (popup, additionalCallback = undefined) {

    if (additionalCallback) {
        additionalCallback();
    };

    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', escapeHandleByKey);
};


function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    
    if (popup.querySelector("form")) {
        popup.querySelector("form").reset();
    };
    document.removeEventListener('keydown', escapeHandleByKey);
};


function escapeHandleByKey (evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    };
};


function addFunctionalToSubmit (popup, additionalCallback = undefined) {
    popup.querySelector('form').addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (additionalCallback) {
            additionalCallback();
        };
        closeModal(popup);
    });
};


export { openModal, closeModal, addFunctionalToSubmit }