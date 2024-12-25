function toggleSubmitButton (inputList, submitButton) {
    if (inputList.some((element) => {
        return !(element.validity.valid);
    })) {
        submitButton.setAttribute('disabled', true);
    } else {
        submitButton.removeAttribute('disabled');
    };
}

function showInputError (inputElement, errorElement) {
    inputElement.element.classList.add(inputElement.class);
    if (inputElement.element.validity.patternMismatch) {
        errorElement.element.textContent = inputElement.element.dataset.errorMessage;
    } else {
        errorElement.element.textContent = inputElement.element.validationMessage;
    };
    errorElement.element.classList.add(errorElement.class);
}

function hideInputError (inputElement, errorElement) {
    inputElement.element.classList.remove(inputElement.class);
    errorElement.element.classList.remove(errorElement.class);
    errorElement.element.textContent = '';
}

function isValid (inputElement, errorElement) {
    if (inputElement.element.validity.valid) {
        hideInputError(inputElement, errorElement);
    } else {
        showInputError(inputElement, errorElement);
    };
}

function addValidationToForm (inputForm, formsInfoObj) {
    const inputList = Array.from(inputForm.querySelectorAll(formsInfoObj.inputSelector));
    const submitButton = inputForm.querySelector(formsInfoObj.submitButtonSelector);
    inputList.forEach((element) => {
        element.addEventListener('input', () => {
            isValid({element: element, class: formsInfoObj.inputErrorClass},
                {element: inputForm.querySelector(`.${element.id}-error`), class: formsInfoObj.errorClass});
            toggleSubmitButton(inputList, submitButton);
        });
    });
}

function enableValidation (formsInfoObj) {
    const formList = Array.from(document.querySelectorAll(formsInfoObj.formSelector))
    formList.forEach((element) => {
        addValidationToForm(element, formsInfoObj);
    });
}

function clearValidation (form, formsInfoObj) {
    if (form) {
        const inputList = Array.from(form.querySelectorAll(formsInfoObj.inputSelector));
        const submitButton = form.querySelector(formsInfoObj.submitButtonSelector);
        inputList.forEach((element) => {
            element.classList.remove(formsInfoObj.inputErrorClass);
            form.querySelector(`.${element.id}-error`).classList.remove(formsInfoObj.errorClass);
            toggleSubmitButton(inputList, submitButton);
        });
    }
};


export { enableValidation, clearValidation }