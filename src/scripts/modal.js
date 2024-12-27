function openModal (popup, additionalCallback = undefined) {

    if (additionalCallback) {
        additionalCallback();
    };

    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', escapeHandleByKey);
};


function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeHandleByKey);
};


function escapeHandleByKey (evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    };
};


export { openModal, closeModal }