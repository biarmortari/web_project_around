class Card {
  constructor(data, templateSelector) {
  this._link = data.link;
  this._name = data.name;
  this._templateSelector = templateSelector;
  this._cardElement = this._getTemplate();
  /* this._handleCardClick = handleCardClick; esse serve pra abrir a imagem modal, que o código vai ficar no index.js*/
}

 _getTemplate () {
   const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    return cardElement;
 }

_setEventListeners () {
  this._trashButton.addEventListener("click", (evt) => this._handleDelete());
  this._likeButton.addEventListener("click", (evt) => this._handleLike());
  this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
}

_handleDelete () {
  this._cardElement.remove();
}
   
_handleLike () {
    this._likeButton.classList.toggle("active");
    if (this._likeButton.classList.contains("active")) {
      this._likeImage.src = "./images/like-button-active.svg";
    } else {
      this._likeImage.src = "./images/like-button.svg";
    }
  }

generateCard () {
 this._cardImage = this._cardElement.querySelector(".element__image");
 this._cardText = this._cardElement.querySelector(".element__text");
 this._trashButton = this._cardElement.querySelector(".element__trash-button");
 this._likeButton = this._cardElement.querySelector(".element__like-button");
 this._likeImage = this._likeButton.querySelector(".element__like-image");

 this._cardImage.src = this._link;
 this._cardImage.alt = this._name;
 this._cardText.textContent = this._name;
  
  this._setEventListeners();

  return this._cardElement;
}
}
