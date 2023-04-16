class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._headers = options.headers; 
  }
  

  getResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
      
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }



  getInitialCards() {                             //получить карточки
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(this.getResponse);
  } 

  getUserInfo() {                                 // получить информацию о пользователе
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this.getResponse); 
  }
  
  editUserProfile(data) {                       //редактировать информацию о пользователе
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,  
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this.getResponse);
  }


  addNewCard(item) {   //добавить новую карточку
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers, 
      body: JSON.stringify({
        name: item.place,
        link: item.link
      })
    })
    .then(this.getResponse);
  }


  deleteCard() {  //удалить карточку
    
  }

  getLikeCard(cardId) {  //поставить лайк
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this.getResponse);
  }

  deleteLikeCard(cardId) {  //удалить лайк
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this.getResponse);
  }
 


  editUserAvatar() {  //изменить аватар
    return fetch(`${this._address}/users/me/avatar`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this.getResponse);
  }
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-64`,
  headers: {
      authorization: 'e266c9d4-7550-484d-9fea-f5c65957f0a5',
      'Content-Type': 'application/json',
}
})

