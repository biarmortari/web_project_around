import { FormValidator } from "./validate.js";

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popupElement, validatorsList) {
  popupElement.classList.remove("popup_opened");
  const form = popupElement.querySelector("form");
  if (form) {
    form.reset();
  }
  document.removeEventListener("keydown", handleEscKey);
  if (validatorsList) {
    validatorsList.forEach((validator) => validator.formResetValidation());
  }
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
});

export { openPopup, closePopup };
