function toggleSubmitButton (inputList, submitButton) {
    if (!inputList.some((element) => {
        return element.validity.valid;
    })) {
        submitButton.setAttribute('disabled', true);
    } else {
        submitButton.removeAttribute('disabled');
    };
}

function showInputError (inputElement, errorElement) {
    inputElement.classList.add('...');
    errorElement.textContent = inpuinputElementtForm.dataset.errorMessage;
}

function hideInputError (inputElement, errorElement) {
    inputElement.classList.remove('...');
    errorElement.textContent = '';
}

function isValid (inputElement, errorElement) {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorElement);
    } else {
        showInputError(inputElement, errorElement);
    };
}

function addValidationToForm (inputForm) {
    const inputList = inputForm.
    toggleSubmitButton(inputFormObj.inputList, inputFormObj.submitButton)
    inputFormObj.inputList.forEach((element) => {
        element.addEventListener('input', () => {
            isValid(element, inputFormObj.querySelector(`.${element.id}-error`));
            toggleSubmitButton(inputFormObj.inputList, inputFormObj.submitButton);
        });
    });
}