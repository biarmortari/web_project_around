class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {}

  getInitialCards() {}

  updateUserInfo() {}

  addCard(data) {}

  changeLikeCardStatus(cardId, isLiked) {}

  deleteCard(cardId) {}

  updateAvatar(data) {}
}
