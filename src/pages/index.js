import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
  nameSelector: ".profile__text-name",
  aboutSelector: ".profile__text-description",
});

// INSTÂNCIA DA API

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f4170781-0bdc-4b82-8946-9d7c4033b446",
    //"Content-Type": "application/json",
  },
});

let userId;
let cardList;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList = new Section(
      {
        items: cardsData,
        renderer: (data) => {
          const card = createCard(data, userId);
          return card;
        },
      },
      ".elements"
    );

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// CALLBACK

function handleDeleteClick(cardId, cardElement) {
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
}

function createCard(data, userId) {
  api
    .addCard(data)
    .then((res) => {
      const card = new Card(
        res,
        "#card-template",
        userId,
        handleCardClick,
        handleDeleteClick
      );
      cardList.addItem(card.generateCard());
    })
    .catch((err) => {
      console.log(err);
    });
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
