function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  const form = popupElement.querySelector("form");
  if (form) {
    formResetValidation(form, config);
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

function handleCardClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  openPopup(imagePopup);
}

export { openPopup, closePopup, handleCardClick };
