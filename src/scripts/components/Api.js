class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._headers = options.headers; 
  }
  

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }



  getInitialCards() {                             //получить карточки
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._getResponse);
  } 

  getUserInfo() {                                 // получить информацию о пользователе
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._getResponse); 
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
    .then(this._getResponse);
  }


  addNewCard(card) {   //добавить новую карточку
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers, 
      body: JSON.stringify({
        place: card.place,
        link: card.link
      })
    })
    .then(this._getResponse);
  }


  deleteCard() {  //удалить карточку

  }

  getLikeCard() {  //поставить лайк

  }

  deleteLikeCard() {  //удалить лайк

  }
 
  editUserAvatar() {  //изменить аватар

  }
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-64`,
  headers: {
      authorization: 'e266c9d4-7550-484d-9fea-f5c65957f0a5',
      'Content-Type': 'application/json',
}
})

