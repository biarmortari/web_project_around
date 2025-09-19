export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    handleLikeClick,
    handleCardClick,
    handleDeleteClick
  ) {
    this._card = data;
    this._link = data.link;
    this._local = data.name;
    this._cardId = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardElement = this._getTemplate();
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) =>
      this._handleLikeClick(this._cardId, this._isLiked, this)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._local, this._link)
    );
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () =>
        this._handleDeleteClick(this._cardId, this._cardElement)
      );
    }
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._likeImage.src = "./images/like-button-active.svg";
      this._likeButton.classList.add("active");
    } else {
      this._likeImage.src = "./images/like-button.svg";
      this._likeButton.classList.remove("active");
    }
  }

  setLikes(cardData) {
    this._likes = cardData.likes;
    this._isLiked = cardData.isLiked;
    this._updateLikeButton();
  }

  generateCard() {
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._cardText = this._cardElement.querySelector(".element__text");
    this._trashButton = this._cardElement.querySelector(
      ".element__trash-button"
    );
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
      this._trashButton = null;
    }
    this._likeButton = this._cardElement.querySelector(".element__like-button");
    this._likeImage = this._likeButton.querySelector(".element__like-image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._local;
    this._cardText.textContent = this._local;

    this._updateLikeButton();

    this._setEventListeners();

    return this._cardElement;
  }
}
