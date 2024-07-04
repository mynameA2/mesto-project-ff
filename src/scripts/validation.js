const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input_type_error_active",
  };
  
  const showError = (
    formElement,
    inputElement,
    errorMessage,
    validationConfig
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  };
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.valid) {
      hideError(formElement, inputElement, validationConfig);
      return;
    }
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.dataset.error;
      showError(formElement, inputElement, errorMessage, validationConfig);
    } else {
      showError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationConfig
      );
    }
  };
  
  function toggleButton(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    const hasInvalid = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
  
    if (hasInvalid) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }
  
  function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButton(formElement, buttonElement, validationConfig);
      });
    });
  }
  function enableValidation(validationConfig) {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    });
  }

  function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      hideError(formElement, inputElement, validationConfig);
      inputElement.value = "";
      toggleButton(formElement, buttonElement, validationConfig);
    });
  };

  export { enableValidation, clearValidation, validationConfig };