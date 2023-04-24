export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // возвращает объект с данными пользователя.
    return {
      //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src,
    };
  }

  returnUserId() {
    return this._userId;
  }

  setUserInfo({ name, about, avatar, _id }) {
    // принимает новые данные пользователя и добавляет их на страницу
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = _id;
  }
}
