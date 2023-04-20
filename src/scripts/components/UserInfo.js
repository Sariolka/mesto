export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() { // возвращает объект с данными пользователя. 
    return {   //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
      name: this._userName.textContent,
      about: this._userInfo.textContent
    }
  }
  
  setUserInfo({name, about, _id}) { // принимает новые данные пользователя и добавляет их на страницу
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._userId = _id;
  }
}