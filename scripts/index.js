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
const closeImageButton = imagePopup.querySelector(".popup__close-button_image");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => openPopup(editProfilePopup));
addButton.addEventListener("click", () => openPopup(editImagePopup));

closeEditProfileButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
closeEditImageButton.addEventListener("click", () =>
  closePopup(editImagePopup)
);

closeImageButton.addEventListener("click", () => closePopup(imagePopup));

const formElement = document.querySelector(".popup__form_profile");

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

formElement.addEventListener("submit", handleProfileFormSubmit);

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
  const cardElement = document.createElement("div");
  cardElement.classList.add("element");

  const cardImage = document.createElement("img");
  cardImage.classList.add("element__image");
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", () => {
    modalImage.src = link;
    modalImage.alt = name;
    openPopup(imagePopup);
  });

  const trashButton = document.createElement("button");
  trashButton.classList.add("element__trash-button");
  trashButton.type = "button";

  const trashImage = document.createElement("img");
  trashImage.classList.add("element__trash-image");
  trashImage.src = "./images/trash-button.svg";
  trashImage.alt = "Botão de excluir";

  trashButton.appendChild(trashImage);

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardSubtitle = document.createElement("div");
  cardSubtitle.classList.add("element__subtitle");

  const cardText = document.createElement("p");
  cardText.classList.add("element__text");
  cardText.textContent = name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("element__like-button");
  likeButton.type = "button";

  const likeImage = document.createElement("img");
  likeImage.classList.add("element__like-image");
  likeImage.src = "./images/like-button.svg";
  likeImage.alt = "Botão de curtir";

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");

    if (likeButton.classList.contains("active")) {
      likeImage.src = "./images/like-button-active.svg";
    } else {
      likeImage.src = "./images/like-button.svg";
    }
  });

  likeButton.appendChild(likeImage);
  cardSubtitle.append(cardText, likeButton);
  cardElement.append(cardImage, trashButton, cardSubtitle);

  return cardElement;
}

function addCard(cardElement) {
  const elements = document.querySelector(".elements");
  elements.prepend(cardElement);
}

initialCards.forEach((data) => {
  const newCard = createCard(data.name, data.link);
  addCard(newCard);
});

const formElementImage = document.querySelector(".popup__form_image");

const localInput = document.querySelector("#local");
const linkInput = document.querySelector("#link");

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = createCard(localInput.value, linkInput.value);
  const elements = document.querySelector(".elements");
  elements.prepend(cardElement);

  closePopup(editImagePopup);
}

formElementImage.addEventListener("submit", handleImageFormSubmit);
