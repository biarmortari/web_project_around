import { openPopup, closePopup } from "./utils.js";
import { Card } from "./Card.js";
import { config, formResetValidation } from "./validate.js";

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");

const editProfilePopup = document.querySelector("#popup-edit-profile");
const editImagePopup = document.querySelector("#popup-edit-image");

const closeEditProfileButton = editProfilePopup.querySelector(
  ".popup__close-button"
);
const closeEditImageButton = editImagePopup.querySelector(
  ".popup__close-button"
);

const imagePopup = document.querySelector("#popup-image");
const modalImage = imagePopup.querySelector(".modal-image");
const closeImageButton = imagePopup.querySelector(".popup__close-button-icon");

/* function openPopup(popupElement) {
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
*/

editButton.addEventListener("click", () => openPopup(editProfilePopup));
addButton.addEventListener("click", () => openPopup(editImagePopup));

closeEditProfileButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
closeEditImageButton.addEventListener("click", () =>
  closePopup(editImagePopup)
);

closeImageButton.addEventListener("click", () => closePopup(imagePopup));

const formElementProfile = document.querySelector(".popup__form_profile");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__text-name");
const profileDescription = document.querySelector(".profile__text-description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editProfilePopup);
}

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document.querySelector("#card-template").content;

const container = document.querySelector(".elements");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".element__image");
  const cardText = cardElement.querySelector(".element__text");
  const trashButton = cardElement.querySelector(".element__trash-button");
  const likeButton = cardElement.querySelector(".element__like-button");
  const likeImage = likeButton.querySelector(".element__like-image");

  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;

  cardImage.addEventListener("click", () => {
    modalImage.src = link;
    modalImage.alt = name;
    openPopup(imagePopup);
  });

  trashButton.addEventListener("click", (evt) => {
    evt.target.closest(".element").remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");

    if (likeButton.classList.contains("active")) {
      likeImage.src = "./images/like-button-active.svg";
    } else {
      likeImage.src = "./images/like-button.svg";
    }
  });

  return cardElement;
}

function prependCard(cardElement) {
  const elements = document.querySelector(".elements");
  elements.prepend(cardElement);
}

initialCards.forEach((data) => {
  const newCard = createCard(data.name, data.link);
  prependCard(newCard);
});

const formElementImage = document.querySelector(".popup__form_image");

const localInput = document.querySelector("#local");
const linkInput = document.querySelector("#link");

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = createCard(localInput.value, linkInput.value);
  const elements = document.querySelector(".elements");
  prependCard(cardElement);

  closePopup(editImagePopup);
}

formElementImage.addEventListener("submit", handleImageFormSubmit);

