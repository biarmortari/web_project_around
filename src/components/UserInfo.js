export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = description;
  }

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }
}
