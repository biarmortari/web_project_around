import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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

// POPUPS e USERINFO

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
  userNameSelector: ".profile__text-name",
  userDescriptionSelector: ".profile__text-description",
});

const popupWithConfirmation = new PopupWithConfirmation("#popup-confirmation");
popupWithConfirmation.setEventListeners();

// INSTÂNCIA DA API

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "42415dc5-0398-42c7-ace6-6f8ebb09a884",
    "Content-Type": "application/json",
  },
});

let userId;

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".elements"
);

api.getAppInfo().then(([cards, userData]) => {
  console.log(cards);
  console.log(userData);
  userData.description = userData.about;

  userInfo.setUserInfo(userData);
  cardList.renderItems(cards);
});

// CALLBACK

function handleDeleteClick(cardId, cardElement) {
  popupWithConfirmation.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .then(() => {
        console.log("Deletado com sucesso");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  popupWithConfirmation.open();
}

function handleProfileFormSubmit(data) {
  api
    .updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleImageFormSubmit(data) {
  api
    .addCard(data)
    .then((newCardData) => {
      const cardElement = createCard(newCardData, userId);
      cardList.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const createCard = (data) => {
  return new Card(
    data,
    "#card-template",
    userId,
    handleCardClick,
    handleDeleteClick
  ).generateCard();
};

function handleCardClick(local, link) {
  popupWithImage.open(local, link);
}

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
