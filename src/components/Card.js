export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    handleCardClick,
    handleDeleteClick
  ) {
    this._card = data;
    this._link = data.link;
    this._local = data.name;
    this._cardId = data._id;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardElement = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    console.log(this._local, this._link);
    this._likeButton.addEventListener("click", (evt) => this._handleLike());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._local, this._link)
    );
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () =>
        this._handleDeleteClick(this._cardId, this._cardElement)
      );
    }
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
    this._trashButton = this._cardElement.querySelector(
      ".element__trash-button"
    );
    console.log(this._owner, this._userId);
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
      this._trashButton = null;
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
