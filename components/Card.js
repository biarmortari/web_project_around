export default class Card {
  constructor(data, templateSelector, handleCardClick, userId) {
    this._card = data;
    this._link = data.link;
    this._local = data.local;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._userId = userId;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    if (this._trashButton) {
      this._trashButton.addEventListener("click", (evt) =>
        this._handleDelete()
      );
    }
    this._likeButton.addEventListener("click", (evt) => this._handleLike());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._local, this._link)
    );
  }

  _handleDelete() {
    this._cardElement.remove();
  }

  _handleLike() {
    this._likeButton.classList.toggle("active");
    if (this._likeButton.classList.contains("active")) {
      this._likeImage.src = "./images/like-button-active.svg";
    } else {
      this._likeImage.src = "./images/like-button.svg";
    }
  }

  generateCard() {
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._cardText = this._cardElement.querySelector(".element__text");
    if (this._card.owner === this._userId) {
      this._trashButton = this._cardElement.querySelector(
        ".element__trash-button"
      );
    } else {
      const trashButton = this._cardElement.querySelector(
        ".element__trash-button"
      );
      if (trashButton) {
        trashButton.remove();
      }
    }
    this._likeButton = this._cardElement.querySelector(".element__like-button");
    this._likeImage = this._likeButton.querySelector(".element__like-image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._local;
    this._cardText.textContent = this._local;

    this._setEventListeners();

    return this._cardElement;
  }
}
