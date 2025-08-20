import { openPopup, closePopup } from "./utils.js";
import { Card } from "./card.js";
import { FormValidator } from "./validate.js";

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

editButton.addEventListener("click", () => openPopup(editProfilePopup));
addButton.addEventListener("click", () => openPopup(editImagePopup));

closeEditProfileButton.addEventListener("click", () =>
  closePopup(editProfilePopup, [profileFormValidator, cardFormValidator])
);
closeEditImageButton.addEventListener("click", () =>
  closePopup(editImagePopup, [profileFormValidator, cardFormValidator])
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

  closePopup(editProfilePopup, [profileFormValidator, cardFormValidator]);
}

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

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

function prependCard(cardElement) {
  const elements = document.querySelector(".elements");
  elements.prepend(cardElement);
}

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  prependCard(cardElement);
});

const formElementImage = document.querySelector(".popup__form_image");

const localInput = document.querySelector("#local");
const linkInput = document.querySelector("#link");

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: localInput.value,
    link: linkInput.value,
  };

  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();

  prependCard(cardElement);

  formElementImage.reset();
  closePopup(editImagePopup, [profileFormValidator, cardFormValidator]);
}

formElementImage.addEventListener("submit", handleImageFormSubmit);

function handleCardClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  openPopup(imagePopup);
}

const formValidators = {};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/*const forms = Array.from(document.querySelectorAll(config.formSelector));*/

/*forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
});*/

const cardFormValidator = new FormValidator(
  config,
  document.querySelector("#popup__form_image")
);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  config,
  document.querySelector("#popup__form_profile")
);
profileFormValidator.enableValidation();
