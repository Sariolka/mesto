class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;

    this._conteiner = document.querySelector(selector);
  }


  addItem(item) {   //принимает разметку карточки и вставляет ее в контейнер
    this._conteiner.prepend(item);
  }


  renderCards() { //перебирает массив данных карточек и вызывает для каждой метод addItem
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }    
}