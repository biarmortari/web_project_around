import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// CALLBACK
function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

function handleImageFormSubmit(data) {
  const cardElement = createCard(data);
  cardList.addItem(cardElement, true);
  addCardPopup.close();
}

function handleCardClick(local, link) {
  popupWithImage.open(local, link);
}

// INSTÂNCIAS

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#popup-edit-profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#popup-edit-image",
  handleImageFormSubmit
);
addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__text-name",
  jobSelector: ".profile__text-description",
});

const initialCards = [
  {
    local: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    local: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    local: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    local: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    local: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    local: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      return card;
    },
  },
  ".elements"
);

cardList.renderItems();

// OUVINTES

editButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// VALIDAÇÃO

const profileFormValidator = new FormValidator(config, editProfilePopup._form);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, addCardPopup._form);
cardFormValidator.enableValidation();
