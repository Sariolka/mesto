export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() { // возвращает объект с данными пользователя. 
    const userInfo = {   //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
      name : this._userName.textcontent,
      info : this._userInfo.textcontent
    }
    return userInfo;
  }

  setUserInfo(user) { // принимает новые данные пользователя и добавляет их на страницу
    this._userName.textcontent = user.name;
    this._userInfo.textcontent = user.info;
  }
}   