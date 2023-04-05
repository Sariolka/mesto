export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() { // возвращает объект с данными пользователя. 
    return {   //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
      name: this._userName.textcontent,
      info: this._userInfo.textcontent
    } 
  }

  setUserInfo(element) { // принимает новые данные пользователя и добавляет их на страницу
    this._userName.textcontent = element.name;
    this._userInfo.textcontent = element.info;
  }
}   