export class Section {
  constructor({items, renderer}, conteinerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._conteiner = document.querySelector(conteinerSelector);
  }

  addItem(item) {   //принимает разметку карточки и вставляет ее в контейнер
    this._conteiner.prepend(item);
  }
  
  renderItems() { //перебирает initialItems и вызывает для каждой addItem
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }  
}