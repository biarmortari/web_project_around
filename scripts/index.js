const editButton = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

const likeButtons = document.querySelectorAll(".element__like-button");

likeButtons.forEach((button) => {
  const img = button.querySelector("img");

  button.addEventListener("click", () => {
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      img.src = "./images/like-button-active.svg";
    } else {
      img.src = "./images/like-button.svg";
    }
  });
});

const formElement = document.querySelector(".popup__form");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__text-name");
const profileDescription = document.querySelector(".profile__text-description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
