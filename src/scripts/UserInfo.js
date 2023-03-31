export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector)
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name : this._name.textcontent,
      info : this._info.textcontent
    }
    return userInfo;
  }

  setUserInfo(user) {
    this._name.textcontent = user.name;
    this._info.textcontent = user.info;
  }
}   